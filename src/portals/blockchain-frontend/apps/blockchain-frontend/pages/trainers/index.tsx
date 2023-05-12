import styles from './cart-page-trainers.module.css';
import { Button, Form, Table, Input, Modal } from 'antd';
import { AccountBookFilled, PlusOutlined } from '@ant-design/icons/lib/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import TrainersContainer from 'apps/blockchain-frontend/components/trainers-container/TrainersContainer';

// export function CartPageTrainers() {
//   const [firstval, setfirstnameval] = useState('');
//   const [lastval, setlastnameval] = useState('');
//   const [emailval, setemailval] = useState('');

//   const setFirstNameVal = (value: any) => {
//     setfirstnameval(value);
//   };
//   const setLastNameVal = (value: any) => {
//     setlastnameval(value);
//   };

//   const setEmailVal = (value: any) => {
//     setemailval(value);
//   };
//   const [data, setData2] = useState([
//     {
//       FirstName: firstval,
//       LastName: lastval,
//       EmailAddress: emailval,
//     },
//   ]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   // useEffect(() => {
//   //   getData(1);
//   // }, []);

//   // const getData =(page: number) =>{
//   //   setLoading(true);
//   //   axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/TrainerGetAPI?pageSize=5&PageNumber=1`)
//   //   .then((result)=>{
//   //     setData2(result.data);
//   //     setTotalPages(10)
//   //     setLoading(false)
//   //   })
//   //   .catch((error)=>{
//   //     console.log(error)
//   //   })
//   // }
//   const columns = [
//     {
//       key: '1',
//       title: 'FirstName',
//       dataIndex: 'FirstName',
//     },
//     {
//       key: '2',
//       title: 'LastName',
//       dataIndex: 'LastName',
//     },
//     {
//       key: '3',
//       title: 'EmailAddress',
//       dataIndex: 'EmailAddress',
//     },
//     {
//       key: '4',
//       title: 'Action',

//       render: (data) => {
//         return (
//           <>
//             <DeleteOutlined
//               onClick={() => {
//                 handleDelete(data.Id);
//                 setData2((pre) => {
//                   return pre.filter(
//                     (student) => student.FirstName != data.FirstName
//                   );
//                 });
//               }}
//               style={{ color: 'red', marginLeft: 4 }}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure to delete this trainer') == true) {
//       console.log(id);
//       axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}api/Trainer/${id}`);
//     }
//   };

//   const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     const newTrainer = {
//       FirstName: firstval,
//       LastName: lastval,
//       EmailAddress: emailval,
//     };
//     setData2((pre) => {
//       return [...pre, newTrainer];
//     });

//     const data = {
//       FirstName: firstval,
//       LastName: lastval,
//       EmailAddress: emailval,
//     };
//     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/Trainer`;
//     axios
//       .post(url, data)
//       .then((result) => {
//         alert(result.status);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };

//   return (
//     <div className={styles['container']}>
//       <div className={styles['content']}>
//         <Form>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: 'First name is required',
//               },
//             ]}
//             name={'First name'}
//             label=" First Name"
//           >
//             <Input
//               placeholder="First Name"
//               value={lastval}
//               onChange={(e) => {
//                 setFirstNameVal(e.target.value);
//               }}
//             />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: 'Last name is required',
//               },
//             ]}
//             name={'Last name'}
//             label=" Last Name"
//           >
//             <Input
//               placeholder="Last Name"
//               value={lastval}
//               onChange={(e) => {
//                 setLastNameVal(e.target.value);
//               }}
//             />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: 'Email  is required',
//               },
//             ]}
//             name={'Email Address'}
//             label="Email Address "
//           >
//             <Input
//               placeholder="Email Address"
//               value={emailval}
//               onChange={(e) => {
//                 setEmailVal(e.target.value);
//               }}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               htmlType="submit"
//               icon={<PlusOutlined />}
//               type="primary"
//               onClick={(e) => {
//                 handleSave(e);
//               }}
//             >
//               {' '}
//               Add a Trainers
//             </Button>
//           </Form.Item>
//         </Form>
//         <Table
//           loading={loading}
//           columns={columns}
//           dataSource={data}
//           pagination={{
//             pageSize: 3,
//             total: totalPages,
//             onChange: () => {},
//           }}
//         ></Table>
//       </div>
//     </div>
//   );
// }

// export default CartPageTrainers;
export default function CoursesPage() {
  return <TrainersContainer />;
}