import { forwardRef, useState } from "react";
import { Tag, Drawer, Button, notification } from "antd";
import clsx from "clsx";
import moment from "moment";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Order, Item, UpdateOrderData } from "../types";
import WalkingIcon from "./walkingIcon";
import ChairIcon from "../../../components/chairIcon";
import BuildingIcon from "../../../components/buildingIcon";
import { CloseOutlined } from "@ant-design/icons";
import CartItem from "./CartItem"; // Import CartItem
import { getOrder, updateOrder } from "../api"; // Import the getOrder and updateOrder functions

interface ItemProps extends Order {
  onOrderClick: (id: number) => void;
  provided: any;
  isDragging: boolean;
  order: Order;
}

const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { provided, order, isDragging } = props;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [activeCart, setActiveCart] = useState<number>(1);

  const {
    id,
    type,
    status,
    status_pay,
    delivery_status,
    created_at,
    is_new,
    order_type,
  } = order;

  // useQuery hook for fetching order data
  const { data: cartItems = [], refetch } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: false,
  });

  // Mutation hook for updating the order
  const { mutate: mutateUpdateOrder } = useMutation({
    mutationFn: (updatedItems: UpdateOrderData) =>
      updateOrder(id, updatedItems),
    onSuccess: () => {
      notification.success({ message: "Order updated successfully!" });
      refetch();
    },
    onError: () => {
      notification.error({ message: "Failed to update order." });
    },
  });

  const showDrawer = () => {
    setIsDrawerVisible(true);
    refetch();
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cartItems.items
      .map((item: Item) =>
        item.id === itemId ? { ...item, count: item.count - 1 } : item
      )
      .filter((item: Item) => item.count > 0); // Remove item if count is 0

    const updateData: UpdateOrderData = {
      items: updatedItems.map((item) => ({ id: item.id, count: item.count })),
    };

    mutateUpdateOrder(updateData);
  };

  const handleAddItem = (item: Item) => {
    const updatedItems = cartItems.items.map((existingItem: Item) =>
      existingItem.id === item.id
        ? { ...existingItem, count: existingItem.count + 1 }
        : existingItem
    );

    const updateData: UpdateOrderData = {
      items: updatedItems.map((item) => ({ id: item.id, count: item.count })),
    };

    mutateUpdateOrder(updateData);
  };

  return (
    <>
      <div
        ref={ref}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={clsx(
          "bg-white m-4 p-4 rounded-lg flex flex-col gap-2 cursor-pointer hover:shadow",
          is_new ? "outline outline-1 outline-[#5566FF]" : "",
          isDragging ? "bg-gray-100" : ""
        )}
        onClick={showDrawer}
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
            {moment(created_at).format("HH:mm")}
          </span>
        </div>

        <div className="flex justify-between">
          <Tag className="bg-white py-1 px-2 flex items-center gap-1">
            {order_type === "delivery" ? (
              <div className="flex items-center gap-1">
                <BuildingIcon /> кабинет
              </div>
            ) : order_type === "there" ? (
              <div className="flex items-center gap-1">
                <ChairIcon /> на месте
              </div>
            ) : order_type === "with" ? (
              <div className="flex items-center gap-1">
                <WalkingIcon /> с собой
              </div>
            ) : (
              ""
            )}
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

      <Drawer
        title={
          <>
            <div className="flex justify-between items-center w-full">
              <div>
                <div className="text-gray-500 font-sf-pro-display text-base font-normal leading-[16.71px] text-left">
                  Оформлен в {moment(created_at).format("HH:mm")} •{" "}
                  {status === "new"
                    ? "Новые"
                    : status === "processing"
                    ? "В процессе"
                    : "Готовые "}
                </div>
              </div>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={closeDrawer}
              />
            </div>
            <h4 className="font-sf-pro-display text-xl font-semibold leading-[28.64px] text-left">
              Заказ №{id}
            </h4>
          </>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
        closable={false}
      >
        <div className="flex flex-col gap-2">
          {cartItems &&
            cartItems.items &&
            cartItems.items.map((item) => (
              <CartItem
                key={item.id}
                item={item.food}
                handleRemoveItem={handleRemoveItem}
                handleAddItem={handleAddItem}
                activeCart={activeCart}
              />
            ))}
        </div>
      </Drawer>
    </>
  );
});

const OrderCard = Item;

export default OrderCard;
