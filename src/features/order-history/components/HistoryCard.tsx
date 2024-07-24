import React from "react";
import moment from "moment";
import "moment/locale/ru"; 
import { Tag } from "antd";
import BuildingIcon from "../../../components/buildingIcon";
import ChairIcon from '../../../components/chairIcon';
import WalkingIcon from "../../orders/components/walkingIcon";
import { HistoryCardProps } from "../types";
import formatAmount from '../../../helpers/format-amount';
import clsx from "clsx";
import DishIcon from "../../../components/dishIcon";
moment.updateLocale("ru", {
  months:
    "январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь".split(
      " "
    ),
  monthsShort: "янв фев мар апр май июн июл авг сен окт ноя дек".split(" "),
  weekdays:
    "воскресенье понедельник вторник среда четверг пятница суббота".split(" "),
  weekdaysShort: "вс пн вт ср чт пт сб".split(" "),
  weekdaysMin: "Вс Пн Вт Ср Чт Пт Сб".split(" "),
});



const HistoryCard: React.FC<HistoryCardProps> = ({ data }) => {
   
  const {
    created_at,
    full_price,
    id,
    order_type,
    pay_type,
    status_pay,
    position,
  } = data;
  console.log(data);
  return (
    <div className="border text-[16px] text-[#2F3138] px-6 rounded-[6px] py-[15px]  flex items-center bg-white mb-2 justify-between ">
      <h4 className="font-sf-pro font-semibold leading-19.09 text-left text-[16px]">
        Заказ №{id}
      </h4>
      <span className="text-[14px] ">
        {moment(created_at).locale("ru").format("D MMMM, YYYY | HH:mm")}
      </span>
      <Tag className="bg-white py-1 px-2 flex items-center gap-1 ">
        <DishIcon /> {position} позиций
      </Tag>
      <Tag className="bg-white py-1 px-2 flex items-center gap-1 ">
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
      <p className="text-[14px]">
        {pay_type === "cash"
          ? "Наличными"
          : pay_type === "terminal"
          ? "Терминал"
          : pay_type === "click"
          ? "Click"
          : pay_type === "payme"
          ? "payme"
          : "-"}
      </p>
      <span>{formatAmount(Number(full_price))} UZS</span>
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
  );
};

export default HistoryCard;
