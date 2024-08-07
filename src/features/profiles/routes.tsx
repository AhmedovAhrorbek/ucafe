import type { CustomRoute } from "../../types";
import InternalServerError from "../../views/internet-server-error";
import AdminProfile from "./views/AdminProfile";
import SellerProfile from "./views/SellerProfile";
import CookerProfile from "./views/CookerProfile";
import ManagerProfile from "./views/ManagerProfile";
import { useAuthContext } from "../../contexts/auth-context";
import { Navigate } from "react-router-dom";

const UserProfileSwitch = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.user_type) {
    case "Admin":
      return <AdminProfile />;
    case "Manager":
      return <ManagerProfile />;
    case "Cooker":
      return <CookerProfile />;
    case "Seller":
      return <SellerProfile />;
    default:
      return <InternalServerError />; 
  }
};

const userProfileRoutes: CustomRoute = {
  id: "profile",
  title: "profile",
  path: "profile",
  element: <UserProfileSwitch />,
  errorElement: <InternalServerError />,
  children: [],
};

export default userProfileRoutes;
