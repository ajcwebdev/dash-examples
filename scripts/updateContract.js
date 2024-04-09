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