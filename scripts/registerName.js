// scripts/registerName.js

import { client } from '../api/client.js'

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
    // "LABEL=" + JSON.stringify(data.toJSON().label)
  ))
  .catch(error => console.error("Something went wrong:\n", error))
  .finally(() => client.disconnect())