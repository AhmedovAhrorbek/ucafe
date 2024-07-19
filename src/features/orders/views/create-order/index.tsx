import React, { useEffect, useState, useReducer } from "react";
import { Button, List,Image,Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import arrowLeftIcon from "../../assets/arrow-left-02-round.png";
import { produce } from "immer";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../../utils/query-client";
import { getFoods, createOrder } from "../../api";
import FoodCard from "../../components/FoodCard";
import CoffeeIcon from "../../components/barIcon";
import EggsIcon from "../../components/breakfastIcon";
import DishIcon from "../../components/lunchIcon";
import ChocolateIcon from "../../components/snackIcon";
import BrocoliIcon from "../../components/ppIcon";
import CakeIcon from "../../components/dessertIcon";
import type { Food } from "../../types";
import { PlusOutlined } from '@ant-design/icons';
import formatAmount from '../../../../helpers/format-amount';
interface CartItem {
  id: number;
  name: string;
  count: number;
  price?: number;
  img?: string;
}

interface Cart {
  items: CartItem[];
}

const categories = [
  { label: "Завтраки", value: "breakfast", icon: <EggsIcon /> },
  { label: "Обеды", value: "lunch", icon: <DishIcon /> },
  { label: "Бар", value: "bar", icon: <CoffeeIcon /> },
  { label: "Перекусы", value: "snack", icon: <ChocolateIcon /> },
  { label: "ПП", value: "proper nutrition", icon: <BrocoliIcon /> },
  { label: "Десерты", value: "dessert", icon: <CakeIcon /> },
];

const cartReducer = (
  state: Cart[],
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, { items: [] }];
    case "REMOVE_CART":
      return state.filter((_, i) => i !== action.payload);
    case "ADD_ITEM": {
      const { cartIndex, item } = action.payload;
      return produce(state, (draft) => {
        const existingItem = draft[cartIndex].items.find(
          (i) => i.id === item.id
        );
        if (existingItem) {
          existingItem.count += 1;
        } else {
          draft[cartIndex].items.push({ ...item, count: 1 });
        }
      });
    }
    case "REMOVE_ITEM": {
      const { cartIndex, itemId } = action.payload;
      return produce(state, (draft) => {
        const existingItem = draft[cartIndex].items.find(
          (i) => i.id === itemId
        );
        if (existingItem && existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          draft[cartIndex].items = draft[cartIndex].items.filter(
            (i) => i.id !== itemId
          );
        }
      });
    }
    case "REMOVE_ALL_ITEMS": {
      const { cartIndex } = action.payload;
      return produce(state, (draft) => {
        draft[cartIndex].items = [];
      });
    }
    default:
      return state;
  }
};

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].value
  );
  const [foods, setFoods] = useState<Food[]>([]);
  const [carts, dispatch] = useReducer(cartReducer, [{ items: [] }]); // Initialize with one cart
  const [activeCart, setActiveCart] = useState<number>(0); // Set the first cart as active by default
    const [payType, setPayType] = useState<string>("cash");
    const [orderType, setOrderType] = useState<string>("delivery");
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const foodsData = await getFoods();
      setFoods(foodsData.results);
    } catch (error) {
      console.error("Error fetching foods:", error);
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
    onError: (error: string) => {
      message.error(`Order qo'shishda muammo bor.${error}`);
    },
  });

  const handleAddButton = () => {
    dispatch({ type: "ADD_CART" });
    setActiveCart(carts.length); // Set the new cart as active
  };

  const handleRemoveCart = (index: number) => {
    dispatch({ type: "REMOVE_CART", payload: index });
    if (activeCart === index) {
      setActiveCart(carts.length > 1 ? 0 : null); // Deselect or set the first cart as active if there's one left
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

    const handlePayment = async () => {
       orderCreation.mutate({
        pay_type: payType,
        status: "new",
        order_type: orderType,
        items: carts[activeCart].items.map((item) => ({
          food_id: item.id,
          quantity: item.count,
        })),
        status_pay: "paid",
      })
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
            <div className="container flex items-center p-4 pt-0 pb-0">
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
                  imgSrc={food.photos[0]?.image}
                  foodName={food.name}
                  count={count}
                  price={food.price}
                  onIncrement={() =>
                    handleAddItem(cartIndex, {
                      id: food.id,
                      name: food.name,
                      count: 1,
                      price: food.price,
                      img: food?.photos[0].image,
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
        {activeCart !== null && (
          <div className="mb-4">
            <div className="flex justify-between items-center border border-gray-200 py-2.5 px-4">
              <h2 className="text-lg font-bold">Заказ №{activeCart + 1}</h2>
            </div>
            <List
              dataSource={carts[activeCart].items}
              bordered={false}
              renderItem={(item) => (
                console.log(item),
                (
                  <List.Item className="flex items-center justify-between mx-10 mb-3 h-[49px] mt-5 mb-5 pb-1">
                    <div className="flex items-center">
                      <div className="mr-4 flex items-center justify-center">
                        <Image
                          width="48px"
                          height="48px"
                          src={item?.img || "path/to/fallback/image.png"}
                          alt={item.name}
                          className="object-cover rounded-[4px] bg-black rounded-[8px]"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-sm font-medium font-sf-pro text-left">
                          {item.name}
                        </span>
                        <div className="bg-[#ecedee] rounded-full w-20 p-1 flex items-center h-[24px]">
                          <span
                            className="bg-white rounded-full px-[7px] cursor-pointer"
                            onClick={() =>
                              handleRemoveItem(activeCart, item.id)
                            }
                            aria-hidden
                          >
                            -
                          </span>
                          <span className="flex-1 text-center text-black">
                            {item?.count ?? 0}
                          </span>
                          <span
                            className="bg-white rounded-full px-[5px] cursor-pointer"
                            onClick={() =>
                              handleAddItem(activeCart, {
                                id: item.id,
                                name: item.name,
                                count: 1,
                                price: item.price,
                              })
                            }
                            aria-hidden
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-medium w-24">
                        {formatAmount(item?.price * item?.count)} UZS
                      </span>

                      <button
                        type="button"
                        className="bg-transparent text-[#FF1F00] hover:text-red-400 transition active:text-red-500"
                        onClick={() =>
                          handleRemoveAllItems(activeCart, item.id)
                        }
                      >
                        Удалить
                      </button>
                    </div>
                  </List.Item>
                )
              )}
            />

            <div className="w-full flex flex-col gap-2 mt-2  bg-[#F5F5F5] px-12 py-2 rounded-t-[12px] ">
              <div className="flex items-center justify-between">
                <p>Тип заказа</p>
                <Select
                  defaultValue="cash"
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
                <p>Способ оплаты</p>
                <Select
                  defaultValue="delivery"
                  style={{ width: 120 }}
                  onChange={(value) => setOrderType(value)}
                >
                  <Select.Option value="delivery">доставка</Select.Option>
                  <Select.Option value="with">с собой</Select.Option>
                  <Select.Option value="there">туда</Select.Option>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <p>Итоговая сумма</p>
                <span className="text-xl font-medium">
                  {carts[activeCart].items.reduce(
                    (total, item) => total + item.price * item.count,
                    0
                  )}{" "}
                  UZS
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
        )}
      </div>
    </div>
  );
};

export default CreateOrder;