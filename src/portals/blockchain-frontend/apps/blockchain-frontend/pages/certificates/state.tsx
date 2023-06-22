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
    const [certificateId, setCertificateId] = useState('');
    const [copied, setCopied] = useState(false);

    const createNewCertificate = async (values) => {
        let certificate: CertificateRequest = {
            Course: values.course,
            Trainee: values.trainee,
            Trainer: values.trainer,
            certificateIssueDate: values.certificateIssueDate,

        };
        //alert(values.data.walletAddress)
        const certificateRes = await createCertificate(certificate);
        if (certificateRes) {
            api.open({
                key: "updatable",
                message: 'Issue Certificate.',
                description: 'Certificate created successfully',
            });
            setCertificateId(certificateRes.Id)
            saveCertificateIdBlockchain(certificateId)
        } else {
            api.open({
                key: "updatable",
                message: 'Error',
                description: 'Failed to create certificate',
            });
        }

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
        debugger
        if (courseRes[0]) {
            if (Array.isArray(courseRes)) {
                courseRes = courseRes.flat();
            }
            setCourseData(courseRes);
        }

    };
    const fetchTrainers = async (pageNumber: number, pageSize: number) => {
        let trainerRes: TrainerResponse[] = [await getTrainers(pageNumber, pageSize)];
        if (trainerRes[0]) {
            if (Array.isArray(trainerRes)) {
                trainerRes = trainerRes.flat();
            }
            setTrainerData(trainerRes);
        }
    };

    const fetchTrainee = async (pageNumber: number, pageSize: number) => {
        let traineeRes: TraineeResponse[] = [await getTrainees(pageNumber, pageSize)];
        if (traineeRes[0]) {
            if (Array.isArray(traineeRes)) {
                traineeRes = traineeRes.flat();
            }
            setTraineeData(traineeRes);
        }
    };

    function copyTextToClipboard() {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_CERTIFICATE_URL}/view-certificate?view=${certificateId}`)
            .then(() => {
                setCopied(true)
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });
    }
    useEffect(() => {

        fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        fetchTrainee(DefaultPagination.pageNumber, DefaultPagination.pageSize);
    }, []);
    return { formik, contextHolder, courseData, trainerData, traineeData, certificateId, copyTextToClipboard,copied}
};
