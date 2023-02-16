import styles from './cart-header.module.css';

/* eslint-disable-next-line */
export interface CartHeaderProps {}

export function CartHeader(props: CartHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CartHeader!</h1>
    </div>
  );
}

export default CartHeader;
