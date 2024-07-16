import Root from "../views/root";
import NotFound from "../views/not-found";
import InternalServerError from "../views/internet-server-error";
import authRoutes from "../features/auth/routes";
import { allOrdersRoutes } from "../features/orders";
// import Check from "@/components/check";
import type { CustomRoute } from "../types";
import { sift } from "radash";

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
      {
        id: "local-not-found",
        title: "not-found",
        path: "*",
        element: <NotFound />,
      },
    ]),
  },
  // {
  //   id: "check",
  //   title: "Check",
  //   path: "check",
  //   element: <Check />,
  // },
  authRoutes,
  {
    id: "global-not-found",
    title: "not-found",
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
