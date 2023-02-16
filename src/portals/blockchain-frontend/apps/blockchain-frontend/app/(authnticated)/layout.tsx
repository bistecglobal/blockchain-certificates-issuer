import React from 'react'
import SideMenu from '../../components/sidemenu/sidemenu';


export default function RootLayout({ children }) {
    return (
        <div>
            <SideMenu />
            {children}
        </div>
    );
}

