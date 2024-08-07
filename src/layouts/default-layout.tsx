import { Layout, Avatar, Dropdown, Menu ,Modal, Button,  Drawer } from "antd";
import { DownOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import Logo from '../assets/LayoutImges/Navbar-logo.png'
import { CustomRoute } from "../types";
import { Link, useLocation }  from 'react-router-dom'
import { useAuthContext } from "../contexts/auth-context";
import { useState } from "react";
import UserAvatarIcon from "../components/UserAvatar";
import ReportsIcon from "../components/reportsIcon";
import ExpensesIcon from "../components/expensesIcon";
import ExitIcon from "../components/exitIcon";
import { useNavigate } from "react-router-dom";
import './layout.scss'
import UserGroupIcon from "../components/userGroupIcon";
interface Props {
  children: React.ReactElement;
  sidebarRoutes: CustomRoute[];
}

const { Header, Content } = Layout;

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children} = props;
  const { setIsAuth } = useAuthContext();
  const [open, setOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
   console.log(user?.full_name);
  const logout = (): void => {
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsAuth(false);
  };

  const handleConfirm = () => {
    Modal.confirm({
      title: "Вы хотите выйти из системы?",
      content: (
        <p className="text-xl font-medium">
          Вы уверены, что хотите выйти из системы?
        </p>
      ),
      okText: "Да",
      cancelText: "Нет",
      onOk() {
        logout();
      },
      onCancel() {
        setOpen(false);
      },
    });
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

   const userMenu = (
     <Menu className="w-[250px]">
       {user?.user_type === "Admin" && (
         <>
           <Menu.Item key="profile" onClick={() => navigate("/profile")}>
             <div className="flex items-center gap-5 mb-2">
               <UserOutlined style={{ color: "blue" }} /> Профиль
             </div>
           </Menu.Item>
           <Menu.Item key="reports" onClick={() => navigate("/reports")}>
             <div className="flex items-center gap-3">
               <ReportsIcon /> Отчеты
             </div>
           </Menu.Item>
           <Menu.Item key="expenses" onClick={() => navigate("/expenses")}>
             <div className="flex items-center gap-3 mb-2">
               <ExpensesIcon /> Расходы
             </div>
           </Menu.Item>
           <Menu.Item key="users" onClick={() => navigate("/users")}>
             <div className="flex items-center gap-3 mb-2">
               <UserGroupIcon /> Управление сотрудниками
             </div>
           </Menu.Item>
           <Menu.Item key="logout" onClick={handleConfirm}>
             <div className="flex items-center  gap-3 border-t border-[#ECEDEE] pt-3">
               <ExitIcon /> Выйти с аккаунта
             </div>
           </Menu.Item>
         </>
       )}
       {user?.user_type === "Manager" && (
         <>
           <Menu.Item key="profile" onClick={() => navigate("/profile")}>
             <div className="flex items-center gap-5 mb-2">
               <UserOutlined style={{ color: "blue" }} /> Профиль
             </div>
           </Menu.Item>
           <Menu.Item key="expenses" onClick={() => navigate("/expenses")}>
             <div className="flex items-center gap-3 mb-2">
               <ExpensesIcon /> Расходы
             </div>
           </Menu.Item>
           <Menu.Item key="users" onClick={() => navigate("/users")}>
             <div className="flex items-center gap-3 mb-2">
               <UserGroupIcon /> Управление сотрудниками
             </div>
           </Menu.Item>
           <Menu.Item key="logout" onClick={handleConfirm}>
             <div className="flex items-center  gap-3 border-t border-[#ECEDEE] pt-3">
               <ExitIcon /> Выйти с аккаунта
             </div>
           </Menu.Item>
         </>
       )}
       {user?.user_type === "Cook" && (
         <>
           <Menu.Item key="profile" onClick={() => navigate("/profile")}>
             <div className="flex items-center gap-5 mb-2">
               <UserOutlined style={{ color: "blue" }} /> Профиль
             </div>
           </Menu.Item>
           <Menu.Item key="logout" onClick={handleConfirm}>
             <div className="flex items-center  gap-3">
               <ExitIcon /> Выйти с аккаунта
             </div>
           </Menu.Item>
         </>
       )}
       {user?.user_type === "Seller" && (
         <>
           <Menu.Item key="profile" onClick={() => navigate("/profile")}>
             <div className="flex items-center gap-5 mb-2">
               <UserOutlined style={{ color: "blue" }} /> Профиль
             </div>
           </Menu.Item>
           <Menu.Item key="logout" onClick={handleConfirm}>
             <div className="flex items-center  gap-3 ">
               <ExitIcon /> Выйти с аккаунта
             </div>
           </Menu.Item>
         </>
       )}
     </Menu>
   );

    const location = useLocation();
  //    const linkStyle = `
  //   text-gray-700 hover:text-[rgba(85,102,255,1)] font-sans text-[16px] font-medium leading-[19.09px] text-left
  //   relative 
  //   transition duration-300
  // `;

  //    const activeLinkStyle =
  //      "border-b-2 border-[rgba(85,102,255,1)] text-[rgba(85,102,255,1)]";

  return (
    <Layout className="min-h-screen">
      <div className="w-full">
        <Header
          className="flex justify-between items-center shadow px-[24px] bg-[rgba(125,133,139,0.2)]"
          style={{
            height: "70px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center justify-between space-x-4">
            <img
              src={Logo}
              className="text-xl font-bold mr-12"
              style={{ width: "108px", height: "42.14px" }}
            />
            <div className="hidden md:flex items-center space-x-4">
              {user?.user_type === "Admin" && (
                <>
                  <Link
                    to="/orders"
                    className={`linkStyle font-sans text-[16px] font-medium leading-[19.09px] text-left ${
                      location.pathname === "/orders" ||
                      location.pathname === "/orders/create-order"
                        ? `activeLinkStyle`
                        : ""
                    }`}
                  >
                    Все заказы
                  </Link>
                  <Link
                    to="/menu-management"
                    className={`linkStyle font-sans text-[16px] font-medium leading-[19.09px] text-left ${
                      location.pathname === "/menu-management"
                        ? `activeLinkStyle`
                        : ""
                    }`}
                  >
                    Управление меню
                  </Link>
                  <Link
                    to="/orders-history"
                    className={`linkStyle font-sans text-[16px] font-medium leading-[19.09px] text-left ${
                      location.pathname === "/orders-history"
                        ? `activeLinkStyle`
                        : ""
                    }`}
                  >
                    История заказов
                  </Link>
                </>
              )}
              {user?.user_type === "Manager" && (
                <>
                  <Link
                    to="/orders-history"
                    className={`linkStyle font-sans text-[16px] font-medium leading-[19.09px] text-left ${
                      location.pathname === "/orders-history"
                        ? `activeLinkStyle`
                        : ""
                    }`}
                  >
                    История заказов
                  </Link>
                </>
              )}
              {user?.user_type === "Cook" && (
                <>
                  <Link
                    to="/menu-management"
                    className={`linkStyle font-sans text-[16px] font-medium leading-[19.09px] text-left ${
                      location.pathname === "/menu-management"
                        ? `activeLinkStyle`
                        : ""
                    }`}
                  >
                    Управление меню
                  </Link>
                </>
              )}
              {user?.user_type === "Seller" && (
                <>
                  <Link
                    to="/orders"
                    className={`linkStyle font-sans text-[16px] font-medium leading-[19.09px] text-left ${
                      location.pathname === "/orders" ||
                      location.pathname === "/orders/create-order"
                        ? `activeLinkStyle`
                        : ""
                    }`}
                  >
                    Все заказы
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="flex items-center space-x-3 cursor-pointer w-[188px] h-[36px]">
                <Avatar
                  icon={<UserAvatarIcon />}
                  style={{ width: "36px", height: "36px" }}
                />
                <div className="flex flex-col justify-center">
                  <span className="text-[14px] leading-[16.71px] font-[SF Pro Display] font-medium text-gray-700 w-full flex items-center gap-2">
                    {user?.full_name} <DownOutlined className="text-gray-700" />
                  </span>
                  <span className="text-[12px] leading-[14.32px] font-sans text-[#5566FF]">
                    Администратор
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
          <Button className="md:hidden bg-gray-100" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Header>
        <Drawer
          title="Меню"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
        >
          <Link to="/orders" className="block mb-2" onClick={closeDrawer}>
            Все заказы
          </Link>
          <Link
            to="/menu-management"
            className="block mb-2"
            onClick={closeDrawer}
          >
            Управление меню
          </Link>
          <Link
            to="/orders-history"
            className="block mb-2"
            onClick={closeDrawer}
          >
            История заказов
          </Link>
          <div className="flex items-center space-x-3 mt-4 cursor-pointer">
            <Avatar
              icon={<UserAvatarIcon />}
              style={{ width: "36px", height: "36px" }}
            />
            <div className="flex flex-col justify-center">
              <span className="text-[14px] leading-[16.71px] font-[SF Pro Display] font-medium text-gray-700 w-full flex items-center gap-2">
                {user?.full_name} <DownOutlined className="text-gray-700" />
              </span>
              <span className="text-[12px] leading-[14.32px] font-sans text-[#5566FF]">
                Администратор
              </span>
            </div>
          </div>
        </Drawer>
        <Content>{children}</Content>
      </div>
    </Layout>
  );
}
