// scripts/getDocuments.js

import { client } from '../api/client.js'

const getDocuments = async () => {
  try {
    const documents = await client.platform.documents.get(
      'tutorialContract.note',
      { limit: 5 }
    )
    console.log('\nLast 5 messages:\n')
    documents.forEach(n => console.log(n.toJSON().message))
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

getDocuments()