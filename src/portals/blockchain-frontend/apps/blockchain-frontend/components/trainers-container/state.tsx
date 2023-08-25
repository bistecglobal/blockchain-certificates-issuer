import { createTrainer, deleteById, getTrainers } from "apps/blockchain-frontend/api/fetchData";
import { TrainerRequest, TrainerResponse } from "apps/blockchain-frontend/interfaces/viewModels";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { DefaultPagination } from "apps/blockchain-frontend/interfaces/enums";
import { Modal, message } from "antd";
import {ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import { useRouter } from 'next/router';

export function useComponentState() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isCancelDisable, setIsCancelDisable] = useState(true);
    const router = useRouter();
    const { query } = router;
    const id = query.id || null
  
    const createNewTrainer = async (values) => {
      const trainer: TrainerRequest = {
          FirstName : values.firstName,
          LastName : values.lastName,
          EmailAddress : values.emailAddress
      };
      const trainerRes = await createTrainer(trainer);
      if(trainerRes){
        message.success(`Trainer created successfully`);
        fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
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
      } = {};
  
      if (!values.firstName) {
        errors.firstName = 'First Name is required';
      } 
  
      if (!values.lastName) {
        errors.lastName = 'Last Name is required';
      }
  
      if (!values.emailAddress) {
        errors.emailAddress = 'Email is required';
      }
  
      setIsCancelDisable(false);
      return errors;
    };
  
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        emailAddress: '',
      },
      validate,
      onSubmit: createNewTrainer,
    });
  
    const fetchTrainers = async (pageNumber: number, pageSize: number) => {
      setLoading(true);
      let trainerRes: TrainerResponse[]= [await getTrainers(pageNumber, pageSize)];
      if (Array.isArray(trainerRes)) {
        trainerRes = trainerRes.flat();
      }
      const formattedData = trainerRes.map((item) => {
        return { ...item,key : item.Id};
      });
      setLoading(false);
      setDataSource(formattedData);
 
    };
    useEffect(() => {
      fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    }, []);  
    
    const handleDelete =( itemName, id) => {
      Modal.confirm({
        title: `Are you sure you want to delete this ${itemName}?`,
        icon: <ExclamationCircleOutlined />,
        onOk() {
        deleteById(id,itemName).then((success) => {
            if (success) {
              message.success(`${itemName} deleted successfully`);
              fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
            } else {
              message.error(`Failed to delete ${itemName}`);
            }
          });
        },
        onCancel() { },
      });
    }  
    const confirmCancel = () => {
      if (!id) {
        clearForm();
      } 
  
      setIsCancelModalOpen(false);
      setIsCancelDisable(true);
    };
    const handleCancel = () => {
      setIsCancelModalOpen(true);
    };
    const closeModalOpen = () => {
      setIsCancelModalOpen(false);
    };
    const clearForm = () => {
      formik.resetForm();
    };
    return { formik,isCancelModalOpen,isCancelDisable,handleCancel,closeModalOpen,confirmCancel, handleDelete, dataSource, fetchTrainers, loading,id };
  }
