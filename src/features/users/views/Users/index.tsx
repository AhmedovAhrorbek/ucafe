import { useState } from "react";
import { Button, Modal, Form, Input, Select, Switch, Row, Col } from "antd";
import AddCircle from "../../../orders/assets/add-circle.png";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "../../api";
import UserListCard from "../../components/UserListCard";
// import { UserType } from "../../types";
import Pagination from "../../../../components/Pagination";

const Users = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setIsModalVisible(false);
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  const { data } = useQuery({
    queryKey: ["users", { page: currentPage, pageSize }],
    queryFn: () => getUsers({ page: currentPage, pageSize }),
    keepPreviousData: true,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white">
        <h2 className="text-xl sm:text-2xl font-semibold leading-[28.64px] text-left">
          Управление сотрудниками
        </h2>
        <Button
          type="primary"
          className="text-sm sm:text-[14px] font-medium leading-[16.71px] text-left py-2 sm:py-[10px] ml-0 sm:ml-2 mt-2 sm:mt-0"
          onClick={showModal}
        >
          <img src={AddCircle} alt="add icon" width={20} height={20} />
          Новый сотрудник
        </Button>
      </div>
      <div className="mt-5">
        {data && data?.results && data?.results.map((user) => (
          <UserListCard
            key={user?.id}
            id={user?.id}
            username={user?.username}
            full_name={user?.full_name}
            user_type={user?.user_type}
            is_active={user?.is_active}
            phone_number={user?.phone_number}
            salary={user?.salary}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={data?.count || 0}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
      <Modal
        title="Добавить сотрудника"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={739}
      >
        <Form name="create_user" onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Имя пользователя"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="full_name"
                label="Полное имя"
                rules={[
                  { required: true, message: "Please input the full name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="user_type"
                label="Тип"
                rules={[{ required: true, message: "Please select the type!" }]}
              >
                <Select>
                  <Select.Option value="Manager">Менеджер</Select.Option>
                  <Select.Option value="Cook">Шеф-повар</Select.Option>
                  <Select.Option value="Seller">Продавец</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Пароль"
                rules={[
                  { required: true, message: "Please input the password!" },
                  {
                    min: 8,
                    message: "Пароль должен быть не менее 8 символов!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Номер телефона"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="+998 __ ___ __ __" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Зарплата"
                rules={[
                  { required: true, message: "Please input your salary!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="is_active" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12} className="flex items-center justify-end">
              <Form.Item>
                <Button
                  className="w-[188px] px-1"
                  type="primary"
                  htmlType="submit"
                >
                  Добавить сотрудника
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
