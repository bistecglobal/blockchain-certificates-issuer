
import styles from './cart-page-certificates.module.css';
import {Select,Form,Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import {DatePicker} from 'antd'
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import {exportComponentAsPNG } from "react-component-export-image";
import { EthProvider } from 'apps/blockchain-frontend/contexts/EthContext';
import BlockchainVerifier from 'apps/blockchain-frontend/components/blockchain-verifier/BlockchainVerifier';
import FormItem from 'antd/es/form/FormItem';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

// export interface CartPageCertificatesProps {}

export function CartPageCertificates() {

  

  const [courseval,setselectcourse]= useState("");
  const [traineeval,setselecttrainee]= useState("");
  const [trainerval,setselecttranier]= useState("");
  const [date, setDate] = React.useState(false);

  const navigate =useRouter();

  const certificateWrapper = React.createRef<HTMLDivElement>();

  
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
  
  const getData =() =>{
   
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/CourseGetAPI?pageSize=10&pageNumber=1`)
    .then((result)=>{
      setData2(result.data);
     console.log(result);
       
      })
    .catch((error)=>{
      console.log(error)
    })  
  }
  const [datatrinee,setDataTrainee] =useState([]);
  useEffect(()=>{
    getDataTrainee();
  },[]);
  
  const getDataTrainee =() =>{
   
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/TraineeGetAPI?pageSize=10&PageNumber=1`)
    .then((result)=>{
      setDataTrainee(result.data);
     console.log(result);
       
      })
    .catch((error)=>{
      console.log(error)
    })  
  }
  const [datatriner,setDataTrainer] =useState([]);
  useEffect(()=>{
    getDataTrainer();
  },[]);
  
  const getDataTrainer =() =>{
   
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/TrainerGetAPI?pageSize=5&PageNumber=1`)
    .then((result)=>{
      setDataTrainer(result.data);
     console.log(result);
       
      })
    .catch((error)=>{
      console.log(error)
    })  
  }


  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
  const data ={
    Course: courseval,
    Trainee: traineeval,
    Trainer : trainerval,
    CertificateIssueDateDate: date
   
  };

  const url =`${process.env.NEXT_PUBLIC_BASE_URL}api/Certificate`;
  axios.post(url,data).then((result)=>{
     alert(result.data);

  }).catch((error)=>{
    alert(error);
  });
  }
 

  return (
    <div>
      
    <EthProvider>
      <BlockchainVerifier setValue={undefined}/>
      </EthProvider>
    <div className={styles['container']}>
      <div className={styles['content']}>
      <Form >
      <p>Select Course</p>
      <Select   placeholder='Select Course' style={{width:150}} value={courseval} onChange={(value) => {setSelectCourse(value) }}  >
        {data.map((course,index)=>(
           <Select.Option 
         key={index} value={course.Title}>{course.Title}</Select.Option> 
        ))}
      </Select>
        
    
      <p>Select Trainee</p>
      <Select   placeholder='Select Trainee' style={{width:150}} value={traineeval} onChange={(value) => {setSelectTrainee(value) }}   >
        {datatrinee.map((trainee,index)=>(
           <Select.Option 
         key ={index} value={trainee.FirstName} >{trainee.FirstName}  </Select.Option>
        ))}
      </Select>
      <p>Select Trainer</p>
      <Select   placeholder='Select Trainer' style={{width:150}} value={trainerval} onChange={(value) => {setSelectTrainer(value) }} >
      {datatriner.map((trainer,index)=>(
           <Select.Option 
         key ={index} value={trainer.FirstName} >{trainer.FirstName}  </Select.Option>
        ))}
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
       
        <Button style={{position:'absolute',
                width:110,
                left:"98%",
                top:"120%"         
        
      }} type="primary" icon={<DownloadOutlined />} 
        onClick={async (e)=>{
          e.preventDefault();
          const { exportComponentAsPNG } = await import('react-component-export-image')
         exportComponentAsPNG(certificateWrapper)
          }}>
            Download
          </Button>
        
     </Form>
    </div>
    </div>
    </div>
   
  );
}

export default CartPageCertificates;
