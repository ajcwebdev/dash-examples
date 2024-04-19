// api/server.js

import express from 'express'
import cors from 'cors'
import { client } from './client.js'

const app = express()
app.use(cors())

app.get('/name/:identityName', async (req, res) => {
  try {
    const name = req.params.identityName
    const result = await client.platform.names.resolve(`${name}.dash`)
    if (result !== null) {
      res.json(result.toJSON())
    } else {
      res.status(404).send(`No identity found with the name: ${name}.dash`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong:\n' + error)
  }
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Running on localhost:", port)
})

process.on('SIGINT', async () => {
  console.log('Disconnecting Dash client...')
  await client.disconnect()
  process.exit(0)
})