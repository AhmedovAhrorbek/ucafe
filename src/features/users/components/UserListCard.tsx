import React from "react";
import { UserType } from "../types";
import { Switch, Button } from "antd";

const UserListCard: React.FC<UserType> = ({
  // id,
  username,
  full_name,
  type,
  is_active,
}) => {
  return (
    <div className="p-4 border rounded-[8px] flex items-center justify-between mx-4 bg-white mb-2">
      <h2 className="w-[150px] font-sf-pro-display text-[16px] text-[#2F3138] font-semibold leading-[19.09px]  mb-2">
        {full_name}
      </h2>
      <p className="w-[180px] font-sf-pro-display text-[14px] font-normal text-[#2F3138] leading-[19.09px]">
        {username}
      </p>
      <p className="w-[180px] font-sf-pro-display text-[14px] font-normal text-[#2F3138] leading-[19.09px]">
        {type}
      </p>
      <div className="w-[51px]">
        <Switch checked={is_active} disabled />
      </div>
      <Button>Посмотреть</Button>
    </div>
  );
};

export default UserListCard;
