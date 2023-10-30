import EthProvider from 'apps/blockchain-frontend/contexts/EthContext/EthProvider';
import AdminViewCertificateContainer from 'apps/blockchain-frontend/components/admin-view-certificate-container/ViewCertificateContainer';

export default function ViewPage() {
  return (
    <EthProvider>
      <AdminViewCertificateContainer />
    </EthProvider>
  );
}
