// CartItem.tsx
import React from "react";
import { Image } from "antd";

interface Item {
  id: number;
  name: string;
  img?: string;
  count?: number;
  price: number;
}

interface CartItemProps {
  item: Item;
  handleRemoveItem: (cartId: number, itemId: number) => void;
  handleAddItem: (cartId: number, item: Item) => void;
  activeCart: number;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleRemoveItem,
  handleAddItem,
  activeCart,
}) => {
  return (
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
            onClick={() => handleRemoveItem(activeCart, item.id)}
            aria-hidden="true"
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
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
