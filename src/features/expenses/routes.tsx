import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import Expenses from "./views/expenses";
const ExpensesRoutes: CustomRoute = {
  id: "expenses",
  title: "expenses",
  path: "expenses",
  element: <Expenses />,
  errorElement: <InternalServerError />,
  children: [],
};

export default ExpensesRoutes;
