import styles from './cart.module.css';
import { Banner } from '@loginform/shared/ui';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CartProps {}

export function Cart(props: CartProps) {
  return (
    <div className={styles['container']}>
      <Banner text="Welcome to the cart." />
      <Link to="/">Continue Shopping</Link>
    </div>
  );
}

export default Cart;
