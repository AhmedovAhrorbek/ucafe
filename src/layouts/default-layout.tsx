import { Layout, Input, Avatar, Dropdown, Menu ,Modal } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import Logo from '../assets/LayoutImges/Navbar-logo.png'
import { CustomRoute } from "../types";
import { Link, useLocation }  from 'react-router-dom'
import { useAuthContext } from "../contexts/auth-context";
import { useState } from "react";
import UserAvatarIcon from "../components/UserAvatar";
interface Props {
  children: React.ReactElement;
  sidebarRoutes: CustomRoute[];
}

const { Header, Content } = Layout;

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children} = props;
  const { setIsAuth } = useAuthContext();
  const [open, setOpen] = useState(false);
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
   const userMenu = (
     <Menu>
       <Menu.Item key="logout" onClick={handleConfirm}>Выход</Menu.Item>
     </Menu>
   );

    const location = useLocation();
     const linkStyle = `

    text-gray-700 hover:text-[rgba(85,102,255,1)] font-sans text-[16px] font-medium leading-[19.09px] text-left
    relative
    transition duration-300
  `;

     const activeLinkStyle = `
     text-[#5566FF] after:absolute after:content-[''] after:bg-red-500 after:w-2 after:h-2 after:rounded-full
    after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2
    border-b-2 border-[rgba(85,102,255,1)]
  `;

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
          <div className="flex items-center space-x-4">
            <img
              src={Logo}
              className="text-xl font-bold mr-12"
              style={{ width: "108px", height: "42.14px" }}
            />
            <Link
              to="/orders"
              className={`${linkStyle} ${
                location.pathname === "/orders" ? activeLinkStyle : ""
              }`}
            >
              Все заказы
            </Link>
            <Link
              to="/menu-management"
              className={`${linkStyle} ${
                location.pathname === "/menu-management" ? activeLinkStyle : ""
              }`}
            >
              Управление меню
            </Link>
            <Link
              to="/order-history"
              className={`${linkStyle} ${
                location.pathname === "/order-history" ? activeLinkStyle : ""
              }`}
            >
              История заказов
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Поиск"
              prefix={<SearchOutlined />}
              className="  w-[311px] h-[40px] p-[10px_12px] gap-2 rounded-tl-[6px] rounded-bl-[6px] border-t border-l border-b-0 border-r-0 border-gray-300 "
            />
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="flex items-center space-x-3 cursor-pointer w-[188px] h-[36px]">
                <Avatar
                  icon={<UserAvatarIcon />}
                  style={{ width: "36px", height: "36px" }}
                />
                <div className="flex flex-col justify-center">
                  <span className="text-[14px] leading-[16.71px] font-[SF Pro Display] font-medium text-gray-700 w-full flex items-center gap-2">
                    Солиева Лазиза <DownOutlined className="text-gray-700" />
                  </span>
                  <span className="text-[12px] leading-[14.32px] font-sans text-[#5566FF]">
                    Администратор
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content>{children}</Content>
      </div>
    </Layout>
  );
}
