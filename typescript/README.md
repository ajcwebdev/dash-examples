# Dash TypeScript Example

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/typescript
```

## Dash Domain Name Component

```ts
// src/main.ts

interface Data {
  name: string
  age: number
}

function fetchData(): Promise<Data> {
  return fetch('http://localhost:3001/name/ajcwebdevtest')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json() as Promise<Data>
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error)
    })
}

fetchData().then(data => console.log(data))
```