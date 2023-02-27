
import styles from './cart-page-trainees.module.css';
import {Button, Form,Input,Result,Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {DeleteOutlined} from '@ant-design/icons'


export interface CartPageTraineesProps {}

export function CartPageTrainees(props: CartPageTraineesProps) {
  const [firstval,setfirstnameval]= useState("");
  const [lastval,setlastnameval]= useState("");
  const [emailval,setemailval]= useState("");


  const [data , setData2] =useState([{
    FirstName:firstval,
    LastName:lastval,
    EmailAddress:emailval
  }]);

const [totalPages, setTotalPages] =useState(1);
const [loading, setLoading]=useState(false);

  useEffect(()=>{
    getData(1);
  },[])

  const getData =async(page:number) =>{
    setLoading(true)
   const result = await  axios.get('http://localhost:7250/api/TraineeGetAPI?pageSize=10&PageNumber=1');
   setData2(result.data)
   setTotalPages(10);
   setLoading(false);
  }

  

  
  const setFirstNameVal = (value:any) =>{
    setfirstnameval(value);
};
  const setLastNameVal  = (value:any) =>{
  setlastnameval(value);
 };

  const setEmailVal = (value:any) =>{
      setemailval(value);
  };

  const columns =[
    {
      key:'1',
      title:'FirstName',
      dataIndex:'FirstName'
    },
    {
      key:'2',
      title:'LastName',
      dataIndex:'LastName'
    },
    {
      key:'3',
      title:'EmailAddress',
      dataIndex:'EmailAddress'
    },
    {
      key:'4',
      title:'Action',
  
      render:(data)=>{
        return<>
        <DeleteOutlined onClick={()=>{
          handleDelete(data.Id)
          setData2((pre)=>{ 
            return pre.filter(student=>student.FirstName != data.FirstName)});
        }} style ={{color:"red",marginLeft:4}}/>
        </>
      }

    }
  ]
  const handleDelete =(id)=>{
    if(window.confirm("Are you sure to delete this trainer")==true){
      console.log(id);
      axios.delete(`http://localhost:7250/api/Trainee/${id}`)
    }
  }
   
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    const newTrainee ={
      
      FirstName:firstval,
      LastName:lastval,
      EmailAddress:emailval
    }
    setData2(pre=>{
      return[...pre,newTrainee]
    })

  const data ={
    FirstName: firstval,
    LastName: lastval,
    EmailAddress : emailval
   
  };
  console.log("abc",data)
  const url ='http://localhost:7250/api/Trainee';
  axios.post(url,data).then((result)=>{
  
     alert(result.status)

  }).catch((error)=>{
    alert(error);
  });
}

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
      <Form >
      <Form.Item 
        
      rules={[
        {
          required:true,
          message:"First name is required"
        }
      ]}
      name ={"First name"} 
      label=" First Name"  >
      <Input placeholder='First Name' value={firstval} 
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
      <Button htmlType="submit" icon={<PlusOutlined/>} type="primary"   onClick={(e)=>{ handleSave(e) }}> Add a Trainee</Button>
     </Form.Item>
     </Form>
     <Table 
      loading={loading} columns={columns} dataSource ={data}
      pagination={{
        pageSize:3,
        total:totalPages,
        onChange:(page)=>{
          getData(page=1)
        }
       }} >
      
     </Table>
    </div>
    </div>
  );
}

export default CartPageTrainees;
