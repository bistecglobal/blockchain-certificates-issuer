import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserCertificateById } from '../../api/fetchData';
import { CertificateResponse } from '../../interfaces/viewModels';
import { notification } from 'antd';
import { decryptData } from '../utils';
export function usePageState() {
    const router = useRouter();
    const { share } = router.query;
    const certificateId = share;
    const [certificateDetail, setCertificateDetail] = useState<CertificateResponse[]>([]);
    const [isClick, setIsClick] = useState(false);
    const [api, contextHolder] = notification.useNotification();



    const fetchCertificate = async () => {
        const getCertificateDetail = await getUserCertificateById(certificateId);
        if (getCertificateDetail) {
            const certificateRes: CertificateResponse = JSON.parse(await decryptData(getCertificateDetail));
            setCertificateDetail([certificateRes]);
        }
    };
    function showCertificate() {
        if (certificateDetail[0]) {
            try {
                api.open({
                    key: "updatable",
                    message: 'Certificate loaded successfully',
                    description: 'Certificate loaded successfully',
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            api.open({
                key: "updatable",
                message: 'Certificate failed to load',
                description: 'Certificate failed to load',
            });
        }
        setIsClick(true)
    };

    function verifyCertificate() {
        const publishedUrl = window.location.origin;
        router.push(`${publishedUrl}/verify-certificate?verify=${certificateId}`);
    }
    useEffect(() => {
        if (certificateId) {
            fetchCertificate();
        }

    }, [certificateId]);
    return { certificateDetail, isClick, showCertificate, contextHolder, verifyCertificate }
}