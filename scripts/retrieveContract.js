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