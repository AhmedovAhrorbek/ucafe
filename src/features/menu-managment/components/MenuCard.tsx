import React from "react";
import { Button, Switch, Image, Modal} from "antd";
import EditIcon from "../../../components/editIcon";
import DeleteIcon from "../../../components/deleteIcon";
import { FoodCardProps } from "../types";
import { useState } from "react";

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
  const [deleteModal, setdeleteModal] = useState(false)
  return (
    <>
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
          <Button className="bg-blue-100 border-none" onClick={() => onUpdate(id)}>
            <EditIcon />
          </Button>
          <Button className="bg-red-100 border-none" onClick={() => setdeleteModal(true)}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <Modal
        title={
          <div className="font-sf-pro text-[24px] mb-7 text-[#2F3138]">
            Удалить блюдо
          </div>
        }
        open={deleteModal}
        onCancel={() => setdeleteModal(false)}
        footer={null}
      >
        <div className="text-center  p-3">
          <div className="mb-5" onClick={() => Modal.destroyAll()}>
            <DeleteIcon className="w-[32px]" />
          </div>
          <div>
            <p className="font-sf-pro text-[16px] text-[#2F3138] w-[343px] mx-auto mb-4">
              Вы уверены, что хотите удалить выбранное блюдо из меню?
            </p>
            <div className="flex items-center gap-5 justify-center">
              <Button
                className="bg-[#F5F5F5] border-none"
                onClick={() => setdeleteModal(false)}
              >
                Отмена
              </Button>
              <Button
                danger
                className="bg-red-100 text-red-500 border-none"
                onClick={() => onDelete(id)}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuCard;
