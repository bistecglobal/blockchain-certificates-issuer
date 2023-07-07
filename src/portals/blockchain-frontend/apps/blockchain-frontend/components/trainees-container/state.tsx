import { createTrainee, deleteById, getTrainees } from "apps/blockchain-frontend/api/fetchData";
import { TraineeRequest, TraineeResponse } from "apps/blockchain-frontend/interfaces/viewModels";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { DefaultPagination } from "apps/blockchain-frontend/interfaces/enums";
import { Modal, message } from "antd";
import {ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';

export function useComponentState() {
    const [dataSource, setDataSource] = useState([]);
    
    const createNewTrainee = async (values) => {
      let trainer: TraineeRequest = {
          FirstName : values.firstName,
          LastName : values.lastName,
          EmailAddress : values.emailAddress,
          WalletAddress : values.walletAddress
      };
      const traineeRes = await createTrainee(trainer);
      if(traineeRes){
        message.success(`Course created successfully`);
        fetchTrainees(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        clearForm();
      }else{
        message.success(`Failed to create the course`);
      }
    };
  
    const validate = (values) => {
      const errors: {
        firstName?: string;
        lastName?: string;
        emailAddress?: string;
        walletAddress?: string;
      } = {};
  
      if (!values.firstName) {
        errors.firstName = 'Required';
      } 
  
      if (!values.lastName) {
        errors.lastName = 'Required';
      }
  
      if (!values.emailAddress) {
        errors.emailAddress = 'Required';
      }

      if (!values.walletAddress) {
        errors.walletAddress = 'Required';
      }
  
  
      return errors;
    };
  
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        walletAddress: ''
      },
      validate,
      onSubmit: createNewTrainee,
    });
  
    const fetchTrainees = async (pageNumber: number, pageSize: number) => {
      let trainerRes: TraineeResponse[]= [await getTrainees(pageNumber, pageSize)];
      if (Array.isArray(trainerRes)) {
        trainerRes = trainerRes.flat();
      }
      const formattedData = trainerRes.map((item) => {
        return { ...item,key : item.Id};
      });
      setDataSource(formattedData);
 
    };
  
    const handleDelete =( itemName, id) => {
      Modal.confirm({
        title: `Are you sure you want to delete this ${itemName}?`,
        icon: <ExclamationCircleOutlined />,
        onOk() {
        deleteById(id,itemName).then((success) => {
            if (success) {
              message.success(`${itemName} deleted successfully`);
              fetchTrainees(DefaultPagination.pageNumber, DefaultPagination.pageSize);
            } else {
              message.error(`Failed to delete ${itemName}`);
            }
          });
        },
        onCancel() { },
      });
    }  

    useEffect(() => {
      fetchTrainees(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    }, []);

    const clearForm = () => {
      formik.resetForm();
    };
    return { formik, handleDelete, dataSource, fetchTrainees };
  }
