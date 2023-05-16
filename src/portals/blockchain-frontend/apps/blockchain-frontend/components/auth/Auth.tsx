import styles from './Auth.module.css';
import React, { useState } from 'react';
import Login from '../login/Login';
import SignUp from '../signup/Signup';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleText1 = isRegister
    ? 'Already have an account?'
    : "Don't have an account?";
  const toggleText2 = isRegister ? 'Login here' : 'Sign up now';

  const onClickHandler = () => toggleRegister();

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
              <span style={{ color: '#000' }}>
                {toggleText1}
                <span
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: 'blue',
                  }}
                  onClick={onClickHandler}
                >
                  {toggleText2}
                </span>
              </span>
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
