import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCertificateById } from 'apps/blockchain-frontend/api/fetchData';
import { CertificateResponse } from 'apps/blockchain-frontend/interfaces/viewModels';
export function usePageState() {
    const router = useRouter();
    const { view } = router.query;
    const certificateId = view;
    const [certificateDetail, setCertificateDetail] = useState<CertificateResponse[]>([]);
    const fetchCertificate= async () => {
        let certificateRes: CertificateResponse[] = [await getCertificateById(certificateId)];
        if(certificateRes[0]){
            if (Array.isArray(certificateRes)) {
                certificateRes = certificateRes.flat();
            }
            setCertificateDetail(certificateRes)
        }    
    };
    useEffect(() => {
        if (certificateId) {
            fetchCertificate();

        }
    }, [certificateId]);
    return { certificateDetail }
}