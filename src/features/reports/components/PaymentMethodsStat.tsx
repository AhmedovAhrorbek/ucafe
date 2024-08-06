import { Pie } from "@ant-design/charts";
import { Typography } from "antd";
import formatAmount from "../../../helpers/format-amount";

const { Text } = Typography;

const PaymentMethodsStat = ({ data, title }) => {

    const colorMap = {
      terminal: "#c381eb",
      cash: "#5566FF",
      click: "#FF9159",
      payme: "#4BCFF9",
    };
     const translationMap = {
       click: "Click",
       cash: "Наличные",
       terminal: "Терминал",
       payme: "Payme",
     };

  const transformedData = data.map((item) => (
    { type: item.pay_type, value: item.total_amount,}
  ));

  const config = {
    appendPadding: 10,
    data: transformedData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.4,
    // color: (datum) => {
    //   const color = colorMap[datum.type] || "#000000";
    //   return color;
    // },
    legend: {
      position: "hidden",
    },
    
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Payment Methods",
      },
    },
  };

  return (
    <div className="bg-white w-full max-w-[688px] h-auto p-4 rounded-[6px]">
      <h2 className="font-sf-pro text-[18px] font-medium leading-[21px] text-left mb-4">
        Статистика по популярным способам оплаты за {title}
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-full lg:w-[300px] h-[300px]">
          <Pie {...config} />
        </div>
        <div className="flex flex-col gap-5 w-full lg:w-[348px]">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center w-[98px]">
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: colorMap[item.pay_type],
                    marginRight: 8,
                  }}
                />
                <Text className="font-sf-pro text-[16px] text-[#2F3138]">
                  {translationMap[item.pay_type] || item.pay_type}
                </Text>
              </div>
              <Text className="w-[40px] text-[16px]">
                {Math.round(item.percentage)}%
              </Text>
              <Text className="w-[150px] flex items-center justify-end text-[16px]">
                {formatAmount(item.total_amount)} UZS
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsStat;
