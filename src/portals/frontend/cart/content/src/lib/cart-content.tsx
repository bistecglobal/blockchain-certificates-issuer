import styles from './cart-content.module.css';
import {CartPageCourse} from '@loginform/cart/page/course'
import{CartPageTrainee} from '@loginform/cart/page/trainee'
import{CartPageroot} from '@loginform/cart/pageroot'

/* eslint-disable-next-line */
export interface CartContentProps {}

export function CartContent(props: CartContentProps) {
  return (
    <div className={styles['container']}>
      <CartPageCourse/>
      <CartPageroot/>
      {/* <CartPageTrainee/> */}
    </div>
  );
}

export default CartContent;

