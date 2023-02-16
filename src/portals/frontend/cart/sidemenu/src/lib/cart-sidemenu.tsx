import styles from './cart-sidemenu.module.css';
import {
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface CartSidemenuProps {}

export function CartSidemenu(props: CartSidemenuProps) {
  // const location = useLocation();
  // const [selectedKeys, setSelectedKeys] = useState("/*");

  // useEffect(() => {
  //   const pathName = location.pathname;
  //   setSelectedKeys(pathName);
  // }, [location.pathname]);

  const navigate = useNavigate();
  return (
   
      <div className={styles["SideMenu"]}>
      <Menu
        className={styles["SideMenuVertical"]}
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        // selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <AppstoreOutlined />,
            key: "/cart",
          },
          {
            label: "Courses",
            key: "/page/Courses",
            icon: <ShopOutlined />,
          },
          {
            label: "Trainers",
            key: "/cart/Trainers",
            icon: <UserOutlined/>,
          },
          {
            label: "Trainees",
            key: "/cart/Trainees",
            icon: <UserOutlined />,
          },
          {
            label: "Certificates",
            key: "/cart/Certificates",
            icon: <SafetyCertificateOutlined />
          },
        ]}
      ></Menu>
    </div>
    
  );
}

export default CartSidemenu;
