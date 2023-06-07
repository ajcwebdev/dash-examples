```jsx
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import './index.css'

function App() {
  const [blockchainData, setBlockchainData] = useState()
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true)
    fetch('http://localhost:3001/name/ajcwebdevtest')
      .then(response => response.json())
      .then(data => {
        setBlockchainData(data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (triggerFetch) {
      fetchData()
      setTriggerFetch(false)
    }
  }, [triggerFetch])

  return (
    <div>
      <h1>Dash + Preact + Express</h1>
      <button onClick={() => setTriggerFetch(true)}>
        Fetch Data
      </button>
      <p class="leftCenter">
        <pre class="preLeft">
          {isLoading
            ? 'Loading...'
            : JSON.stringify(blockchainData, null, 2)
          }
        </pre>
      </p>
    </div>
  )
}

export default App
```