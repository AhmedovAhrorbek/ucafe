import { Order } from "../../orders/types";
import request from "../../../utils/axios";

interface GetOrdersHistoryParams {
  page: number;
  pageSize: number;
  orderType?: "delivery" | "with" | "there";
  payType?: "cash" | "payme" | "click" | "terminal";
  startDate?: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format
}

export async function getOrdersHistory(
  params: GetOrdersHistoryParams
): Promise<{ results: Order[]; count: number }> {
  const { page, pageSize, orderType, payType, startDate, endDate } = params;

  const res = await request({
    url: "get-history-orders/",
    method: "get",
    params: {
      page,
      page_size: pageSize,
      order_type: orderType,
      pay_type: payType,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return res;
}
