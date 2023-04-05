import styles from './details.module.css';
import React from 'react';
import { useRouter } from 'next/router';

type user = {
  Id: string;
  Type: string;
  Email: string;
  Password: string;
};

export function Details() {
  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Email: e.target.email.value,
      Password: e.target.password.value,
    };

    const header = new Headers();
    header.append('Content-Type', 'application/json');
    const options: RequestInit = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(formData),
    };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`;

    console.log(options);

    try {
      const response = await fetch(url, options);
      const data = (await response.json()) as user;
      if (data) {
        navigate.push('/dashboard');
      }
    } catch (error) {
      console.error('Oh no, Error occured!', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['main-login']}>
        <div className={styles['login-contain']}>
          <div className={styles['left-side']}>
            <div className={styles['img-class']}>
              <img src={'/bg.png'} id={styles['img-id']} alt="" />
            </div>
            <h1 className={styles['sign']}>Sign In</h1>
            <form onSubmit={handleSubmit}>
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

export default Details;
