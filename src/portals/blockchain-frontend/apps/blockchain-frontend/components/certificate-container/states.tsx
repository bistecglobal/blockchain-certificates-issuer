import {
  createTrainee,
  deleteById,
  getTrainees,
  getTraineeById,
  updateTrainee,
  getAllCertificates,
} from 'apps/blockchain-frontend/api/fetchData';
import {
  PaginationResponse,
  TraineeRequest,
  TraineeResponse,
} from 'apps/blockchain-frontend/interfaces/viewModels';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { DefaultPagination } from 'apps/blockchain-frontend/interfaces/enums';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import { useRouter } from 'next/router';

export function useComponentStates() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null);
  const [selectedTrainee, setSelectedTrainee] = useState([]);
  const router = useRouter();
  const defaultView = 'card';
  const { query } = router;
  const view = query.view || defaultView;
  const id = query.id || null;

  const createNewTrainee = async (values) => {
    let trainer: TraineeRequest = {
      FirstName: values.firstName,
      LastName: values.lastName,
      EmailAddress: values.emailAddress,
      WalletAddress: values.walletAddress,
    };
    if (!id) {
      const traineeRes = await createTrainee(trainer);
      if (traineeRes) {
        message.success(`Trainee created successfully`);
        fetchCertificates(
          DefaultPagination.pageNumber,
          DefaultPagination.pageSize
        );
        clearForm();
      } else {
        message.success(`Failed to create the trainee`);
      }
    } else {
      const courseRes = await updateTrainee(trainer, id);
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
      walletAddress: '',
    },
    validate,
    onSubmit: createNewTrainee,
  });

  const handlePaginationChange = (
    pageNumber: number,
    pageSize: number | undefined
  ) => {
    fetchCertificates(pageNumber, pageSize ?? DefaultPagination.pageSize);
  };

  const fetchCertificates = async (pageNumber: number, pageSize: number) => {
    setLoading(true);
    let response: PaginationResponse = await getAllCertificates(
      pageNumber,
      pageSize
    );
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

  const handleDelete = (itemName, id) => {
    Modal.confirm({
      title: `Are you sure you want to delete this ${itemName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteById(id, itemName).then((success) => {
          if (success) {
            message.success(`${itemName} deleted successfully`);
            fetchCertificates(
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

  const fetchTraineeById = async (id: any) => {
    let traineeRes: TraineeResponse[] = [await getTraineeById(id)];
    if (traineeRes[0]) {
      setSelectedTrainee(traineeRes);
      setFormValues(traineeRes);
    } else {
      router.push('/courses?view=card');
      message.error('Course not found.');
    }
  };

  const setFormValues = (traineeRes) => {
    formik.setValues({
      firstName: traineeRes[0].FirstName,
      lastName: traineeRes[0].LastName,
      emailAddress: traineeRes[0].EmailAddress,
      walletAddress: traineeRes[0].WalletAddress,
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredDataSource = dataSource.filter((item) => {
    return item.Id.includes(searchQuery) || item.Course.includes(searchQuery);
  });

  useEffect(() => {
    fetchCertificates(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    if (id) {
      fetchTraineeById(id);
    }
  }, []);

  const clearForm = () => {
    formik.resetForm();
  };
  return {
    formik,
    loading,
    handleDelete,
    dataSource,
    dataSources,
    fetchCertificates,
    handlePaginationChange,
    total,
    handleSearchInputChange,
    filteredDataSource,
    isDeleteModalOpen,
    view,
    id,
  };
}
