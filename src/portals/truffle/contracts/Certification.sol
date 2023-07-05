// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certification{
    struct User {
        string id;
        UserType userType;
        Certificate[] certificates;
        string[] sharedCertificates;
    }

    enum UserType { Issuer, Holder, Verifier , None }

    struct Certificate {
        string certificateId;
        address Issuer;
        bool verified;
    }

    mapping(address => User) private users;


    function registerUser(address userAddress, string memory id , UserType userType) public {
        require(bytes(users[userAddress].id).length == 0, "User already exists");

        User storage user = users[userAddress];
        user.id = id;
        user.userType = userType;
    }

    function issueCertificate(address userAddress, string memory certificateId,string memory id , UserType userType ) public {
      
      if (bytes(users[userAddress].id).length == 0) {
        registerUser(userAddress, id, userType);
    }
  
        User storage user = users[userAddress];
        Certificate memory certificate;
        certificate.certificateId = certificateId;
        certificate.Issuer = msg.sender;

         user.certificates.push(certificate);

    
      
    }
    function verifyCertificate(address userAddress, string memory certificateId) public returns (Certificate[] memory) {
         User storage user = users[userAddress];
        Certificate[] storage certificates = user.certificates;

        for (uint i = 0; i < certificates.length; i++) {
            if (keccak256(bytes(certificates[i].certificateId)) == keccak256(bytes(certificateId))) {
                certificates[i].verified = true;
                 break;
            }
        }

        return user.certificates;
    }

    function getUser(address userAddress) public view returns (string memory, UserType) {
        User storage user = users[userAddress];
        if (bytes(users[userAddress].id).length > 0){
        return (user.id, user.userType);
        }
        return ("0" ,UserType.None );
    }

    function getUserCertificates(address userAddress) public view returns (Certificate[] memory) {
        if (bytes(users[userAddress].id).length == 0) {
        return new Certificate[](0);
    }

    User storage user = users[userAddress];
    return user.certificates;
    
    }

    function shareCertificate(string memory certificateId) public {

        User storage user = users[msg.sender];
        user.sharedCertificates.push(certificateId);
        
   
    }

    function checkSharedCertificate(string memory certificateId) public  view returns (bool) {
   
        User storage user = users[msg.sender];
        bool isShared = false;
        for (uint i = 0; i < user.sharedCertificates.length; i++) {
        if (keccak256(bytes(user.sharedCertificates[i])) == keccak256(bytes(certificateId)))  {
            isShared = true;
            break;
            }
        }
        return isShared;
    }

    function checkCertificateWithUser(string memory certificateId) public  view returns (bool) {
       
             User storage user = users[msg.sender];
            Certificate[] storage certificates = user.certificates;
            bool isCorrect = false;

            for (uint i = 0; i < certificates.length; i++) {
            if (keccak256(bytes(certificates[i].certificateId)) == keccak256(bytes(certificateId))) {
                  isCorrect = true;
                break;
            }
            
           
        }
    return isCorrect;
    }
    
    function getSharedCertificates(address userAddress) public view returns (string[] memory) {
        User storage user = users[userAddress];
        return user.sharedCertificates;
    }
}