import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CourseRequest, CourseResponse } from 'apps/blockchain-frontend/interfaces/viewModels';
import { createCourse, deleteById, getCourse } from 'apps/blockchain-frontend/api/fetchData';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import {ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import {message, Modal } from 'antd';

export function useComponentState() {
  const [dataSource, setDataSource] = useState([]);


  const createNewCourse = async (values) => {
    let course: CourseRequest = {
      Title: values.title,
      Description: values.description,
      StartDate: values.startDate,
      EndDate: values.endDate,
    };
    const courseRes = await createCourse(course);
    if(courseRes){
      message.success(`Course created successfully`);
      setDataSource([]);
      fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
      clearForm();
    }else{
      message.error(`Failed to create the course`);
    }
  };

  const validate = (values) => {
    const errors: {
      title?: string;
      startDate?: string;
      endDate?: string;
      description?: string;
    } = {};

    if (!values.title) {
      errors.title = 'Course name is required';
    } else if (values.title.length > 50) {
      errors.title = 'Must be 50 characters or less';
    }

    if (!values.startDate) {
      errors.startDate = 'Start date required';
    }

    if (!values.endDate) {
      errors.endDate = 'End date is required';
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

  const fetchCourses = async (pageNumber: number, pageSize: number) => {
    let courseRes: CourseResponse[] = [await getCourse(pageNumber, pageSize)];
    if (Array.isArray(courseRes)) {
      courseRes = courseRes.flat();
    }
      const formattedData = courseRes.map((item) => {
        const formattedStartDate = new Date(item.StartDate).toLocaleDateString();
        const formattedEndDate = new Date(item.EndDate).toLocaleDateString();
        return { ...item, StartDate: formattedStartDate, EndDate: formattedEndDate,key: item.Id};
      });
      setDataSource(formattedData);
    
    
  };

  useEffect(() => {
    fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
  }, []);

  const handleDelete =( itemName, id) => {
    Modal.confirm({
      title: `Are you sure you want to delete this ${itemName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
      deleteById(id,itemName).then((success) => {
          if (success) {
            message.success(`${itemName} deleted successfully`);
            fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
          } else {
            message.error(`Failed to delete ${itemName}`);
          }
        });
      },
      onCancel() { },
    });
  };
  const clearForm = () => {
    formik.resetForm();
  };
  return { formik, dataSource, fetchCourses,handleDelete };
}
