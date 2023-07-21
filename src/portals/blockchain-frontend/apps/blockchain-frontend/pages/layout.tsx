import React, { useState } from 'react';
import styles from './layout.module.css';
import {
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router'

export default function RootLayout({ children }) {
  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white text-gray-800 py-4 px-6 flex justify-between items-center">
        <img src={'/bg.png'} alt="Logo" className="h-12" />
        <div className="lg:hidden">
          <button
            className="p-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1">

        <div
          className={`bg-white text-gray-800 w-1/5 lg:w-auto ${isMenuOpen ? 'block' : 'hidden'
            } ${!isMenuOpen ? 'lg:block' : 'lg:hidden'} ${!isMenuOpen ? '' : 'fixed inset-0'}`}
        >

          <Menu
            mode="vertical"
            onClick={(item) => {
              navigate.push(item.key);
            }}
            items={[
              {
                label: 'Home',
                icon: <AppstoreOutlined />,
                key: '/dashboard',
              },
              {
                label: 'Courses',
                key: '/courses',
                icon: <ShopOutlined />,
              },
              {
                label: 'Trainers',
                key: '/trainers',
                icon: <UserOutlined />,
              },
              {
                label: 'Trainees',
                key: '/trainees',
                icon: <UserOutlined />,
              },
              {
                label: 'Certificates',
                key: '/certificates',
                icon: <SafetyCertificateOutlined />,
              },
              {
                label: 'Logout',
                key: '/',
                icon: <LogoutOutlined />,
              },
            ]}
          ></Menu>
        </div>
        <div className="flex-0 bg-gray-100 flex-1">
          <div className="p-4">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
