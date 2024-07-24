import { Order } from "../../orders/types";
import request from "../../../utils/axios";


export async function getOrdersHistory(page: number , pageSize: number): Promise<{ results: Order[], count: number }> {
  const res = await request({url: "get-history-orders/",method: "get", params: { page: page, page_size: pageSize },});
  return res;
}
