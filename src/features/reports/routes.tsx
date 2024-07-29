import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import Reports from "./views/reports";

const ReportsRoutes: CustomRoute = {
  id: "reports",
  title: "reports",
  path: "reports",
  element: <Reports />,
  errorElement: <InternalServerError />,
  children: [],
};

export default ReportsRoutes;
