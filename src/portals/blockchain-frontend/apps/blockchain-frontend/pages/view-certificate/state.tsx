import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCertificateById } from '../../api/fetchData';
import { CertificateResponse } from '../../interfaces/viewModels';
import { useEth } from '../../contexts/EthContext';
export function usePageState() {
    const router = useRouter();
    const { view } = router.query;
    const certificateId = view;
    const [certificateDetail, setCertificateDetail] = useState<CertificateResponse[]>([]);
    const { state } = useEth();
    const { contract, accounts } = state;
    const [isClick, setIsClick] = useState(false)


    const fetchCertificate = async () => {
        let certificateRes: CertificateResponse[] = [await getCertificateById(certificateId)];
        if (certificateRes[0]) {
            if (Array.isArray(certificateRes)) {
                certificateRes = certificateRes.flat();
            }
            setCertificateDetail(certificateRes);
        }
    };
    const viewCertificate = async () => {
        try {
            const certificate = await contract.methods.checkCertificateWithUser(certificateId ).call({ from: accounts[0] });
            if (certificate){
                fetchCertificate();
            }
        } catch (error) {
            console.error(error);
        }
        setIsClick(true);
    };

    return { certificateDetail, isClick, viewCertificate }
}