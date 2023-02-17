"use client";
import styles from './cart-page-trainers.module.css';
import {Form} from 'antd'
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import axios from 'axios';
import React,{useState} from 'react';


/* eslint-disable
-next-line */
export interface CartPageTrainersProps {}

export function CartPageTrainers(props: CartPageTrainersProps) {
  const [firstval,setfirstnameval]= useState("");
  const [lastval,setlastnameval]= useState("");
  const [emailval,setemailval]= useState("");
  
  const setFirstNameVal = (value:any) =>{
    setfirstnameval(value);
};
  const setLastNameVal  = (value:any) =>{
  setlastnameval(value);
 };

  const setEmailVal = (value:any) =>{
      setemailval(value);
  };
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
  const data ={
    FirstName: firstval,
    LastName: lastval,
    Email : emailval,
   
  };
  console.log("abc",data)
  const url ='';
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  
}

  const onFinish = (values:any)=>{
      
  }

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
      
     <Form onFinish={onFinish}>
      <Form.Item 
        
      rules={[
        {
          required:true,
          message:"First name is required"
        }
      ]}
      name ={"First name"} 
      label=" First Name"  >
      <Input placeholder='First Name' value={lastval} 
      onChange={(e)=>{setFirstNameVal(e.target.value)}} />
      </Form.Item>
      <Form.Item 
       rules={[
        {
          required:true,
          message:"Last name is required"
        }
      ]}
      name ={"Last name"} label=" Last Name" >
      <Input placeholder='Last Name'value={lastval} 
      onChange={(e)=>{setLastNameVal(e.target.value)}}/>
      </Form.Item>
      <Form.Item
       rules={[
        {
          required:true,
          message:"Email  is required"
        }
      ]}
       name ={"Email Address"} label="Email Address "  >
      <Input placeholder='Email Address' value={emailval} 
       onChange={(e)=>{setEmailVal(e.target.value)}}/>
      </Form.Item>
      
     
     <Form.Item>
      <Button htmlType="submit" icon={<PlusOutlined/>} type="primary"   onClick={(e)=>{ handleSave(e) }}> Add a Trainers</Button>
     </Form.Item>
     </Form>
    </div>
    </div>
  );
}

export default CartPageTrainers;

