// scripts/submitNoteDocument.js

import { client } from "./client.js"

const submitNoteDocument = async () => {
  const { platform } = client
  const identity = await platform.identities.get('CMagyisVzApSfZGqFeDed8d5pWwGtaafukvrTKMxjWhn')
  const docProperties = {
    message: `Hello from ajcwebdev @ ${new Date().toUTCString()}`,
  }
  console.log('\nHas getId:', typeof identity.getId === 'function')
  console.log('\ntutorialContract.note:', 'tutorialContract.note')
  console.log('\nidentity:', identity, '\ndocProperties:', docProperties)
  console.log()

  // Create the note document
  const noteDocument = await platform.documents.create(
    'tutorialContract.note', identity, docProperties,
  )

  const documentBatch = {
    create: [noteDocument], // Document(s) to create
    replace: [], // Document(s) to update
    delete: [], // Document(s) to delete
  }
  // Sign and submit the document(s)
  return platform.documents.broadcast(documentBatch, identity)
  // return platform.documents.broadcast(
  //   {
  //     create: [noteDocument], // Document(s) to create
  //     replace: [],            // Document(s) to update
  //     delete: [],             // Document(s) to delete
  //   },
  //   identity
  // )
}

submitNoteDocument()
  .then((d) => console.log(d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())