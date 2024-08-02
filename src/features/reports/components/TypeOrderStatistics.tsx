import React from "react";
import ReactApexChart from "react-apexcharts";

interface OrderData {
  takeout: number;
  delivery: number;
}

interface ChartData {
  [day: string]: OrderData;
}

interface TypeOrderStatisticsProps {
  data: ChartData;
}

const TypeOrderStatistics: React.FC<TypeOrderStatisticsProps> = ({ data }) => {
   const days = [
     "monday",
     "tuesday",
     "wednesday",
     "thursday",
     "friday",
     "saturday",
     "sunday",
   ];

  const series = [
    {
      name: "с собой",
      data: days.map((day) => data[day]?.takeout || 0),
    },
    {
      name: "доставка",
      data: days.map((day) => data[day]?.delivery || 0),
    },
  ];

  const options = {
    chart: {
      type: "bar" as const,
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded" as const,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: days,
    },
    yaxis: {
      title: {
        text: "Количество заказов",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          return val.toString();
        },
      },
    },
    colors: ["#5566FF", "#FF9159"],
  };

  return (
    <div className="card mt-5 bg-white p-6 rounded-[6px]">
      <div className="flex px-12 items-center justify-between">
        <h3 className="font-fs-pro-display text-[18px] font-medium leading-[21px] text-left">
          График продаж по типам заказов
        </h3>
        <div className="flex items-center justify-between w-[200px]">
          <p className="flex items-center gap-1 font-fs-pro-display text-[16px]  text-left">
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#5566FF",
                marginRight: 8,
              }}
            />
            с собой
          </p>
          <p className="flex items-center gap-1 font-fs-pro-display text-[16px]  text-left">
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FF9159",
                marginRight: 8,
              }}
            />
            доставка
          </p>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default TypeOrderStatistics;
