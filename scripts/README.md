## Outline

- [client](#client)
- [createIdentity](#createidentity)
- [createWallet](#createwallet)
- [getBestBlockHash](#getbestblockhash)
- [getBlockByHeight](#getblockbyheight)
- [getBlockHash](#getblockhash)
- [README](#README)
- [registerName](#registername)
- [retrieveIdentity](#retrieveidentity)
- [retrieveIdentityIds](#retrieveidentityids)
- [retrieveName](#retrievename)
- [topupIdentity](#topupidentity)
- [updateIdentityDisableKey](#updateidentitydisablekey)

```bash
WALLET_ADDRESS="yaLnHab4ChL3pLwDXbdupv2QaT6DXZ3PZD"
MNEMONIC="crazy child demand equal youth leg promote under gadget stay match unique"
```

```js
// client.js

import { client } from '../api/client.js'

export { client }
```

## createIdentity

```js
// createIdentity.js

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

## createWallet

```js
// createWallet.js

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

## getBestBlockHash

```js
// getBestBlockHash.js

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

## getBlockByHeight

```js
// getBlockByHeight.js

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
  .then(data => console.log(data))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

## getBlockHash

```js
// getBlockHash.js

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

## registerName

```js
// registerName.js

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
    `DASH_NAME=${JSON.stringify(data.toJSON().label)}.dash`
  ))
  .catch(error => console.error("Something went wrong:\n", error))
  .finally(() => client.disconnect())
```

## retrieveIdentity

```js
// retrieveIdentity.js

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

## retrieveIdentityIds

```js
// retrieveIdentityIds.js

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

## retrieveName

```js
// retrieveName.js

import { client } from './client.js'

const { DASH_NAME } = process.env

const retrieveName = async () => {
  const { platform } = client
  const name = platform.names.resolve(DASH_NAME)
  return name
}

retrieveName()
  .then(data => console.log(JSON.stringify(data)))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```

## topupIdentity

```js
// topupIdentity.js

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

## updateIdentityDisableKey

```js
// updateIdentityDisableKey.js

import { client } from './client.js'

const { IDENTITY_ID } = process.env

const updateIdentityDisableKey = async () => {
  const { platform } = client
  const existingIdentity = await platform.identities.get(IDENTITY_ID)
  const publicKeyToDisable = existingIdentity.getPublicKeyById(0)

  const updateDisable = {
    disable: [publicKeyToDisable],
  }

  await platform.identities.update(existingIdentity, updateDisable)
  return platform.identities.get(IDENTITY_ID)
}

updateIdentityDisableKey()
  .then(data => console.log(
    'IDENTITY_ID=' + data.toJSON())
  )
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())
```