import VerifyCertificateContainer from "../../components/verify-certificate-container/VerifyCertificateContainer";
import EthProvider from "../../contexts/EthContext/EthProvider";

export default function VerifyPage() {
  return <EthProvider><VerifyCertificateContainer /></EthProvider>;
}
