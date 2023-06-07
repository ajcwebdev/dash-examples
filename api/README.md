# Dash Server Examples

- Express
- Vercel
- Netlify

## Node Server

```js
// server.js

import express from 'express'
import cors from 'cors'
import { client } from '../scripts/client.js'

const app = express()
app.use(cors())

app.get('/name/:identityName', async (req, res) => {
  try {
    const name = req.params.identityName
    const result = await client.platform.names.resolve(`${name}.dash`)
    res.json(result.toJSON())
  } catch (error) {
    res.status(500).send('Something went wrong:\n' + error)
  } finally {
    client.disconnect()
  }
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("Running on localhost:", port)
})
```

## Serverless Functions

### Vercel Function Dash Example

```js
// [identityName].js

import Dash from "dash"

const client = new Dash.Client({ network: 'testnet' })

export default async function handler(request, response) {
  const { identityName } = request.query
  
  try {
    const result = await client.platform.names.resolve(`${identityName}.dash`)
    response.status(200).json(result.toJSON().label)
  } catch (e) {
    response.status(500).send('Something went wrong:\n' + e)
  } finally {
    client.disconnect()
  }
}
```

### Netlify Function Dash Example

```js
// functions/name.js

import Dash from "dash"

const client = new Dash.Client({ network: 'testnet' })

exports.handler = async (event, context) => {
  try {
    const name = event.path.split('/').pop()
    const result = await client.platform.names.resolve(`${name}.dash`)
    client.disconnect()
    return {
      statusCode: 200,
      body: JSON.stringify(result.toJSON().label),
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS 
      }
    }
  } catch (e) {
    client.disconnect()
    return {
      statusCode: 500,
      body: 'Something went wrong:\n' + e.toString()
    }
  }
}
```