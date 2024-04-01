import styles from './Auth.module.css';
import React, { useState } from 'react';
import Login from '../login/Login';
import SignUp from '../signup/Signup';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  const userMessage = isRegister
    ? 'Already have an account?'
    : "Don't have an account?";
  const linkContent = isRegister ? 'Login here' : 'Sign up now';
  const title = isRegister ? 'Sign up' : 'Login';

  const onClickHandler = () => toggleRegister();

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div className="bg-gray-100 py-4">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-md w-96">
          <div className="text-center">
            <img src={'/bg.png'} alt="Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-6">{title}</h1>
          </div>
          {isRegister ? (
            <SignUp updateIsRegister={toggleRegister} />
          ) : (
            <Login />
          )}
          <p className="px-6 pt-6">
            {userMessage}{' '}
            <a
              onClick={onClickHandler}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {linkContent}{' '}
            </a>
          </p>
          <a
            href="https://razor-certificate-app.azurewebsites.net/verifier"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Verify Credentials
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
