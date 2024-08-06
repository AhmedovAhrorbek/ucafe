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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mx-6 py-3 bg-white mb-3 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <p className="font-sf-pro text-base text-[#2F3138] mr-[100px] mb-2 sm:mb-0">
          {moment(date).format("D MMMM, YYYY")}
        </p>
        <span className="font-sf-pro text-base text-[#2F3138] mr-[100px] mb-2 sm:mb-0">
          {formatAmount(price)} UZS
        </span>
        <div className="flex-grow mb-2 sm:mb-0">
          <p className="font-sf-pro text-base text-[#2F3138] mr-[50px] break-words">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
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
