import React from 'react'
import {Details} from '../components/details/details'
import SideMenu from '../components/sideMenu'


function LoginPage() {
  return (
    <Details/>
    
  )
}

LoginPage.getLayout = function getLayout(LoginPage) {
  return (
    <div>
    {LoginPage}
    {<SideMenu/>}
    </div>
  )
}

export default LoginPage