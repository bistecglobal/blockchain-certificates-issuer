import styles from './Signup.module.css';
import React from 'react';
import { useComponentState } from './state';
export default function SignUp() {
  const { handleSignupFormSubmit } = useComponentState();
  const inputStyles = {
    padding: '7px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '15px',
    boxShadow: '0px 1px 0px #f78672',
    outline: 'none',
  };
  return (
    <div>
      <div className={styles['form-logo']}>
        <img className={styles['logo']} src={'/bg.png'} alt="" />
      </div>
      <h1 className={styles['form-heading']}>Sign Up</h1>

      <form onSubmit={handleSignupFormSubmit}>
        <input
          placeholder="Enter your email"
          type="email"
          name="email"
          style={{ ...inputStyles }}
        />
        <input
          placeholder="Enter your password"
          type="password"
          name="password"
          style={{ ...inputStyles }}
        />

        <div style={{ textAlign: 'center' }}>
          <button className={styles['btn-signin']} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
