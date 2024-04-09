// scripts/deleteNoteDocument.js

import { client } from '../api/client.js'

const { IDENTITY_ID, DOCUMENT_ID } = process.env

const deleteNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)

    const [document] = await client.platform.documents.get(
      'tutorialContract.note',
      { where: [['$id', '==', DOCUMENT_ID]] },
    )

    await client.platform.documents.broadcast({ delete: [document] }, identity)
    console.log('Document deleted:\n', document.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

deleteNoteDocument()