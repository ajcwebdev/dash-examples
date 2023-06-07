# Dash Solid Example

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/solid
```

## Dash Domain Name Component

```jsx
// src/App.jsx

import { createSignal, onCleanup } from "solid-js"

function App() {
  const [blockchainData, setBlockchainData] = createSignal()
  const [triggerFetch, setTriggerFetch] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)

  const URL = "http://localhost:3001/name/ajcwebdevtest"

  const fetchData = () => {
    setIsLoading(true)
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setBlockchainData(data)
        setIsLoading(false)
      })
  }

  createEffect(() => {
    if (triggerFetch()) {
      fetchData()
      setTriggerFetch(false)
    }
  })

  return (
    <>
      <h1>Dash + Solid + Express</h1>
      <button onClick={() => setTriggerFetch(true)}>
        Fetch Data
      </button>
      <p className="leftCenter">
        <pre className="preLeft">
          {isLoading()
            ? "Loading..."
            : JSON.stringify(blockchainData(), null, 2)
          }
        </pre>
      </p>
    </>
  )
}

export default App
```