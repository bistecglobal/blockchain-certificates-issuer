import { createTrainee, getTrainees } from "apps/blockchain-frontend/api/fetchData";
import { TraineeRequest, TraineeResponse } from "apps/blockchain-frontend/interfaces/viewModels";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { DefaultPagination } from "apps/blockchain-frontend/interfaces/enums";

export function useComponentState() {
    const [dataSource, setDataSource] = useState([]);
    const deleteTrainee = (id) => {
      throw new Error('Not implemented');
    };
  
    const createNewTrainee = async (values) => {
      let trainer: TraineeRequest = {
          FirstName : values.firstName,
          LastName : values.lastName,
          EmailAddress : values.emailAddress
      };
      const traineeRes = await createTrainee(trainer);
      
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
  
  
    return { formik, deleteTrainee, dataSource, fetchTrainees };
  }
  export const useFetchTraineesEffect = (fetchTrainees) => {
    useEffect(() => {
      fetchTrainees(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    }, []);
  }