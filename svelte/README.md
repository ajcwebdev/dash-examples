# Dash Svelte Example

- **Note: Fix `undefined` displaying at first component render.**
- **Note: Fix CSS to display JSON.**

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/svelte
```

## Install Dependencies and Start Development Server

```bash
npm i
npm run dev
```

## Dash Domain Name Component

```html
<script>
  import { onMount } from 'svelte'
  let blockchainData
  let triggerFetch = false
  let isLoading = false

  const fetchData = async () => {
    isLoading = true // Set loading to true when fetch begins
    const response = await fetch('http://localhost:3001/name/ajcwebdevtest')
    const data = await response.json()
    blockchainData = data
    isLoading = false // Set loading to false when fetch completes
  }

  onMount(() => {
    if (triggerFetch) {
      fetchData()
      triggerFetch = false // Reset trigger
    }
  })

  function handleClick() {
    triggerFetch = true
    fetchData()
  }
</script>

<main>
  <h1>Dash + Svelte + Express</h1>
  <button on:click={handleClick}>
    Fetch Data
  </button>
  <pre class="alignLeft">
    <p class="preLeft">
      {isLoading
        ? 'Loading...'
        : JSON.stringify(blockchainData, null, 2)
      }
    </p>
  </pre>
</main>

<style>
  .alignLeft {
    display: flex;
    justify-content: flex-start;
  }

  .preLeft {
    text-align: left;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
```