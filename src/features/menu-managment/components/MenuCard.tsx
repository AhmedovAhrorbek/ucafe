import React from "react";
import { Button, Switch, Image } from "antd";
import EditIcon from "../../../components/editIcon";
import DeleteIcon from "../../../components/deleteIcon";
import { FoodCardProps } from "../types";

const MenuCard: React.FC<FoodCardProps> = ({
  id,
  name,
  count,
  price,
  image,
  is_active,
  formatAmount,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between px-6 bg-white mb-3 py-4 mx-6 rounded-[6px]">
      <div className="w-[617px] flex items-center">
        {image && <Image src={image} alt="food img" width={60} height={60} />}
        <p className="ml-4">{name}</p>
      </div>
      <div className="w-[150px]">
        <p>{count} шт</p>
      </div>
      <div className="w-[150px]">
        <span>{formatAmount(price)} UZS</span>
      </div>
      <div className="w-[51px]">
        <Switch checked={is_active} />
      </div>
      <div className="w-[96px] flex items-center gap-1">
        <Button className="bg-blue-100" onClick={() => onUpdate(id)}>
          <EditIcon />
        </Button>
        <Button className="bg-red-100" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default MenuCard;
