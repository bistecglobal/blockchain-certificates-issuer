import React from 'react'
import SideMenu from '../components/sidemenu/sidemenu';


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {
            }
            <head />
            <body>
                <SideMenu />
                {children}
            </body>
        </html>
    );
}
