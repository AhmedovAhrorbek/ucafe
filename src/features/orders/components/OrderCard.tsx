import { forwardRef, useState, useEffect } from "react";
import { Tag, Drawer, Button, notification, Select, message } from "antd";
import clsx from "clsx";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Order, Item, UpdateOrderData } from "../types";
import WalkingIcon from "./walkingIcon";
import ChairIcon from "../../../components/chairIcon";
import BuildingIcon from "../../../components/buildingIcon";
import { CloseOutlined } from "@ant-design/icons";
import CartItemDrawer from "./CartItemDrawer"; // Import CartItem
import { getOrder, updateOrder } from "../api"; // Import the getOrder and updateOrder functions
import formatAmount from "../../../helpers/format-amount";

interface ItemProps extends Order {
  onOrderClick: (id: number) => void;
  provided: any;
  isDragging: boolean;
  order: Order;
}

const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { provided, order, isDragging } = props;
  const queryClient = useQueryClient();
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

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  // const [activeCart, setActiveCart] = useState<number>(1);
  const [payType, setPayType] = useState();
  const [orderType, setOrderType] = useState();
  

 

  // useQuery hook for fetching order data
  const { data: cartItems = [], refetch } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: false,
  });
  console.log(cartItems);
  useEffect(() => {
    if (cartItems) {
      setPayType(cartItems.pay_type || "cash");
      setOrderType(cartItems.order_type || "delivery");
    }
  }, [cartItems]);
  console.log(payType);
  console.log(orderType)
  // Mutation hook for updating the order
   const { mutate: mutateUpdateOrder } = useMutation({
     mutationFn: (updatedItems: UpdateOrderData) =>
       updateOrder(id, updatedItems),
     onSuccess: () => {
       queryClient.invalidateQueries("orders");
       refetch();
     },
     onError: () => {
       notification.error({ message: "Не удалось обновить заказ." });
     },
   });

   const showDrawer = () => {
     
       setIsDrawerVisible(true);
       refetch();
   };

   const closeDrawer = () => {
     setIsDrawerVisible(false);
   };

   const handleAddItem = (item: Item) => {
    if (item?.food?.count === 0) {
      return notification.error({ message: "Этого блюда нет в меню" });
    }
     const updatedItems = cartItems.items.map((existingItem: Item) =>
       existingItem.food.id === item.food.id
         ? { ...existingItem, quantity: existingItem.quantity + 1 }
         : existingItem
     );
    
     const updateData: UpdateOrderData = {
       items: updatedItems.map((item) => ({
         food_id: item.food.id, 
         quantity: item.quantity,
       })),
     };

     mutateUpdateOrder(updateData);
   };

   const handleRemoveItem = (itemId: number) => {
     const updatedItems = cartItems.items
       .map((item: Item) =>
         item.food.id === itemId
           ? { ...item, quantity: item.quantity - 1 }
           : item
       )
       .filter((item: Item) => item.quantity > 0); // Remove item if count is 0

     const updateData: UpdateOrderData = {
       items: updatedItems.map((item) => ({
         food_id: item.food.id, // Use food_id instead of id
         quantity: item.quantity,
       })),
     };

     mutateUpdateOrder(updateData);
   };

    const handleRemoveAllItems = (itemId: number) => {
      const updatedItems = cartItems.items.map((item: Item) =>
        item.food.id === itemId ? { ...item, quantity: 0 } : item
      );

      const updateData: UpdateOrderData = {
        items: updatedItems.map((item) => ({
          food_id: item.food.id,
          quantity: item.quantity,
        })),
      };

      mutateUpdateOrder(updateData);
      if(cartItems === 0){
        setIsDrawerVisible(false);
      }

    };

   const handlePayment = () => {
     const updateData: UpdateOrderData = {
       status_pay: "paid",
       order_type:orderType,
       pay_type: payType,
       items: cartItems.items.map((item) => ({
         food_id: item.food.id,
         quantity: item.quantity,
       })),
     };
     mutateUpdateOrder(updateData);
     setIsDrawerVisible(false)
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
            cartItems.items.map(
              (item) => (
                console.log(item),
                (
                  <div className="flex items-center justify-between mx-2 mb-3 h-[49px]  pb-1">
                    <div>
                      <CartItemDrawer
                        key={item?.id}
                        item={item}
                        handleRemoveItem={handleRemoveItem}
                        handleAddItem={handleAddItem}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-medium w-30">
                        {formatAmount(item?.food?.price * item?.quantity)} UZS
                      </span>

                      <button
                        type="button"
                        className="bg-transparent text-[#FF1F00] hover:text-red-400 transition active:text-red-500"
                        onClick={() => handleRemoveAllItems(item?.food?.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          <div className="w-full flex flex-col gap-3 mt-2  bg-[#F5F5F5] px-5 py-2 rounded-t-[12px] ">
            <div className="flex items-center justify-between">
              <p>Общее количество позиций</p>
              <p>{cartItems?.position} позиций </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Способ оплаты</p>
              <Select
                value={payType}
                style={{ width: 120 }}
                onChange={(value) => setPayType(value)}
              >
                <Select.Option value="cash">наличные</Select.Option>
                <Select.Option value="payme">payme</Select.Option>
                <Select.Option value="click">click</Select.Option>
                <Select.Option value="terminal">Терминал</Select.Option>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <p>Тип заказа</p>
              <Select
                value={orderType}
                style={{ width: 120 }}
                onChange={(value) => setOrderType(value)}
              >
                <Select.Option value="delivery">доставка</Select.Option>
                <Select.Option value="with">с собой</Select.Option>
                <Select.Option value="there">на месте</Select.Option>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <p>Тип оплаты</p>
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
            <div className="flex items-center justify-between">
              <p>Итоговая сумма</p>
              <span className="text-xl font-medium">
                {formatAmount(String(cartItems?.full_price))} UZS
              </span>
            </div>
          </div>
          <Button
            className="w-full mt-3"
            type="primary"
            size="large"
            onClick={handlePayment}
          >
            Оплатить
          </Button>
        </div>
      </Drawer>
    </>
  );
});

const OrderCard = Item;

export default OrderCard;
