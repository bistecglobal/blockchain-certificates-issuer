import { createTrainee, deleteById, getTrainees } from "apps/blockchain-frontend/api/fetchData";
import { PaginationResponse, TraineeRequest, TraineeResponse } from "apps/blockchain-frontend/interfaces/viewModels";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { DefaultPagination } from "apps/blockchain-frontend/interfaces/enums";
import { Modal, message } from "antd";
import {ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';

export function useComponentState() {
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemType, setDeleteItemType] = useState(null);
    
    const createNewTrainee = async (values) => {
      let trainer: TraineeRequest = {
          FirstName : values.firstName,
          LastName : values.lastName,
          EmailAddress : values.emailAddress,
          WalletAddress : values.walletAddress
      };
      const traineeRes = await createTrainee(trainer);
      if(traineeRes){
        message.success(`Trainee created successfully`);
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
        errors.firstName = 'First name is required';
      } 
  
      if (!values.lastName) {
        errors.lastName = 'Last name is required';
      }
  
      if (!values.emailAddress) {
        errors.emailAddress = 'Email address is required';
      }

      if (!values.walletAddress) {
        errors.walletAddress = 'Wallet Address is required';
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

    const handlePaginationChange = (pageNumber: number, pageSize: number | undefined) => {
      fetchTrainees(pageNumber, pageSize ?? DefaultPagination.pageSize);
    };
  
    const fetchTrainees = async (pageNumber: number, pageSize: number) => {
      setLoading(true);
      let response: PaginationResponse = await getTrainees(pageNumber, pageSize);
      let trainerRes = response.Items;
      setTotal(response.Total);
      if (Array.isArray(trainerRes)) {
        trainerRes = trainerRes.flat();
      }
      const formattedData = trainerRes.map((item) => {
        return { ...item,key : item.Id};
      });
      setLoading(false);
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

    const openDeleteModal = (id, type) => {
      setDeleteItemId(id);
      setDeleteItemType(type)
      setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {
      if (deleteItemId) {
        deleteById(deleteItemId, deleteItemType).then((success) => {
          if (success) {
            message.success(`${deleteItemType} deleted successfully`);
            fetchTrainees(DefaultPagination.pageNumber, DefaultPagination.pageSize);
          } else {
            message.error(`Failed to delete ${deleteItemType}`);
          }
        });
      }
      closeDeleteModal();
    };

    useEffect(() => {
      fetchTrainees(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    }, []);

    const clearForm = () => {
      formik.resetForm();
    };
    return { formik, loading, handleDelete, dataSource, fetchTrainees, handlePaginationChange, total, openDeleteModal, 
      isDeleteModalOpen, closeDeleteModal, confirmDelete };
  }
