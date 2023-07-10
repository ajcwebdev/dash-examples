// scripts/updateContract.js

import { client } from '../api/client.js'

const updateContract = async () => {
  const { platform } = client
  const identity = await platform.identities.get('CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn')

  const existingDataContract = await platform.contracts.get('4wpbRzGoCDHLqYqNufB3vcGW6YAmeRYueFty4GFFn42T')
  const documents = existingDataContract.getDocuments()

  documents.note.properties.author = {
    type: 'string',
  }

  existingDataContract.setDocuments(documents)

  // Make sure contract passes validation checks
  const validationResult = await platform.dpp.dataContract.validate(
    existingDataContract,
  )

  if (validationResult.isValid()) {
    console.log('Validation passed, broadcasting contract..')
    // Sign and submit the data contract
    return platform.contracts.update(existingDataContract, identity)
  }
  console.error(validationResult) // An array of detailed validation errors
  throw validationResult.errors[0]
}

updateContract()
  .then((d) => console.log('Contract updated:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())