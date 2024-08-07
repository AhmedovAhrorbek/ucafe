import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Modal, Form, Input, Button, message } from "antd";
import { useAuthContext } from "../../../../contexts/auth-context";
import { Card, Descriptions, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";


const AdminProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { mutate: mutateChangePassword, isLoading: isChangingPassword } =
    useMutation(changePassword, {
      onSuccess: () => {
        message.success("Пароль успешно изменён");
        setIsModalVisible(false);
      },
      onError: () => {
        message.error("Не удалось изменить пароль");
      },
    });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        mutateChangePassword({ id: user.id, data: values });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-center items-center mt-5 bg-gray-100">
      <Card className="w-full max-w-xl p-4 shadow-md">
        <div className="flex justify-center mb-4">
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <Descriptions title="Профиль администратора" bordered column={1}>
          <Descriptions.Item label="Имя пользователя">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Полное имя">
            {user.full_name || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Номер телефона">
            {user.phone_number || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Зарплата">
            {user.salary || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Тип пользователя">
            {user.user_type}
          </Descriptions.Item>
          <Descriptions.Item label="Дата присоединения">
            {new Date(user.date_joined).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Edit">
            <div className="flex items-center gap-2">
              <Button type="primary">Обновить</Button>
              <Button type="primary" onClick={showModal}>
                Изменить пароль
              </Button>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Изменить пароль"
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={isChangingPassword}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="changePasswordForm">
          <Form.Item
            name="old_password"
            label="Старый пароль"
            rules={[
              { required: true, message: "Пожалуйста, введите старый пароль" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password"
            label="Новый пароль"
            rules={[
              { required: true, message: "Пожалуйста, введите новый пароль" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password2"
            label="Подтвердите новый пароль"
            rules={[
              {
                required: true,
                message: "Пожалуйста, подтвердите новый пароль",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProfile;
