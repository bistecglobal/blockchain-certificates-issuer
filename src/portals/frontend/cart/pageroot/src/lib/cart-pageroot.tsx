import styles from './cart-pageroot.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Courses} from '@loginform/cart/page/course'
// import {CartPageTrainees} from '@loginform/cart/page/trainees'
import {CartPageHome} from 'cart/page/home/src'
import {SharedUi} from 'shared/ui/src/lib/shared-ui'
import {CartPageTrainers} from '@loginform/cart/page/trainers'
import {CartPageCertificates} from '@loginform/cart/page/certificates'




/* eslint-disable-next-line */
export interface CartPagerootProps {}

export function CartPageroot(props: CartPagerootProps) {
  return (
    <div className={styles['container']}>
      <Routes>
      <Route path="/cart" element={<CartPageHome/>}></Route>
      <Route path="/cart/Courses" element={<Courses/>}></Route>
      <Route path="/cart/Trainers" element={<CartPageTrainers/>}></Route>
      <Route path="/cart/Certificates" element={<CartPageCertificates/>}></Route>
    </Routes>
    
    </div>
  );
}

export default CartPageroot;
