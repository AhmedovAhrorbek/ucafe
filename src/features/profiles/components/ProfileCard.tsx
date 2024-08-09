import React from "react";
import { Card, Avatar, Descriptions, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface User {
  username: string;
  full_name?: string;
  phone_number?: string;
  salary?: string;
  user_type: "Admin" | "Manager" | "Cook" | "Saller";
  date_joined: string;
}

interface ProfileCardProps {
  user: User;
  onUpdate: () => void;
  onChangePassword: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onUpdate,
  onChangePassword,
}) => {
  return (
    <Card className="w-full max-w-xl p-4 shadow-md mx-auto">
      <div className="flex justify-center mb-4">
        <Avatar size={100} icon={<UserOutlined />} />
      </div>
      <Descriptions
        title={
          <div className="text-center sm:text-left">
            {user.user_type === "Admin"
              ? "Профиль администратора"
              : user.user_type === "Manager"
              ? "Профиль менеджера"
              : user.user_type === "Cook"
              ? "Профиль шеф-повара"
              : "Профиль продавца"}
          </div>
        }
        bordered
        column={1}
        className="text-sm sm:text-base"
      >
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
        <Descriptions.Item label="Редактировать">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <Button
              type="primary"
              onClick={onUpdate}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Обновить
            </Button>
            <Button
              type="primary"
              onClick={onChangePassword}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Изменить пароль
            </Button>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProfileCard;
