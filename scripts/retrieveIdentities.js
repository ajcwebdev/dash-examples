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