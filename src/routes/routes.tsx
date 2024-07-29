import Root from "../views/root";
import NotFound from "../views/not-found";
import InternalServerError from "../views/internet-server-error";
import authRoutes from "../features/auth/routes";
import { allOrdersRoutes } from "../features/orders";
import type { CustomRoute } from "../types";
import { sift } from "radash";
import { ordersHistoryRoutes } from "../features/order-history";
import { menuManagmentRoutes } from "../features/menu-managment";
import ReportsRoutes from "../features/reports/routes";

const routes: CustomRoute[] = [
  {
    id: "root",
    title: "U-Cafe",
    path: "/",
    element: <Root getRoutes={() => routes} />,
    loader: async () => null,
    errorElement: <InternalServerError />,
    children: sift([
      allOrdersRoutes,
      ordersHistoryRoutes,
      menuManagmentRoutes,
      ReportsRoutes,
      {
        id: "local-not-found",
        title: "not-found",
        path: "*",
        element: <NotFound />,
      },
    ]),
  },
  authRoutes,
  {
    id: "global-not-found",
    title: "not-found",
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
