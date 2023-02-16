// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import Details from './details/details';
import { Cart } from '@loginform/cart';
import {Routes , Route} from 'react-router-dom'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Details />}></Route>
        <Route path="/cart/*" element={<Cart />}></Route>
      </Routes>
    </>
  );
}

export default App;
