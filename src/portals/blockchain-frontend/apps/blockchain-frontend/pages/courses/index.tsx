
import styles from './cart-page-course.module.css';
import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import {Form} from 'antd'
import {PlusOutlined} from '@ant-design/icons/lib/icons'
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {DatePicker,DatePickerProps,Alert} from 'antd'
import { Input } from 'antd';
import {DeleteOutlined} from '@ant-design/icons'



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
const [data,setData2] =useState([
  {
    Title: titleval,
    Details: description,
    StartDate: startdate,
    EndDate : enddate
  }

]);
const [totalPages, setTotalPages] =useState(1);
const [loading, setLoading]=useState(false);

useEffect(()=>{
  getData(1);
},[]);

const getData =(page:number) =>{
  setLoading(true)
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/CourseGetAPI?pageSize=10&pageNumber=1`)
  .then((result)=>{
    setData2(result.data)
    setTotalPages(10);
    setLoading(false);
  })
  .catch((error)=>{
    console.log(error)
  })
}



const columns=[
  {
    key:'1',
    title:'Title',
    dataIndex:'Title'
  },
  {
    key:'2',
    title:'Description',
    dataIndex:'Details'
  },
  {
    key:'3',
    title:'StartDate',
    dataIndex:'StartDate'
  },
  {
    key:'4',
    title:'EndDate',
    dataIndex:'EndDate'
  },
  {
    key:'4',
    title:'Action',
 
    render:(data)=>{
      return<>
      <DeleteOutlined onClick={()=>{
        handleDelete(data.Id)
        setData2((pre)=>{ 
          return pre.filter(student=>student.Title != data.Title)});
      }} style ={{color:"red",marginLeft:4}}/>
      </>
    }

  }
]
const handleDelete =(id)=>{
  if(window.confirm("Are you sure to delete this trainer")==true){
    console.log(id);
    axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}api/Course/${id}`)
  }
}
  
  const handleSave =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    const newCourse ={
      Title: titleval,
      Details: description,
      StartDate: startdate,
      EndDate : enddate
    }
    setData2(pre=>{
      return[...pre,newCourse]
    })
  const data ={
    Title: titleval,
    Details: description,
    StartDate: startdate,
    EndDate : enddate
   
  };

  const url =`${process.env.NEXT_PUBLIC_BASE_URL}api/Course`;
  axios.post(url,data).then((result)=>{
  
     alert(result.status);

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
     <div ><DatePicker onChange={setStartDate} style={{width:500}} /></div>
     </Space>

     <p>End Date</p>
     <Space>
     <div ><DatePicker style={{width:500}}
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

     <Table 
     loading={loading} columns={columns} dataSource={data}
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

export default Courses;
