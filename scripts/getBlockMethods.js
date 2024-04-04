// scripts/getBlockMethods.js

import { client } from '../api/client.js'

async function dapiClientMethods() {
  console.log("\ngetBlockByHeight():", await client.getDAPIClient().core.getBlockByHeight(1))
  console.log("\ngetBlockHash(1):", await client.getDAPIClient().core.getBlockHash(1))
  console.log("\ngetBestBlockHash():", await client.getDAPIClient().core.getBestBlockHash())
  return client.getDAPIClient().core.getStatus()
}
  
dapiClientMethods()
  .then((d) => console.log('\nCore status:\n', d))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect())