import styles from './cart-pageroot.module.css';
import {CartPageHome} from 'cart/page/home/src'
import {SharedUi} from 'shared/ui/src/lib/shared-ui'
import {CartPageTrainee} from '@loginform/cart/page/trainee'
import {CartPageCourse} from '@loginform/cart/page/course'
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* eslint-disable-next-line */
export interface CartPagerootProps {}

export function CartPageroot(props: CartPagerootProps) {
  return (
    <div className={styles['container']}>
      <Routes>
      <Route path="/cart" element={<CartPageHome/>}></Route>
      <Route path="/cart/Course" element={<CartPageCourse/>}></Route>
      <Route path="/cart/Trainee" element={<CartPageTrainee/>}></Route>
      
    </Routes>

    </div>
  );
}

export default CartPageroot;
