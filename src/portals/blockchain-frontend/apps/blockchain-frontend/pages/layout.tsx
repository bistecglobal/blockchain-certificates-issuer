import React from 'react'
import {SideMenu} from '../components/sideMenu';


export default function RootLayout({ children }) {

    
    return (
        <div>
           
           <main>{children}</main> 
            <SideMenu/>
        
           
        </div>
    );
}

