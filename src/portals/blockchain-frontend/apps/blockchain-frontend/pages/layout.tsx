import React from 'react'
import SideMeu from '../components/sideMenu';


export default function RootLayout({ children }) {

    
    return (
        <div>
           
           <main>{children}</main> 
            <SideMeu/>
        
           
        </div>
    );
}

