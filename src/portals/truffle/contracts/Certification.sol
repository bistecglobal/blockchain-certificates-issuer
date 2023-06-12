// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Certification {
    struct Certificate {
        string certificateId;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateSaved(bytes32 certificateId);

    function saveCertificate(
        string memory _certificateId

    ) public {
        bytes32 certificateId = keccak256(bytes(_certificateId));


        certificates[certificateId] = Certificate(
            _certificateId
     
        );

        emit CertificateSaved(certificateId);
    }

    function retrieveCertificate(string memory _certificateId) public view returns (
        string memory certificateId

    ) {
        bytes32 certificateIdHash = keccak256(bytes(_certificateId));
        Certificate memory certificate = certificates[certificateIdHash];

        return (
            certificate.certificateId
        );
    }
}