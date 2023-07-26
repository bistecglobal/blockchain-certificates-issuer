import EthProvider from "apps/blockchain-frontend/contexts/EthContext/EthProvider";
import ViewCertificateContainer from "../../components/view-certificate/ViewCertificateContainer";

export default function ViewPage() {
  return <EthProvider>< ViewCertificateContainer/></EthProvider>;
}

