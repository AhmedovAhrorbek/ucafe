import request from "../../../utils/axios";
import {
  IncomeStatisticsType,
  SalesStatisticsType,
  ExpenseStatisticsType,
  OrdersStatisticsType,
  CategoryStatisticsType,
  SoldItemsStatiticsType,
  PaymentMethodsStatisticsType,
  SalesByDayWeekStatisticsType, // Yangi tur kiritamiz
} from "../types";

// Yangi tur definitsiyasi


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

export async function getPaymentMethodsStatistics(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): Promise<PaymentMethodsStatisticsType> {
  const res = await request({
    url: "statistics/payment-methods/",
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

export async function getCategoryStatistics(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
): Promise<CategoryStatisticsType> {
  const res = await request({
    url: "statistics/popular-categories/",
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

export async function getSalesFoodsStatistics(
  startDate: string,
  endDate: string,
  page: number,
  pageSize: number
): Promise<SoldItemsStatiticsType> {
  const res = await request({
    url: "statistics/sales-foods/",
    method: "get",
    params: {
      start_date: startDate,
      end_date: endDate,
      page: page,
      page_size: pageSize,
    },
  });
  return res;
}

export async function getSalesByDayWeekStatistics(
  startDate: string,
  endDate: string
): Promise<SalesByDayWeekStatisticsType> {
  const res = await request({
    url: "statistics/sales-by-day-week/",
    method: "get",
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });
  return res;
}
