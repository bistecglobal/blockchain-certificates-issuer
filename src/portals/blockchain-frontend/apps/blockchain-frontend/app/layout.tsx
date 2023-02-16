import React from 'react'
import SideMenu from '../components/sidemenu/sidemenu';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <SideMenu/>
  
        {children}
        <div >
      <h1>Welcome to Footer!</h1>
    </div>
      </section>
    );
  }

