import styles from './Auth.module.css';
import React, { useState } from 'react';
import Login from '../login/Login';
import SignUp from '../signup/Signup';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  const userMessage = isRegister ? 'Already have an account?' : "Don't have an account?";
  const linkContent = isRegister ? 'Login here' : 'Sign up now';
  const title = isRegister ? 'Sign up' : 'Login';

  const onClickHandler = () => toggleRegister();

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <div className="text-center">
          <img src={'/bg.png'} alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-6">{title}</h1>
        </div>
        {isRegister ? <SignUp /> : <Login />}
        <p className="px-6 pt-6">
          {userMessage}{' '}
          <a onClick={onClickHandler} className="text-blue-500 hover:underline cursor-pointer">
            {linkContent}{' '}
          </a>
        </p>
      </div>
    </div>
  );
}
