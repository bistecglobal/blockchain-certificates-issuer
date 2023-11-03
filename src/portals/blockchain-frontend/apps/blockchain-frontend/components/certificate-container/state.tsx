import {
  createCertificate,
  getCourse,
  getTrainees,
  getAllCertificates,
  getTrainers,
} from '../../api/fetchData';
import {
  CertificateRequest,
  CertificateResponse,
  PaginationResponse,
} from '../../interfaces/viewModels';
import { useFormik } from 'formik';
import { notification } from 'antd';
import { useEth } from '../../contexts/EthContext';
import { useEffect, useState } from 'react';
import { DefaultPagination, UserType } from '../../interfaces/enums';
import { v4 as uuidv4 } from 'uuid';
import { decryptData } from '../utils';

export function usePageState() {
  const [api, contextHolder] = notification.useNotification();
  const { state } = useEth();
  const { contract, accounts } = state;
  const [courseData, setCourseData] = useState([]);
  const [trainerData, setTrainerData] = useState([]);
  const [traineeData, setTraineeData] = useState([]);
  const [certificateId, setCertificateId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRegister, setIRegister] = useState(false);
  const issuerId = uuidv4();
  const [url, setUrl] = useState('');
  const [isIssue, setIssue] = useState(false);
  const [isLording, setIsLording] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const createNewCertificate = async (values) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    let certificate: CertificateRequest = {
      Course: values.course,
      Trainee: [values.traineeData.data],
      Trainer: values.trainer,
      CertificateIssueDate: values.certificateIssueDate || currentDate,
    };

    setIsLording(true);
    const certificateDetail = await createCertificate(certificate);
    const certificateRes: CertificateResponse = JSON.parse(
      await decryptData(certificateDetail)
    );
    if (certificateRes) {
      setCertificateId(certificateRes.Id);
      const publishedUrl = window.location.origin;
      setUrl(`${publishedUrl}/view-certificate?view=${certificateRes.Id}`);
      issueCertificateToBlockchain(
        values.traineeData.data.WalletAddress,
        certificateRes.Id,
        certificateDetail,
        values.traineeData.data.Id
      );
    } else {
      api.open({
        key: 'updatable',
        message: 'Error',
        description: 'Failed to issue certificate',
      });
    }
  };
  const issueCertificateToBlockchain = async (
    walletAddress,
    certificateId,
    certificateDetail,
    traineeId
  ) => {
    try {
      setIsLording(true);
      await contract.methods
        .issueCertificate(
          walletAddress,
          certificateId,
          certificateDetail,
          traineeId,
          UserType.Holder
        )
        .send({ from: accounts[0] });
      setIssue(true);

      api.open({
        key: 'updatable',
        message: 'Issue Certificate.',
        description: 'Certificate issued successfully',
      });
    } catch (error) {
      api.open({
        key: 'updatable',
        message: 'Error',
        description: 'Failed to issue certificate',
      });
      console.error(error);
    }
    setIsLording(false);
  };
  const formik = useFormik({
    initialValues: {
      course: '',
      trainee: '',
      trainer: '',
      certificateIssueDate: '',
    },
    onSubmit: createNewCertificate,
  });

  const fetchCourses = async (pageNumber: number, pageSize: number) => {
    let response: PaginationResponse = await getCourse(pageNumber, pageSize);
    let courseRes = response.Items;
    setTotal(response.Total);
    if (courseRes[0]) {
      if (Array.isArray(courseRes)) {
        courseRes = courseRes.flat();
      }
      setCourseData(courseRes);
    }
  };
  const fetchTrainers = async (pageNumber: number, pageSize: number) => {
    let response: PaginationResponse = await getTrainers(pageNumber, pageSize);
    let trainerRes = response.Items;
    if (trainerRes[0]) {
      if (Array.isArray(trainerRes)) {
        trainerRes = trainerRes.flat();
      }
      setTrainerData(trainerRes);
    }
  };

  const fetchTrainee = async (pageNumber: number, pageSize: number) => {
    let response: PaginationResponse = await getTrainees(pageNumber, pageSize);
    let traineeRes = response.Items;
    setTotal(response.Total);
    if (traineeRes[0]) {
      if (Array.isArray(traineeRes)) {
        traineeRes = traineeRes.flat();
      }
      setTraineeData(traineeRes);
    }
  };

  function copyTextToClipboard() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }

  const getUser = async () => {
    try {
      const userDetail = await contract.methods.getUser(accounts[0]).call();
      if (userDetail[0] !== '0' && Number(userDetail[1]) === UserType.Issuer) {
        setIRegister(true);
        api.open({
          key: 'updatable',
          message: 'Login successful ',
          description: 'Login successful',
        });
      } else {
        setIRegister(false);
        api.open({
          key: 'updatable',
          message: 'Error',
          description: 'Invalid user',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerIssuer = async () => {
    try {
      setIsLording(true);
      await contract.methods
        .registerUser(accounts[0], issuerId, UserType.Issuer)
        .send({ from: accounts[0] });
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsLording(false);
    }
  };

  useEffect(() => {
    if (accounts) {
      getUser();
      fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
      fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
      fetchTrainee(DefaultPagination.pageNumber, DefaultPagination.pageSize);
      setIsLording(false);
    }
  }, [accounts]);

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
  }, []);

  return {
    formik,
    contextHolder,
    courseData,
    trainerData,
    traineeData,
    certificateId,
    copyTextToClipboard,
    copied,
    isRegister,
    registerIssuer,
    handleSearchInputChange,
    url,
    isIssue,
    isLording,
    loading,
    dataSource,
    fetchCertificates,
    handlePaginationChange,
    total,
    filteredDataSource,
  };
}
