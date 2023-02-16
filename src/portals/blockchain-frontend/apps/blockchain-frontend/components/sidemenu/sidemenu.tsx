import styles from './cart-sidemenu.module.css';
import {
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/* eslint-disable-next-line */
export interface CartSidemenuProps {}

export function SideMenu(props: CartSidemenuProps) {
  // const location = useLocation();
  // const [selectedKeys, setSelectedKeys] = useState("/*");

  // useEffect(() => {
  //   const pathName = location.pathname;
  //   setSelectedKeys(pathName);
  // }, [location.pathname]);

  const navigate = useRouter();
  return (
   
      <div className={styles["SideMenu"]}>
      <Menu
        className={styles["SideMenuVertical"]}
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate.push(item.key);
        }}
        // selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Courses",
            key: "/courses",
            icon: <ShopOutlined />,
          },
          {
            label: "Trainers",
            key: "/trainers",
            icon: <UserOutlined/>,
          },
          {
            label: "Trainees",
            key: "/trainees",
            icon: <UserOutlined />,
          },
          {
            label: "Certificates",
            key: "/certificates",
            icon: <SafetyCertificateOutlined />
          },
        ]}
      ></Menu>
    </div>
    
  );
}

export default SideMenu;
