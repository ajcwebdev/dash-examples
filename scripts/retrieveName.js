// scripts/retrieveName.js

import { client } from '../api/client.js'

const { LABEL } = process.env
// const LABEL = "ajcwebdevtest4"

const retrieveName = async () => {
  const { platform } = client
  const name = platform.names.resolve(LABEL)
  return name
}

retrieveName()
  .then(data => console.log(JSON.stringify(data)))
  .catch(error => console.error('Something went wrong:\n', error))
  .finally(() => client.disconnect())