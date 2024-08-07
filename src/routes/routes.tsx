import Root from "../views/root";
import NotFound from "../views/not-found";
import InternalServerError from "../views/internet-server-error";
import authRoutes from "../features/auth/routes";
import { allOrdersRoutes } from "../features/orders";
import type { CustomRoute } from "../types";
import { sift } from "radash";
import { ordersHistoryRoutes } from "../features/order-history";
import { menuManagmentRoutes } from "../features/menu-managment";
import userProfileRoutes from "../features/profiles/routes";
import ReportsRoutes from "../features/reports/routes";
import { ExpensesRoutes } from "../features/expenses";
import { Navigate } from "react-router-dom";
import UsersRoutes from "../features/users/routes";
import { useAuthContext } from "../contexts/auth-context";

const useFilteredRoutes = (): CustomRoute[] => {
  const { user } = useAuthContext();

  let filteredChildren: CustomRoute[] = [];
  let homepageRedirect: JSX.Element;

  switch (user?.user_type) {
    case "Admin":
      homepageRedirect = <Navigate to="/orders" />;
      filteredChildren = sift([
        allOrdersRoutes,
        ordersHistoryRoutes,
        menuManagmentRoutes,
        ReportsRoutes,
        ExpensesRoutes,
        UsersRoutes,
        userProfileRoutes,
        {
          id: "local-not-found",
          title: "not-found",
          path: "*",
          element: <NotFound />,
        },
      ]);
      break;
    case "Manager":
      homepageRedirect = <Navigate to="/orders-history" />;
      filteredChildren = sift([
        ordersHistoryRoutes,
        ExpensesRoutes,
        UsersRoutes,
        userProfileRoutes,

        {
          id: "local-not-found",
          title: "not-found",
          path: "*",
          element: <NotFound />,
        },
      ]);
      break;
    case "Cook":
      homepageRedirect = <Navigate to="/menu-management" />;
      filteredChildren = sift([
        menuManagmentRoutes,
        userProfileRoutes,

        {
          id: "local-not-found",
          title: "not-found",
          path: "*",
          element: <NotFound />,
        },
      ]);
      break;
    case "Seller":
      homepageRedirect = <Navigate to="/orders" />;
      filteredChildren = sift([
        userProfileRoutes,
        allOrdersRoutes,
        {
          id: "local-not-found",
          title: "not-found",
          path: "*",
          element: <NotFound />,
        },
      ]);
      break;
    default:
      homepageRedirect = <Navigate to="/not-found" />;
      filteredChildren = sift([
        {
          id: "local-not-found",
          title: "not-found",
          path: "*",
          element: <NotFound />,
        },
      ]);
      break;
  }

  return [
    {
      id: "root",
      title: "U-Cafe",
      path: "/",
      element: <Root getRoutes={() => filteredChildren} />,
      loader: async () => null,
      errorElement: <InternalServerError />,
      children: [
        {
          id: "homepage",
          title: "Homepage",
          path: "",
          element: homepageRedirect,
        },
        ...filteredChildren,
      ],
    },
    authRoutes,
    {
      id: "global-not-found",
      title: "not-found",
      path: "*",
      element: <NotFound />,
    },
  ];
};

const AppRoutes = () => {
  const routes = useFilteredRoutes();
  return routes;
};

export default AppRoutes;
