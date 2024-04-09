// scripts/retrieveName.js

import { client } from '../api/client.js'

const { LABEL } = process.env

async function retrieveName() {
  try {
    const extendedDoc = await client.platform.names.resolve(`${LABEL}.dash`)
    const name = JSON.parse(JSON.stringify(extendedDoc))
    console.log(`\nResolved name object:\n\n`, name)
    console.log(`\nView on block explorer: https://platform-explorer.com/document/${name.$id}\n`)
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

retrieveName()