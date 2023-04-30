import styles from './Login.module.css';
import React from 'react';
import { useLoginState } from './loginState';

export default function Login() {
  const { handleLoginFormSubmit } = useLoginState();

  return (
    <div className={styles['container']}>
      <div className={styles['main-login']}>
        <div className={styles['login-contain']}>
          <div className={styles['left-side']}>
            <div className={styles['img-class']}>
              <img src={'/bg.png'} id={styles['img-id']} alt="" />
            </div>
            <h1 className={styles['sign']}>Sign In</h1>
            <form onSubmit={handleLoginFormSubmit}>
              <label htmlFor="emil1">Email</label>
              <input placeholder="Enter your email" type="email" name="email" />
              <label htmlFor="pwd1">Password</label>
              <input
                placeholder="Enter password"
                type="password"
                name="password"
              />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className={styles['right-side']}>
            <div className={styles['welcomeNote']}>
              <h3>Welcome to Bistec Global</h3>
            </div>
            <div className={styles['welcomeImg']}>
              <img src={'/images.png'} id={styles['wel-img-id']} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
