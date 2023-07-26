

import CertificateContainer from "../../components/certificate/certificate";
import EthProvider from "apps/blockchain-frontend/contexts/EthContext/EthProvider";

export default function CertificatePage() {
  return <EthProvider><CertificateContainer /></EthProvider>;
}