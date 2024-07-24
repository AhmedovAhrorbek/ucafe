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

export type OrderStatus = "new" | "processing" | "completed" | "close";

export type PaymentStatus = "paid" | "not_paid";




