import { Button } from "antd";
import CheckboxG from '../../assets/Checkbox-green.png'
import CheckboxR from '../../assets/Checkbox-red.png'
import AddCircle from '../../assets/add-circle.png'
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white px-[24px] py-[15px]">
      <div className="flex items-center justify-between">
        <h1 className="font-sf-pro-display text-[24px] font-semibold leading-[28.64px] text-left">
          Все заказы
        </h1>
        <div className="flex items-center justify-between w-[608px]">
          <p className="font-sf-pro-display text-[16px] font-normal leading-[19.09px] text-left">
            Отображать заказы:
          </p>
          <p className="flex items-center gap-[10px] font-sf-pro-display text-[16px] font-normal leading-[19.09px] text-left">
            <img src={CheckboxG} alt="sign" width={24} height={24} />
            оплаченные
          </p>
          <p className=" flex items-center gap-[10px] font-sf-pro-display text-[16px] font-normal leading-[19.09px] text-left">
            <img src={CheckboxR} alt="sign" width={24} height={24} />
            не оплаченные
          </p>
          <Button
            type="primary"
            className="font-sf-pro-display text-[14px] font-medium leading-[16.71px] text-left py-[10px] ml-2"
            onClick={() => {
              navigate("create-order");
            }}
          >
            <img src={AddCircle} alt="add icon" width={20} height={20} />
            Создать заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Orders
