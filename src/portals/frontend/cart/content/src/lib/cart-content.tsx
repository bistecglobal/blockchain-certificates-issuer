import styles from './cart-content.module.css';
import {CartPageroot} from '@loginform/cart/pageroot'
import {CartPageTrainers} from '@loginform/cart/page/trainers'
import {CartPageCertificates} from '@loginform/cart/page/certificates'


import { BrowserRouter, Route, Routes } from "react-router-dom";
// import {CartPageCourse} from '@loginform/cart/page/course'
// import {CartPageTrainees} from '@loginform/cart/page/trainees'
// import {CartPageHome} from '@loginform/cart/page/home'
/* eslint-disable-next-line */
export interface CartContentProps {}

export function CartContent(props: CartContentProps) {
  return (
    <div className={styles['container']}>
      <CartPageTrainers/> 
      {/* <CartPageCertificates/> */}
      <CartPageroot/>
      
      
      
    </div>
  );
}

export default CartContent;
