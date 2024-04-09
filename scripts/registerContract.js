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
  .then((d) => console.log("CONTRACT_ID:" + JSON.stringify(d.toJSON())))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())