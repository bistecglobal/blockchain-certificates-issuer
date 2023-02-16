import styles from './cart-page-trainers.module.css';
import {Form} from 'antd'
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import {PlusOutlined} from '@ant-design/icons/lib/icons'

/* eslint-disable-next-line */
export interface CartPageTrainersProps {}

export function CartPageTrainers(props: CartPageTrainersProps) {

  const onFinish = (values:any)=>{
console.log({values});
  }

  return (
    <div className={styles['container']}>
      <div className={styles['store']}>
     <Form onFinish={onFinish}>
      <Form.Item 
      rules={[
        {
          required:true,
          message:"First name is required"
        }
      ]}
      name ={"First name"} 
      label=" First Name">
      <Input placeholder='First Name'/>
      </Form.Item>
      <Form.Item 
       rules={[
        {
          required:true,
          message:"Last name is required"
        }
      ]}
      name ={"Last name"} label=" Last Name">
      <Input placeholder='Last Name'/>
      </Form.Item>
      <Form.Item
       rules={[
        {
          required:true,
          message:"Email  is required"
        }
      ]}
       name ={"Email Address"} label="Email Address">
      <Input placeholder='Email Address'/>
      </Form.Item>
      
     
     <Form.Item>
      <Button htmlType="submit" icon={<PlusOutlined/>} type="primary"   onClick={()=>{

      }}> Add a Trainers</Button>
     </Form.Item>
     </Form>
    </div>
    </div>
  );
}

export default CartPageTrainers;
