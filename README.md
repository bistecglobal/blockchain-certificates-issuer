# Blockchain-Certificates-Issuer

<p align="center">
  <img src="https://i.ibb.co/HpF9nBy/bg.png" alt="logo">
</p>

## Official Docs
[https://bistecglobal.github.io/blockchain-certificates-issuer/](https://bistecglobal.github.io/blockchain-certificates-issuer)

## About
This innovative project utilizes blockchain technology to offer a comprehensive solution for online certificate validation. In response to the prevalent issue of counterfeit certificates, this approach acts as a robust remedy, guaranteeing the authenticity of certificates through a powerful authentication system.
The project streamlines the entire lifecycle of certificates, handling everything from initial issuance to validation and secure sharing. By integrating blockchain, it ensures certificates are tamper-proof and traceable, thereby strengthening their legitimacy and trustworthiness.
This modern solution presents a hassle-free method of certificate management and verification, reducing administrative burdens and potential errors. With its user-friendly interface and seamless process, individuals and organizations can confidently manage their certificates while facilitating quick and reliable verification.
In a world increasingly reliant on digital credentials, this blockchain-based project emerges as a pioneering force, tackling the challenges of counterfeit certificates and elevating the standards of certificate validation in the digital age.


## Insight

**Security**: Our certificates are stored on the blockchain, which is a tamper-proof and decentralized ledger. This means that our certificates are safe from hackers and other malicious actors.

**Transparency**: The code of our smart contract is open source, so anyone can view it and verify that it is fair and accurate. This ensures that the certificate issuance process is transparent and auditable.

**Scalability**: Azure Functions is a serverless platform, so we only pay for the resources that we use. This makes our application scalable and cost-effective, even if we have a large number of users.

**Reliability**: CosmosDB is a scalable and distributed database that is designed to handle high volumes of traffic. This makes our application reliable and durable, even if there is a spike in demand.

**Ease of use**: Metamask is a browser extension that makes it easy for users to connect to our application. This means that users can start issuing and managing certificates quickly and easily

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
Run the command: `npm install`

**Run Development Server:**
Ensure you're still in the src/portals/blockchain-frontend directory.
Open a terminal within Visual Studio Code.
Run the command: `nx run blockchain-frontend:serve:development or npm start`

**Further Reading:**
For more information, explore [nx.dev](https://nx.dev/) to dive deeper into Nx.
Refer to the [next guide](https://nextjs.org/docs/getting-started) for additional insights into Next.js.

### Backend Setup:
Navigate to the backend folder by opening a terminal and using the command: `cd path\to\blockchain-certificates-issuer\src\backend\BlockchainCertificatesIssuer`

**Install Cosmos DB Emulator:**
Install the Cosmos DB Emulator on your machine.

**Configure Local Settings:**
Locate the file "**local.settings-copy.json**" in the src/backend/BlockchainCertificatesIssuer directory.
Rename "**_local.settings-copy.json_**" to "**_local.settings.json_**".

**Update Connection Details:**
Open the "**_local.settings.json_**" file.
Replace the following keys in"**_local.settings.json_**" with active values:
`"RepositoryOptions:CosmosConnectionString": "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",`
`"RepositoryOptions:DatabaseId": "CertificatesDB"`

**Run the Backend:**
1. Open the solution in Visual Studio.
2. Run the backend by executing the necessary tasks or launching the application

### MetaMask

<p align="center">
  <img src="https://i.ibb.co/sKBVvs6/meta.jpg" alt="logo">
</p>

**Step 1**: Install MetaMask:
Install the MetaMask extension for your preferred browser (Chrome, Firefox, or Brave) from the respective extension store.
Follow the installation prompts to add MetaMask to your browser.

**Step 2**: Set Up MetaMask:
Click the MetaMask icon in your browser's extensions toolbar.
Click "**Get Started**" to create a new wallet.
Choose "**Create a Wallet**" and follow the instructions to create a new wallet with a strong password. Keep this password safe.
Agree to the terms of use and backup your secret backup phrase. Store this phrase securely offline.

**Step 3**: Access Networks:
Click on the network dropdown at the top of the MetaMask interface.
Choose " **Add a network manually** " at the bottom of the network list.

**Step 4**: Add Sepolia Network:
In the " **Add a network manually** " section, fill in the following details:

`Network Name: Sepolia`

`New RPC URL: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID" (replace "YOUR_INFURA_PROJECT_ID" with your actual Infura project ID)`

`Chain ID: 11155111`

`Symbol (optional): ETH`

**Step 5**: Save and Switch:
Click "**Save**" to add the Sepolia network.
After saving, select the Sepolia network from the network dropdown in MetaMask.

**Step 6**: Get Sepolia Ether:
To get Sepolia Ether for testing, you can use a Sepolia Faucet[ https://sepoliafaucet.com/](https://sepoliafaucet.com/)

### Truffle

<p align="center">
  <img src="https://i.ibb.co/16JQnV5/trfull.jpg" alt="logo">
</p>


**Step 1**: Install Truffle:
Install Truffle globally on your machine if you haven't already:
`npm install -g truffle `

**Step 2**: Update Truffle Configuration:

Navigate to Truffle directory (src\portals\truffle)
Locate the **truffle-config.js** or **truffle.js** configuration file.
Open the configuration file in a text editor.
Step 3: Configure Sepolia Network:
Find the networks section in the configuration file.
Replace below configuration for the Sepolia  network. 
Replace "YOUR_INFURA_PROJECT_ID" with your actual Infura project ID:

`sepolia : { provider: () => new HDWalletProvider(MNEMONIC, https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID), `

`network_id: 3, // Ropsten's network ID gas: 5500000, // Gas limit used for deploys `

`confirmations: 2, // Number of confirmations to wait between deployments `

`timeoutBlocks: 200, // Timeout in blocks for transactions `

`skipDryRun: true // Skip dry run before migrations? (default: false for public nets ) `
`} } `

**Step 4**: Obtain Sepolia  Ether:
Get Sepolia  Ether for testing from a Sepolia Faucet like [https://sepoliafaucet.com/](https://sepoliafaucet.com/)

**Step 5**: Deploy to Sepolia :
Open a terminal in the src/portals/truffle folder.
Run the following command to deploy your contracts to the Sepoli  network:
`truffle migrate --network sepolia`
