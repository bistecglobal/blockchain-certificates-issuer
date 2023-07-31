import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserCertificateById } from '../../api/fetchData';
import { CertificateResponse } from '../../interfaces/viewModels';
import { notification } from 'antd';
import { useEth } from '../../contexts/EthContext';
import { decryptData } from '../utils';
export function usePageState() {
    const router = useRouter();
    const { verify } = router.query;
    const certificateId = verify;
    const [certificateDetail, setCertificateDetail] = useState<CertificateResponse[]>([]);
    const [isClick, setIsClick] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { state } = useEth();
    const { contract, accounts } = state;
    const [encryptData, setEncryptData] = useState('');

    const fetchCertificate = async () => {
        const getCertificateDetail = await getUserCertificateById(certificateId);
        if (getCertificateDetail) {
            setEncryptData(getCertificateDetail);
            const certificateRes: CertificateResponse = JSON.parse(await decryptData(getCertificateDetail));
            setCertificateDetail([certificateRes]);
        }
    };
    const verifyCertificate = async () => {
        if (certificateDetail[0]) {
            try {
                const verify = await contract.methods.getUserCertificateById(certificateDetail[0].Trainee[0].WalletAddress, certificateId).call({ from: accounts[0] });
                if (verify[0].certificateDetail === encryptData) {
                    setIsVerify(true);
                    api.open({
                        key: "updatable",
                        message: 'Certificate verified successfully',
                        description: 'Certificate verified successfully',
                    });
                } else {
                    setError();
                }

            } catch (error) {
                console.error(error);
            }
        } else {
            setError();
        }
        setIsClick(true)
    };

    function setError() {
        api.open({
            key: "updatable",
            message: 'Certificate verification failed',
            description: 'Certificate verification failed',
        });
    }
    useEffect(() => {
        if (certificateId) {
            fetchCertificate();
        }

    }, [certificateId]);

    return { certificateDetail, isClick, verifyCertificate, isVerify, contextHolder }
}