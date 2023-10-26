import CertificatesMain from '../../components/certificate-container/CertificatesMain';
import EthProvider from 'apps/blockchain-frontend/contexts/EthContext/EthProvider';

export default function CertificatePage() {
  return (
    <EthProvider>
      <CertificatesMain />
    </EthProvider>
  );
}
