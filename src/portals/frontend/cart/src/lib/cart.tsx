import styles from './cart.module.css';
import { Banner } from '@loginform/shared/ui';
import { Link } from 'react-router-dom';
import { CartHome } from '@loginform/cart/home';
import { CartContent } from '@loginform/cart/content';
import { CartSidemenu } from '@loginform/cart/sidemenu';
import { CartFooter } from '@loginform/cart/footer';

/* eslint-disable-next-line */
export interface CartProps {}

export function Cart(props: CartProps) {
  return (
    <div className={styles['container']}>
      
      {/* <Link to="/">Continue Shopping</Link> */}
      <CartHome />
      <div className={styles["SideMenuAndPageContent"]}>
        <CartSidemenu></CartSidemenu>
       
      </div>
      <div className={styles["content"]}>
      <CartContent></CartContent>
      </div>
      
      <CartFooter/>
    </div>
  );
}

export default Cart;
