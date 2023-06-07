# Blockchain-certificates-issuer

Prerequisites

1. VS code
2. dotnet cli
3. Node js
4. Visual studio (optional)
5. Azure Cosmos DB Emulator

## Portals

1. Clone this repository.
2. Open a new terminal
3. Navigate to the portals: `cd blockchain-certificates-issuer\src\portals\blockchain-frontend`
4. Install dependencies: `npm install`
5. Open folder `src\portals\blockchain-frontend` in vs code.
6. open a terminal in the  `src\portals\blockchain-frontend` folder.

```bash
nx run blockchain-frontend:serve:development
```

5. Read more on [nx.dev](https://nx.dev/latest/react/getting-started/intro) and [next guide](https://nx.dev/latest/react/guides/nextjs)

## Backend

The backend is located under `src\backend\BlockchainCertificatesIssuer`

1. Install the Cosmos DB Emulator [emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator?tabs=ssl-netstd21)
2. Rename the file`src\backend\BlockchainCertificatesIssuer\local.settings-copy.json` to "local.settings.json"
3. Replace following keys with active values in local.settings.json .
```json
 "RepositoryOptions:CosmosConnectionString": "AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
  "RepositoryOptions:DatabaseId": "CertificatesDB"

```
4. Open the solution from Visual studio and run
