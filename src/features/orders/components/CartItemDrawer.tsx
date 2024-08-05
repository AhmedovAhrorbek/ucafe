import React from "react";
import { Image } from "antd";

import { CartItemProps } from "../types";

const CartItemDrawer: React.FC<CartItemProps> = ({
  item,
  handleRemoveItem,
  handleAddItem,
}) => {
    console.log(item);
  return (
    <div className="flex items-center">
      <div className="mr-4 flex items-center justify-center">
        <Image
          width="48px"
          height="48px"
          src={item?.food?.image || "path/to/fallback/image.png"}
          alt={item?.food?.name}
          className="object-cover rounded-[4px] bg-black rounded-[8px]"
        />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <span className="text-sm font-medium font-sf-pro text-left">
          {item?.food?.name}
        </span>
        <div className="bg-[#ecedee] rounded-full w-20 p-1 flex items-center h-[24px]">
          <span
            className="bg-white rounded-full px-[7px] cursor-pointer"
            onClick={() => handleRemoveItem(item?.food?.id)}
            aria-hidden="true"
          >
            -
          </span>
          <span className="flex-1 text-center text-black">
            {item?.quantity}
          </span>
          <span
            className="bg-white rounded-full px-[5px] cursor-pointer"
            onClick={() =>handleAddItem(item)}
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemDrawer;
