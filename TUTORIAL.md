## Outline

- [Dash Platform Overview](#dash-platform-overview)
  - [Setup and Configure Node Project](#setup-and-configure-node-project)
  - [Initialize Dash Client](#initialize-dash-client)
- [Create Wallet and Identity](#create-wallet-and-identity)
  - [Add Funds to Wallet with Testnet Faucet](#add-funds-to-wallet-with-testnet-faucet)
  - [Register and Retrieve Identity](#register-and-retrieve-identity)
  - [Register and Retrieve Name](#register-and-retrieve-name)
- [Data Contracts](#data-contracts)
  - [Register, Retrieve, and Update Contract](#register-retrieve-and-update-contract)
  - [Submit and Retrieve Documents](#submit-and-retrieve-documents)
  - [Update and Delete Documents](#update-and-delete-documents)
- [Setup Backend Server with Express](#setup-backend-server-with-express)
- [Create Next App](#create-next-app)
  - [Setup React Project Structure](#setup-react-project-structure)
  - [Add Fetch Button to React App](#add-fetch-button-to-react-app)

## Dash Platform Overview

Dash is a digital cryptocurrency that was launched in 2014. Originally called XCoin (XCO), it was renamed Darkcoin and then finally rebranded as Dash in 2015. "Dash" is a portmanteau of "Digital Cash" and was created as a fork of Bitcoin. Despite its origins, today Dash differs significantly from Bitcoin by aiming to be a convenient, fast, and private digital cash platform that is suitable for everyday transactions. This goal is reflected in its design features which include:

- __PrivateSend__: This feature ensures user privacy by mixing transactions together, making them untraceable to individual users.
- __InstantSend__: Dash's InstantSend feature enables near-instant transaction confirmations that are faster than Bitcoin's.
- __Masternodes__:  Dash's network includes masternodes (or full nodes) which power its unique features like InstantSend and PrivateSend, as well as its governance system.
- __Decentralized Autonomous Organization__: Dash operates as a DAO, meaning it is a transparent, member-controlled organization free from central government influence.
- __Block Reward Allocation__: Dash's block reward is split between miners (45%), masternodes (45%), and a development fund (10%), ensuring ongoing platform maintenance and development.

In 2019, an MVP of the Dash Platform (originally codenamed "Evonet") was launched. The Dash Platform is a technology stack for building decentralized applications (dApps) on the Dash network. It represents a shift away from the original, transaction-focused blockchain systems inspired by Bitcoin by aiming to make Dash more like newer, application-focused blockchains such as Ethereum and Solana.

Key features of the platform include:

- [__Dash Drive__](https://dashplatform.readme.io/docs/explanation-drive): A decentralized API that lets users store and interact with data on the Dash network, similar to a cloud database service.
- [__Decentralized API (DAPI)__](https://dashplatform.readme.io/docs/explanation-dapi): Allows developers secure, decentralized access to full node capabilities without needing to host one.
- [__Usernames via Dash Platform Name Service (DPNS)__](https://dashplatform.readme.io/docs/explanation-dpns): Enables the creation of memorable usernames to replace complex cryptographic addresses.
- [__Platform Chain__](https://dashplatform.readme.io/docs/explanation-drive-platform-chain): A separate chain for storing platform data, secured by the masternodes of the main Dash network.
- __Dash Libraries__: A collection of integrated open source libraries for developing on the Dash Platform.

Here's an architectural overview of the Dash Platform to get a better sense of how the different parts of the platform relate to one another:

![00-dash-platform-architecture](https://ajc.pics/2024/04/01/first-look-dash/00-dash-platform-architecture.webp)

### Setup and Configure Node Project

Requirement: Node v20 or higher

```bash wrap=false
mkdir dash-examples
cd dash-examples
npm init -y
npm pkg set type="module"
npm i dash@4.0.0-dev.16
echo > .gitignore
```

Add the following to `.gitignore`:

```
.DS_Store
node_modules
.env
dist
```

We'll create each script file individually throughout the tutorial but for the sake of simplifying your life while following along with this tutorial, I'd recommend adding all of the Node scripts that will be implemented by the end of the tutorial.

Open `package.json` and include the following scripts:

```json wrap=false
"scripts": {
  "createWallet": "node --env-file=.env --no-warnings scripts/createWallet",
  "createIdentity": "node --env-file=.env --no-warnings scripts/createIdentity",
  "retrieveIdentities": "node --env-file=.env --no-warnings scripts/retrieveIdentities",
  "topUpIdentities": "node --env-file=.env --no-warnings scripts/topUpIdentities",
  "registerName": "node --env-file=.env --no-warnings scripts/registerName",
  "retrieveName": "node --env-file=.env --no-warnings scripts/retrieveName",
  "registerContract": "node --env-file=.env --no-warnings scripts/registerContract",
  "retrieveContract": "node --env-file=.env --no-warnings scripts/retrieveContract",
  "updateContract": "node --env-file=.env --no-warnings scripts/updateContract",
  "submitNoteDocument": "node --env-file=.env --no-warnings scripts/submitNoteDocument",
  "getDocuments": "node --env-file=.env --no-warnings scripts/getDocuments",
  "updateNoteDocument": "node --env-file=.env --no-warnings scripts/updateNoteDocument",
  "deleteNoteDocument": "node --env-file=.env --no-warnings scripts/deleteNoteDocument",
  "express": "node --env-file=.env --no-warnings --watch api/server"
},
```

### Initialize Dash Client

Create a `scripts` directory for our Node scripts and an `api` directory with a file called `client.js` for initializing `Dash.Client`. The `network` will be set to `testnet` via the `NETWORK` environment variable in `.env`.

```bash wrap=false
mkdir api scripts
echo > api/client.js
echo 'NETWORK="testnet"' > .env
```

Import `Dash` from `dash`, pass the project's network and wallet configuration through Dash's `Client` constructor, and export `client`.

```js wrap=false
// api/client.js

import Dash from "dash"

const { NETWORK } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    offlineMode: true,
  },
})
```

Because we haven't created a wallet yet, `mnemonic` is set to `null` to indicate we want a new wallet to be generated.

- To get a new address for an existing wallet replace `null` with an existing wallet mnemonic.
- `offlineMode` is set to `true`, indicating we don't want to sync the chain.
- This can only be used when the mnemonic is set to `null`.

## Create Wallet and Identity

Create a file called `createWallet.js`.

```bash wrap=false
echo > scripts/createWallet.js
```

We'll use three functions to create a wallet:

- `getWalletAccount()` to get our wallet.
- `exportWallet()` to export the 12 word mnemonic phrase.
- `getUnusedAddress()` to create a new address.

```js wrap=false
// scripts/createWallet.js

import { client } from '../api/client.js'

async function createWallet() {
  try {
    const walletAccount = await client.getWalletAccount()
    const mnemonic = client.wallet.exportWallet()
    const { address } = walletAccount.getUnusedAddress()

    console.log("WALLET_ADDRESS=" + `"${address}"`)
    console.log("MNEMONIC=" + `"${mnemonic}"`)
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

createWallet()
```

Run the `createWallet` script.

```bash wrap=false
npm run createWallet
```

The output will include our two environment variables:

```bash wrap=false
WALLET_ADDRESS="yZpzgtx9H56zKuxu2DSejXXesFps4XYbRD"
MNEMONIC="tooth add craft since marine spin lunar announce blade search avocado couple"
```

Copy these and place them in your `.env`. We'll do the same throughout the rest of this tutorial.

### Add Funds to Wallet with Testnet Faucet

Send test funds to the "unused address" from the console output using Dash's [testnet faucet](http://faucet.testnet.networks.dash.org). Wait for the funds to be confirmed before trying to use them, it may take a few minutes. You can check the status of confirmations with the [Dash block explorer](http://insight.testnet.networks.dash.org:3001/insight/).

Search for your wallet address (`yfvkghuK1fbDc7GBeadfMa47d9WaBpLxij` in my case) to see your balance and list of transactions:

![01 - Viewing new Dash wallet address on testnet block explorer](https://ajc.pics/2024/04/01/first-look-dash/01-wallet-address-on-dash-block-explorer.webp)

Click on the transaction link (`9ca05a57d2f8e55068a5c8be4453d3a84aa852304d1aa3d32d92b9b5afe32261` in my case) to view information on the transaction itself.

![02 - Viewing new Dash faucet transaction on testnet block explorer](https://ajc.pics/2024/04/01/first-look-dash/02-transaction-on-block-explorer.webp)

You can also click on the plus symbol (+) next to the transaction link for more information related to the transaction confirmation.

![03 - Viewing new transaction confirmation info on testnet block explorer](https://ajc.pics/2024/04/01/first-look-dash/03-transaction-confirmation.webp)

### Register and Retrieve Identity

Modify the client again and include your wallet's `MNEMONIC` seed phrase saved in `.env`.

```js wrap=false
// api/client.js

import Dash from "dash"

const { NETWORK, MNEMONIC } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: MNEMONIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 990000,
    },
  },
})
```

Create a file called `createIdentity.js`.

```bash wrap=false
echo > scripts/createIdentity.js
```

To create an identity, we'll run the `identities.register()` function.

```js wrap=false
// scripts/createIdentity.js

import { client } from '../api/client.js'

async function createIdentity() {
  try {
    const identity = await client.platform.identities.register()
    console.log("IDENTITY_ID=" + `"${identity.toJSON().id}"`)
    console.log(`\nView on platform block explorer: https://platform-explorer.com/identity/${identity.toJSON().id}\n`)
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

createIdentity()
```

Run the `createIdentity` script.

```bash wrap=false
npm run createIdentity
```

Output:

```bash wrap=false
IDENTITY_ID="6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK"
```

Earlier, we saw how to view our transactions on the Dash block explorer. For operations performed on Dash Platform, there is a separate explorer at [platform-explorer.com](https://platform-explorer.com).

- Open the [Identities](https://platform-explorer.com/identities) tab to see your ID on the list.
- Alternatively, `createIdentity` appends the ID to the URL `https://platform-explorer.com/identity/` and outputs the link to your terminal for convenience.

![04-platform-explorer-identity-endpoint](https://ajc.pics/2024/04/01/first-look-dash/04-platform-explorer-identity-endpoint.webp)

Create a file called `retrieveIdentities.js`.

```bash wrap=false
echo > scripts/retrieveIdentities.js
```

`getIdentityIds()` with return your identity ID's which can be passed to `identities.get()`.

```js wrap=false
// scripts/retrieveIdentities.js

import { client } from '../api/client.js'

async function retrieveIdentities() {
  try {
    const walletAccount = await client.getWalletAccount()
    const identityIds = walletAccount.identities.getIdentityIds()
    console.log("\nRetrieved Identity IDs:\n" + JSON.stringify(identityIds, null, 2))

    for (const id of identityIds) {
      const identity = await client.platform.identities.get(id)
      console.log(`\nIdentity ID: ${id}`)
      console.log(`  - Balance: ${identity.balance}`)
    }
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

retrieveIdentities()
```

Run the `retrieveIdentities` script:

```bash wrap=false
npm run retrieveIdentities
```

Output:

```bash wrap=false
Identity ID: 6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK
  - Balance: 874253070
```

When an Identity is created, a special transaction transforms Dash into credits which are used to interact with Dash Platform. 1 DASH is equal to 100,000,000 Duffs (Dash's version of the [Satoshi](https://www.fool.com/terms/s/satoshi/)) and 100 million Duffs is equal to 100 billion credits. Since interacting with Dash Platform applications decreases your credit balance, at a certain point you'll need to topup the balance by converting some Dash to credits.

Create a file called `topUpIdentities.js`.

```bash wrap=false
echo > scripts/topUpIdentities.js
```

`getIdentityIds()` will be used again and the ID's will be passed to `identities.topUp()`.

```js wrap=false
// scripts/topUpIdentities.js

import { client } from '../api/client.js'

async function topUpIdentities() {
  try {
    const walletAccount = await client.getWalletAccount()
    const identityIds = walletAccount.identities.getIdentityIds()

    for (const id of identityIds) {
      await client.platform.identities.topUp(id, 100000000)
      const identity = await client.platform.identities.get(id)
      console.log(`IDENTITY_CREDIT_BALANCE for ID ${id}: ${identity.balance}`)
    }
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

topUpIdentities()
```

Run the `topUpIdentities` script:

```bash wrap=false
npm run topUpIdentities
```

Output:

```txt wrap=false
IDENTITY_CREDIT_BALANCE for ID 6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK: 874253070
```

### Register and Retrieve Name

Create a file called `registerName.js`.

```bash wrap=false
echo > scripts/registerName.js
```

Create a `LABEL` in `.env` with your desired name. Replace `YOUR-NAME-HERE` with your name. See the [implementation details for naming constraints](https://docs.dash.org/projects/platform/en/stable/docs/explanations/dpns.html#implementation).

```bash wrap=false
LABEL="YOUR-NAME-HERE"
# echo '\nLABEL="YOUR-NAME-HERE"' >> .env
```

Add the following to `scripts/registerName.js`.

```js wrap=false
// scripts/registerName.js

import { client } from '../api/client.js'

const { IDENTITY_ID, LABEL } = process.env

async function registerName() {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)
    const dashUniqueIdentityId = await identity.getId()
    const nameRegistration = await client.platform.names.register(
      `${LABEL}.dash`, { dashUniqueIdentityId }, identity
    )
    console.log("LABEL=" + JSON.stringify(nameRegistration.toJSON().label))
    console.log(`\nView on block explorer: https://platform-explorer.com/document/${nameRegistration.toJSON().$id}\n`)
  } catch (error) {
    console.error("Something went wrong:\n", error)
  } finally {
    client.disconnect()
  }
}

registerName()
```

Run the `registerName` script:

```bash wrap=false
npm run registerName
```

Output:

```bash wrap=false
LABEL="ajcwebdev20240603"
```

View on block explorer: [platform-explorer.com/document/Ax2Psritj8p6cjkPfdFiwv3EBzc93Txhfv9mZnkrZi2](https://platform-explorer.com/document/Ax2Psritj8p6cjkPfdFiwv3EBzc93Txhfv9mZnkrZi2)

![05-platform-explorer-document-endpoint](https://ajc.pics/2024/04/01/first-look-dash/05-platform-explorer-document-endpoint.webp)

Create a file called `retrieveName.js`.

```bash wrap=false
echo > scripts/retrieveName.js
```

Pass your name to `platform.names.resolve()`.

```js wrap=false
// scripts/retrieveName.js

import { client } from '../api/client.js'

const { LABEL } = process.env

async function retrieveName() {
  try {
    const extendedDoc = await client.platform.names.resolve(`${LABEL}.dash`)
    const name = JSON.parse(JSON.stringify(extendedDoc))
    console.log(`\nResolved name object:\n\n`, name)
    console.log(`\nView on block explorer: https://platform-explorer.com/document/${name.$id}\n`)
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

retrieveName()
```

Run the `retrieveName` script:

```bash wrap=false
npm run retrieveName
```

Resolved name object:

```js wrap=false
{
  '$id': 'Ax2Psritj8p6cjkPfdFiwv3EBzc93Txhfv9mZnkrZi2',
  '$ownerId': '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  label: 'ajcwebdev20240603',
  normalizedLabel: 'ajcwebdev20240603',
  normalizedParentDomainName: 'dash',
  parentDomainName: 'dash',
  preorderSalt: 'DP79t5gRhz8GYCVuZ3iCITAbnkcVygeR5ltifmAqDMo=',
  records: {
    dashUniqueIdentityId: 'WBx62yMsMigHiMpK6gYoaiuZulKGo0gcmv6X+fxv0FA='
  },
  subdomainRules: { allowSubdomains: false },
  '$revision': 1,
  '$createdAt': null,
  '$updatedAt': null,
  '$transferredAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$transferredAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$transferredAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: 'GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      documentsCanBeDeletedContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 1,
    ownerId: '4EfA9Jrvv3nnCFdSf7fad59851iiTRZ6Wcu6YVJ4iSeF',
    schemaDefs: null,
    documentSchemas: { domain: [Object], preorder: [Object] }
  },
  '$type': 'domain'
}
```

View on block explorer: [platform-explorer.com/document/Ax2Psritj8p6cjkPfdFiwv3EBzc93Txhfv9mZnkrZi2](https://platform-explorer.com/document/Ax2Psritj8p6cjkPfdFiwv3EBzc93Txhfv9mZnkrZi2)

## Data Contracts

A Data Contract on Dash Platform serves as a blueprint for the structure of data that an application intends to store on the decentralized network. It defines the schema of documents (data records) with JSON Schema.

- Contracts enable the platform to validate data against these schemas to ensure consistency and integrity.
- They are crucial for dApps and provide a structured and predictable way to interact with the Dash blockchain.
- Data Contracts facilitate data storage, retrieval, and manipulation in a trustless environment.

You can create Data Contracts through an online user interface at [dashpay.io](https://dashpay.io/).

### Register, Retrieve, and Update Contract

Create a file called `registerContract.js`.

```bash wrap=false
echo > scripts/registerContract.js
```

`contracts.create()` will take your identity and a spec for the contract. In this case the contract will be a simple string message.

```js wrap=false
// scripts/registerContract.js

import { client } from '../api/client.js'

const { IDENTITY_ID } = process.env

const registerContract = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)
    const contractDocuments = {
      note: {
        type: 'object',
        properties: { message: { type: 'string', position: 0 } },
        additionalProperties: false
      }
    }
    const contract = await client.platform.contracts.create(contractDocuments, identity)
    console.log("\nCONTRACT_ID=" + `"${contract.toJSON().id}"`)

    await client.platform.contracts.publish(contract, identity)
    console.log('\nContract registered:\n\n', contract.toJSON())
    console.log(`\nView on platform block explorer:\n\nhttps://platform-explorer.com/dataContract/${contract.toJSON().id}\n`)
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

registerContract()
```

Run the `registerContract` script:

```bash wrap=false
npm run registerContract
```

Output:

```js wrap=false
CONTRACT_ID="4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso"
```

Contract registered:

```js wrap=false
{
  '$format_version': '0',
  id: '4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso',
  config: {
    '$format_version': '0',
    canBeDeleted: false,
    readonly: false,
    keepsHistory: false,
    documentsKeepHistoryContractDefault: false,
    documentsMutableContractDefault: true,
    documentsCanBeDeletedContractDefault: true,
    requiresIdentityEncryptionBoundedKey: null,
    requiresIdentityDecryptionBoundedKey: null
  },
  version: 1,
  ownerId: '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  schemaDefs: null,
  documentSchemas: {
    note: {
      type: 'object',
      properties: [Object],
      additionalProperties: false
    }
  }
}
```

View on platform block explorer: [platform-explorer.com/dataContract/4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso](https://platform-explorer.com/dataContract/4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso)

Create a file called `retrieveContract.js`.

```bash wrap=false
echo > scripts/retrieveContract.js
```

Pass your contract ID to `contracts.get()`.

```js wrap=false
// scripts/retrieveContract.js

import { client } from '../api/client.js'

const { CONTRACT_ID } = process.env

const retrieveContract = async () => {
  try {
    const contract = await client.platform.contracts.get(CONTRACT_ID)
    console.dir(contract.toJSON(), { depth: 5 })
    console.log(`\nView on platform block explorer:\n\nhttps://platform-explorer.com/dataContract/${contract.toJSON().id}\n`)
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

retrieveContract()
```

Run the `retrieveContract` script.

```bash wrap=false
npm run retrieveContract
```

Output:

```js wrap=false
{
  '$format_version': '0',
  id: '4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso',
  config: {
    '$format_version': '0',
    canBeDeleted: false,
    readonly: false,
    keepsHistory: false,
    documentsKeepHistoryContractDefault: false,
    documentsMutableContractDefault: true,
    documentsCanBeDeletedContractDefault: true,
    requiresIdentityEncryptionBoundedKey: null,
    requiresIdentityDecryptionBoundedKey: null
  },
  version: 1,
  ownerId: '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  schemaDefs: null,
  documentSchemas: {
    note: {
      type: 'object',
      properties: { message: { type: 'string', position: 0 } },
      additionalProperties: false
    }
  }
}
```

View on platform block explorer: [platform-explorer.com/dataContract/4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso](https://platform-explorer.com/dataContract/4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso)

Create a file called `updateContract.js`.

```bash wrap=false
echo > scripts/updateContract.js
```

Use your identity ID and contract ID along with `setDocumentSchema()` and `contracts.update()`.

```js wrap=false
// scripts/updateContract.js

import { client } from '../api/client.js'

const { IDENTITY_ID, CONTRACT_ID } = process.env

const updateContract = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)
    const existingDataContract = await client.platform.contracts.get(CONTRACT_ID)
    const documentSchema = existingDataContract.getDocumentSchema('note')

    documentSchema.properties.author = {
      type: 'string',
      position: 1
    }

    existingDataContract.setDocumentSchema('note', documentSchema)

    await client.platform.contracts.update(existingDataContract, identity)
    console.log('\nContract updated:\n\n', existingDataContract.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

updateContract()
```

Run the `updateContract` script.

```bash wrap=false
npm run updateContract
```

Contract updated:

```js wrap=false
{
  '$format_version': '0',
  id: '4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso',
  config: {
    '$format_version': '0',
    canBeDeleted: false,
    readonly: false,
    keepsHistory: false,
    documentsKeepHistoryContractDefault: false,
    documentsMutableContractDefault: true,
    documentsCanBeDeletedContractDefault: true,
    requiresIdentityEncryptionBoundedKey: null,
    requiresIdentityDecryptionBoundedKey: null
  },
  version: 1,
  ownerId: '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  schemaDefs: null,
  documentSchemas: {
    note: {
      type: 'object',
      properties: [Object],
      additionalProperties: false
    }
  }
}
```

Add an `apps` object to the `client` options and pass the contract ID to enable `<contract name>.<contract document>` syntax while accessing contract documents (for example, `tutorialContract.note`).

```js wrap=false
// api/client.js

import Dash from "dash"

const { NETWORK, MNEMONIC, CONTRACT_ID } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: MNEMONIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 990000,
    },
  },
  apps: {
    tutorialContract: {
      contractId: CONTRACT_ID,
    },
  },
})
```

### Submit and Retrieve Documents

Create a file called `submitNoteDocument.js`.

```bash wrap=false
echo > scripts/submitNoteDocument.js
```

Add the following to `scripts/submitNoteDocument.js`.

```js wrap=false
// scripts/submitNoteDocument.js

import { client } from '../api/client.js'

const { IDENTITY_ID, LABEL } = process.env

const submitNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)
    const noteDocument = await client.platform.documents.create(
      'tutorialContract.note',
      identity,
      { message: `Hello from ${LABEL} @ ${new Date().toUTCString()}` },
    )
    await client.platform.documents.broadcast({
      create: [noteDocument],
      replace: [],
      delete: [],
    }, identity)
    console.log(`DOCUMENT_ID="${noteDocument.toJSON().$id}"`)
    console.log(noteDocument.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

submitNoteDocument()
```

Run the `submitNoteDocument` script.

```bash wrap=false
npm run submitNoteDocument
```

Output:

```js wrap=false
DOCUMENT_ID="6uxYzLqTumUHGcSRtn8G1PDyeV6bkWiRY3T97T4n7F7M"

{
  '$id': '6uxYzLqTumUHGcSRtn8G1PDyeV6bkWiRY3T97T4n7F7M',
  '$ownerId': '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  message: 'Hello from ajcwebdev @ Mon, 03 Jun 2024 20:21:02 GMT',
  '$revision': 1,
  '$createdAt': null,
  '$updatedAt': null,
  '$transferredAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$transferredAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$transferredAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: '4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      documentsCanBeDeletedContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 2,
    ownerId: '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
    schemaDefs: null,
    documentSchemas: { note: [Object] }
  },
  '$type': 'note'
}
```

Create a file called `getDocuments.js`.

```bash wrap=false
echo > scripts/getDocuments.js
```

Add the following to `scripts/getDocuments.js`.

```js wrap=false
// scripts/getDocuments.js

import { client } from '../api/client.js'

const getDocuments = async () => {
  try {
    const documents = await client.platform.documents.get(
      'tutorialContract.note',
      { limit: 5 }
    )
    console.log('\nLast 5 messages:\n')
    documents.forEach(n => console.log(n.toJSON().message))
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

getDocuments()
```

Run the `getDocuments` script:

```bash wrap=false
npm run getDocuments
```

Output:

```txt wrap=false
Hello from ajcwebdev @ Tue, 09 Apr 2024 08:11:25 GMT
```

### Update and Delete Documents

Create a file called `updateNoteDocument.js`.

```bash wrap=false
echo > scripts/updateNoteDocument.js
```

Add the following to `scripts/updateNoteDocument.js`.

```js wrap=false
// scripts/updateNoteDocument.js

import { client } from '../api/client.js'

const { IDENTITY_ID, DOCUMENT_ID, LABEL } = process.env

const updateNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)

    const [document] = await client.platform.documents.get(
      'tutorialContract.note',
      { where: [['$id', '==', DOCUMENT_ID]] },
    )

    document.set(
      'message',
      `Hello from ${LABEL} again @ ${new Date().toUTCString()}`
    )

    await client.platform.documents.broadcast({ replace: [document] }, identity)
    console.log('\nMessage: ', document.toJSON().message)
    console.log('\nDocument updated:\n\n', document.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

updateNoteDocument()
```

Run the `updateNoteDocument` script:

```bash wrap=false
npm run updateNoteDocument
```

Output:

```txt wrap=false
Message:  Hello from ajcwebdev again @ Mon, 03 Jun 2024 20:28:29 GMT
```

Document updated:

```js wrap=false
{
  '$id': '6uxYzLqTumUHGcSRtn8G1PDyeV6bkWiRY3T97T4n7F7M',
  '$ownerId': '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  message: 'Hello from ajcwebdev again @ Mon, 03 Jun 2024 20:28:29 GMT',
  '$revision': 1,
  '$createdAt': null,
  '$updatedAt': null,
  '$transferredAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$transferredAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$transferredAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: '4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      documentsCanBeDeletedContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 3,
    ownerId: '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
    schemaDefs: null,
    documentSchemas: { note: [Object] }
  },
  '$type': 'note'
}
```

Now that we can create, read, and update our notes, all we have left to do is delete our notes. Create a file called `deleteNoteDocument.js`.

```bash wrap=false
echo > scripts/deleteNoteDocument.js
```

Add the following to `scripts/deleteNoteDocument.js`.

```js wrap=false
// scripts/deleteNoteDocument.js

import { client } from '../api/client.js'

const { IDENTITY_ID, DOCUMENT_ID } = process.env

const deleteNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)

    const [document] = await client.platform.documents.get(
      'tutorialContract.note',
      { where: [['$id', '==', DOCUMENT_ID]] },
    )

    await client.platform.documents.broadcast({ delete: [document] }, identity)
    console.log('Document deleted:\n', document.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

deleteNoteDocument()
```

Run the `deleteNoteDocument` script:

```bash wrap=false
npm run deleteNoteDocument
```

Document deleted:

```js wrap=false
{
  '$id': '6uxYzLqTumUHGcSRtn8G1PDyeV6bkWiRY3T97T4n7F7M',
  '$ownerId': '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
  message: 'Hello from ajcwebdev again @ Mon, 03 Jun 2024 20:28:29 GMT',
  '$revision': 2,
  '$createdAt': null,
  '$updatedAt': null,
  '$transferredAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$transferredAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$transferredAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: '4FwqAJwrJsnrxG9BcufeXzJMEoaqq3YASjCezxsUcrso',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      documentsCanBeDeletedContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 3,
    ownerId: '6vx4nFiHFm7NVWDUFeKPEKxmYBX3heTcUCdgC16jNdpK',
    schemaDefs: null,
    documentSchemas: { note: [Object] }
  },
  '$type': 'note'
}
```

## Setup Backend Server with Express

We've now learned how to run individual scripts to perform all the main functionality on the Dash Platform. Like any JavaScript library, we can extend this functionality with a backend and frontend. Let's create an Express server that will return information on a given identity name.

```bash wrap=false
npm i express cors
echo > api/server.js
```

Create a `/name` endpoint that will take an identity name:

```js wrap=false
// api/server.js

import express from 'express'
import cors from 'cors'
import { client } from './client.js'

const app = express()
app.use(cors())

app.get('/name/:identityName', async (req, res) => {
  try {
    const name = req.params.identityName
    const result = await client.platform.names.resolve(`${name}.dash`)
    if (result !== null) {
      res.json(result.toJSON())
    } else {
      res.status(404).send(`No identity found with the name: ${name}.dash`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong:\n' + error)
  }
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Running on localhost:", port)
})

process.on('SIGINT', async () => {
  console.log('Disconnecting Dash client...')
  await client.disconnect()
  process.exit(0)
})
```

Start the server with the following command:

```bash wrap=false
npm run express
```

Open `localhost:3001/name/YOUR-NAME-HERE` or send a GET request with curl.

```bash wrap=false
curl "http://localhost:3001/name/YOUR-NAME-HERE" -s | json_pp
```

## Create Next App

Now we'll add a frontend and use Next.js to build a React based UI.

```bash wrap=false
npx create-next-app@latest next
```

Select Yes for using the `src` directory and also for using the App Router.

```txt wrap=false
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
```

Open `page.js` in `next/src/app` and include the following code:

```js wrap=false
// next/src/app/page.js

const main = "flex flex-col items-center justify-between p-24"
const header = "text-3xl"
const pageContent = "z-10 max-w-5xl w-full items-center justify-between font-sans lg:flex"

export default function Home() {
  return (
    <main className={main}>
      <h1 className={header}>Next.js Dash Example</h1>
      <div className={pageContent}>
        <h2>Identity:</h2>
      </div>
    </main>
  )
}
```

Start your server with the following command:

```bash wrap=false
cd next
npm run dev
```

### Setup React Project Structure

Now let's include the logic to fetch our name. First, create a new `.env.local` file in your Next.js project and add `NEXT_PUBLIC_LABEL=""` with your label.

```bash wrap=false
echo 'NEXT_PUBLIC_LABEL=""' > .env.local
```

```js wrap=false
// next/src/app/page.js

"use client"

import { useEffect, useState } from 'react'

const main = "flex flex-col items-center justify-between p-24"
const header = "text-3xl"
const pageContent = "z-10 max-w-5xl w-full items-center justify-between font-sans lg:flex"

export default function Home() {
  const [blockchainData, setBlockchainData] = useState(null)
  useEffect(() => {
    fetch(`http://localhost:3001/name/${process.env.NEXT_PUBLIC_LABEL}`)
      .then(response => response.json())
      .then(data => setBlockchainData(data))
  }, [])
  return (
    <main className={main}>
      <h1 className={header}>Next.js Dash Example</h1>
      <div className={pageContent}>
        <h2>Identity:</h2>
        <pre>
          {JSON.stringify(blockchainData, null, 2)}
        </pre>
      </div>
    </main>
  )
}
```

### Add Fetch Button to React App

Now lets add a button that when clicked will fetch our name information.

```js wrap=false
// next/src/app/page.js

"use client"

import { useEffect, useState } from 'react'

const main = "flex flex-col items-center justify-between p-24"
const header = "text-3xl"
const pageContent = "z-10 max-w-5xl w-full items-center justify-between font-sans lg:flex"

export default function Home() {
  const [blockchainData, setBlockchainData] = useState()
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true) // Set loading to true when fetch begins
    fetch(`http://localhost:3001/name/${process.env.NEXT_PUBLIC_LABEL}`)
      .then(response => response.json())
      .then(data => {
        setBlockchainData(data)
        setIsLoading(false) // Set loading to false when fetch completes
      })
  }

  useEffect(() => {
    if (triggerFetch) {
      fetchData()
      setTriggerFetch(false) // Reset trigger
    }
  }, [triggerFetch])
  return (
    <main className={main}>
      <h1 className={header}>Next.js Dash Example</h1>
      <div className={pageContent}>
        <h2>Identity:</h2>
        <button onClick={() => setTriggerFetch(true)}>
          Fetch Data
        </button>
        <pre>
          {isLoading
            ? 'Loading...'
            : JSON.stringify(blockchainData, null, 2)
          }
        </pre>
      </div>
    </main>
  )
}
```

In future blog posts we'll expand out our frontend to include more of the functionality included in our Node scripts. We'll also build out front-ends with other popular frameworks.