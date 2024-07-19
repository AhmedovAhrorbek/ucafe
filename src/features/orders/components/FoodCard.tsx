import React from "react";
import { Checkbox, Button, Image } from "antd";

interface CardProps {
  imgSrc: string;
  foodName: string;
  count: number;
  price: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const FoodCard: React.FC<CardProps> = ({
  imgSrc,
  foodName,
  count,
  price,
  onIncrement,
  onDecrement,
}) => {

  

  return (
    <div className="bg-white flex items-center justify-between w-[931px] h-[89px] p-[15px] border border-solid border-#ECEDEE rounded-[8px] mt-[20px]">
      <div className="flex items-center gap-[15px]">
        <Checkbox checked={count > 0 ? true : false} />
        <Image
          width="60px"
          height="60px"
          src={imgSrc}
          alt={foodName}
          className="w-[50px] h-[50px] object-cover rounded-[4px]"
        />
        <div className="flex flex-col justify-center gap-[4px]">
          <div className="font-sfpro text-[16px] font-medium leading-[19.09px] text-left">
            {foodName}
          </div>
          <div className="font-sfpro text-[14px] font-medium leading-[16.71px] text-left text-gray-600">
              {price} сум
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[8px] rounded-full p-1 bg-[#ECEDEE]">
        <Button className="rounded-[50%] w-[24px]" onClick={onDecrement}>
          -
        </Button>
        <span className="font-sfpro text-[14px] font-medium leading-[16.71px] text-center">
          {count}
        </span>
        <Button className="rounded-[50%] w-[24px]" onClick={onIncrement}>
          +
        </Button>
      </div>
    </div>
  );
};

export default FoodCard;
