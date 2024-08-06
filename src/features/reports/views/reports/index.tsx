import { useState, useEffect } from "react";
import { Select, Button, DatePicker} from "antd";
import Pagination from '../../../../components/Pagination'
import DownloadIcon from "../../../../components/downloadIcon";
import moment from "moment";
import {
  getIncomeStatistics,
  getExpenseStatistics,
  getSalesStatistics,
  getOrderTypeStatistics,
  getPaymentMethodsStatistics,
  getCategoryStatistics,
  getSalesFoodsStatistics,
  getSalesByDayWeekStatistics,
} from "../../api";
import IncomeCard from "../../components/IncomeCard";
import ExpensesCard from "../../components/ExpensesCard";
import SalesCard from "../../components/SalesCard";
import OrderMyselfCard from "../../components/OrderMyselfCard";
import OrdersDeliveryCard from "../../components/OrdersDileveryCard";
import PaymentMethodsStat from "../../components/PaymentMethodsStat";
import CategoryStatistics from "../../components/CategoryStatistics";
import SoldItemsCard from "../../components/SoldItemsCard"; // Import your component here
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../components/Spinner";
import HistoryCard from "../../../order-history/components/HistoryCard";
import NoOrdersHistory from "../../../order-history/components/NoOrdersHistory";
import { getOrdersHistory } from "../../../order-history/api";
import TypeOrderStatistics from "../../components/TypeOrderStatistics";
const { RangePicker } = DatePicker;

const Reports = () => {
  const pageSize =  10;
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [takeoutOrders, setTakeoutOrders] = useState<number[]>([]);
  const [deliveryOrders, setDeliveryOrders] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [period, setPeriod] = useState<string>("Неделя");
  const [categoryStatisticsData, setCategoryStatisticsData] = useState<any[]>(
    []
  );
  const [title, setTitle] = useState("Неделя");
  const [takeoutOrdersP, setTakeoutOrdersP] = useState<number[]>([]);
  const [deliveryOrdersP, setDeliveryOrdersP] = useState<number[]>([]);
  const [soldItemsData, setSoldItemsData] = useState([]);
   const [incomeChange, setIncomeChange] = useState<number | null>(null);
   const [expensesChange, setExpensesChange] = useState<number | null>(null);
   const [salesChange, setSalesChange] = useState<number | null>(null);
  const [salesByDayWeekData, setSalesByDayWeekData] = useState<any[]>([]);
  const today = moment();
  const [dateRange, setDateRange] = useState([null, null]);
  let startDate, endDate;

   if (dateRange[0] && dateRange[1]) {
      startDate = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : null;
      endDate = dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : null;
   } else {
     switch (period) {
       case "День":
         endDate = today.format("YYYY-MM-DD");
         startDate = today.format("YYYY-MM-DD");
         break;
       case "Неделя":
         startDate = today.startOf("week").format("YYYY-MM-DD");
         endDate = today.endOf("week").format("YYYY-MM-DD");
         break;
       case "Месяц":
         endDate = today.startOf("month").format("YYYY-MM-DD");
         startDate = today.endOf("month").format("YYYY-MM-DD");
         break;
       case "3 месяца":
         endDate = today.format("YYYY-MM-DD");
         startDate = today
           .subtract(3, "months")
           .startOf("month")
           .format("YYYY-MM-DD");
         break;
       case "6 месяца":
         endDate = today.format("YYYY-MM-DD");
         startDate = today
           .subtract(6, "months")
           .startOf("month")
           .format("YYYY-MM-DD");
         break;
       case "Год":
         endDate = today.startOf("year").format("YYYY-MM-DD");
         startDate = today.endOf("year").format("YYYY-MM-DD");
         break;
       default:
         endDate = today.startOf("week").format("YYYY-MM-DD");
         startDate = today.endOf("week").format("YYYY-MM-DD");
     }
   }

  const { data: paymentMethodsData, isLoading } = useQuery({
    queryKey: ["paymentMethodsStatistics", endDate, startDate],
    queryFn: () =>
      getPaymentMethodsStatistics(startDate, endDate, "00:00", "23:59"),
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { total_income, percentage_change: incomeChange } =
          await getIncomeStatistics(startDate, endDate, "00:00", "23:59");
        setTotalIncome(total_income);
        setIncomeChange(incomeChange);

        const { total_expenses, percentage_change: expensesChange } =
          await getExpenseStatistics(startDate, endDate, "00:00", "23:59");
        setTotalExpenses(total_expenses);
        setExpensesChange(expensesChange);

        const { total_sales, percentage_change: salesChange } =
          await getSalesStatistics(startDate, endDate, "00:00", "23:59");
        setTotalSales(total_sales);
        setSalesChange(salesChange);

        const {
          takeout_orders,
          delivery_orders,
          takeout_percentage_change,
          delivery_percentage_change,
        } = await getOrderTypeStatistics(startDate, endDate, "00:00", "23:59");
        setTakeoutOrders(takeout_orders);
        setDeliveryOrders(delivery_orders);
        setTakeoutOrdersP(takeout_percentage_change);
        setDeliveryOrdersP(delivery_percentage_change);
        const categoryData = await getCategoryStatistics(
          startDate,
          endDate,
          "00:00",
          "23:59"
        );
        setCategoryStatisticsData(categoryData); 

        const soldItems = await getSalesFoodsStatistics(
          startDate,
          endDate,
          page,
          pageSize
        );
        console.log(soldItems)
        setSoldItemsData(soldItems);
         const salesByDayWeek = await getSalesByDayWeekStatistics(
           startDate,
           endDate
         );
        //  console.log(salesByDayWeek)
         setSalesByDayWeekData(salesByDayWeek);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };
    fetchStatistics();
  }, [startDate, endDate, page, pageSize]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  

  ///// history orders ///////

  const { data } = useQuery({
    queryKey: ["ordersHistory", currentPage],
    queryFn: () =>
      getOrdersHistory({
        page: currentPage,
        pageSize,
      }),
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
    
    const handleCurrentPageChange = (currentPage: number) => {
      setCurrentPage(currentPage);
    };
    
 
     const handleChangeDate = (value: string) => {
       setPeriod(value);
       setTitle(value);
       setDateRange([null, null]);
     };

     const handleRangePickerChange = (
       dates: [moment.Moment | null, moment.Moment | null] | null,
       dateStrings: [string, string]
     ) => {
       if (!dates) {
         setPeriod("Неделя");
         setDateRange([null, null]);
         setTitle("Неделя");
       } else {
         setDateRange(dates as [moment.Moment, moment.Moment]);
         setPeriod("");
         setTitle(`${dateStrings[0]} - ${dateStrings[1]}`);
       }
     };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-white">
        <h2 className="text-[#2F3138] font-sf-pro-display text-[24px] font-medium leading-24 text-left mb-4 md:mb-0">
          Отчеты
        </h2>
        <div className="w-full md:w-[659px] flex flex-col md:flex-row items-center justify-between">
          <Select
            className="w-full md:w-[196px] mb-4 md:mb-0"
            defaultValue="Выбирать"
            value={period}
            onChange={handleChangeDate}
          >
            <Select.Option value="День">День</Select.Option>
            <Select.Option value="Неделя">Неделя</Select.Option>
            <Select.Option value="Месяц">Месяц</Select.Option>
            <Select.Option value="3 месяца">3 месяца</Select.Option>
            <Select.Option value="6 месяцев">6 месяцев</Select.Option>
            <Select.Option value="Год">Год</Select.Option>
          </Select>
          <RangePicker
            className="w-full md:w-72 mb-4 md:mb-0"
            placeholder={["start_date", "end_date"]}
            value={[dateRange[0], dateRange[1]]}
            onChange={handleRangePickerChange}
          />
          <Button className="flex items-center" type="primary">
            <DownloadIcon /> Скачать в Excel
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mx-6">
        {totalIncome !== null && (
          <div className="flex-1 min-w-[250px] max-w-[300px]">
            <IncomeCard
              total_income={totalIncome}
              percentage_change={incomeChange}
              title={title}
            />
          </div>
        )}
        {totalExpenses !== null && (
          <div className="flex-1 min-w-[250px] max-w-[300px]">
            <ExpensesCard
              total_expenses={totalExpenses}
              percentage_change={expensesChange}
              title={title}
            />
          </div>
        )}
        {totalSales !== null && (
          <div className="flex-1 min-w-[250px] max-w-[300px]">
            <SalesCard
              total_sales={totalSales}
              percentage_change={salesChange}
              title={title}
            />
          </div>
        )}
        {takeoutOrders !== null && (
          <div className="flex-1 min-w-[250px] max-w-[300px]">
            <OrderMyselfCard
              takeout_orders={takeoutOrders}
              takeout_percentage_change={takeoutOrdersP}
              tekout_title={title}
            />
          </div>
        )}
        {deliveryOrders !== null && (
          <div className="flex-1 min-w-[250px] max-w-[300px]">
            <OrdersDeliveryCard
              delivery_orders={deliveryOrders}
              delivery_percentage_change={deliveryOrdersP}
              delivery_title={title}
            />
          </div>
        )}
      </div>

      <div className="mx-6 mt-3 mb-3">
        <TypeOrderStatistics data={salesByDayWeekData} />
      </div>
      <div className=" mt-5 mx-6  flex justify-between flex-wrap gap-6">
        {paymentMethodsData && (
          <PaymentMethodsStat data={paymentMethodsData} title={title} />
        )}
        {categoryStatisticsData && (
          <CategoryStatistics data={categoryStatisticsData} title={title} />
        )}
        {isLoading && (
          <div className="flex-1 min-w-[300px]">
            <Spinner />
          </div>
        )}
      </div>

      <div className="mt-7 mx-6">
        <ul className="flex items-center gap-5">
          {["Проданные товары", "Список заказов"].map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer transition-all duration-200 font-fs-pro-display text-[18px] font-medium leading-[21px] text-left text-[#2F3138] ${
                activeIndex === index
                  ? "border-b-2 border-blue-400 text-blue-400 font-fs-pro-display text-[18px] font-medium leading-[21px] text-left text-[#2F3138]"
                  : "hover:border-b-2 hover:border-blue-400 hover:text-blue-400 hover:pb-2"
              }`}
              style={{ paddingBottom: "5px" }}
              onClick={() => handleClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          {activeIndex === 0 && (
            <>
              <ul className="flex flex-col sm:flex-row items-center justify-between mb-5 px-4 gap-4 sm:gap-0">
                <li className="w-full sm:w-[150px] font-sf-pro-display text-[14px] sm:text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Наименование
                </li>
                <li className="w-full sm:w-[150px] font-sf-pro-display text-[14px] sm:text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Категории
                </li>
                <li className="w-full sm:w-[150px] font-sf-pro-display text-[14px] sm:text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Кол-во продаж
                </li>
                <li className="w-full sm:w-[150px] font-sf-pro-display text-[14px] sm:text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Цена за единицу товара
                </li>
                <li className="w-full sm:w-[150px] font-sf-pro-display text-[14px] sm:text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Общая сумма продаж
                </li>
              </ul>
              <SoldItemsCard data={soldItemsData?.results} />
              <Pagination
                currentPage={page}
                totalItems={soldItemsData?.count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </>
          )}
          {activeIndex === 1 && (
            <>
              {/* <ul className="flex flex-wrap items-center justify-between mb-5 px-4 gap-4">
                <li className="flex-1 min-w-[140px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Наименование
                </li>
                <li className="flex-1 min-w-[130px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Дата
                </li>
                <li className="flex-1 min-w-[100px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Позиция
                </li>
                <li className="flex-1 min-w-[150px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Тип заказа
                </li>
                <li className="flex-1 min-w-[150px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Способ оплаты
                </li>
                <li className="flex-1 min-w-[150px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Сумма
                </li>
                <li className="flex-1 min-w-[150px] font-sf-pro-display text-[16px] font-medium leading-[19.09px] text-left text-[#7D848B]">
                  Статус платежа
                </li>
              </ul> */}
              <div className="mt-4 mx-4">
                {data?.results ? (
                  <>
                    {data.results.map((item) => (
                      <HistoryCard key={item.id} data={item} />
                    ))}
                  </>
                ) : (
                  <NoOrdersHistory />
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={data?.count}
                pageSize={pageSize}
                onPageChange={handleCurrentPageChange}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;
