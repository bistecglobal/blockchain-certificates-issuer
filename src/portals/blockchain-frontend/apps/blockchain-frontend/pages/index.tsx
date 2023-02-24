import React from 'react'
import {Details} from '../components/details/details'


function LoginPage() {
  return (
    <Details/>
    
  )
}

LoginPage.getLayout = function getLayout(LoginPage) {
  return (
    <div>
    {LoginPage}
    </div>
  )
}

export default LoginPage