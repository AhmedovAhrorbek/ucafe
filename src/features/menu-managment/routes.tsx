import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import AllMenus from './views/menus'
const menuManagmentRoutes: CustomRoute = {
  id: "menu-management",
  title: "menu-management",
  path: "menu-management",
  element: <AllMenus />,
  errorElement: <InternalServerError />,
  children: [
    // {
    //   id: "create-menu",
    //   title: "create-menu",
    //   path: "create-menu",
    //   element: <CreateMenu />,
    // },
    // {
    //   id: "edit-menu",
    //   title: "edit-menu",
    //   path: "edit-menu/:id",
    //   element: <CreateMenu />,
    // },
  ],
};

export default menuManagmentRoutes;
