import { createTrainer, getTrainers } from "apps/blockchain-frontend/api/fetchData";
import { TrainerRequest, TrainerResponse } from "apps/blockchain-frontend/interfaces/viewModels";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { Pagination } from "apps/blockchain-frontend/interfaces/enums";

export function useComponentState() {
    const [dataSource, setDataSource] = useState([]);
    const deleteTrainer = (id) => {
      throw new Error('Not implemented');
    };
  
    const createNewTrainer = async (values) => {
      let trainer: TrainerRequest = {
          FirstName : values.firstName,
          LastName : values.lastName,
          EmailAddress : values.emailAddress
      };
      const trainerRes = await createTrainer(trainer);
      
    };
  
    const validate = (values) => {
      const errors: {
        firstName?: string;
        lastName?: string;
        emailAddress?: string;
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
      let trainerRes: TrainerResponse[]= [await getTrainers(pageNumber, pageSize)];
      if (Array.isArray(trainerRes)) {
        trainerRes = trainerRes.flat();
      }
      const formattedData = trainerRes.map((item) => {
        return { ...item,key : item.Id};
      });
      setDataSource(formattedData);
 
    };
  
  
    return { formik, deleteTrainer, dataSource, fetchTrainers };
  }
  export const useFetchTrainersEffect = (fetchTrainers) => {
    useEffect(() => {
      fetchTrainers(Pagination.pageNumber, Pagination.pageSize);
    }, [fetchTrainers]);
  }