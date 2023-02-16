import styles from './cart-home.module.css';

/* eslint-disable-next-line */
export interface CartHomeProps {}

export function CartHome(props: CartHomeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Header!</h1>
    </div>
  );
}

export default CartHome;
