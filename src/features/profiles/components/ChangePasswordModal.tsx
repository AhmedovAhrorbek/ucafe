import React from "react";
import { Modal, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";

interface ChangePasswordModalProps {
  visible: boolean;
  onOk: () => void;
//   confirmLoading: boolean;
  onCancel: () => void;
  form: FormInstance;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onOk,
//   confirmLoading,
  onCancel,
  form,
}) => {
  return (
    <Modal
      title="Изменить пароль"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      centered
      className="max-w-full sm:max-w-lg"
    >
      <Form form={form} layout="vertical" name="changePasswordForm">
        <Form.Item
          name="old_password"
          label="Старый пароль"
          rules={[
            { required: true, message: "Пожалуйста, введите старый пароль" },
          ]}
        >
          <Input.Password placeholder="Старый пароль" className="w-full" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Новый пароль"
          rules={[
            { required: true, message: "Пожалуйста, введите новый пароль" },
          ]}
        >
          <Input.Password placeholder="Новый пароль" className="w-full" />
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
          <Input.Password
            placeholder="Подтвердите новый пароль"
            className="w-full"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
