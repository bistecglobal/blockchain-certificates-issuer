import {
  createTrainer,
  deleteById,
  getTrainers,
  getTrainerById,
  updateTrainer,
} from 'apps/blockchain-frontend/api/fetchData';
import {
  PaginationResponse,
  TrainerRequest,
  TrainerResponse,
} from 'apps/blockchain-frontend/interfaces/viewModels';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import { useRouter } from 'next/router';

export function useComponentState() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelDisable, setIsCancelDisable] = useState(true);
  const router = useRouter();
  const { query } = router;
  const defaultView = 'card';
  const view = query.view || defaultView;
  const id = query.id || null;
  const [total, setTotal] = useState(0);
  const [selectedTrainer, setSelectedTrainer] = useState([]);

  const createNewTrainer = async (values) => {
    const trainer: TrainerRequest = {
      FirstName: values.firstName,
      LastName: values.lastName,
      EmailAddress: values.emailAddress,
    };
    if (!id) {
      const trainerRes = await createTrainer(trainer);
      if (trainerRes) {
        message.success(`Trainee created successfully`);
        fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        clearForm();
      } else {
        message.success(`Failed to create the trainee`);
      }
    } else {
      const courseRes = await updateTrainer(trainer, id);
      if (courseRes) {
        message.success(`Trainee updated successfully`);
        clearForm();
      } else {
        message.error(`Failed to updated the trainee`);
      }
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
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(values.firstName)) {
      errors.firstName =
        'Please enter a valid input without numbers or special characters.';
    }

    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(values.lastName)) {
      errors.lastName =
        'Please enter a valid input without numbers or special characters.';
    }

    if (!values.emailAddress) {
      errors.emailAddress = 'Email is required';
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(values.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address.';
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

  const handlePaginationChange = (
    pageNumber: number,
    pageSize: number | undefined
  ) => {
    fetchTrainers(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };

  const fetchTrainers = async (pageNumber: number, pageSize: number) => {
    setLoading(true);
    let response: PaginationResponse = await getTrainers(pageNumber, pageSize);
    let trainerRes = response.Items;
    setTotal(response.Total);
    if (Array.isArray(trainerRes)) {
      trainerRes = trainerRes.flat();
    }
    const formattedData = trainerRes.map((item) => {
      return { ...item, key: item.Id };
    });
    setLoading(false);
    setDataSource(formattedData);
  };
  useEffect(() => {
    fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
  }, []);

  const handleDelete = (itemName, id) => {
    Modal.confirm({
      title: `Are you sure you want to delete this ${itemName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteById(id, itemName).then((success) => {
          if (success) {
            message.success(`${itemName} deleted successfully`);
            fetchTrainers(
              DefaultPagination.pageNumber,
              DefaultPagination.pageSize
            );
          } else {
            message.error(`Failed to delete ${itemName}`);
          }
        });
      },
      onCancel() {},
    });
  };
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

  const fetchTrainerById = async (id: any) => {
    let trainerRes: TrainerResponse[] = [await getTrainerById(id)];
    if (trainerRes[0]) {
      setSelectedTrainer(trainerRes);
      setFormValues(trainerRes);
    } else {
      router.push('/trainers');
      message.error('Trainer not found.');
    }
  };

  const setFormValues = (trainerRes) => {
    formik.setValues({
      firstName: trainerRes[0].FirstName,
      lastName: trainerRes[0].LastName,
      emailAddress: trainerRes[0].EmailAddress,
    });
  };

  useEffect(() => {
    fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    if (id) {
      fetchTrainerById(id);
    }
  }, []);

  return {
    view,
    formik,
    isCancelModalOpen,
    isCancelDisable,
    handleCancel,
    closeModalOpen,
    confirmCancel,
    handleDelete,
    dataSource,
    fetchTrainers,
    loading,
    id,
    total,
    handlePaginationChange,
  };
}
