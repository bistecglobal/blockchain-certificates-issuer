import React from 'react'
import SideMeu from '../components/sideMenu';


export default function RootLayout({ children }) {
    return (
        <div>
           <SideMeu/>
           <main>{children}</main> 
           
        </div>
    );
}

