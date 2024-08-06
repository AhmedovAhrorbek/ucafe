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
      <div className="flex flex-wrap items-center justify-between px-6 bg-white mb-3 py-4 mx-6 rounded-[6px]">
        <div className="w-full sm:w-[617px] flex items-center mb-2 sm:mb-0">
          {image && <Image src={image} alt="food img" width={60} height={60} />}
          <p className="ml-4">{name}</p>
        </div>
        <div className="w-1/2 sm:w-[150px] flex items-center justify-center mb-2 sm:mb-0">
          <p>{count} шт</p>
        </div>
        <div className="w-1/2 sm:w-[150px] flex items-center justify-center mb-2 sm:mb-0">
          <span>{formatAmount(price)} UZS</span>
        </div>
        <div className="w-1/2 sm:w-[51px]  flex items-center justify-center mb-2 sm:mb-0">
          <Switch checked={is_active} />
        </div>
        <div className="w-full sm:w-[96px] flex items-center gap-1 justify-end sm:justify-start">
          <Button
            className="bg-blue-100 border-none"
            onClick={() => onUpdate(id)}
          >
            <EditIcon />
          </Button>
          <Button
            className="bg-red-100 border-none"
            onClick={() => setdeleteModal(true)}
          >
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
        <div className="text-center p-3">
          <div className="mb-5" onClick={() => Modal.destroyAll()}>
            <DeleteIcon className="w-[32px]" />
          </div>
          <div>
            <p className="font-sf-pro text-[16px] text-[#2F3138] w-full sm:w-[343px] mx-auto mb-4">
              Вы уверены, что хотите удалить выбранное блюдо из меню?
            </p>
            <div className="flex flex-wrap items-center gap-5 justify-center">
              <Button
                className="bg-[#F5F5F5] border-none w-full sm:w-auto"
                onClick={() => setdeleteModal(false)}
              >
                Отмена
              </Button>
              <Button
                danger
                className="bg-red-100 text-red-500 border-none w-full sm:w-auto"
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
