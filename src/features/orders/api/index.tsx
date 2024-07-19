import request from "../../../utils/axios";
import type { ListResponse } from "../../../types";
import type { CreateOrderData, Order, OrdersParams, Food } from "../types";

export async function getOrders(
  params?: OrdersParams
): Promise<ListResponse<Order[]>> {
  const res: ListResponse<Order[]> = await request({
    url: "orders/",
    method: "get",
    params,
  });
  return res;
}

export async function getOrder(id?: number): Promise<Order> {
  const res: Order = await request({
    url: `orders/${id}/`,
    method: "get",
  });
  return res;
}

export async function createOrder(
  data: CreateOrderData
): Promise<{ id: number }> {
  const res: { id: number } = await request({
    url: "orders/",
    method: "post",
    data,
  });

  return res;
}

export async function getFoods(): Promise<Food[]> {
  const res: Food[] = await request({
    url: "foods/",
    method: "get",
  });
  return res;
}
