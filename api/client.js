// api/client.js

import Dash from "dash"
import * as dotenv from "dotenv"
dotenv.config()

const { MNEMONIC, NETWORK, CONTRACT_ID } = process.env

export const client = new Dash.Client({
  network: NETWORK, // testnet
  wallet: {
    mnemonic: MNEMONIC, // render coyote audit menu embody poet cement wreck second elbow inhale moon
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 700000,
    },
  },
  apps: {
    tutorialContract: {
      contractId: CONTRACT_ID, // 3iaEhdyAVbmSjd59CT6SCrqPjfAfMdPTc8ksydgqSaWE
    },
  },
})