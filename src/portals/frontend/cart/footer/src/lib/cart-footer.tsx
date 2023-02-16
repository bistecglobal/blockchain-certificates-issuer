import styles from './cart-footer.module.css';

/* eslint-disable-next-line */
export interface CartFooterProps {}

export function CartFooter(props: CartFooterProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Footer!</h1>
    </div>
  );
}

export default CartFooter;
