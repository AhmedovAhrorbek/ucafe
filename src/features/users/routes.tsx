import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import Users from "./views/Users";

const UsersRoutes: CustomRoute = {
  id: "users",
  title: "users",
  path: "users",
  element: <Users />,
  errorElement: <InternalServerError />,
  children: [],
};

export default UsersRoutes;
