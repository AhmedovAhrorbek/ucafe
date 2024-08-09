import React, { useState } from "react";
import { UserType } from "../types";
import { Switch, Button, Modal, Form, Input, Row, Col, message } from "antd";
import { getUserById } from "../../profiles/api";
import { updateUserInfo, changeUserPassword } from "../api";
import { useQueryClient } from "@tanstack/react-query";

const UserListCard: React.FC<UserType> = ({
  id,
  username,
  full_name,
  user_type,
  is_active,
  phone_number,
  salary,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const queryClient = useQueryClient();

  const showModal = async () => {
    const data = await getUserById(id);
    form.setFieldsValue({ salary: data.salary, is_active: data.is_active });
    setIsModalVisible(true);
  };

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  const handleUpdate = async (values: {
    salary: number;
    is_active: boolean;
  }) => {
    await updateUserInfo(id, {
      salary: values.salary,
      is_active: values.is_active,
    });
    setIsModalVisible(false);
    form.resetFields();
    message.success("Имя пользователя успешно изменено");
    queryClient.invalidateQueries(["users"]);
  };

  const handleChangePassword = async (values: { password: string }) => {
    await changeUserPassword(id, values.password);
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
    message.success("Пароль пользователя успешно изменен");
    queryClient.invalidateQueries(["users"]);
  };

  return (
    <div className="p-4 border rounded-[8px] flex flex-col lg:flex-row items-start lg:items-center justify-between mx-4 bg-white mb-2 space-y-2 lg:space-y-0">
      <h2 className="lg:w-[150px] w-full font-sf-pro-display text-[16px] text-[#2F3138] font-semibold leading-[19.09px]">
        {full_name}
      </h2>
      <p className="lg:w-[180px] w-full font-sf-pro-display text-[14px] font-normal text-[#2F3138] leading-[19.09px]">
        {username}
      </p>
      <p className="lg:w-[180px] w-full font-sf-pro-display text-[14px] font-normal text-[#2F3138] leading-[19.09px]">
        {user_type}
      </p>
      <p className="lg:w-[180px] w-full font-sf-pro-display text-[14px] font-normal text-[#2F3138] leading-[19.09px]">
        {phone_number}
      </p>
      <p className="lg:w-[180px] w-full font-sf-pro-display text-[14px] font-normal text-[#2F3138] leading-[19.09px]">
        {salary}
      </p>
      <div className="lg:w-[51px] w-full">
        <Switch checked={is_active} disabled />
      </div>
      <div className="flex gap-1 w-full lg:w-auto items-center">
        <Button type="link" onClick={showModal}>
          Обновлять
        </Button>
        <Button type="primary" onClick={showPasswordModal}>
          Изменить пароль
        </Button>
      </div>

      <Modal
        title="Обновить сотрудника"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          name="update_user"
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="salary"
                label="Зарплата"
                rules={[
                  { required: true, message: "Please input the salary!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="is_active"
                label="Активный"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify="end">
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Обновить
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Изменить пароль"
        open={isPasswordModalVisible}
        onCancel={handlePasswordCancel}
        footer={null}
        width={400}
      >
        <Form
          form={passwordForm}
          name="change_password"
          onFinish={handleChangePassword}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="password"
                label="Новый пароль"
                rules={[
                  { required: true, message: "Please input the password!" },
                ]}
              >
                <Input.Password placeholder="Введите новый пароль" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify="end">
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Изменить пароль
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UserListCard;
