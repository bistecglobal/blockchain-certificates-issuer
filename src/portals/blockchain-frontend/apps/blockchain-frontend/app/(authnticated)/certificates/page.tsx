"use client";
import styles from './cart-page-certificates.module.css';
import {Select,Form,Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import {DatePicker} from 'antd'
/* eslint-disable-next-line */
export interface CartPageCertificatesProps {}

export function CartPageCertificates(props: CartPageCertificatesProps) {
  const selectCourse =['c#',"java","python"]
  const selectTrainee =['chandima','dulanaka','chathura']
  const selectTrainer =['kamal','amal','bimal']
  const onFinish = (values:any)=>{
    console.log({values});
      }
  return (
    <div className={styles['container']}>
      <Form onFinish={onFinish}>
      <p>Select Course</p>
      <Select   placeholder='Select Course' style={{width:150}} >
        {selectCourse.map((Course,index)=>{
         return  <Select.Option
         key ={index} value={Course}>{Course}</Select.Option>
        })}
      </Select>
      <p>Select Trainee</p>
      <Select   placeholder='Select Trainee' style={{width:150}} >
        {selectTrainee.map((Trainee,index)=>{
         return  <Select.Option
         key ={index} value={Trainee}>{Trainee}</Select.Option>
        })}
      </Select>
      <p>Select Trainer</p>
      <Select   placeholder='Select Trainer' style={{width:150}} >
        {selectTrainer.map((Trainer,index)=>{
         return  <Select.Option
         key ={index} value={Trainer}>{Trainer}</Select.Option>
        })}
      </Select>
      <p>Select Certificate Issue Date</p>
     
        <div><DatePicker/></div>
      
      <p></p>
      <Form.Item>
      <Button htmlType="submit" icon={<PlusOutlined/>} type="primary"   onClick={()=>{

      }}>Issue Certificate</Button>
     </Form.Item>
     </Form>
    </div>
  );
}

export default CartPageCertificates;
