import styles from './cart-page-home.module.css';

/* eslint-disable-next-line */
export interface CartPageHomeProps {}

export function CartPageHome(props: CartPageHomeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CartPageHome!</h1>
    </div>
  );
}

export default CartPageHome;
