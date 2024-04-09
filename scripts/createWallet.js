// scripts/createWallet.js

import { client } from '../api/client.js'

async function createWallet() {
  try {
    const walletAccount = await client.getWalletAccount()
    const mnemonic = client.wallet.exportWallet()
    const { address } = walletAccount.getUnusedAddress()

    console.log("WALLET_ADDRESS=" + `"${address}"`)
    console.log("MNEMONIC=" + `"${mnemonic}"`)
  } catch (error) {
    console.error('Something went wrong:\n', error)
  } finally {
    client.disconnect()
  }
}

createWallet()