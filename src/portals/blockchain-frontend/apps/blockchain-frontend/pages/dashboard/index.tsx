import styles from './cart-page-home.module.css';
import Layout from '../layout';

/* eslint-disable-next-line */
export interface CartPageHomeProps {}

export function CartPageHome(props: CartPageHomeProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        {/* <Layout title="/home"> </Layout> */}
        <h1>Welcome to Home Page</h1>
        <br />
        {/* <img
          className={styles['img']}
          src="dashboard.png"
          alt="dashboard"
          width={1000}
          height={500}
        /> */}
      </div>
    </div>
  );
}

export default CartPageHome;
