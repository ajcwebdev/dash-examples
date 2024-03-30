---
slug: "first-look-dash"
title: "A First Look at Dash"
description: "Dash is a digital cryptocurrency launched in 2014 that aims to be a convenient, fast, and private digital cash platform that is suitable for everyday transactions."
publishDate: "2024-04-01"
# updatedDate: ""
tags: [ "Dash", "Node" ]
coverImage:
  src: "https://utfs.io/f/5b355cb5-10ff-43ec-b682-cc79c30e6811-yylgeu.webp"
  alt: "Blog post cover art"
draft: true
---

## Outline

- [Introduction](#introduction)
  - [Dash Platform](#dash-platform)
- [Create Node Scripts](#create-node-scripts)
  - [Set Type to Module and Add Scripts](#set-type-to-module-and-add-scripts)
  - [Initialize Dash Client](#initialize-dash-client)
  - [Query Blocks on Dash Testnet](#query-blocks-on-dash-testnet)
- [Create Wallet and Identity](#create-wallet-and-identity)
  - [Configure Dash Client for Wallet Creation](#configure-dash-client-for-wallet-creation)
  - [Export Wallet Mnemonic](#export-wallet-mnemonic)
  - [Add Funds to Wallet with Testnet Faucet](#add-funds-to-wallet-with-testnet-faucet)
  - [Register and Retrieve Identity](#register-and-retrieve-identity)
  - [Topup Identity Credit Balance](#topup-identity-credit-balance)
  - [Register and Retrieve Name](#register-and-retrieve-name)
- [Data Contracts](#data-contracts)
  - [Register and Retrieve Contract](#register-and-retrieve-contract)
  - [Update Contract](#update-contract)
  - [Submit and Retrieve Documents](#submit-and-retrieve-documents)
  - [Update and Delete Documents](#update-and-delete-documents)
- [Backend](#backend)
  - [Add Express Server](#add-express-server)
- [Add React App](#add-react-app)
  - [Add Vite Configuration](#add-vite-configuration)
  - [Create App Component](#create-app-component)
  - [Add CSS Styling](#add-css-styling)
  - [Add Fetch Button](#add-fetch-button)
  - [Vue](#vue)
- [Deploy](#deploy)
  - [Create Vercel API Route](#create-vercel-api-route)
  - [Create Netlify Function](#create-netlify-function)
- [Resources](#resources)

> ___All of this project's code can be found in the [`a-first-look` repo](https://github.com/ajcwebdev/a-first-look/dash) on my GitHub.___

## Introduction

Dash is a digital cryptocurrency that was launched in 2014. Originally called XCoin (XCO), it was renamed Darkcoin and then finally rebranded as Dash in 2015. "Dash" is a portmanteau of "Digital Cash" and was created as a fork of Bitcoin.

Despite its origins, today Dash differs significantly from Bitcoin by aiming to be a convenient, fast, and private digital cash platform that is suitable for everyday transactions. This goal is reflected in its design features which include:

- __PrivateSend__: This feature ensures user privacy by mixing transactions together, making them untraceable to individual users.
- __InstantSend__: Dash's InstantSend feature enables near-instant transaction confirmations that are faster than Bitcoin's.
- __Masternodes__:  Dash's network includes masternodes (or full nodes) which power its unique features like InstantSend and PrivateSend, as well as its governance system.
- __Decentralized Autonomous Organization__: Dash operates as a DAO, meaning it is a transparent, member-controlled organization free from central government influence.
- __Block Reward Allocation__: Dash's block reward is split between miners (45%), masternodes (45%), and a development fund (10%), ensuring ongoing platform maintenance and development.

### Dash Platform

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

The [Dash roadmap](https://www.dash.org/roadmap/) is always publicly viewable and currently extends into 2024.

## Create Node Scripts

```bash
mkdir ajcwebdev-dash
cd ajcwebdev-dash
npm init -y
npm i dash@1.0-dev dotenv
echo '# A First Look at Dash' > README.md
echo '.DS_Store\nnode_modules\n.env\ndist\n.netlify\n.vercel' > .gitignore
```

### Set Type to Module and Add Scripts

Set `"type": "module",` in `package.json`.

```json
{
  "name": "ajcwebdev-dash",
  "description": "An example application using the Dash JavaScript SDK",
  "keywords": [ "Dash", "JavaScript" ],
  "author": "Anthony Campolo",
  "license": "MIT",
  "type": "module",
  "dependencies": {
    "dash": "^3.24.3"
  },
  "scripts": {
    "getBestBlockHash": "node scripts/getBestBlockHash",
    "getBlockHash": "node scripts/getBlockHash",
    "getBlockByHeight": "node scripts/getBlockByHeight",
    "createWallet": "node scripts/createWallet",
    "createIdentity": "node scripts/createIdentity",
    "retrieveIdentity": "node scripts/retrieveIdentity",
    "retrieveIdentityIds": "node scripts/retrieveIdentityIds",
    "updateIdentityDisableKey": "node scripts/updateIdentityDisableKey",
    "topupIdentity": "node scripts/topupIdentity",
    "registerName": "node scripts/registerName",
    "retrieveName": "node scripts/retrieveName",
    "registerContract": "node scripts/registerContract",
    "retrieveContract": "node scripts/retrieveContract",
    "updateContract": "node scripts/updateContract",
    "submitNoteDocument": "node scripts/submitNoteDocument",
    "getDocuments": "node scripts/getDocuments",
    "updateNoteDocument": "node scripts/updateNoteDocument",
    "deleteNoteDocument": "node scripts/deleteNoteDocument",
    "serve": "node api/server"
  }
}
```

### Initialize Dash Client

Create a directory for our Node scripts and a file called `client.js` for initializing `Dash.Client`. 

```bash
mkdir scripts
echo > scripts/client.js
echo 'NETWORK="testnet"' > .env
```

Import `Dash` from `dash`, pass the project's network and wallet configuration through Dash's `Client` constructor, and export `client`.

```js
// scripts/client.js

import Dash from "dash"
import * as dotenv from "dotenv"
dotenv.config()

const { NETWORK } = process.env

export const client = new Dash.Client({
  network: NETWORK
})
```

The `network` is set to `testnet` via the `NETWORK` environment variable. The Dash Platform will be available on Mainnet in [Q?]().

### Query Blocks on Dash Testnet

Create a file called `getBlockMethods.js`.

```bash
echo > scripts/getBlockMethods.js
```

```js
// scripts/getBlockMethods.js

async function dapiClientMethods() {
  console.log(await client.getDAPIClient().core.getBlockHash(1))
  console.log(await client.getDAPIClient().core.getBestBlockHash())
  console.log(await client.getDAPIClient().core.getBlockByHeight(1))
  return client.getDAPIClient().core.getStatus()
}

dapiClientMethods()
  .then((d) => console.log('Core status:\n', d))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

Create a file called `getBestBlockHash.js`.

```bash
echo > scripts/getBestBlockHash.js
```

`getBestBlockHash` returns the block hash of the chaintip.

```js
// scripts/getBestBlockHash.js

import { client } from "./client.js"

async function getBestBlockHash() {
  const DAPIClient = client.getDAPIClient()
  const res = await DAPIClient.core.getBestBlockHash()
  if (!res) {
    throw new Error('No response received from getBestBlockHash API call')
  }
  return res
}

getBestBlockHash()
  .then(data => console.log(data))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

Run the `getBestBlockHash` script.

```bash
npm run getBestBlockHash
```

```
000000c0e9209ac16e07929950d415bed816b71b7aa52507cc0c7ed964a10de4
```

Create a file called `getBlockHash.js`.

```bash
echo > scripts/getBlockHash.js
```

`getBlockHash` returns the block hash of a given height. In blockchain terminology, "height" refers to the position of a block in the chain. The first block ever mined (also known as the genesis block) typically has a height of 0.

Each subsequent block that's added to the chain increases the height by one so the height of a block also represents the total number of blocks that precede it in the chain.

```js
// scripts/getBlockHash.js

import { client } from "./client.js"

async function getBlockHash() {
  const DAPIClient = client.getDAPIClient()
  const res = await DAPIClient.core.getBlockHash(1)
  if (!res) {
    throw new Error('No response received from getBlockHash API call')
  }
  return res
}

getBlockHash()
  .then(data => console.log(data))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

Run `getBlockHash`.

```bash
npm run getBlockHash
```

```
0000047d24635e347be3aaaeb66c26be94901a2f962feccd4f95090191f208c1
```

Create a file called `getBlockByHeight.js`.

```bash
echo > scripts/getBlockByHeight.js
```

`getBlockByHeight` fetches a specific block by its height. Unlike `getBlockHash`, it returns a bufferized block instead of the corresponding block hash.

```js
// scripts/getBlockByHeight.js

import { client } from "./client.js"

async function getBlockByHeight() {
  const DAPIClient = client.getDAPIClient()
  const res = await DAPIClient.core.getBlockByHeight(1)
  if (!res) {
    throw new Error('No response received from getBlockByHeight API call')
  }
  return JSON.stringify(res)
}

getBlockByHeight()
// getBlockByHeight(1)
  .then(data => console.log(data))
  // .then(data => console.log(data.toString('hex')))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

```bash
npm run getBlockByHeight
```

```json
{
  "type":"Buffer",
  "data":[
    2,0,0,0,44,188,248,59,98,145,61,86,246,5,192,229,129,164,136,114,131,148,40,201,46,94,183,108,215,173,148,188,175,11,0,0,127,17,220,206,20,7,85,32,232,247,76,196,221,240,146,180,226,110,189,35,184,216,102,90,26,229,191,196,27,88,253,180,195,169,94,83,255,255,15,30,243,122,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,10,81,1,1,6,47,80,50,83,72,47,255,255,255,255,1,0,116,59,164,11,0,0,0,35,33,2,1,49,243,138,227,235,7,20,83,29,191,195,244,84,145,180,19,29,18,17,227,119,113,119,99,99,136,187,90,116,195,228,172,0,0,0,0
  ]
}
```

## Create Wallet and Identity

### Configure Dash Client for Wallet Creation

Modify the client configuration with the following:

- Set `mnemonic` to `null` to indicate we want a new wallet to be generated.
  - To get a new address for an existing wallet replace `null` with an existing wallet mnemonic.
- Set `offlineMode` to `true` to indicate we don't want to sync the chain.
  - Can only be used when the mnemonic is set to `null`.

```js
// scripts/client.js

import Dash from "dash"
import * as dotenv from "dotenv"
dotenv.config()

const { NETWORK } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: null,
    offlineMode: true,
  },
})
```

### Export Wallet Mnemonic

```bash
echo > scripts/createWallet.js
```

```js
// scripts/createWallet.js

import { client } from './client.js'

const createWallet = async () => {
  const walletAccount = await client.getWalletAccount()
  const mnemonic = client.wallet.exportWallet()
  const { address } = walletAccount.getUnusedAddress()
  console.log("WALLET_ADDRESS=" + `"${address}"`)
  return mnemonic
}

createWallet()
  .then(data => console.log(
    "MNEMONIC=" + `"${data}"`
  ))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

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

![01 - Viewing new Dash wallet address on testnet block explorer](https://utfs.io/f/024743f9-012d-4c76-afff-4392b55d1872-7fo6pa.webp)

Click on the transaction link (`9ca05a57d2f8e55068a5c8be4453d3a84aa852304d1aa3d32d92b9b5afe32261` in my case) to view information on the transaction itself.

![02 - Viewing new Dash faucet transaction on testnet block explorer](https://utfs.io/f/53414063-991c-4439-a218-259aa9ff4afd-hyf03w.webp)

You can also click on the plus symbol (+) next the transaction link for more information related to the transaction confirmation.

![03 - Viewing new transaction confirmation info on testnet block explorer](https://utfs.io/f/8d38ee38-8e3f-4dd5-8d53-ae25c37522e3-xbhiel.webp)

### Register and Retrieve Identity

Modify the client again and include your wallet's `MNEMONIC` seed phrase saved in `.env`.

```js
// scripts/client.js

import Dash from "dash"
import * as dotenv from "dotenv"
dotenv.config()

const { MNEMONIC, NETWORK } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: MNEMONIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 990000, // only sync from early-2022
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

import { client } from './client.js'

const createIdentity = async () => {
  const { platform } = client
  const identity = await platform.identities.register()
  return identity
}

createIdentity()
  .then(data => console.log(
    "IDENTITY_ID=" + `"${data.toJSON().id}"`)
  )
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

Run `createIdentity`.

```bash
npm run createIdentity
```

It may take a few minutes for the command to complete.

```
IDENTITY_ID="94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1"
```

Create a file called `retrieveIdentity.js`.

```bash
echo > scripts/retrieveIdentity.js
```

```js
// scripts/retrieveIdentity.js

import { client } from './client.js'

const { IDENTITY_ID } = process.env

const retrieveIdentity = async () => {
  const { platform } = client
  return platform.identities.get(IDENTITY_ID)
}

retrieveIdentity()
  .then(data => console.log(
    "IDENTITY_OBJECT=" + JSON.stringify(data))
  )
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

```bash
npm run retrieveIdentity
```

```js
{
  protocolVersion: 1,
  id: '94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1',
  publicKeys: [
    {
      id: 0,
      purpose: 0,
      securityLevel: 0,
      type: 0,
      readOnly: false,
      data: 'AwgXUnHoYbDT/KfwZNYSLkXlgh+/O8pPgl+sav07EeRF'
    },
    {
      id: 1,
      purpose: 0,
      securityLevel: 2,
      type: 0,
      readOnly: false,
      data: 'A5CVLMyt/WrRmmhaDXe93vuqlzDupm43P7p6roMRwFUU'
    }
  ],
  balance: 920385020,
  revision: 0
}
```

Create a file called `retrieveIdentityIds.js`.

```bash
echo > scripts/retrieveIdentityIds.js
```

```js
// scripts/retrieveIdentityIds.js

import { client } from './client.js'

const retrieveIdentityIds = async () => {
  const walletAccount = await client.getWalletAccount()
  const identityIds = walletAccount.identities.getIdentityIds()
  return identityIds
}

retrieveIdentityIds()
  .then(data => console.log(data))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

```bash
npm run retrieveIdentityIds
```

```js
[
  '94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1',
  'DPRGKkVPkwxGW6zFhUreovjMLbqUR63j8Xj19cpVktDp'
]
```

### Topup Identity Credit Balance

Create a file called `topupIdentity.js`.

```bash
echo > scripts/topupIdentity.js
```

```js
// scripts/topupIdentity.js

import { client } from './client.js'

const { IDENTITY_ID } = process.env

const topupIdentity = async () => {
  const { platform } = client
  await platform.identities.topUp(IDENTITY_ID, 1000)
  return platform.identities.get(IDENTITY_ID)
}

topupIdentity()
  .then(data => console.log(
    'IDENTITY_CREDIT_BALANCE=' + data.balance)
  )
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

```bash
npm run topupIdentity
```

```
IDENTITY_CREDIT_BALANCE=916710090
```

### Register and Retrieve Name

Create a file called `registerName.js`.

```bash
echo > scripts/registerName.js
```

Create a `LABEL` in `.env` with your desired name. I will be using `streamtest20240330`.

```js
// scripts/registerName.js

import { client } from './client.js'

const { IDENTITY_ID, LABEL } = process.env

const registerName = async () => {
  const { platform } = client
  const identity = await platform.identities.get(IDENTITY_ID)
  const dashUniqueIdentityId = await identity.getId()
  const nameRegistration = await platform.names.register(
    `${LABEL}.dash`, { dashUniqueIdentityId }, identity,
  )
  return nameRegistration
}

registerName()
  .then(data => console.log(
    "LABEL=" + JSON.stringify(data.toJSON().label)
  ))
  .catch(error => console.error("Something went wrong:\n", error))
  .finally(() => client.disconnect())
```

```bash
npm run registerName
```

Create a file called `retrieveName.js`.

```bash
echo > scripts/retrieveName.js
```

```js
// scripts/retrieveName.js

import { client } from './client.js'

const { LABEL } = process.env

const retrieveName = async () => {
  const { platform } = client
  const name = platform.names.resolve(LABEL)
  return name
}

retrieveName()
  .then(data => console.log(JSON.stringify(data)))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

```bash
npm run retrieveName
```

**TODO: BROKEN, this is returning `null` right now and not the expected output as seen here.**

```json
{
   "$id":"6Cm4qrMVxXnTLdRSfALqnS3MPgNmaNstNEeeUXPKVM2L",
   "$ownerId":"AHXPf53Rp7d8gT7soegHoZE5BcgJCjdGwzfxhcsKnYrS",
   "$revision":1,
   "label":"dashstreamtest",
   "normalizedLabel":"dashstreamtest",
   "normalizedParentDomainName":"dash",
   "preorderSalt":"BksBF04xV5rIstUl0xQwNy+XfdYZwgZVaV3C4AG+YB4=",
   "records":{
      "dashUniqueIdentityId":"AHXPf53Rp7d8gT7soegHoZE5BcgJCjdGwzfxhcsKnYrS"
   },
   "subdomainRules":{
      "allowSubdomains":false
   },
   "$protocolVersion":1,
   "$type":"domain",
   "$dataContractId":"GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec"
}
```

## Data Contracts

### Register and Retrieve Contract

Create two files called `registerContract.js` and `retrieveContract.js`.

```bash
echo > scripts/registerContract.js
echo > scripts/retrieveContract.js
```

```js
// scripts/registerContract.js

import { client } from "./client.js"

const { IDENTITY_ID } = process.env

const registerContract = async () => {
  const { platform } = client
  const identity = await platform.identities.get(IDENTITY_ID)
  const contractDocuments = {
    note: {
      type: 'object',
      properties: {
        message: { type: 'string', },
      },
      additionalProperties: false,
    },
  }
  const contract = await platform.contracts.create(contractDocuments, identity)
  console.dir({ contract: contract.toJSON() })
  const validationResult = await platform.dpp.dataContract.validate(contract)
  if (validationResult.isValid()) {
    console.log('Validation passed, broadcasting contract..')
    // Sign and submit the data contract
    return platform.contracts.publish(contract, identity)
  }
  console.error(validationResult) // An array of detailed validation errors
  throw validationResult.errors[0]
}

registerContract()
  .then((d) => console.log('Contract registered:\n', JSON.stringify(d.toJSON())))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

```bash
npm run registerContract
```

**NOTE: BROKEN**.

```bash
Something went wrong:
 ValueError { __wbg_ptr: 3962784 }
```

```json
{
  "protocolVersion":1,
  "type":0,
  "dataContract":{
    "protocolVersion":1,
    "$id":"4wpbRzGoCDHLqYqNufB3vcGW6YAmeRYueFty4GFFn42T",
    "$schema":"https://schema.dash.org/dpp-0-4-0/meta/data-contract",
    "version":1,
    "ownerId":"CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn",
    "documents":{
      "note":{
        "type":"object",
        "properties":{
          "message":{
            "type":"string"
          }
        },
        "additionalProperties":false
      }
    }
  },
  "entropy":"N4yk7GlEaAB1P67/MSK29w/x0oudkKYNDlgjq2SQZDk=",
  "signaturePublicKeyId":1,
  "signature":"IGVzuSK0J/7G10147BfKgCzi3GDEoFJKw/18Vi+qInCQP5zWPNNyJRSInK6R2DnyTpIfnx65Tg7ImFP2b7DGFqI="
}
```

```js
// scripts/retrieveContract.js

import { client } from "./client.js"

const retrieveContract = async () => {
  const contractId = '4wpbRzGoCDHLqYqNufB3vcGW6YAmeRYueFty4GFFn42T'
  return client.platform.contracts.get(contractId)
}

retrieveContract()
  .then((d) => console.dir(d.toJSON(), { depth: 5 }))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

### Update Contract

Create a file called `updateContract.js`.

```bash
echo > scripts/updateContract.js
```

```js
// scripts/updateContract.js

import { client } from "./client.js"

const updateContract = async () => {
  const { platform } = client
  const identity = await platform.identities.get('CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn')

  const existingDataContract = await platform.contracts.get('4wpbRzGoCDHLqYqNufB3vcGW6YAmeRYueFty4GFFn42T')
  const documents = existingDataContract.getDocuments()

  documents.note.properties.author = {
    type: 'string',
  }

  existingDataContract.setDocuments(documents)

  // Make sure contract passes validation checks
  const validationResult = await platform.dpp.dataContract.validate(
    existingDataContract,
  )

  if (validationResult.isValid()) {
    console.log('Validation passed, broadcasting contract..')
    // Sign and submit the data contract
    return platform.contracts.update(existingDataContract, identity)
  }
  console.error(validationResult) // An array of detailed validation errors
  throw validationResult.errors[0]
}

updateContract()
  .then((d) => console.log('Contract updated:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

```bash
npm run updateContract
```

```js
// scripts/client.js

import Dash from "dash"
import * as dotenv from "dotenv"
dotenv.config()

// const { MNEMONIC, NETWORK } = process.env

export const client = new Dash.Client({
  network: "testnet",
  wallet: {
    mnemonic: "render coyote audit menu embody poet cement wreck second elbow inhale moon",
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 750000, // only sync from early-2022
    },
  },
  apps: {
    tutorialContract: {
      contractId: '3iaEhdyAVbmSjd59CT6SCrqPjfAfMdPTc8ksydgqSaWE',
    },
  },
})
```

### Submit and Retrieve Documents

Create two files called `submitNoteDocument.js` and `getDocuments.js`.

```bash
echo > scripts/submitNoteDocument.js
echo > scripts/getDocuments.js
```

```js
// scripts/submitNoteDocument.js

import { client } from "./client.js"

const submitNoteDocument = async () => {
  const { platform } = client
  const identity = await platform.identities.get('CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn')

  const docProperties = {
    message: `Hello from ajcwebdev @ ${new Date().toUTCString()}`,
  }

  // Create the note document
  const noteDocument = await platform.documents.create(
    'tutorialContract.note',
    identity,
    docProperties,
  )

  const documentBatch = {
    create: [noteDocument], // Document(s) to create
    replace: [],            // Document(s) to update
    delete: [],             // Document(s) to delete
  }
  // Sign and submit the document(s)
  return platform.documents.broadcast(documentBatch, identity)
}

submitNoteDocument()
  .then((d) => console.log(d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

```bash
npm run submitNoteDocument
```

```js
// scripts/getDocuments.js

import { client } from "./client.js"

const getDocuments = async () => {
  return client.platform.documents.get('tutorialContract.note', {
    limit: 2, // Only retrieve 2 document
  })
}

getDocuments()
  // .then((d) => {
  //   d.forEach(n => console.log('Document:\n', n.toJSON()));
  // })
  .then((d) => {
    for (const n of d) {
      console.log('Document:\n', n.toJSON())
    }
  })
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

```bash
npm run getDocuments
```

### Update and Delete Documents

Create two files called `updateNoteDocument.js` and `deleteNoteDocument.js`.

```bash
echo > scripts/updateNoteDocument.js
echo > scripts/deleteNoteDocument.js
```

```js
// scripts/updateNoteDocument.js

import { client } from "./client.js"

const updateNoteDocument = async () => {
  const { platform } = client
  const identity = await platform.identities.get('CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn')
  const documentId = 'an existing document ID goes here'

  // Retrieve the existing document
  const [document] = await client.platform.documents.get(
    'tutorialContract.note',
    { where: [['$id', '==', documentId]] },
  )

  // Update document
  document.set('message', `Updated document @ ${new Date().toUTCString()}`)

  // Sign and submit the document replace transition
  return platform.documents.broadcast({ replace: [document] }, identity)
}

updateNoteDocument()
  .then((d) => console.log('Document updated:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

```bash
npm run updateNoteDocument
```

```js
// scripts/deleteNoteDocument.js

import { client } from "./client.js"

const deleteNoteDocument = async () => {
  const { platform } = client
  const identity = await platform.identities.get('CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn')
  const documentId = 'an existing document ID goes here'

  // Retrieve the existing document
  const [document] = await client.platform.documents.get(
    'tutorialContract.note',
    { where: [['$id', '==', documentId]] },
  )

  // Sign and submit the document delete transition
  return platform.documents.broadcast({ delete: [document] }, identity)
}

deleteNoteDocument()
  .then((d) => console.log('Document deleted:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())
```

```bash
npm run deleteNoteDocument
```

## Backend

### Add Express Server

```bash
npm i express cors npm-run-all
mkdir api
echo > api/server.js
```

```json
{
  "name": "ajcwebdev-dash",
  "description": "An example application using the Dash JavaScript SDK",
  "keywords": [ "Dash", "JavaScript" ],
  "author": "Anthony Campolo",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "getBestBlockHash": "node scripts/getBestBlockHash",
    "getBlockHash": "node scripts/getBlockHash",
    "getBlockByHeight": "node scripts/getBlockByHeight",
    "createWallet": "node scripts/createWallet",
    "createIdentity": "node scripts/createIdentity",
    "retrieveIdentity": "node scripts/retrieveIdentity",
    "retrieveIdentityIds": "node scripts/retrieveIdentityIds",
    "updateIdentityDisableKey": "node scripts/updateIdentityDisableKey",
    "topupIdentity": "node scripts/topupIdentity",
    "registerName": "node scripts/registerName",
    "retrieveName": "node scripts/retrieveName",
    "start:server": "node api/server",
    "dev:server": "node api/server",
    "start": "run-p start:*",
    "dev": "run-p dev:*"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dash": "^3.24.4",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "npm-run-all": "^4.1.5"
  }
}
```

```js
// api/server.js

import express from 'express'
import cors from 'cors'
import { client } from '../scripts/client.js'

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

Open [`localhost:3001/name/ajcwebdevtest`](http://localhost:3001/name/ajcwebdevtest) or send a GET request with curl.

```bash
curl "http://localhost:3001/name/ajcwebdevtest"
```

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

## Add React App

```bash
mkdir react react/src
cd react
npm init -y
npm i @vitejs/plugin-react react react-dom vite
```

Add Vite scripts to `package.json`.

```json
{
  "name": "react",
  "description": "An example Dash application using React",
  "keywords": [ "Dash", "React" ],
  "author": "Anthony Campolo",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "dev:client": "vite",
    "build:client": "vite build",
    "start:client": "vite preview"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^4.3.9"
  }
}
```

### Add Vite Configuration

```bash
echo > vite.config.js
```

```js
// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

```bash
echo > index.html
echo > src/main.jsx
echo > src/App.jsx
echo > src/index.css
```

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dash + React + Express</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.jsx"></script>
  </body>
</html>
```

```jsx
// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Create App Component

```js
// src/App.jsx

import { useEffect, useState } from 'react'

function App() {
  const [blockchainData, setBlockchainData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/name/ajcwebdevtest')
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

### Add CSS Styling

```css
/* src/index.css */

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

.alignLeft {
  display: flex;
  justify-content: flex-start;
}

.preLeft {
  text-align: left;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

```bash
npm run dev:client
```

### Add Fetch Button

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
    fetch('http://localhost:3001/name/ajcwebdevtest')
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

### Vue

```vue
<template>
  <div>
    <HelloWorld msg="Vite + Vue" />
    <h1>Dash + Vue + Express</h1>
    <button @click="triggerFetch = true">Fetch Data</button>
    <p class="alignLeft">
      <pre class="preLeft">
        {{ isLoading ? 'Loading...' : JSON.stringify(blockchainData, null, 2) }}
      </pre>
    </p>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'

  const URL = "http://localhost:3001/name/dashstreamtest"

  export default {
    setup() {
      const blockchainData = ref(null)
      const triggerFetch = ref(false)
      const isLoading = ref(false)

      const fetchData = () => {
        isLoading.value = true
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            blockchainData.value = data
            isLoading.value = false
          })
      }
      watch(triggerFetch, (newVal) => {
        if (newVal) {
          fetchData()
          triggerFetch.value = false
        }
      })
      return { blockchainData, triggerFetch, isLoading }
    }
  }
</script>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  .alignLeft {
    display: flex;
    justify-content: flex-start;
  }
  .preLeft {
    text-align: left;
  }
</style>
```

0? - react-frontend-with-express
https://utfs.io/f/8d2900fa-158f-4154-84d3-7974b66feb94-51ru0a.webp

## Deploy

Add `vercel` and  `netlify-cli` dependencies.

```bash
npm i -D vercel netlify-cli
```

Add `vercel` and `netlify` scripts to `package.json`.

```json
{
  "scripts": {
    "getBestBlockHash": "node scripts/getBestBlockHash",
    "getBlockHash": "node scripts/getBlockHash",
    "getBlockByHeight": "node scripts/getBlockByHeight",
    "createWallet": "node scripts/createWallet",
    "createIdentity": "node scripts/createIdentity",
    "retrieveIdentity": "node scripts/retrieveIdentity",
    "retrieveIdentityIds": "node scripts/retrieveIdentityIds",
    "updateIdentityDisableKey": "node scripts/updateIdentityDisableKey",
    "topupIdentity": "node scripts/topupIdentity",
    "registerName": "node scripts/registerName",
    "retrieveName": "node scripts/retrieveName",
    "start:server": "node api/server",
    "dev:server": "node api/server",
    "dev:client": "vite",
    "build:client": "vite build",
    "start:client": "vite preview",
    "start": "run-p start:*",
    "dev": "run-p dev:*",
    "vercel": "vercel dev",
    "netlify": "ntl dev"
  },
}
```

Create `vercel.json` and `netlify.toml` configuration files.

```bash
echo '{"buildCommand": "npm run build"}' > vercel.json
echo > netlify.toml
```

### Create Vercel API Route

```bash
mkdir api/vercel-name
echo > "api/vercel-name/[identityName].js"
```

Earlier we learned how to fetch data from the Express server in `api/server.js` and run it locally on `http://localhost:3001/`. We'll want to do the same with our API routes. The goal is to leave the React component completely unchanged with the exception of switching from `http://localhost:3001/name/ajcwebdevtest` to `http://localhost:3000/api/name/ajcwebdevtest`.

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
curl "http://localhost:3000/api/name/ajcwebdevtest"
```

```bash
vercel
```

### Create Netlify Function

```bash
mkdir api/functions
echo > api/functions/name.js
```

```js
// api/functions/name.js

import Dash from "dash"

const client = new Dash.Client({ network: 'testnet' })

exports.handler = async (event, context) => {
  try {
    const name = event.path.split('/').pop()
    const result = await client.platform.names.resolve(`${name}.dash`)
    client.disconnect()
    return {
      statusCode: 200,
      body: JSON.stringify(result.toJSON().label),
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS 
      }
    }
  } catch (e) {
    client.disconnect()
    return {
      statusCode: 500,
      body: 'Something went wrong:\n' + e.toString()
    }
  }
}
```

```toml
# netlify.toml

[build]
  command = "npm run build"
  functions = "api/functions"
  publish = "dist"
```

```bash
git init
git add .
git commit -m "init"
gh repo create dash-netlify \
  --private \
  --push \
  --source=. \
  --description="An example Dash app built with React and Netlify Functions." \
  --remote=upstream
```

```bash
ntl init
```

```
? What would you like to do? +  Create & configure a new site
? Team: ajcwebdev
? Site name (leave blank for a random name; you can change it later): dash-netlify

Site Created

Admin URL: https://app.netlify.com/sites/dash-netlify
URL:       https://dash-netlify.netlify.app
Site ID:   80e3d213-f568-43da-b574-77ada0d2329a

? Your build command (hugo build/yarn run build/etc): npm run build
? Directory to deploy (blank for current dir): build
```

## Resources

- [`js-dash-sdk`](https://github.com/dashpay/platform/tree/master/packages/js-dash-sdk).
- [Docs Audit | ROASTING Crypto docs](https://www.youtube.com/watch?v=mO_Dmjlu-ro).
- [Connect to a Network](https://dashplatform.readme.io/docs/tutorial-connecting-to-testnet)
