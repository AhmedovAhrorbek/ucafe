import React, { useEffect, useState, useReducer } from "react";
import { Button, List, Select, message, InputNumber, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import arrowLeftIcon from "../../assets/arrow-left-02-round.png";
// import { produce } from "immer";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../../utils/query-client";
import { getFoods, createOrder } from "../../api";
import FoodCard from "../../components/FoodCard";
import CoffeeIcon from "../../../../components/barIcon";
import EggsIcon from "../../../../components/breakfastIcon";
import DishIcon from "../../../../components/lunchIcon";
import ChocolateIcon from "../../../../components/snackIcon";
import BrocoliIcon from "../../../../components/ppIcon";
import CakeIcon from "../../../../components/dessertIcon";
import type { Food } from "../../types";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import formatAmount from '../../../../helpers/format-amount';
import CartItem from "../../components/CartItem";
import { cartReducer } from "./store";

interface CartItem {
  id: number;
  name: string;
  count: number;
  price?: number;
  image?: string;
}


const categories = [
  { label: "Завтраки", value: "breakfast", icon: <EggsIcon /> },
  { label: "Обеды", value: "lunch", icon: <DishIcon /> },
  { label: "Бар", value: "bar", icon: <CoffeeIcon /> },
  { label: "Перекусы", value: "snack", icon: <ChocolateIcon /> },
  { label: "ПП", value: "proper_nutrition", icon: <BrocoliIcon /> },
  { label: "Десерты", value: "dessert", icon: <CakeIcon /> },
];


const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].value
  );
  const [foods, setFoods] = useState<Food[]>([]);
  const [carts, dispatch] = useReducer(cartReducer, [{ items: [] }]); 
  const [activeCart, setActiveCart] = useState<number>(0); 
    const [payType, setPayType] = useState<string>("cash");
    const [orderType, setOrderType] = useState<string>("delivery");
    const [payStatusType, setPayStatusType] = useState<string>("paid")
    const [mixedPayment, setMixedPayment] = useState(false);
    const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const foodsData = await getFoods();
      setFoods(foodsData);
    } catch (error) {
      // console.error("Error fetching foods:", error);
    }
  };
  const orderCreation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries(["orders"]);
      message.success("Заказ успешно создан");

      // Remove the active cart from the list
      dispatch({ type: "REMOVE_CART", payload: activeCart });

      if (carts.length > 1) {
        setActiveCart(0);
      } else {
        setActiveCart(null);
        navigate("/orders");
      }
    },
    onError: (error) => {
      console.log(error)
      message.error(` ${error?.data?.message}`);
    },
  });

  const handleAddButton = () => {
    dispatch({ type: "ADD_CART" });
    setActiveCart(carts.length); // Set the new cart as active
  };
 const handleRemoveCart = (index: number) => {
   // Only proceed if the index is valid and within bounds
   if (index >= 0 && index < carts.length) {
     dispatch({ type: "REMOVE_CART", payload: index });
     if (activeCart === index) {
       // If the removed cart was active, set the new active cart or null if no carts are left
       setActiveCart(carts.length > 1 ? 0 : null);
     }
   }
 };

  const handleAddItem = (cartIndex: number, item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: { cartIndex, item } });
  };

  const handleRemoveItem = (cartIndex: number, itemId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { cartIndex, itemId } });
  };
  const handleRemoveAllItems = (cartIndex: number) => {
    dispatch({
      type: "REMOVE_ALL_ITEMS",
      payload: {
        cartIndex,
      },
    });
  };

  const filteredFoods = foods.filter(
    (food) => food.category === selectedCategory
  );
    
  const handleRemovePayment = (index) => {
    const updatedPayments = payments.filter((_, i) => i !== index);
    setPayments(updatedPayments);
  };

   const handleMixedPayment = () => {
    setMixedPayment(true);
     setPayments([...payments, { type: "", amount: 0 }]);
   };

  const handlePaymentChange = (index: number, field: string, value: any) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

 const handleCheckAndSubmit = () => {
   const totalSum = carts[activeCart]?.items.reduce(
     (total, item) => total + item.price * item.count,
     0
   );
   const totalPayments = payments.reduce(
     (total, payment) => total + payment.amount,
     0
   );

   if (totalPayments === totalSum) {
     // Agar to'lovlar yig'indisi mahsulotlar narxlarining yig'indisiga teng bo'lsa
     handlePayment();
   } else if (totalPayments > totalSum) {
     // Agar to'lovlar yig'indisi mahsulotlar narxlaridan ortiqcha bo'lsa
     message.error("Siz ortiqcha summa kirityapsiz!");
   } else {
     // Agar to'lovlar yig'indisi mahsulotlar narxlaridan kam bo'lsa
     Modal.confirm({
       title: "Diqqat!",
       content: "Siz chetdan narsa olmoqchimisiz?",
       onOk: handlePayment,
     });
   }
 };

    const handlePayment = async () => {
      orderCreation.mutate({
        payments: payments.map((payment) => ({
          pay_type: payment.type,
          price: payment.amount,
        })),
        status: "new",
        order_type: orderType,
        items: carts[activeCart].items.map((item) => ({
          food_id: item.id,
          quantity: item.count,
        })),
        status_pay: payStatusType,
        discount: 0,
      });
    };

  return (
    <div className="flex items-start">
      <div className="p-4 pt-0 pl-0 flex justify-between items-start w-[979px] bg-white">
        <div className="w-2/3">
          <div className="flex items-center bg-[#F5F5F5] w-[979px] pl-4">
            <img
              src={arrowLeftIcon}
              alt="arrow-left"
              className="cursor-pointer"
              width={32}
              height={32}
              aria-hidden="true"
              onClick={() => {
                navigate("/orders");
              }}
            />
            <div className="container flex flex-wrap items-center p-4 pt-0 pb-0">
              {carts.map((cart, index) => (
                <div
                  key={index}
                  className={`flex items-center py-6 pl-2 border-r border-gray-200 font-manrope font-semibold text-base leading-[22px] text-left ${
                    activeCart === index ? "bg-white" : ""
                  }`}
                  style={{ height: "20px", cursor: "pointer" }}
                  onClick={() => setActiveCart(index)} // Set active cart on click
                >
                  <div className="pb-2">
                    Корзина <span className="ml-0">№{index + 1}</span>
                  </div>
                  <Button
                    className="text-black"
                    type="link"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the cart selection
                      handleRemoveCart(index);
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
              <Button
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "blue",
                  color: "white",
                  padding: "0px 16px",
                  borderRadius: 0,
                }}
                onClick={handleAddButton}
              >
                <PlusOutlined />
              </Button>
            </div>
          </div>
          <div className="flex gap-12 w-[931px] mt-5 p-2 pt-0">
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(item.value)}
                className={`w-[141.83px]  px-[16px] py-[8px] font-sf-pro rounded-[5px] flex items-center justify-center gap-3 border border-[#7D858B] cursor-pointer text-lg font-medium leading-[19.09px] text-left hover:text-[#5566FF] hover:border-[#5566FF] ${
                  selectedCategory === item.value
                    ? "bg-gray-100 text-[#5566FF] "
                    : ""
                }`}
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-4 p-4 pt-0">
            {filteredFoods.map((food, index) => {
              const cartIndex = activeCart !== null ? activeCart : 0;
              const existingItem = carts[cartIndex]?.items.find(
                (item) => item.id === food.id
              );
              const count = existingItem ? existingItem.count : 0;

              return (
                <FoodCard
                  key={index}
                  imgSrc={food?.image}
                  foodName={food.name}
                  count={count}
                  price={food.price}
                  onIncrement={() =>
                    handleAddItem(cartIndex, {
                      id: food.id,
                      name: food.name,
                      count: 1,
                      price: food.price,
                      image: food?.image,
                    })
                  }
                  onDecrement={() => handleRemoveItem(cartIndex, food.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full border-l border-gray-200 bg-white">
        {carts.length > 0 && activeCart !== null && (
          <div className="mb-4">
            <div className="flex justify-between items-center border border-gray-200 py-2.5 px-4">
              <h2 className="text-lg font-bold">Заказ №{activeCart + 1}</h2>
            </div>
            <List
              dataSource={carts[activeCart]?.items}
              bordered={false}
              renderItem={(item) => (
                // console.log(item),
                <List.Item className="flex items-center justify-between mx-10 mb-3 h-[49px] mt-5 mb-5 pb-1">
                  <div className="flex items-center">
                    <CartItem
                      key={item.id}
                      item={item}
                      handleRemoveItem={handleRemoveItem}
                      handleAddItem={handleAddItem}
                      activeCart={activeCart}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium w-30">
                      {formatAmount(item?.price * item?.count)} UZS
                    </span>

                    <button
                      type="button"
                      className="bg-transparent text-[#FF1F00] hover:text-red-400 transition active:text-red-500"
                      onClick={() => handleRemoveAllItems(activeCart, item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </List.Item>
              )}
            />

            <div className="w-full flex flex-col gap-2 mt-2  bg-[#F5F5F5] px-12 py-2 rounded-t-[12px] ">
              <div className="flex items-center justify-between">
                <p> Способ оплаты</p>
                <div>
                  {!mixedPayment ? (
                    <Select
                      defaultValue="cash"
                      style={{ width: 120 }}
                      onChange={(value) => setPayType(value)}
                    >
                      <Select.Option value="cash">Наличные</Select.Option>
                      <Select.Option value="payme">Payme</Select.Option>
                      <Select.Option value="click">Click</Select.Option>
                      <Select.Option value="terminal">Терминал</Select.Option>
                    </Select>
                  ) : (
                    payments.map((payment, index) => (
                      <div key={index} className="mb-2">
                        <Select
                          style={{ width: 120, marginRight: 8 }}
                          value={payment.type}
                          onChange={(value) =>
                            handlePaymentChange(index, "type", value)
                          }
                        >
                          <Select.Option value="cash">Наличные</Select.Option>
                          <Select.Option value="payme">Payme</Select.Option>
                          <Select.Option value="click">Click</Select.Option>
                          <Select.Option value="terminal">
                            Терминал
                          </Select.Option>
                        </Select>
                        <InputNumber
                          min={0}
                          value={payment.amount}
                          onChange={(value) =>
                            handlePaymentChange(index, "amount", value)
                          }
                        />
                        <MinusCircleOutlined
                          onClick={() => handleRemovePayment(index)}
                          style={{ color: "red", marginTop: 5 }}
                        />
                      </div>
                    ))
                  )}
                  <Button onClick={handleMixedPayment}>Смешанная оплата</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>Тип заказа</p>
                <Select
                  defaultValue="delivery"
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
                <Select
                  defaultValue="paid"
                  style={{ width: 120 }}
                  onChange={(value) => setPayStatusType(value)}
                >
                  <Select.Option value="paid">оплаченный</Select.Option>
                  <Select.Option value="unpaid">неоплаченный</Select.Option>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <p>Итоговая сумма</p>
                <span className="text-xl font-medium">
                  {carts[activeCart]?.items.reduce(
                    (total, item) => total + item.price * item.count,
                    0
                  )}{" "}
                  UZS
                </span>
              </div>
            </div>
            <Button
              className="w-full mt-3 flex items-center gapr-2"
              type="primary"
              size="large"
              onClick={handleCheckAndSubmit}
            >
              Создавать
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
