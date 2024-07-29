import React from "react";
import formatAmount from "../../../helpers/format-amount";
import { SalesStatisticsType } from "../types";

const SalesCard: React.FC<SalesStatisticsType> = ({ total_sales }) => {
  return (
    <div className="p-4  mt-6 bg-white w-[265px] rounded-[6px]">
      <h5 className="w-[199px] font-sf-pro-display text-[16px] font-medium leading-24 text-left mb-7">
        Общее количество продаж
      </h5>
      <span className="font-sf-pro-display text-[24px] font-medium leading-24 text-left mb-1">
        {formatAmount(total_sales)}
      </span>
      <p className="font-sf-pro-display text-[14px] text-[#7D848B] font-medium leading-24 text-left">
        в сравнении с прошлой неделей
      </p>
    </div>
  );
};

export default SalesCard;
