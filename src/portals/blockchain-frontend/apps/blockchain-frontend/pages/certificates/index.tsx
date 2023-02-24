
import styles from './cart-page-certificates.module.css';
import {Select,Form,Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import {DatePicker} from 'antd'
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { exportComponentAsPNG } from "react-component-export-image";



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
  const [data,setData2] =useState([]);
  useEffect(()=>{
    getData();
  },[]);
  
  // const getData =() =>{
   
    // axios.get('http://localhost:7250/api/CourseGetAPI?pageSize=10&pageNumber=1')
    // .then((result)=>{
    //   // setData2(result.data);
    //   return fetch(result).then((res)=>res.json()).then((json)=>{
    //     console.log(json);
    //     setData2(json)
    //   })
        
      
      
      
  
    //   })
    // .catch((error)=>{
    //   console.log(error)
    // })
    const getData = () => {
      return fetch("http://localhost:7250/api/CourseGetAPI?pageSize=10&pageNumber=1")
            .then((response) => response.json())
            .then((data) => setData2(data));
    }
  // }

  
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
  const data ={
    Course: courseval,
    Trainee: traineeval,
    Trainer : trainerval,
    CertificateIssueDateDate: date
   
  };

  const url ='http://localhost:7250/api/Certificate';
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  
}


  const certificateWrapper = React.createRef<HTMLDivElement>();
    
   
  // function exportComponentAsPNG(certificateWrapper: React.RefObject<HTMLDivElement>) {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
      <Form >
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
     {/* <Button type="primary" icon={<DownloadOutlined />} onClick={pdfGenerate}>
            Download
          </Button> */}

      <div className={styles['Meta']}>
      <div className={styles['certificateWrapper']} ref={certificateWrapper}>
        <p className={styles['p1']}>{courseval}</p>
        <p className={styles['p2']}>{traineeval}</p>
        <p className={styles['p3']}>{date}</p>
        <img src="https://i.imgur.com/km7ATll.png" width={500} height={500} alt="" />

        
        </div>  
        </div>
        <br/><br/>

        <Button type="primary" icon={<DownloadOutlined />} 
        onClick={(e)=>{
          e.preventDefault();
         exportComponentAsPNG(certificateWrapper)
          }}>
            Download
          </Button>
          
     </Form>
    </div>
    </div>
  );
}

export default CartPageCertificates;
