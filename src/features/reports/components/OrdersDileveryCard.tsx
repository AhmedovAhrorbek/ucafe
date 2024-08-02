import React from "react";
import formatAmount from "../../../helpers/format-amount";
import { OrdersStatisticsType } from "../types";
import clsx from "clsx";
import CircleArrowDownIcon from "../../../components/circleArrowDownIcon";
import CircleArrowUpIcon from "../../../components/circleArrowUpIcon";
const OrdersDeliveryCard: React.FC<OrdersStatisticsType> = ({
  delivery_orders,
  delivery_percentage_change,
  delivery_title,
}) => {
  return (
    <div className="p-4  mt-6 bg-white w-[265px] rounded-[6px]">
      <h5 className="w-[199px] font-sf-pro-display text-[16px] font-medium leading-24 text-left mb-7">
        Общее количество заказов на доставку
      </h5>
      <div className="flex items-center gap-3">
        <span className="font-sf-pro-display text-[24px] font-medium leading-24 text-left mb-1">
          {formatAmount(delivery_orders)}
        </span>
        {delivery_percentage_change !== null ? (
          <span
            className={clsx(
              "bg-white",
              delivery_percentage_change && delivery_percentage_change > 0
                ? "text-green-500"
                : "text-red-500",
              "flex items-center gap-1 font-sf-pro-display text-[14px] font-medium text-left"
            )}
          >
            {delivery_percentage_change && delivery_percentage_change > 0 ? (
              <CircleArrowUpIcon />
            ) : (
              <CircleArrowDownIcon />
            )}
            {Math.round(delivery_percentage_change)}%
          </span>
        ) : (
          <span>- %</span>
        )}
      </div>
      <p className="font-sf-pro-display text-[14px] text-[#7D848B] font-medium leading-24 text-left">
        в сравнении с прошлой {delivery_title}
      </p>
    </div>
  );
};

export default OrdersDeliveryCard;
