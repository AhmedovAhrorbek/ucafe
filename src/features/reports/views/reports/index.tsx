import { useState, useEffect } from "react";
import { Select, Button } from "antd";
import DownloadIcon from "../../../../components/downloadIcon";
import moment from "moment";
import {
  getIncomeStatistics,
  getExpenseStatistics,
  getSalesStatistics,
  getOrderTypeStatistics,
} from "../../api";
import IncomeCard from "../../components/IncomeCard";
import ExpensesCard from "../../components/ExpensesCard";
import SalesCard from "../../components/SalesCard";
import OrderMyselfCard from "../../components/OrderMyselfCard";
import OrdersDeliveryCard from "../../components/OrdersDileveryCard";

const Reports = () => {
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [takeoutOrders, setTakeoutOrders] = useState<number[]>([]);
  const [deliveryOrders, setDeliveryOrders] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<string>(
    "29 ноября, 2023 - 5 декабря, 2023"
  );
  const [period, setPeriod] = useState<string>("week");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const today = moment();
        let startDate, endDate;

        switch (period) {
          case "day":
            startDate = today.format("YYYY-MM-DD");
            endDate = today.format("YYYY-MM-DD");
            break;
          case "week":
            startDate = today.startOf("week").format("YYYY-MM-DD");
            endDate = today.endOf("week").format("YYYY-MM-DD");
            break;
          case "month":
            startDate = today.startOf("month").format("YYYY-MM-DD");
            endDate = today.endOf("month").format("YYYY-MM-DD");
            break;
          case "3month":
            startDate = today
              .startOf("month")
              .subtract(2, "months")
              .format("YYYY-MM-DD");
            endDate = today.endOf("month").format("YYYY-MM-DD");
            break;
          case "6month":
            startDate = today
              .startOf("month")
              .subtract(5, "months")
              .format("YYYY-MM-DD");
            endDate = today.endOf("month").format("YYYY-MM-DD");
            break;
          case "year":
            startDate = today.startOf("year").format("YYYY-MM-DD");
            endDate = today.endOf("year").format("YYYY-MM-DD");
            break;
          default:
            startDate = today.startOf("week").format("YYYY-MM-DD");
            endDate = today.endOf("week").format("YYYY-MM-DD");
        }

        const { total_income } = await getIncomeStatistics(
          startDate,
          endDate,
          "00:00",
          "23:59"
        );
        setTotalIncome(total_income);

        const { total_expenses } = await getExpenseStatistics(
          startDate,
          endDate,
          "00:00",
          "23:59"
        );
        setTotalExpenses(total_expenses);

        const { total_sales } = await getSalesStatistics(
          startDate,
          endDate,
          "00:00",
          "23:59"
        );
        setTotalSales(total_sales);

        const { takeout_orders, delivery_orders } = await getOrderTypeStatistics(
          startDate,
          endDate,
          "00:00",
          "23:59"
        );
        setTakeoutOrders(takeout_orders);
        setDeliveryOrders(delivery_orders);

       
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };
    fetchStatistics();
  }, [dateRange, period]);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-white">
        <h2 className="text-[#2F3138] font-sf-pro-display text-[24px] font-medium leading-24 text-left">
          Отчеты
        </h2>
        <div className="w-[659px] flex items-center justify-between">
          <Select
            className="w-[196px]"
            value={period}
            onChange={(value) => setPeriod(value)}
          >
            <Select.Option value="day">День</Select.Option>
            <Select.Option value="week">Неделя</Select.Option>
            <Select.Option value="month">Месяц</Select.Option>
            <Select.Option value="3month">3 месяца</Select.Option>
            <Select.Option value="6month">6 месяцев</Select.Option>
            <Select.Option value="year">Год</Select.Option>
          </Select>
          <Select
            className="w-[276px]"
            value={dateRange}
            onChange={(value) => setDateRange(value)}
          >
            <Select.Option value="29 ноября, 2023 - 5 декабря, 2023">
              29 ноября, 2023 - 5 декабря, 2023
            </Select.Option>
          </Select>
          <Button className="flex items-center" type="primary">
            <DownloadIcon /> Скачать в Excel
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mx-6">
        <div>
          {totalIncome !== null && <IncomeCard total_income={totalIncome} />}
        </div>
        <div>
          {totalExpenses !== null && (
            <ExpensesCard total_expenses={totalExpenses} />
          )}
        </div>
        <div>
          {totalSales !== null && <SalesCard total_sales={totalSales} />}
        </div>
        <div>
          {takeoutOrders !== null && (
            <OrderMyselfCard takeout_orders={takeoutOrders} />
          )}
        </div>
        <div>
          {deliveryOrders !== null && (
            <OrdersDeliveryCard delivery_orders={deliveryOrders} />
          )}
        </div>
      </div>
      
    </>
  );
};

export default Reports
