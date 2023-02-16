"use client";
import styles from './details.module.css';
import  Link  from 'next/link';
import { Button, Checkbox, Form, Input, Result } from 'antd';

import axios from 'axios';

import React,{useState} from 'react';


/* eslint-disable-next-line */
export interface DetailsProps {}

export function Details(props: DetailsProps) {
  const [emailval,setemailval]= useState("");
  const [passval,setpassval]= useState("");

  const setEmailVal = (value:any) =>{
      setemailval(value);
  };
  const setPassVal = (value:any) =>{
    setpassval(value);
};
const handleSave =()=>{
  const data ={
    Email : emailval,
    Password : passval
  };

  const url ='';
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  
}
 
  return (
  
    <div className={styles['container']}>
      <div className={styles['main-login']}>
      
                <div className={styles["login-contain"]}>
                  
                 <div className={styles["left-side"]}>
  
                         <div className={styles["img-class"]}>
                              <img src={"/bg.png"} id={styles["img-id"]} alt=""  />

                          </div>
                          <h1 className={styles["sign"]}>Sign In</h1>
                        <form >
                        <label htmlFor="emil1">Email</label>
                            <input placeholder="Enter your email..." type="email" value={emailval} 
                            onChange={(e)=>{setEmailVal(e.target.value)}}  id={styles["emil1"]}/>
                        <label htmlFor="pwd1">Password</label>
                            <input placeholder="Enter password" type="password" autoComplete="false"
                             value={passval} onChange={(e)=>{setPassVal(e.target.value)}}
                           
                             id={styles["pwd1"]}/>
                            <button type="submit" id={styles["sub_butt"]} onClick={()=> handleSave()}>Login</button>
                            {/* <Link className={styles['link']} to='/Register'>Login</Link> */}
                         </form>

                        

                 </div>
                  <div className={styles["right-side"]}>
                    <div className={styles["welcomeNote"]}>
                        <h3>Welcome to Bistec Global</h3>
                        
                    </div>
                    <div className={styles["welcomeImg"]}>
                        <img src={"/images.png"} id={styles['wel-img-id']} alt=""  />
                    </div>
                  </div>

                </div>
       </div>
      
      {/* <Form
    name="basic"
    
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
      <Link to="/cart">Button </Link>
      </Button>
    </Form.Item>
  </Form> */}

   </div>
  );
}

export default Details;

{/* <div className={styles['container']}> */}
