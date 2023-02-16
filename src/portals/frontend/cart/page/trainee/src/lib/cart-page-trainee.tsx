import styles from './cart-page-trainee.module.css';
import {Form} from 'antd'
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import {PlusOutlined} from '@ant-design/icons/lib/icons'

/* eslint-disable-next-line */
export interface CartPageTraineeProps {}

export function CartPageTrainee(props: CartPageTraineeProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['container']}>
     <Form>
      <Form.Item name ={"First name"} label=" First Name">
      <Input placeholder='First Name'/>
      </Form.Item>
      <Form.Item name ={"Last name"} label=" Last Name">
      <Input placeholder='Last Name'/>
      </Form.Item>
      <Form.Item name ={"Email Address"} label="Email Address">
      <Input placeholder='Email Address'/>
      </Form.Item>
      
     </Form>
     <Form.Item>
      <Button icon={<PlusOutlined/>} type="dashed" block  onClick={()=>{
        
      }}> Add a Trainee</Button>
     </Form.Item>
    </div>

    </div>
  );
}

export default CartPageTrainee;
