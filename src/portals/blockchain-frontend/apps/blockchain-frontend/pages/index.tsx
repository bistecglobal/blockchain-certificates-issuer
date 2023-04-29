import React from 'react';
import Login from '../components/login/Login';

function LoginPage() {
  return <Login />;
}

LoginPage.getLayout = function getLayout(LoginPage) {
  return <div>{LoginPage}</div>;
};

export default LoginPage;
