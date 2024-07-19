import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import AllOrders from "./views/orders";
import CreateOrder from "./views/create-order";
import Container from "./components/container";

const allOrdersRoutes: CustomRoute = {
  id: "orders",
  title: "orders",
  path: "orders",
  element: <Container of={<AllOrders />} />,
  errorElement: <InternalServerError />,
  children: [
    {
      id: "create-order",
      title: "create-order",
      path: "create-order",
      element: <CreateOrder />,
    },
    {
      id: "edit-order",
      title: "edit-order",
      path: "edit-order/:id",
      element: <CreateOrder />,
    },
  ],
};

export default allOrdersRoutes;



