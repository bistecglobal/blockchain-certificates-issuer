"use client";
import styles from './cart-page-certificates.module.css';
import {Select,Form,Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import {DatePicker} from 'antd'
import Input from 'antd/es/input';
import axios from 'axios';
import React,{useState} from 'react';
import moment from 'moment';
/* eslint-disable-next-line */
export interface CartPageCertificatesProps {}

export function CartPageCertificates(props: CartPageCertificatesProps) {
  const selectCourse =['c#',"java","python"]
  const selectTrainee =['chandima','dulanaka','chathura']
  const selectTrainer =['kamal','amal','bimal']

  const [courseval,setselectcourse]= useState("");
  const [traineeval,setselecttrainee]= useState("");
  const [trainerval,setselecttranier]= useState("");
  const [date, setDate] = React.useState(false);

  
  const setSelectCourse = (value) =>{
    setselectcourse(value);
};
  const setSelectTrainee  = (value) =>{
    setselecttrainee(value);
 };

  const setSelectTrainer = (value) =>{
    setselecttranier(value);
  };
  function setIssueDate (date,dateString){
    setDate(dateString);
  }
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
  const data ={
    Course: courseval,
    Trainee: traineeval,
    Trainer : trainerval,
    CertificateIssueDateDate: date
   
  };
  console.log("abc",data)
  const url ='http://localhost:7250/api/Certificate';
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  
}


  const onFinish = (values:any)=>{
    console.log({values});
      }
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
      <Form onFinish={onFinish}>
      <p>Select Course</p>
      <Select   placeholder='Select Course' style={{width:150}} value={courseval} onChange={(value) => {setSelectCourse(value) }}  >
        {selectCourse.map((Course,index)=>{ 
         return  <Select.Option 
         key ={index}  value={Course}>{Course}    </Select.Option> 
        })}
      </Select>
        
    
      <p>Select Trainee</p>
      <Select   placeholder='Select Trainee' style={{width:150}} value={traineeval} onChange={(value) => {setSelectTrainee(value) }}   >
        {selectTrainee.map((Trainee,index)=>{
         return  <Select.Option 
         key ={index} value={Trainee}>{Trainee}  </Select.Option>
        })}
      </Select>
      <p>Select Trainer</p>
      <Select   placeholder='Select Trainer' style={{width:150}} value={trainerval} onChange={(value) => {setSelectTrainer(value) }} >
        {selectTrainer.map((Trainer,index)=>{
         return  <Select.Option onChange={value => {setSelectTrainer(value) }}
         key ={index} value={Trainer}>{Trainer}   </Select.Option>
        })}
      </Select>
      <p>Select Certificate Issue Date</p>
     
        <div><DatePicker onChange={setIssueDate}/></div>
      
      <p></p>
      <Form.Item>
      <Button htmlType="submit" icon={<PlusOutlined/>} type="primary"   onClick={(e)=>{ handleSave(e) }}>Issue Certificate</Button>
     </Form.Item>
     </Form>
    </div>
    </div>
  );
}

export default CartPageCertificates;
