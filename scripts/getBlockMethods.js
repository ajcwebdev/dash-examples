// scripts/getBlockMethods.js

import { client } from '../api/client.js'

async function dapiClientMethods() {
  try {
    const dapiClient = client.getDAPIClient().core

    console.log("\ngetBlockHash(1):", await dapiClient.getBlockHash(1))
    console.log("\ngetBestBlockHash():", await dapiClient.getBestBlockHash())
    console.log("\ngetBlockByHeight():", await dapiClient.getBlockByHeight(1))
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

dapiClientMethods()