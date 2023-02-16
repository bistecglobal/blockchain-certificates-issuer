import styles from './cart.module.css';
import { Banner } from '@loginform/shared/ui';
import { Link } from 'react-router-dom';
import {CartHeader} from '@loginform/cart/header'
import{CartContent} from '@loginform/cart/content'
import{CartFooter} from '@loginform/cart/footer'
import{CartPageroot} from '@loginform/cart/pageroot'
import{CartSidemenu} from '@loginform/cart/sidemenu'

/* eslint-disable-next-line */
export interface CartProps {}

export function Cart(props: CartProps) {
  return (
    <div className={styles['container']}>
      <CartHeader/>
      
      <div className={styles["SideMenuAndPageContent"]} >
      <CartSidemenu/>
      <CartContent/>
      </div>

      <CartFooter/>
      
      
      

    </div>
  );
}

export default Cart;
