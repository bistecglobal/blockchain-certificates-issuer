import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCertificateById } from '../../api/fetchData';
import { CertificateResponse } from '../../interfaces/viewModels';
import { notification } from 'antd';
export function usePageState() {
    const router = useRouter();
    const { verify } = router.query;
    const certificateId = verify;
    const [certificateDetail, setCertificateDetail] = useState<CertificateResponse[]>([]);
    const [isClick, setIsClick] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const [api, contextHolder] = notification.useNotification();



    const fetchCertificate = async () => {
        let certificateRes: CertificateResponse[] = [await getCertificateById(certificateId)];
        if (certificateRes[0]) {
            if (Array.isArray(certificateRes)) {
                certificateRes = certificateRes.flat();
            }
            setCertificateDetail(certificateRes);
        }
    };
    const verifyCertificate = async () => {
        if (certificateDetail[0]) {
            try {
                setIsVerify(true);
              
                api.open({
                    key: "updatable",
                    message: 'Certificate verified successfully',
                    description: 'Certificate verified successfully',
                });
            } catch (error) {
                console.error(error);
            }
        }else{
            api.open({
                key: "updatable",
                message: 'Certificate verification failed',
                description: 'Certificate verification failed',
            });
        }
        setIsClick(true)
    };
    useEffect(() => {
        if (certificateId) {
            fetchCertificate();
        }

    }, [certificateId]);



    return { certificateDetail, isClick, verifyCertificate, isVerify,contextHolder }
}