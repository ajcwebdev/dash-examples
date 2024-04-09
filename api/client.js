// api/client.js

import Dash from "dash"

const { NETWORK, MNEMONIC } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: MNEMONIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 990000, // only sync from mid-2023
    },
  },
})