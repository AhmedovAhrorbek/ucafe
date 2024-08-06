import { Pie } from "@ant-design/charts";
import { Typography } from "antd";
import formatAmount from "../../../helpers/format-amount";

const { Text } = Typography;

const CategoryStatistics = ({ data, title }) => {
  const colorMap = {
    breakfast: "#5566FF",
    lunch: " #4BCFF9",
    snack: "#FF9159",
    bar: "#c381eb",
    dessert: "#9747FF",
    proper_nutrition: "#2BC128",
  };
  
  const translationMap = {
    breakfast: "Завтраки",
    lunch: "Обеды",
    snack: "Перекусы",
    bar: "Бар",
    dessert: "Десерты",
    proper_nutrition: "ПП",
  };
  const transformedData = data.map((item) => ({
    type: item.category,
    value: Number(item.count),
  }));

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
    // label: {
    //   text: "value",
    //   style: {
    //     fontWeight: "bold",
    //   },
    // },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Category",
      },
    },
  };

  return (
    <div className="bg-white w-full max-w-[688px] h-auto p-4 rounded-[6px]">
      <h2 className="font-sf-pro text-[18px] font-medium leading-[21px] text-left mb-4">
        Статистика по популярным категориям товаров за {title}
      </h2>
      <div className="flex flex-col md:flex-row items-start md:items-center w-full">
        <div className="w-full md:w-[300px] h-[300px] mb-4 md:mb-0">
          <Pie {...config} />
        </div>
        <div className="flex flex-col gap-3 w-full md:w-[348px]">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center w-[150px]">
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: colorMap[item.category],
                    marginRight: 8,
                  }}
                />
                <Text className="font-sf-pro text-[16px] text-[#2F3138]">
                  {translationMap[item.category] || item.category}
                </Text>
              </div>
              <Text className="w-[50px] text-[16px] text-center">
                {Math.round(item.percentage_quantity)}%
              </Text>
              <Text className="w-[50px] text-[16px] text-center">
                {item.count}шт
              </Text>
              <Text className="w-[140px] text-[16px] text-right">
                {formatAmount(item.total_amount)} UZS
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryStatistics;
