"use client";
import styles from './cart-page-course.module.css';
import { Avatar, Rate, Space, Table, Typography } from "antd";
import {Form} from 'antd'
// import Input from 'antd/es/input';
import Button from 'antd/es/button';
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import axios from 'axios';
import React,{useState} from 'react';
import { Descriptions } from 'antd';
import {DatePicker} from 'antd'
import { Input } from 'antd';
import moment from 'moment';
/* eslint-disable-next-line */
export interface CartPageCourseProps {}

export function Courses(props: CartPageCourseProps) {
  const [firstval,setfirstnameval]= useState("");
  const [lastval,setlastnameval]= useState("");
  const [emailval,setemailval]= useState("");
  const { TextArea } = Input;
  const [startdate,setstartval] =useState([]);
  const [enddate,setendval] =useState([]);
  const [description,setdescriptionval] =useState("");
  
  const setFirstNameVal = (value:any) =>{
    setfirstnameval(value);
};
  const setStartVal  = (value:any) =>{
  setstartval(value);
 };

  const setEndVal = (value:any) =>{
      setendval(value);
  };
  const setDescriptionVal = (value:any) =>{
    setdescriptionval(value);
};
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
  const data ={
    FirstName: firstval,
    LastName: lastval,
    Email : emailval,
    StartDate: startdate,
    EndDate : enddate
   
  };
  console.log("abc",data)
  const url ='';
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  
}

  return (
    <div className={styles['container']}>
      
      <Typography>Courses</Typography>
      <Form >
      <Form.Item 
        
      rules={[
        {
          required:true,
          message:"Title is required"
        }
      ]}
      name ={"Course"} 
     
       >
      <Input placeholder='C#' value={firstval} 
      onChange={(e)=>{setFirstNameVal(e.target.value)}} />
      </Form.Item>
    
    
  
  <p>Start date</p>
     <Space>
     <div ><DatePicker onChange={(e)=>{

     const value1 = moment(e[0]).format('DD,MM,YYYY')
      setStartVal(value1)}}/></div>
     </Space>

     <p>End Date</p>
     <Space>
     <div ><DatePicker onChange={(e)=>setEndVal(e.toDate)} /></div>
     </Space>
     <p>Description</p>
     <TextArea rows={4} title="Description" name='Description' value={description} 
      onChange={(e)=>{setDescriptionVal(e.target.value)}} />
    <br />
    <br />
     <Form.Item>
      <Button htmlType="submit" icon={<PlusOutlined/>} type="primary"   onClick={(e)=>{ handleSave(e) }}> Add Courses</Button>
     </Form.Item>
     </Form>
    </div>
  );
}

export default Courses;
