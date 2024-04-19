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