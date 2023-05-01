import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import type { Course } from 'apps/blockchain-frontend/interfaces/models';
import { CourseRequest } from 'apps/blockchain-frontend/interfaces/viewModels';
import { createCourse } from 'apps/blockchain-frontend/api/fetchData';

export function useComponentState() {
  const deleteCourse = (id) => {
    throw new Error('Not implemented');
  };

  const createNewCourse = async (values) => {
    var course: CourseRequest = {
      Title: values.title,
      Description: values.description,
      StartDate: values.startDate,
      EndDate: values.endDate,
    };
    const courseRes = await createCourse(course);
  };

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
    onSubmit: createNewCourse,
  });

  return { formik, deleteCourse };
}
