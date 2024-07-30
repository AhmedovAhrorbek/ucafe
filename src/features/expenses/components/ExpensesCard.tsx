import React from "react";
import DeleteIcon from "../../../components/deleteIcon";
import EditIcon from '../../../components/editIcon';
import { Button } from "antd";
import moment from "moment";
import formatAmount from "../../../helpers/format-amount";
interface ExpensesCardProps {
  date: string;
  price: number;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpensesCard: React.FC<ExpensesCardProps> = ({
  date,
  price,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 mx-6 py-3 bg-white mb-3 rounded-[6px]">
      <p className="font-sf-pro text-[16px] text-[#2F3138]">
        {moment(date).format("D MMMM, YYYY")}
      </p>
      <span className="w-[150px] font-sf-pro text-[16px] text-[#2F3138]">
        {formatAmount(price)} UZS
      </span>
      <div>
        <p className="w-[367px] font-sf-pro text-[16px] text-[#2F3138]">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button className="bg-blue-100 border-none" onClick={onEdit}>
          <EditIcon />
        </Button>
        <Button className="bg-red-100 border-none" onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default ExpensesCard;
