// scripts/topupIdentities.js

import { client } from '../api/client.js'

async function topupIdentities() {
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

topupIdentities()