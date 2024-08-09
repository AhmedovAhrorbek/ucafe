import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, message } from "antd";
import ProfileCard from "../../components/ProfileCard";
import { useAuthContext } from "../../../../contexts/auth-context";
import { changePassword, editUserInfo, getUserById } from "../../api";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import ChangeUserInfoModal from "../../components/ChangeUserInfoModal";

const ManagerProfile: React.FC = () => {
  const { setUser, user } = useAuthContext();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isUserInfoModalVisible, setIsUserInfoModalVisible] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  console.log(user);
  const { mutate: mutateChangePassword } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      message.success("Пароль успешно изменён");
      setIsPasswordModalVisible(false);
    },
    onError: () => {
      message.error("Не удалось изменить пароль");
    },
  });

  const { mutate: mutateEditUserInfo } = useMutation({
    mutationFn: editUserInfo,
    onSuccess: async (updatedUserInfo) => {
      message.success("Информация о пользователе успешно обновлена");
      setIsUserInfoModalVisible(false);

      try {
        const updatedUser = await getUserById(user?.id);
        console.log("Fetched updated user:", updatedUser);
        setUser(updatedUser); // Context yangilash

        queryClient.invalidateQueries(["user", user?.id]);
      } catch (error) {
        message.error("Не удалось получить обновленные данные о пользователе");
      }
    },
    onError: () => {
      message.error("Не удалось обновить информацию о пользователе");
    },
  });

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const showUserInfoModal = () => {
    form.setFieldsValue({
      username: user?.username,
      phone_number: user?.phone_number,
      full_name: user?.full_name,
    });
    setIsUserInfoModalVisible(true);
  };

  const handlePasswordOk = () => {
    form
      .validateFields()
      .then((values) => {
        mutateChangePassword({
          old_password: values?.old_password,
          password: values?.password,
          password2: values?.password2,
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleUserInfoOk = () => {
    form
      .validateFields()
      .then((values) => {
        mutateEditUserInfo(values);
        console.log(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsPasswordModalVisible(false);
    setIsUserInfoModalVisible(false);
  };

  return (
    <div className="flex justify-center items-center mt-5 bg-gray-100">
      <ProfileCard
        user={user}
        onUpdate={showUserInfoModal}
        onChangePassword={showPasswordModal}
      />

      <ChangePasswordModal
        visible={isPasswordModalVisible}
        onOk={handlePasswordOk}
        onCancel={handleCancel}
        form={form}
      />

      <ChangeUserInfoModal
        visible={isUserInfoModalVisible}
        onOk={handleUserInfoOk}
        onCancel={handleCancel}
        form={form}
      />
    </div>
  );
};

export default ManagerProfile;
