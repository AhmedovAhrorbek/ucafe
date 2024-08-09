import React from "react";
import { Modal, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";

interface ChangeUserInfoModalProps {
  visible: boolean;
  onOk: () => void;
//   confirmLoading: boolean;
  onCancel: () => void;
  form: FormInstance;
}

const ChangeUserInfoModal: React.FC<ChangeUserInfoModalProps> = ({
  visible,
  onOk,
//   confirmLoading,
  onCancel,
  form,
}) => {
  return (
    <Modal
      title="Change User Info"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      centered
      className="max-w-full sm:max-w-lg"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input placeholder="Username" className="w-full" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Номер телефона"
          rules={[
            { required: true, message: "Please input the phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" className="w-full" />
        </Form.Item>
        <Form.Item
          name="full_name"
          label="Полное имя"
          rules={[{ required: true, message: "Please input the full name!" }]}
        >
          <Input placeholder="Full Name" className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeUserInfoModal;
