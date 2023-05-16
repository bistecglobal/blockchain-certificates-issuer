import styles from './Auth.module.css';
import React, { useState } from 'react';
import Login from '../login/Login';
import SignUp from '../signup/Signup';
//import { useComponentState } from './state';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['main-login']}>
        <div className={styles['login-contain']}>
          <div className={styles['left-side']}>
            {isRegister ? <SignUp /> : <Login />}
            <div className={styles['toggle-text']}>
              {isRegister ? (
                <span style={{ color: '#000' }}>
                  {'Already have an account? '}
                  <span
                    style={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                    onClick={toggleRegister}
                  >
                    Login here
                  </span>
                </span>
              ) : (
                <span style={{ color: '#000' }}>
                  {"Don't have an account? "}
                  <span
                    style={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                    onClick={toggleRegister}
                  >
                    Sign up now
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className={styles['right-side']}>
            <div className={styles['welcomeNote']}></div>
            <div className={styles['welcomeImg']}>
              <img src={'/image1.jpg'} id={styles['wel-img-id']} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
