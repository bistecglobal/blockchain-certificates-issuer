"use client";
import styles from './cart-page-course.module.css';
import { Avatar, Rate, Space, Table, Typography } from "antd";
import {Form} from 'antd'
import Button from 'antd/es/button';
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import axios from 'axios';
import React,{useState} from 'react';
import { Descriptions } from 'antd';
import {DatePicker,DatePickerProps,Alert} from 'antd'
import { Input } from 'antd';
import moment from 'moment';
import { format } from 'path';

/* eslint-disable-next-line */
export interface CartPageCourseProps {}

export function Courses(props: CartPageCourseProps) {
  const [titleval,setcourseval]= useState("");
  const { TextArea } = Input;
 
  const [startdate, setDateS] = React.useState(false);
  const [enddate, setDateE] = React.useState(false);
  const [description,setdescriptionval] =useState("");


  const setCourseVal = (value:any) =>{
    setcourseval(value);
};
function setStartDate(startdate, dateString) {
  setDateS(dateString);
}

  function setEndDate(enddate, dateString) {
    setDateE(dateString);
  }
  const setDescriptionVal = (value:any) =>{
    setdescriptionval(value);
};
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
  const data ={
    Title: titleval,
    Details: description,
    StartDate: startdate,
    EndDate : enddate
   
  };
  console.log("abc",data)
  const url ='http://localhost:7250/api/Course';
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  
}

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
      
      
     
      <Form  >
      <p>Course</p>
      <Form.Item 
        
      rules={[
        {
          required:true,
          message:"Title is required"
        }
      ]}
       
     
       >
      <Input placeholder='C#' value={titleval} 
      onChange={(e)=>{setCourseVal(e.target.value)}} />
      </Form.Item>
    
    
  
  <p>Start date</p>
     <Space>
     <div ><DatePicker onChange={setStartDate}/></div>
     </Space>

     <p>End Date</p>
     <Space>
     <div ><DatePicker 
      // const value1 = moment(e[0]).format('DD,MM,YYYY')
      onChange={setEndDate}
       />
       </div>
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
    </div>
  );
}

export default Courses;
