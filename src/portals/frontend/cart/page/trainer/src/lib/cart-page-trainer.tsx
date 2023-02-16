import styles from './cart-page-trainer.module.css';

/* eslint-disable-next-line */
export interface CartPageTrainerProps {}

export function CartPageTrainer(props: CartPageTrainerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CartPageTrainer!</h1>
    </div>
  );
}

export default CartPageTrainer;
