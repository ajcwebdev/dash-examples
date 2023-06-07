# Dash Alpine Example

[Alpine.js](https://alpinejs.dev/) is a relatively small JavaScript framework created by Caleb Porzio that allows you to build modern, interactive web interfaces. It aims to cover the majority of client-side functionality you would get from a framework like Vue or React, but without the need for a build step or package management. This means it can be used directly in the browser with a script tag.

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/alpine
```

## Dash Domain Name Component

```js
<head>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.12.1/dist/cdn.min.js"></script>
</head>

<div x-data="{ blockchainData: null, triggerFetch: false, isLoading: false, fetchData: fetchData }" x-init="fetchData">
  <h1>Dash + Alpine.js + Express</h1>
  <button @click="triggerFetch = true; fetchData()">
    Fetch Data
  </button>
  <p class="leftCenter">
    <pre class="preLeft">
      <template x-if="isLoading">
        <div>Loading...</div>
      </template>
      <template x-if="!isLoading && blockchainData">
        <div x-text="JSON.stringify(blockchainData, null, 2)"></div>
      </template>
    </pre>
  </p>
</div>

<script>
  function fetchData() {
    this.isLoading = true
    fetch('http://localhost:3001/name/ajcwebdevtest')
      .then(response => response.json())
      .then(data => {
        this.blockchainData = data
        this.isLoading = false
        this.triggerFetch = false
      })
  }
</script>
```