import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CourseRequest, CourseResponse } from 'apps/blockchain-frontend/interfaces/viewModels';
import { createCourse, deleteById, getCourse } from 'apps/blockchain-frontend/api/fetchData';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import { message } from 'antd';

export function useComponentState() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelDisable, setIsCancelDisable] = useState(true);

  const createNewCourse = async (values) => {
    let course: CourseRequest = {
      Title: values.title,
      Description: values.description,
      StartDate: values.startDate,
      EndDate: values.endDate,
    };
    const courseRes = await createCourse(course);
    if (courseRes) {
      message.success(`Course created successfully`);
      setDataSource([]);
      fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
      clearForm();
    } else {
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
    setIsCancelDisable(false);
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
    setLoading(true);
    let courseRes: CourseResponse[] = [await getCourse(pageNumber, pageSize)];
    if (Array.isArray(courseRes)) {
      courseRes = courseRes.flat();
    }
    const formattedData = courseRes.map((item) => {
      const formattedStartDate = new Date(item.StartDate).toLocaleDateString();
      const formattedEndDate = new Date(item.EndDate).toLocaleDateString();
      return { ...item, StartDate: formattedStartDate, EndDate: formattedEndDate, key: item.Id };
    });
    setLoading(false);
    setDataSource(formattedData);
};

  useEffect(() => {
    fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
  }, []);

  const clearForm = () => {
    formik.resetForm();
  };

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
          fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        } else {
          message.error(`Failed to delete ${deleteItemType}`);
        }
      });
    }
    closeDeleteModal();
  };

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };
  const closeModalOpen = () => {
    setIsCancelModalOpen(false);
  };
  const confirmCancel = () => {
    clearForm();
    setIsCancelModalOpen(false);
    setIsCancelDisable(true);
  };
  const handlePaginationChange = (pageNumber: number, pageSize: number | undefined) => {
    fetchCourses(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };
  return {
    formik, dataSource, fetchCourses, loading, handlePaginationChange, openDeleteModal, isDeleteModalOpen, closeDeleteModal, confirmDelete,
    handleCancel, isCancelModalOpen, closeModalOpen, confirmCancel,isCancelDisable
  };
}
