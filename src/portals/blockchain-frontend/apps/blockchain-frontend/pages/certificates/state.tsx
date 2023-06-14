import { createCertificate, getCourse, getTrainees, getTrainers } from '../../api/fetchData';
import { CertificateRequest, CourseResponse, TraineeResponse, TrainerResponse } from '../../interfaces/viewModels';
import { useFormik } from 'formik';
import { notification } from 'antd';
import { useEth } from '../../contexts/EthContext';
import { useEffect, useState } from 'react';
import { DefaultPagination } from '../..//interfaces/enums';
import { useRouter } from 'next/router';
export function usePageState() {
    const [api, contextHolder] = notification.useNotification();
    const { state } = useEth();
    const { contract, accounts } = state;
    const [courseData, setCourseData] = useState([]);
    const [trainerData, setTrainerData] = useState([]);
    const [traineeData, setTraineeData] = useState([]);

    const createNewCertificate = async (values) => {
        let certificate: CertificateRequest = {
            Course: values.course,
            Trainee: values.trainee,
            Trainer: values.trainer,
            certificateIssueDate: values.certificateIssueDate,

        };
        const certificateRes = await createCertificate(certificate);
        api.open({
            key: "updatable",
            message: 'Issue Certificate.',
            description: 'Certificate created successfully',
        });
        saveCertificateIdBlockchain(certificateRes.Id)
    };

    const saveCertificateIdBlockchain = async (certificateId: string) => {
        try {
            await contract.methods.saveCertificate(certificateId)
                .send({ from: accounts[0] });
        } catch (error) {
            console.error(error);
        }

    };
    const formik = useFormik({
        initialValues: {
            course: "",
            trainee: "",
            trainer: "",
            certificateIssueDate: ""
        },
        onSubmit: createNewCertificate,
    });

    const fetchCourses = async (pageNumber: number, pageSize: number) => {
        let courseRes: CourseResponse[] = [await getCourse(pageNumber, pageSize)];
        if (Array.isArray(courseRes)) {
            courseRes = courseRes.flat();
        }
        setCourseData(courseRes);
    };
    const fetchTrainers = async (pageNumber: number, pageSize: number) => {
        let trainerRes: TrainerResponse[] = [await getTrainers(pageNumber, pageSize)];
        if (Array.isArray(trainerRes)) {
            trainerRes = trainerRes.flat();
        }
        setTrainerData(trainerRes);
    };

    const fetchTrainee = async (pageNumber: number, pageSize: number) => {
        let traineeRes: TraineeResponse[] = [await getTrainees(pageNumber, pageSize)];
        if (Array.isArray(traineeRes)) {
            traineeRes = traineeRes.flat();
        }
        setTraineeData(traineeRes);
    };

    useEffect(() => {
   
        fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        fetchTrainee(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    }, []);
    return { formik, contextHolder, courseData,trainerData,traineeData }
};
