import request from "../../../utils/axios";
import {
  IncomeStatisticsType,
  SalesStatisticsType,
  ExpenseStatisticsType,
  OrdersStatisticsType,
} from "../types";
export async function getIncomeStatistics(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): Promise<IncomeStatisticsType> {
  const res = await request({
    url: "statistics/income/",
    method: "get",
    params: {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    },
  });
  return res;
}



export async function getExpenseStatistics(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): Promise<ExpenseStatisticsType> {
  const res = await request({
    url: "statistics/expenses/",
    method: "get",
    params: {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    },
  });
  return res;
}

export async function getSalesStatistics(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): Promise<SalesStatisticsType> {
  const res = await request({
    url: "statistics/sales/",
    method: "get",
    params: {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    },
  });
  return res;
}
export async function getOrderTypeStatistics(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): Promise<OrdersStatisticsType> {
  const res = await request({
    url: "statistics/orders/",
    method: "get",
    params: {
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
    },
  });
  return res;
}

