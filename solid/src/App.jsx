import styles from './App.module.css'
import { createSignal, createEffect } from "solid-js"

function App() {
  const [blockchainData, setBlockchainData] = createSignal()
  const [triggerFetch, setTriggerFetch] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)

  const SERVER_URL = "http://localhost:3001/name/ajcwebdevtest"

  const fetchData = () => {
    setIsLoading(true)
    fetch(SERVER_URL)
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
    <div class={styles.App}>
      <header class={styles.header}>
      <h1>Dash + Solid + Express</h1>
      <button onClick={() => setTriggerFetch(true)}>
        Fetch Data
      </button>
        {isLoading()
          ? "Loading..."
          : JSON.stringify(blockchainData(), null, 2)
        }
      </header>
    </div>
    </>
  )
}

export default App