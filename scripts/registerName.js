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