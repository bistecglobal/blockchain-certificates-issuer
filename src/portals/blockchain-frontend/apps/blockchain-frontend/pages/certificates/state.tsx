import { createCertificate, getCourse, getTrainees, getTrainers } from '../../api/fetchData';
import { CertificateRequest, CourseResponse, TraineeResponse, TrainerResponse } from '../../interfaces/viewModels';
import { useFormik } from 'formik';
import { notification } from 'antd';
import { useEth } from '../../contexts/EthContext';
import { useEffect, useState } from 'react';
import { DefaultPagination, UserType } from '../..//interfaces/enums';
import { v4 as uuidv4 } from 'uuid';

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
    const createNewCertificate = async (values) => {
        let certificate: CertificateRequest = {
            Course: values.course,
            Trainee: values.trainee,
            Trainer: values.trainer,
            certificateIssueDate: values.certificateIssueDate,

        };
        const certificateRes = await createCertificate(certificate);
        if (certificateRes) {

            setCertificateId(certificateRes.Id);
            issueCertificate(values.data.walletAddress, certificateRes.Id, values.data.id,);
        } else {
            api.open({
                key: "updatable",
                message: 'Error',
                description: 'Failed to issue certificate',
            });
        }

    };

    const issueCertificate = async (walletAddress, certificateId, traineeId) => {
        try {
            await contract.methods.issueCertificate(walletAddress, certificateId, traineeId, UserType.Holder)
                .send({ from: accounts[0] });
            api.open({
                key: "updatable",
                message: 'Issue Certificate.',
                description: 'Certificate issued successfully',
            });
        } catch (error) {
            api.open({
                key: "updatable",
                message: 'Error',
                description: 'Failed to issue certificate',
            });
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

    const getUser = async () => {
        try {
            const userDetail = await contract.methods.getUser(accounts[0]).call();
            if (userDetail[0] !== "0" && Number(userDetail[1]) === UserType.Issuer) {
                setIRegister(true);
                api.open({
                    key: "updatable",
                    message: 'Login successful ',
                    description: 'Login successful',
                });
            } else {
                setIRegister(false);
                api.open({
                    key: "updatable",
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
             await contract.methods.registerUser(accounts[0], issuerId, UserType.Issuer).send({ from: accounts[0]});
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (accounts) {
            getUser();
            fetchCourses(DefaultPagination.pageNumber, DefaultPagination.pageSize);
            fetchTrainers(DefaultPagination.pageNumber, DefaultPagination.pageSize);
            fetchTrainee(DefaultPagination.pageNumber, DefaultPagination.pageSize);
        }
    }, [accounts]);
    return { formik, contextHolder, courseData, trainerData, traineeData, certificateId, copyTextToClipboard, copied, isRegister, registerIssuer }
};
