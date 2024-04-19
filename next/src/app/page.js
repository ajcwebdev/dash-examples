// next/src/app/page.js

"use client"

import { useEffect, useState } from 'react'

const main = "flex flex-col items-center justify-between p-24"
const header = "text-3xl"
const pageContent = "z-10 max-w-5xl w-full items-center justify-between font-sans lg:flex"

export default function Home() {
  const [blockchainData, setBlockchainData] = useState()
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true) // Set loading to true when fetch begins
    fetch('http://localhost:3001/name/streamtest20240409')
      .then(response => response.json())
      .then(data => {
        setBlockchainData(data)
        setIsLoading(false) // Set loading to false when fetch completes
      })
  }

  useEffect(() => {
    if (triggerFetch) {
      fetchData()
      setTriggerFetch(false) // Reset trigger
    }
  }, [triggerFetch])
  return (
    <main className={main}>
      <h1 className={header}>Next.js Dash Example</h1>
      <div className={pageContent}>
        <h2>Identity:</h2>
        <button onClick={() => setTriggerFetch(true)}>
          Fetch Data
        </button>
        <pre>
          {isLoading
            ? 'Loading...'
            : JSON.stringify(blockchainData, null, 2)
          }
        </pre>
      </div>
    </main>
  )
}