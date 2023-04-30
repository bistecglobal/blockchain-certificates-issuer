import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

export function useComponentState() {
  const validate = (values) => {
    const errors: {
      title?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    } = {};

    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length > 50) {
      errors.title = 'Must be 50 characters or less';
    }

    if (!values.startDate) {
      errors.startDate = 'Required';
    }

    if (!values.endDate) {
      errors.endDate = 'Required';
    } else if (values.endDate < values.startDate) {
      errors.endDate = 'End date must be later than start date';
    }

    if (values.description.length > 300) {
      errors.description = 'Must be 300 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/courses/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { formik, handleDelete };
}
