# A First Look at Dash

## Outline

- [Project Structure](#project-structure)
  - [APIs and Scripts](#apis-and-scripts)
  - [Frontend Example Apps](#frontend-example-apps)
- [Setup](#setup)
  - [Clone Repo and Navigate to Project](#clone-repo-and-navigate-to-project)
  - [Install Project Dependencies](#install-project-dependencies)
  - [Set Environment Variables](#set-environment-variables)
  - [Start Development Server](#start-development-server)
- [Dash Resources](#dash-resources)

## Project Structure

### APIs and Scripts

- [API](https://github.com/ajcwebdev/dash-examples/tree/main/api)
- [Scripts](https://github.com/ajcwebdev/dash-examples/tree/main/scripts)

### Frontend Example Apps

- [Vanilla JavaScript](https://github.com/ajcwebdev/dash-examples/tree/main/javascript)
- [Angular](https://github.com/ajcwebdev/dash-examples/tree/main/angular)
- [Preact](https://github.com/ajcwebdev/dash-examples/tree/main/preact)
- [React](https://github.com/ajcwebdev/dash-examples/tree/main/react)
- [Solid](https://github.com/ajcwebdev/dash-examples/tree/main/solid)
- [Svelte](https://github.com/ajcwebdev/dash-examples/tree/main/svelte)
- [Vue](https://github.com/ajcwebdev/dash-examples/tree/main/vue)

## Setup

### Clone Repo and Navigate to Project

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples
```

### Install Project Dependencies

```bash
pnpm i
# npm i
```

### Set Environment Variables

```bash
cp .env.example .env
```

If you don't already have one, create a wallet:

```bash
pnpm createWallet
# npm run createWallet
```

Copy `WALLET_ADDRESS` and `MNEMONIC` and paste them into `.env`.

### Start Development Server

```bash
pnpm serve
```

Run a curl command on the URL `http://localhost:3001/name/ajcwebdevtest`.

```bash
curl "http://localhost:3001/name/ajcwebdevtest"
```

This will output:

```json
{
   "$id":"DqeamRwhQE6HNzFvk63ZVTpwBm4AZAss1wv5E46iPkkv",
   "$ownerId":"94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1",
   "$revision":1,
   "label":"ajcwebdevtest",
   "normalizedLabel":"ajcwebdevtest",
   "normalizedParentDomainName":"dash",
   "preorderSalt":"u60YDYG8BUuBcWjfXUGbkTr08JiB8JaKBqmVda3P2WI=",
   "records":{
      "dashUniqueIdentityId":"94uozwXwnuVGyXwYGd5Unzyy9sCTuvqJecVspxadhNo1"
   },
   "subdomainRules":{
      "allowSubdomains":false
   },
   "$protocolVersion":1,
   "$type":"domain",
   "$dataContractId":"GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec"
}
```

Next, go to one of the [frontend framework directories](#frontend-example-apps) and run the commands in the `README.md`.

## Dash Resources

[Dash SDK](https://github.com/dashpay/platform/tree/master/packages/js-dash-sdk/docs)
