import React from "react";
import formatAmount from '../../../helpers/format-amount';
import { IncomeStatisticsType } from "../types";
import CircleArrowDownIcon from "../../../components/circleArrowDownIcon";
import CircleArrowUpIcon from "../../../components/circleArrowUpIcon";
import clsx from "clsx";
const IncomeCard: React.FC<IncomeStatisticsType> = ({ total_income ,percentage_change , title}) => {
  // console.log(total_income);
  return (
    <div className="p-4 mt-6 bg-white w-[265px] rounded-[6px]">
      <h5 className="w-[199px] font-sf-pro-display text-[16px] font-medium leading-24 text-left mb-7">
        Общая сумма доходов (UZS)
      </h5>
      <div className="flex items-center gap-3">
        <span className="font-sf-pro-display text-[24px] font-medium leading-24 text-left mb-1">
          {formatAmount(total_income)}
        </span>
        {percentage_change !== null ? (
          <span
            className={clsx(
              "bg-white",
              percentage_change && percentage_change > 0
                ? "text-green-500"
                : "text-red-500",
              "flex items-center gap-1 font-sf-pro-display text-[14px] font-medium text-left"
            )}
          >
            {percentage_change && percentage_change > 0 ? (
              <CircleArrowUpIcon />
            ) : (
              <CircleArrowDownIcon />
            )}
            {Math.round(percentage_change)}%
          </span>
        ) : (
          <span>- %</span>
        )}
      </div>
      <p className="font-sf-pro-display text-[14px] text-[#7D848B] font-medium leading-24 text-left">
        в сравнении с прошлой {title}
      </p>
    </div>
  );
};

export default IncomeCard;
