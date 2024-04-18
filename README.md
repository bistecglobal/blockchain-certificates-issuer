# Blockchain-Certificates-Issuer

<p align="center">
  <img src="https://i.ibb.co/HpF9nBy/bg.png" alt="logo">
</p>

## Official Docs
[https://bistecglobal.github.io/blockchain-certificates-issuer/](https://bistecglobal.github.io/blockchain-certificates-issuer)

## About

This innovative project utilizes Microsoft Entra Verified ID and Self-Sovereign Identity (SSI) principles to offer a comprehensive solution for online certificate validation. In response to the prevalent issue of counterfeit certificates, this approach acts as a robust remedy, guaranteeing the authenticity of certificates through a powerful authentication system.
The project streamlines the entire lifecycle of certificates, handling everything from initial issuance to validation and secure sharing. By integrating Microsoft Entra Verified ID and SSI, it ensures certificates are tamper-proof, traceable, and under the control of the certificate holder, thereby strengthening their legitimacy and trustworthiness.
This modern solution presents a hassle-free method of certificate management and verification, reducing administrative burdens and potential errors. With its user-friendly interface and seamless process, individuals and organizations can confidently manage their certificates while facilitating quick and reliable verification.
In a world increasingly reliant on digital credentials, this Microsoft Entra Verified ID and SSI-based project emerges as a pioneering force, tackling the challenges of counterfeit certificates and elevating the standards of certificate validation in the digital age.

## Insight

**Security**: Self-Sovereign Identity (SSI) and Microsoft Entra Verified ID ensure that certificates are tamper-proof and under the control of the certificate holder. This enhances security by reducing the risk of unauthorized access and fraud.

**Transparency**: SSI principles promote transparency by allowing individuals to manage and share their own identity information. This reduces the reliance on central authorities and increases trust in the verification process.

**Privacy**: SSI and Microsoft Entra Verified ID prioritize user privacy by allowing individuals to selectively disclose information. This means that only relevant information is shared, protecting sensitive data.

**Control**: SSI empowers individuals to have full control over their identity information. This reduces the risk of identity theft and gives individuals the ability to manage their digital identity as they see fit.

**Interoperability**: SSI and Microsoft Entra Verified ID are built on open standards, making them interoperable with a wide range of systems and applications. This ensures that certificates issued through this system can be easily verified and accepted by various parties.


## Installation
### Prerequisites
1. VS code
2. dotnet cli
3. Node js
4. Visual studio (optional)
5. Azure Cosmos DB Emulator

**For Development**

* We are using Truffle for testing and development of this project.
* Also you need to have Metamask Browser Extension.
* For setting up Truffle (more detailed instruction are available [here](https://github.com/truffle-box/react-box) )
* Steps :

### Frontend Setup:

**Fork the Repository:**
Visit the repository on GitHub.
Click the "Fork" button in the top right corner to create your own copy.

**Clone the Repository:**
Open a new terminal window on your computer.
Navigate to the desired location using the "cd" command, e.g.: cd path\to\desired\folder
Clone the repository by running: `git clone https://github.com/YourUsername/repository-name.git`

**Portals:**
Open your preferred code editor (e.g., Visual Studio Code).
In Visual Studio Code, go to File > Open Folder and navigate to blockchain-certificates-issuer/src/portals/blockchain-frontend.

**Install Dependencies:**
Open a terminal in the src/portals/blockchain-frontend folder.
Run the command: 
```sh
npm install
```

**Run Development Server:**
Ensure you're still in the src/portals/blockchain-frontend directory.
Open a terminal within Visual Studio Code.
Run the command: 
```sh 
nx run blockchain-frontend:serve:development
```

 or 
```sh
npm start
```

**Further Reading:**
For more information, explore [nx.dev](https://nx.dev/) to dive deeper into Nx.
Refer to the [next guide](https://nextjs.org/docs/getting-started) for additional insights into Next.js.

### Backend Setup:
Navigate to the backend folder by opening a terminal and using the command: 
```sh
cd path\to\blockchain-certificates-issuer\src\backend\BlockchainCertificatesIssuer
```

**Install Cosmos DB Emulator:**
Install the [Cosmos DB Emulator](https://learn.microsoft.com/en-us/azure/cosmos-db/local-emulator?tabs=ssl-netstd21) on your machine.

**Configure Local Settings:**
Locate the file "**local.settings-copy.json**" in the src/backend/BlockchainCertificatesIssuer directory.
Rename "**_local.settings-copy.json_**" to "**_local.settings.json_**".

**Update Connection Details:**
Open the "**_local.settings.json_**" file.
Replace the following keys in"**_local.settings.json_**" with active values:
```sh
"RepositoryOptions:CosmosConnectionString": "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
"RepositoryOptions:DatabaseId": "CertificatesDB"
```

**Run the Backend:**
1. Open the solution in Visual Studio.
2. Run the backend by executing the necessary tasks or launching the application

***
### Verified ID Configuration

**Configure Local Settings**

Locate the file "**appsettings-Copy.json**" in the src\backend\entra-id-razor-pages\asp-net-core-api-idtokenhint directory.
Rename "**appsettings-Copy.json**" to "**appsettings.json**".

**Update Connection Details:**
Open the "**_appsettings.json_**" file.
Replace the following keys in"**_appsettings.json_**" with active values:

```
"TenantId": "YOURTENANTID",
"ClientId": "APP CLIENT ID",
"ClientSecret": "cCLIENT SECRET",
"DidAuthority": "YOUR DID",
"CredentialType": "CourseCompletionCertificate",
"CredentialManifest": "URL to the credential manifest",
```

**Run the Backend:**
1. Open the solution in Visual Studio.
2. Run the backend by executing the necessary tasks or launching the application

***

