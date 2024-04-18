import { getCourse, getTrainees, getTrainers } from '../../api/fetchData';
import { PaginationResponse } from '../../interfaces/viewModels';
import { notification } from 'antd';
import { useEth } from '../../contexts/EthContext';
import { useEffect, useState } from 'react';
import { DefaultPagination, UserType } from '../../interfaces/enums';
import { v4 as uuidv4 } from 'uuid';

export function usePageState() {
  const [api, contextHolder] = notification.useNotification();
  const [courseData, setCourseData] = useState([]);
  const [trainerData, setTrainerData] = useState([]);
  const [traineeData, setTraineeData] = useState([]);
  const [certificateId, setCertificateId] = useState('');
  const [copied, setCopied] = useState(false);
  const issuerId = uuidv4();

  const [isIssue, setIssue] = useState(false);
  const [isLording, setIsLording] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

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

  useEffect(() => {
    fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    fetchTrainee(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    setIsLording(false);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredDataSource = dataSource.filter((item) => {
    return item.Id.includes(searchQuery) || item.Course.includes(searchQuery);
  });

  return {
    contextHolder,
    courseData,
    trainerData,
    traineeData,
    certificateId,
    copied,
    handleSearchInputChange,
    isIssue,
    isLording,
    loading,
    dataSource,
    total,
    filteredDataSource,
  };
}
