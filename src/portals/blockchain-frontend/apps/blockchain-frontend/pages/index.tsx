import React from 'react';
import Login from '../components/login/Login';
import Auth from '../components/auth/Auth';
function AuthPage() {
  return <Auth />;
}

AuthPage.getLayout = function getLayout(AuthPage) {
  return <div>{AuthPage}</div>;
};

export default AuthPage;
