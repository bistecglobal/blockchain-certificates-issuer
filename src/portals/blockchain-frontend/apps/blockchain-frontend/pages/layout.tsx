import React, { useState } from 'react';
import styles from './layout.module.css';
import {
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

export default function RootLayout({ children }) {
  const navigate = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-r from-blue-400  to-indigo-400 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <img src={'/bg.png'} alt="Logo" className="h-12" />
            </div>
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
          </div>
        </div>
      </nav>

      <div
        className={`bg-white md:z-20 z-20 text-gray-800 w-1/5 lg:w-auto ${
          isMenuOpen ? 'block' : 'hidden'
        } ${!isMenuOpen ? 'lg:block' : 'lg:hidden'} ${
          !isMenuOpen ? '' : 'fixed inset-0'
        }`}
      >
        <Menu
          className="bg-blue-400 lg:w-60 w-40 lg:h-[100vh] h-[100vh] fixed lg:mt-[70px] mt-[70px] text-white"
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

      <div className="lg:ml-60 ">{children}</div>
    </>
  );
}
