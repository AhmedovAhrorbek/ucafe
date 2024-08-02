import React from "react";
import { SoldItemsStatiticsType } from '../types';
import formatAmount from "../../../helpers/format-amount";
import CoffeeIcon from "../../../components/barIcon";
import EggsIcon from "../../../components/breakfastIcon";
import DishIcon from "../../../components/lunchIcon";
import ChocolateIcon from "../../../components/snackIcon";
import BrocoliIcon from "../../../components/ppIcon";
import CakeIcon from "../../../components/dessertIcon";
import { Tag } from "antd";
interface SoldItemsCardProps {
  data: SoldItemsStatiticsType;
}

const SoldItemsCard: React.FC<SoldItemsCardProps> = ({ data }) => {
  console.log(data)
  const renderIcon = (category: string) => {
    switch (category) {
      case "breakfast":
        return <EggsIcon style={{ color: "#5566FF" }} />;
      case "lunch":
        return <DishIcon style={{ color: "#5566FF" }} />;
      case "bar":
        return <CoffeeIcon style={{ color: "#5566FF" }} />;
      case "snack":
        return <ChocolateIcon style={{ color: "#5566FF" }} />;
      case "proper_nutrition":
        return <BrocoliIcon style={{ color: "#5566FF" }} />;
      case "dessert":
        return <CakeIcon style={{ color: "#5566FF" }} />;
      default:
        return null;
    }
  };
  return (
    <div>
      {data && data.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {data && data.map((item) => (
              <div className="flex items-center justify-between bg-white py-4 rounded-[6px] px-4">
                <p className="w-[130px] font-fs-pro-display text-[16px] font-medium leading-[19px] text-left">
                  {item?.name}
                </p>
                <Tag className="w-[150px] px-2 py-1 flex items-center  gap-2 bg-white font-fs-pro-display text-[14px] leading-[16px] text-left">
                  {renderIcon(item?.category)}
                  {item?.category}
                </Tag>
                <span className="w-[100px] font-fs-pro-display text-[14px] leading-[16px] text-left text-[#2F3138]">
                  {item?.total_quantity} шт
                </span>
                <span className="w-[100px] font-fs-pro-display text-[14px]  leading-[16px] text-left text-[#2F3138]">
                  {formatAmount(item?.price_per_unit)} UZS
                </span>
                <span className="w-[165px] font-fs-pro-display text-[14px] leading-[16px] text-left text-[#2F3138]">
                  {formatAmount(item?.total_sales)} UZS
                </span>
              </div>
            ))}
        </ul>
      ) : (
        <h2 className="flex items-center justify-center font-medium text-[20px]">Нет данных о проданных товарах</h2>
      )}
    </div>
  );
};

export default SoldItemsCard;
