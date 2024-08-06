import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, Checkbox, DatePicker } from "antd";
import HistoryCard from "../../components/HistoryCard";
import NoOrdersHistory from "../../components/NoOrdersHistory";
import Pagination from "../../../../components/Pagination";
import { getOrdersHistory } from "../../api";
import Spinner from "../../../../components/Spinner";
import InternalServerError from "../../../../views/internet-server-error";
import moment from "moment";

const { RangePicker } = DatePicker;

const OrdersHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState<string | null>(null);
  const [payType, setPayType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const pageSize = 10;

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "ordersHistory",
      currentPage,
      orderType,
      payType,
      startDate,
      endDate,
    ],
    queryFn: () =>
      getOrdersHistory({
        page: currentPage,
        pageSize,
        orderType,
        payType,
        startDate,
        endDate,
      }),
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <InternalServerError />;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value);
  };

  const handlePayTypeChange = (value: string) => {
    setPayType(value);
  };

  const handleDateRangeChange = (
    dates: [moment.Moment, moment.Moment] | null
  ) => {
    if (dates) {
      setStartDate(dates[0].format("YYYY-MM-DD"));
      setEndDate(dates[1].format("YYYY-MM-DD"));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-md flex flex-wrap items-center px-6 justify-between py-3">
        <div className="w-full mb-4 md:w-auto">
          <h2 className="font-sfpro text-2xl font-semibold leading-7 text-left">
            История заказов ({data?.count})
          </h2>
        </div>
        <div className="flex flex-wrap space-x-4 w-full md:w-auto">
          <RangePicker
            className="w-full md:w-96 mb-4 md:mb-0"
            placeholder={["Start Date", "End Date"]}
            onChange={handleDateRangeChange}
          />
          <Select
            className="w-full md:w-48 custom-select mb-4 md:mb-0"
            placeholder="Все способы оплаты"
            value={payType}
            onChange={handlePayTypeChange}
            allowClear
          >
            <Select.Option value="cash">
              <Checkbox checked={payType === "cash"}>Наличными</Checkbox>
            </Select.Option>
            <Select.Option value="payme">
              <Checkbox checked={payType === "payme"}>Payme</Checkbox>
            </Select.Option>
            <Select.Option value="click">
              <Checkbox checked={payType === "click"}>Click</Checkbox>
            </Select.Option>
            <Select.Option value="terminal">
              <Checkbox checked={payType === "terminal"}>Переводом</Checkbox>
            </Select.Option>
          </Select>
          <Select
            className="w-full md:w-48 custom-select"
            placeholder="Все типы заказов"
            value={orderType}
            onChange={handleOrderTypeChange}
            allowClear
          >
            <Select.Option value="with">
              <Checkbox checked={orderType === "with"}>С собой</Checkbox>
            </Select.Option>
            <Select.Option value="there">
              <Checkbox checked={orderType === "there"}>На месте</Checkbox>
            </Select.Option>
            <Select.Option value="delivery">
              <Checkbox checked={orderType === "delivery"}>В кабинет</Checkbox>
            </Select.Option>
          </Select>
        </div>
      </div>

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
        totalItems={data?.count || 0}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrdersHistory;
