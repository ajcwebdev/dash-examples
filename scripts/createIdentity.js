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