import { forwardRef, memo } from "react";
import { Tag } from "antd";
import clsx from "clsx";
import moment from "moment";
import type { Order } from "../types";

interface ItemProps extends Order {
  onOrderClick: (id: number) => void;
  provided: any;
}

function Item(
  props: ItemProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const {
    provided,
    id,
    type,
    status_pay,
    delivery_status,
    created_at,
    is_new,
    order_type,
    onOrderClick,
  } = props;

  return (
    <div
      ref={(node) => {
        ref && (typeof ref === "function" ? ref(node) : (ref.current = node));
        provided.innerRef(node);
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={clsx(
        "bg-white m-4 p-4 rounded-lg flex flex-col gap-2 cursor-pointer hover:shadow",
        is_new ? "outline outline-1 outline-[#5566FF]" : ""
      )}
      onClick={() => {
        onOrderClick(id);
        if (is_new) {
          // Your logic here
        }
      }}
      aria-hidden
    >
      <div className="flex justify-between">
        <h4 className="text-base font-medium flex items-center gap-2">
          Заказ №{id}
          {is_new ? (
            <div className="w-1 h-1 bg-[#5566ff] rounded-full" />
          ) : null}
        </h4>
        <span className="text-gray-400">
          {moment(created_at).format("HH:MM")}
        </span>
      </div>

      <div className="flex justify-between">
        <Tag className="bg-white py-1 px-2 flex items-center gap-1">
          {order_type === "delivery"
            ? "доставка"
            : order_type === "there"
            ? "на месте"
            : order_type === "with"
            ? "с собой"
            : ""}
        </Tag>

        <div className="flex gap-2">
          {type === "shipping" ? (
            <Tag
              bordered={false}
              className={clsx(
                "py-1 px-2 mr-0",
                delivery_status === "delivered"
                  ? "bg-[#5566FF1A] text-[#5566FF]"
                  : "bg-[#F2994A1A] text-[#F2994A]"
              )}
            >
              {delivery_status ?? "took"}
            </Tag>
          ) : null}

          <Tag
            bordered={false}
            className={clsx(
              "py-1 px-2 mr-0",
              status_pay === "paid"
                ? "bg-[#2BC1281A] text-[#2BC128]"
                : "bg-[#FF1F001A] text-[#FF1F00]"
            )}
          >
            {status_pay === "paid" ? "оплачено" : "не оплачено"}
          </Tag>
        </div>
      </div>
    </div>
  );
}

const OrderCard = memo(forwardRef<HTMLDivElement, ItemProps>(Item));

export default OrderCard;
