import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, Checkbox } from "antd";
import HistoryCard from "../../components/HistoryCard";
import NoOrdersHistory from "../../components/NoOrdersHistory";
import Pagination from "../../../../components/Pagination";
import { getOrdersHistory } from "../../api";
import Spinner from "../../../../components/Spinner";

const OrdersHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  const { data, error, isLoading } = useQuery({
    queryKey: ["ordersHistory", currentPage],
    queryFn: () => getOrdersHistory(currentPage, pageSize),
  });

  if (isLoading) return <div><Spinner /></div>;
  if (error) return <div>Error loading data</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="bg-white rounded-md flex items-center px-6 justify-between py-3">
        <div className="mb-4">
          <h2 className="font-sfpro text-2xl font-semibold leading-7 text-left">
            История заказов ({data?.count})
          </h2>
        </div>
        <div className="flex space-x-4">
          <Select
            className="w-[300px]"
            defaultValue="17 октября, 2023-20 октября, 2023-20"
          ></Select>
          <Select
            className="w-48 custom-select"
            defaultValue="Все способы оплаты"
            allowClear
          >
            <Select.Option value="Переводом">
              <Checkbox>Переводом</Checkbox>
            </Select.Option>
            <Select.Option value="Наличными">
              <Checkbox>Наличными</Checkbox>
            </Select.Option>
            <Select.Option value="Click">
              <Checkbox>Click</Checkbox>
            </Select.Option>
            <Select.Option value="Payme">
              <Checkbox>Payme</Checkbox>
            </Select.Option>
          </Select>
          <Select
            className="w-48 custom-select"
            defaultValue="Все типы заказов"
            allowClear
          >
            <Select.Option value="С собой">
              <Checkbox>С собой</Checkbox>
            </Select.Option>
            <Select.Option value="На месте">
              <Checkbox>На месте</Checkbox>
            </Select.Option>
            <Select.Option value="В кабинет">
              <Checkbox>В кабинет</Checkbox>
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
