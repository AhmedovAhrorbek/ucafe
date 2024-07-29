import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import OrdersHistory from "./views/orders-history";

const ordersHistoryRoutes: CustomRoute = {
  id: "orders-history",
  title: "orders-history",
  path: "orders-history",
  element: <OrdersHistory />,
  errorElement: <InternalServerError />,
  children: [],
};

export default ordersHistoryRoutes;
