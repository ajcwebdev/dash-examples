---
slug: "first-look-dash"
title: "A First Look at Dash"
description: "Dash is a digital cryptocurrency launched in 2014 that aims to be a convenient, fast, and private digital cash platform that is suitable for everyday transactions."
publishDate: "2024-04-01"
# updatedDate: ""
tags: [ "Dash", "Node" ]
coverImage:
  src: "https://ajc.pics/dash-examples/00-dash-examples.webp"
  alt: "Blog post cover art"
draft: true
---

## Outline

- [Dash Platform Overview](#dash-platform-overview)
  - [Setup and Configure Node Project](#setup-and-configure-node-project)
  - [Initialize Dash Client and Query Blocks](#initialize-dash-client-and-query-blocks)
- [Create Wallet and Identity](#create-wallet-and-identity)
  - [Add Funds to Wallet with Testnet Faucet](#add-funds-to-wallet-with-testnet-faucet)
  - [Register and Retrieve Identity](#register-and-retrieve-identity)
  - [Register and Retrieve Name](#register-and-retrieve-name)
- [Data Contracts](#data-contracts)
  - [Register, Retrieve, and Update Contract](#register-retrieve-and-update-contract)
  - [Submit and Retrieve Document](#submit-and-retrieve-document)
  - [Update and Delete Document](#update-and-delete-document)
- [Setup Backend Server with Express](#setup-backend-server-with-express)
- [Create React App](#create-react-app)
  - [Setup React Project Structure](#setup-react-project-structure)
  - [Add Fetch Button to React App](#add-fetch-button-to-react-app)
- [Setup Deployment](#setup-deployment)
  - [Create Vercel API Route](#create-vercel-api-route)
- [Resources](#resources)

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
- [__Dash Libraries__](): A collection of integrated open source libraries for developing on the Dash Platform. Examples include:
  - [`js-dpns-client`](https://github.com/dashevo/js-dpns-client)
  - [`js-dash-sdk`](https://github.com/dashpay/platform/tree/master/packages/js-dash-sdk)
    - [`wallet-lib`](https://github.com/dashpay/platform/tree/master/packages/wallet-lib)
    - [`dashcore-lib`](https://github.com/dashpay/dashcore-lib)
    - [`js-dapi-client`](https://github.com/dashpay/platform/tree/master/packages/js-dapi-client)
    - [`js-dpp`](https://github.com/dashpay/platform/tree/master/packages/js-dpp)

The [Dash roadmap](https://www.dash.org/roadmap/) is always publicly viewable so users and developers can see what is being worked on for the next year or so development. Right now the upcoming network implementations schedule for 2024 and beyond include the following: 

- Dash Platform v1.0 (ROLL OUT) begins the roll out of the platform on Mainnet.
  - The release will emphasize written documentation, tutorials, and Dash Improvement Proposals (DIPs).
  - v1.0 `ACTIVATION` will signal the official activation of the protocol and triggers after a specific number of masternode owners upgrade.
  - The DashPay Launch will complete the v1.0 release and enable creating on-chain usernames for the official DashPay mobile app.
- Dash Platform v2.0 plans to build in support for both of the following:
  - Fungible tokens to mint specific tokens.
  - Non-fungible tokens for storing NFT data on chain.
- Dash Platform v3.0 will add a Virtual Machine for Smart Contracts to allow on-chain computation.
- Dash Platform v4.0 implements the Inter-Blockchain Communication Protocol (IBC) to enable permissionless, cross-chain applications.
  - As of April 2024, this is the last scheduled release currently on the roadmap

### Setup and Configure Node Project

```bash
mkdir dash-examples
cd dash-examples
npm init -y
npm pkg set type="module"
npm i dash@1.0-dev
echo '.DS_Store\nnode_modules\n.env\ndist' > .gitignore
```

We'll create each script file individually throughout the tutorial but for the sake of simplifying your life while following along with this tutorial, I'd recommend adding all of the Node scripts that will be implemented by the end of the tutorial.

```json
{
  "name": "dash-examples",
  "description": "An example application using the Dash JavaScript SDK",
  "keywords": [ "Dash", "JavaScript" ],
  "author": "Anthony Campolo",
  "license": "MIT",
  "type": "module",
  "dependencies": {
    "dash": "^4.0.0-dev.10"
  },
  "scripts": {
    "getBlockMethods": "node --env-file=.env scripts/getBlockMethods",
    "createWallet": "node --env-file=.env scripts/createWallet",
    "createIdentity": "node --env-file=.env scripts/createIdentity",
    "retrieveIdentities": "node --env-file=.env scripts/retrieveIdentities",
    "topupIdentities": "node --env-file=.env scripts/topupIdentities",
    "registerName": "node --env-file=.env scripts/registerName",
    "retrieveName": "node --env-file=.env scripts/retrieveName",
    "registerContract": "node --env-file=.env scripts/registerContract",
    "retrieveContract": "node --env-file=.env scripts/retrieveContract",
    "updateContract": "node --env-file=.env scripts/updateContract",
    "submitNoteDocument": "node --env-file=.env scripts/submitNoteDocument",
    "getDocuments": "node --env-file=.env scripts/getDocuments",
    "updateNoteDocument": "node --env-file=.env scripts/updateNoteDocument",
    "deleteNoteDocument": "node --env-file=.env scripts/deleteNoteDocument"
  }
}
```

### Initialize Dash Client and Query Blocks

Create a `scripts` directory for our Node scripts and an `api` directory with a file called `client.js` for initializing `Dash.Client`. The `network` will be set to `testnet` via the `NETWORK` environment variable in `.env`.

```bash
mkdir api scripts
echo > api/client.js
echo 'NETWORK="testnet"' > .env
```

Import `Dash` from `dash`, pass the project's network and wallet configuration through Dash's `Client` constructor, and export `client`.

```js
// api/client.js

import Dash from "dash"

const { NETWORK } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: null,
    offlineMode: true,
  },
})
```

- Because we haven't created a wallet yet, `mnemonic` is set to `null` to indicate we want a new wallet to be generated. To get a new address for an existing wallet replace `null` with an existing wallet mnemonic.
- `offlineMode` is set to `true`, indicating we don't want to sync the chain. This can only be used when the mnemonic is set to `null`.

Create a file called `getBlockMethods.js` which will be used to query block data.

```bash
echo > scripts/getBlockMethods.js
```

- `getBestBlockHash` returns the block hash of the chaintip.
- `getBlockHash` returns the block hash of a given height.
  - In blockchain terminology, "height" refers to the position of a block in the chain. The first block ever mined (also known as the genesis block) typically has a height of 0.
  - Each subsequent block that's added to the chain increases the height by one so the height of a block also represents the total number of blocks that precede it in the chain.
- `getBlockByHeight` fetches a specific block by its height.
  - Unlike `getBlockHash`, it returns a bufferized block instead of the corresponding block hash.

```js
// scripts/getBlockMethods.js

import { client } from '../api/client.js'

async function dapiClientMethods() {
  try {
    const dapiClient = client.getDAPIClient().core

    console.log("\ngetBlockHash(1):", await dapiClient.getBlockHash(1))
    console.log("\ngetBestBlockHash():", await dapiClient.getBestBlockHash())
    console.log("\ngetBlockByHeight():", await dapiClient.getBlockByHeight(1))
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

dapiClientMethods()
```

Run `getBlockMethods` script:

```bash
npm run getBlockMethods
```

You'll receive the following output:

```
getBlockByHeight(): <Buffer 02 00 00 00 2c bc f8 3b 62 91 3d 56 f6 05 c0 e5 81 a4 88 72 83 94 28 c9 2e 5e b7 6c d7 ad 94 bc af 0b 00 00 7f 11 dc ce 14 07 55 20 e8 f7 4c c4 dd f0 ... 136 more bytes>

getBlockHash(1): 0000047d24635e347be3aaaeb66c26be94901a2f962feccd4f95090191f208c1

getBestBlockHash(): 000000ec93f8559ca1bd9f5391519457d596a2e806bc18934b4208a67d7e8613
```

- `getBlockByHeight()` returned a `<Buffer>` object, which is a Node.js type used to efficiently represent a sequence of bytes. Since blockchain data is binary, it's represented as a buffer when accessed programmatically.

- `getBlockHash(1)` returns the hash of the block at height 1 as a hexadecimal string. Block hashes are unique identifiers for blocks and are derived from the block header information, including the previous block's hash, a timestamp, and a nonce among other data. This particular hash identifies the first block after the genesis block in the Dash blockchain.

- `getBestBlockHash()` returns the hash of the latest block in the longest chain, which is considered the current state of the blockchain and is the most recently confirmed block at the time of the query.

## Create Wallet and Identity

Create a file called `createWallet.js`.

```bash
echo > scripts/createWallet.js
```

```js
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

Run `createWallet` script.

```bash
npm run createWallet
```

```
WALLET_ADDRESS="yXenbVhwqe1Vf19RWKfnnjWzYEiyCznYkV"
MNEMONIC="pencil civil ship feed tape buffalo crowd caution disorder tuna soul soda"
```

### Add Funds to Wallet with Testnet Faucet

Send test funds to the "unused address" from the console output using Dash's [testnet faucet](https://testnet-faucet.dash.org/). Wait for the funds to be confirmed before trying to use them, it may take a few minutes. You can check the status of confirmations with the [Dash block explorer](https://testnet-insight.dashevo.org/insight/).

Search for your wallet address (`yXenbVhwqe1Vf19RWKfnnjWzYEiyCznYkV` in my case) to see your balance and list of transactions:

![01 - Viewing new Dash wallet address on testnet block explorer](https://ajc.pics/dash-examples/01-wallet-address-on-dash-block-explorer.webp)

Click on the transaction link (`9ca05a57d2f8e55068a5c8be4453d3a84aa852304d1aa3d32d92b9b5afe32261` in my case) to view information on the transaction itself.

![02 - Viewing new Dash faucet transaction on testnet block explorer](https://ajc.pics/dash-examples/02-transaction-on-block-explorer.webp)

You can also click on the plus symbol (+) next to the transaction link for more information related to the transaction confirmation.

![03 - Viewing new transaction confirmation info on testnet block explorer](https://ajc.pics/dash-examples/03-transaction-confirmation.webp)

### Register and Retrieve Identity

Modify the client again and include your wallet's `MNEMONIC` seed phrase saved in `.env`.

```js
// api/client.js

import Dash from "dash"

const { MNEMONIC, NETWORK } = process.env

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

```bash
echo > scripts/createIdentity.js
```

```js
// scripts/createIdentity.js

import { client } from '../api/client.js'

async function createIdentity() {
  try {
    const identity = await client.platform.identities.register()
    console.log("IDENTITY_ID=" + `"${identity.toJSON().id}"`)
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

createIdentity()
```

Run `createIdentity` script.

```bash
npm run createIdentity
```

```
IDENTITY_ID="94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1"
```

Earlier, we saw how to view our transactions on the Dash block explorer. For operations performed on Dash Platform, there is a separate explorer at [platform-explorer.com](https://platform-explorer.com). Open the [Identities](https://platform-explorer.com/identities) tab to see your ID on the list. Alternatively, you can simply append you ID to the URL after `https://platform-explorer.com/identity/`.

Gqf64Q54JuPGZZfVXPaNTrNTYpY2BbvhJjQMp3fLUuBG

Screenshot of transaction creation:

https://platform-explorer.com/identity/Gqf64Q54JuPGZZfVXPaNTrNTYpY2BbvhJjQMp3fLUuBG

![04-platform-explorer-identity-endpoint](https://ajc.pics/dash-examples/04-platform-explorer-identity-endpoint.webp)

Create a file called `retrieveIdentities.js`.

```bash
echo > scripts/retrieveIdentities.js
```

```js
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

```bash
npm run retrieveIdentities
```

When an Identity is created, a special transaction transforms Dash into credits which are used to interact with Dash Platform.

1 DASH is equal to 100,000,000 Duffs (Dash's version of the [Satoshi](https://www.fool.com/terms/s/satoshi/)) and 100 million Duffs is equal to 100 billion credits.

1 DASH = 100,000,000 [Satoshis](https://www.fool.com/terms/s/satoshi/)/Duffs = 100,000,000,000 credits

1 Satoshi = 1000 credits

Since interacting with Dash Platform applications decreases your credit balance, at a certain point you'll need to topup the balance by converting some Dash to credits.

Create a file called `topupIdentities.js`.

```bash
echo > scripts/topupIdentities.js
```

```js
// scripts/topupIdentities.js

import { client } from '../api/client.js'

async function topupIdentities() {
  try {
    const walletAccount = await client.getWalletAccount()
    const identityIds = walletAccount.identities.getIdentityIds()

    for (const id of identityIds) {
      await client.platform.identities.topUp(id, 100000)
      const identity = await client.platform.identities.get(id)
      console.log(`IDENTITY_CREDIT_BALANCE for ID ${id}: ${identity.balance}`)
    }
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

topupIdentities()
```

Run `topupIdentities` script:

```bash
npm run topupIdentities
```

```
IDENTITY_CREDIT_BALANCE for ID Gqf64Q54JuPGZZfVXPaNTrNTYpY2BbvhJjQMp3fLUuBG: 920284770
```

### Register and Retrieve Name

Create a file called `registerName.js`.

```bash
echo > scripts/registerName.js
```

Create a `LABEL` in `.env` with your desired name. I will be using `streamtest20240409`.

```bash
echo '\nLABEL="streamtest20240409"' >> .env
```

```js
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
  } catch (error) {
    console.error("Something went wrong:\n", error)
  } finally {
    client.disconnect()
  }
}

registerName()
```

Run `registerName` script:

```bash
npm run registerName
```

```
LABEL="streamtest20240409"
```

https://platform-explorer.com/document/Aaun8ywpu9xNJiuVU8VxMoMi31GZkC1yuPrLSuJHzfWy

![05-platform-explorer-document-endpoint](https://ajc.pics/dash-examples/05-platform-explorer-document-endpoint.webp)

Create a file called `retrieveName.js`.

```bash
echo > scripts/retrieveName.js
```

```js
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

Run `retrieveName` script:

```bash
npm run retrieveName
```

Resolved name object:

```js
{
  '$id': 'Aaun8ywpu9xNJiuVU8VxMoMi31GZkC1yuPrLSuJHzfWy',
  '$ownerId': 'Gqf64Q54JuPGZZfVXPaNTrNTYpY2BbvhJjQMp3fLUuBG',
  label: 'streamtest20240409',
  normalizedLabel: 'streamtest20240409',
  normalizedParentDomainName: 'dash',
  parentDomainName: 'dash',
  preorderSalt: '4wQ+j0vNvEM4MqYd7rhS0FmAEqLhsEBA2KGjqlxM0d4=',
  records: {
    dashUniqueIdentityId: '61Y/gnUBpjC3dZY/0YTIVNeSpUa0nXsBdxMEnICcscs='
  },
  subdomainRules: { allowSubdomains: false },
  '$revision': 1,
  '$createdAt': null,
  '$updatedAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
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

View on block explorer: https://platform-explorer.com/document/Aaun8ywpu9xNJiuVU8VxMoMi31GZkC1yuPrLSuJHzfWy

## Data Contracts

A Data Contract on Dash Platform serves as a blueprint for the structure of data that an application intends to store on the decentralized network. It defines the schema of documents (data records) with JSON Schema.

- Contracts enable the platform to validate data against these schemas to ensure consistency and integrity.
- They are crucial for dApps and provide a structured and predictable way to interact with the Dash blockchain.
- Data Contracts facilitate data storage, retrieval, and manipulation in a trustless environment.

### Register, Retrieve, and Update Contract

Create a file called `registerContract.js`.

```bash
echo > scripts/registerContract.js
```

```js
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
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

registerContract()
```

Run `registerContract` script:

```bash
npm run registerContract
```

Contract registered:

```js
{
  '$format_version': '0',
  id: 'E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c',
  config: {
    '$format_version': '0',
    canBeDeleted: false,
    readonly: false,
    keepsHistory: false,
    documentsKeepHistoryContractDefault: false,
    documentsMutableContractDefault: true,
    requiresIdentityEncryptionBoundedKey: null,
    requiresIdentityDecryptionBoundedKey: null
  },
  version: 1,
  ownerId: 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
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

```
CONTRACT_ID=E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c
```

https://platform-explorer.com/dataContract/E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c

Create a file called `retrieveContract.js`.

```bash
echo > scripts/retrieveContract.js
```

```js
// scripts/retrieveContract.js

import { client } from '../api/client.js'

const { CONTRACT_ID } = process.env

const retrieveContract = async () => {
  try {
    const contract = await client.platform.contracts.get(CONTRACT_ID)
    console.dir(contract.toJSON(), { depth: 5 })
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

retrieveContract()
```

Run `retrieveContract` script.

```bash
npm run retrieveContract
```

```js
{
  '$format_version': '0',
  id: 'E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c',
  config: {
    '$format_version': '0',
    canBeDeleted: false,
    readonly: false,
    keepsHistory: false,
    documentsKeepHistoryContractDefault: false,
    documentsMutableContractDefault: true,
    requiresIdentityEncryptionBoundedKey: null,
    requiresIdentityDecryptionBoundedKey: null
  },
  version: 1,
  ownerId: 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
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

Create a file called `updateContract.js`.

```bash
echo > scripts/updateContract.js
```

```js
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

Run `updateContract` script.

```bash
npm run updateContract
```

Contract updated:

```js
{
  '$format_version': '0',
  id: 'E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c',
  config: {
    '$format_version': '0',
    canBeDeleted: false,
    readonly: false,
    keepsHistory: false,
    documentsKeepHistoryContractDefault: false,
    documentsMutableContractDefault: true,
    requiresIdentityEncryptionBoundedKey: null,
    requiresIdentityDecryptionBoundedKey: null
  },
  version: 2,
  ownerId: 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
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

```js
// api/client.js

import Dash from "dash"

const { MNEMONIC, NETWORK, CONTRACT_ID } = process.env

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

```bash
echo > scripts/submitNoteDocument.js
```

```js
// scripts/submitNoteDocument.js

import { client } from '../api/client.js'

const { IDENTITY_ID } = process.env

const submitNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)
    const noteDocument = await client.platform.documents.create(
      'tutorialContract.note',
      identity,
      { message: `Hello from ajcwebdev @ ${new Date().toUTCString()}` },
    )
    await client.platform.documents.broadcast({
      create: [noteDocument],
      replace: [],
      delete: [],
    }, identity)
    console.log(noteDocument.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

submitNoteDocument()
```

TODO: Modify to console log `DOCUMENT_ID=FEr8g3vhRvkSgyJcdUQQUpvduQcFKsziN5YRwSHyrEbT`.

```bash
npm run submitNoteDocument
```

```js
{
  '$id': 'FEr8g3vhRvkSgyJcdUQQUpvduQcFKsziN5YRwSHyrEbT',
  '$ownerId': 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
  message: 'Hello from ajcwebdev @ Tue, 09 Apr 2024 08:20:37 GMT',
  '$revision': 1,
  '$createdAt': null,
  '$updatedAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: 'E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 3,
    ownerId: 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
    schemaDefs: null,
    documentSchemas: { note: [Object] }
  },
  '$type': 'note'
}
```

Create a file called `getDocuments.js`.

```bash
echo > scripts/getDocuments.js
```

```js
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

```bash
npm run getDocuments
```

```
Hello again from ajcwebdev @ Tue, 09 Apr 2024 08:14:26 GMT
Hello from ajcwebdev @ Tue, 09 Apr 2024 08:11:25 GMT
```

### Update and Delete Documents

Create a file called `updateNoteDocument.js`.

```bash
echo > scripts/updateNoteDocument.js
```

```js
// scripts/updateNoteDocument.js

import { client } from '../api/client.js'

const { IDENTITY_ID, DOCUMENT_ID } = process.env

const updateNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)

    const [document] = await client.platform.documents.get(
      'tutorialContract.note',
      { where: [['$id', '==', DOCUMENT_ID]] },
    )

    document.set(
      'message',
      `Updated document final @ ${new Date().toUTCString()}`
    )

    await client.platform.documents.broadcast({ replace: [document] }, identity)
    console.log('\nDocument updated:\n\n', document.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

updateNoteDocument()
```

Run `updateNoteDocument` script:

```bash
npm run updateNoteDocument
```

Document updated:

```js
{
  '$id': 'FEr8g3vhRvkSgyJcdUQQUpvduQcFKsziN5YRwSHyrEbT',
  '$ownerId': 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
  message: 'Updated document @ Tue, 09 Apr 2024 08:39:01 GMT',
  '$revision': 4,
  '$createdAt': null,
  '$updatedAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: 'E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 3,
    ownerId: 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
    schemaDefs: null,
    documentSchemas: { note: [Object] }
  },
  '$type': 'note'
}
```

Create a file called `deleteNoteDocument.js`.

```bash
echo > scripts/deleteNoteDocument.js
```

```js
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

```bash
npm run deleteNoteDocument
```

Document deleted:

```js
{
  '$id': 'FEr8g3vhRvkSgyJcdUQQUpvduQcFKsziN5YRwSHyrEbT',
  '$ownerId': 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
  message: 'Updated document @ Tue, 09 Apr 2024 08:39:01 GMT',
  '$revision': 1,
  '$createdAt': null,
  '$updatedAt': null,
  '$createdAtBlockHeight': null,
  '$updatedAtBlockHeight': null,
  '$createdAtCoreBlockHeight': null,
  '$updatedAtCoreBlockHeight': null,
  '$dataContract': {
    '$format_version': '0',
    id: 'E8K4DhNTbBucds6mBTuzYK1v1YmU1DPBwPrrtknX5R3c',
    config: {
      '$format_version': '0',
      canBeDeleted: false,
      readonly: false,
      keepsHistory: false,
      documentsKeepHistoryContractDefault: false,
      documentsMutableContractDefault: true,
      requiresIdentityEncryptionBoundedKey: null,
      requiresIdentityDecryptionBoundedKey: null
    },
    version: 3,
    ownerId: 'FWZBvqN5M1M8MF7vUVMFc8QFM8uRwmnXBXnEFWJEmt8n',
    schemaDefs: null,
    documentSchemas: { note: [Object] }
  },
  '$type': 'note'
}
```

## Setup Backend Server with Express

```bash
npm i express cors
mkdir api
echo > api/server.js
```

TODO: Update Express server commands to use Node 20 features including `watch` and `env` flags.

```json
{
  "scripts": {
    "start:server": "node api/server",
    "dev:server": "node api/server"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dash": "^3.24.4",
    "express": "^4.18.2"
  }
}
```

```js
// api/server.js

import express from 'express'
import cors from 'cors'
import { client } from '../client.js'

const app = express()
app.use(cors())

app.get('/name/:identityName', async (req, res) => {
  try {
    const name = req.params.identityName
    const result = await client.platform.names.resolve(`${name}.dash`)
    res.json(result.toJSON())
  } catch (error) {
    res.status(500).send('Something went wrong:\n' + error)
  } finally {
    client.disconnect()
  }
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Running on localhost:", port)
})
```

```bash
npm run serve
```

Open [`localhost:3001/name/streamtest20240409`](http://localhost:3001/name/streamtest20240409) or send a GET request with curl.

```bash
curl "http://localhost:3001/name/streamtest20240409"
```

Old output, update later:

```json
{
  "$id":"DqeamRwhQE6HNzFvk63ZVTpwBm4AZAss1wv5E46iPkkv",
  "$ownerId":"94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1",
  "$revision":1,
  "label":"ajcwebdevtest",
  "normalizedLabel":"ajcwebdevtest",
  "normalizedParentDomainName":"dash",
  "preorderSalt":"u60YDYG8BUuBcWjfXUGbkTr08JiB8JaKBqmVda3P2WI=",
  "records":{
    "dashUniqueIdentityId":"94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1"
  },
  "subdomainRules":{
    "allowSubdomains":false
  },
  "$protocolVersion":1,
  "$type":"domain",
  "$dataContractId":"GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec"
}
```

## Create React App

TODO: Use Next.js

### Setup React Project Structure

`package.json`.

```json

```

App component.

```js
// src/App.jsx

import { useEffect, useState } from 'react'

function App() {
  const [blockchainData, setBlockchainData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/name/streamtest20240409')
      .then(response => response.json())
      .then(data => setBlockchainData(data))
  }, [])

  return (
    <>
      <h1>Dash + React + Express</h1>
      <pre>
        {JSON.stringify(blockchainData, null, 2)}
      </pre>
    </>
  )
}

export default App
```

```bash
npm run dev:client
```

### Add Fetch Button to React App

```jsx
// src/App.jsx

import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [blockchainData, setBlockchainData] = useState()
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true) // Set loading to true when fetch begins
    fetch('http://localhost:3001/name/streamtest20240409')
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
    <>
      <h1>Dash + React + Express</h1>
      <button onClick={() => setTriggerFetch(true)}>
        Fetch Data
      </button>
      <p className="leftCenter">
        <pre className="preLeft">
          {isLoading
            ? 'Loading...'
            : JSON.stringify(blockchainData, null, 2)
          }
        </pre>
      </p>
    </>
  )
}

export default App
```

TODO: Update screenshot and fix CSS

![06 - react-frontend-with-express](https://ajc.pics/dash-examples/06-react-frontend-with-express.webp)

## Setup Vercel Deployment

Add the `vercel` CLI dependency.

```bash
npm i -D vercel
```

Add a `vercel` script to `package.json`.

```json
{
  "scripts": {
    "start:server": "node api/server",
    "dev:server": "node api/server",
    "dev:client": "vite",
    "build:client": "vite build",
    "start:client": "vite preview",
    "start": "run-p start:*",
    "dev": "run-p dev:*",
    "vercel": "vercel dev"
  },
}
```

Create `vercel.json` and `wrangler.toml` configuration files.

```bash
echo '{"buildCommand": "npm run build"}' > vercel.json
echo > wrangler.toml
```

### Create Vercel API Route

```bash
mkdir api/vercel-name
echo > "api/vercel-name/[identityName].js"
```

Earlier we learned how to fetch data from the Express server in `api/server.js` and run it locally on `http://localhost:3001/`. We'll want to do the same with our API routes. The goal is to leave the React component completely unchanged with the exception of switching from `http://localhost:3001/name/streamtest20240409` to `http://localhost:3000/api/name/streamtest20240409`.

```js
// api/vercel-name/[identityName].js

export default function handler(request, response) {
  response.status(200).json()
}
```

In order to make the handler function behave the same way Express server does, we need to extract the `identityName` from the request, make the API call with `Dash.Client`, and return the response. Since the original Express server used an async function, we should do the same here to handle promises correctly.

```js
// api/vercel-name/[identityName].js

import Dash from "dash"

const client = new Dash.Client({ network: 'testnet' })

export default async function handler(request, response) {
  const { identityName } = request.query
  
  try {
    const result = await client.platform.names.resolve(`${identityName}.dash`)
    response.status(200).json(result.toJSON().label)
  } catch (e) {
    response.status(500).send('Something went wrong:\n' + e)
  } finally {
    client.disconnect()
  }
}
```

```bash
npm run dev
```

```bash
curl "http://localhost:3000/api/name/streamtest20240409"
```

```bash
git init
git add .
git commit -m "init"
gh repo create dash-examples \
  --public \
  --push \
  --source=. \
  --description="An example Dash app built with React and deployed on Vercel." \
  --remote=upstream
```

```bash
vercel
```

## Resources

- [`js-dash-sdk`](https://github.com/dashpay/platform/tree/master/packages/js-dash-sdk).
- [Docs Audit | ROASTING Crypto docs](https://www.youtube.com/watch?v=mO_Dmjlu-ro).
- [Connect to a Network](https://dashplatform.readme.io/docs/tutorial-connecting-to-testnet)
