import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";

export type AppLang = "ru" | "uzLatin" | "uzCryllic";

export interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: Array<RouteObject & { title?: string }>;
}

export type CustomRoute = (IndexRouteObject | CustomNonIndexRouteObject) & {
  title?: string;
};

export interface BaseEntity {
  id: number;
  name: string;
}

export interface BaseParams {
  page?: number;
  page_size?: number;
}

export interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export type OrderType = "self" | "shipping";

export type OrderStatus = "new" | "in_process" | "finished" | "close";

export type DeliveryStatus = "took" | "delivered";

export type PaymentStatus = "paid" | "not_paid";

export type ProductDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type Category = "breakfasts" | "lunches" | "bar" | "snacks" | "pp" | "desserts";


