# Dash JavaScript Example

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/javascript
```

## Install Dependencies and Start Development Server

```bash
pnpm i
pnpm dev
```

## Dash Domain Name Component

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Dash + VanillaJS + Express</h1>
    <button id="fetch-button">Fetch Data</button>
    <p class="leftCenter">
      <pre id="data-output" class="preLeft"></pre>
    </p>
    <script>
      var blockchainData
      var isLoading = false
      var dataOutput = document.getElementById('data-output')
      var fetchButton = document.getElementById('fetch-button')
      function fetchData() {
        isLoading = true
        dataOutput.textContent = 'Loading...'
        fetch('http://localhost:3001/name/ajcwebdevtest')
          .then(response => response.json())
          .then(data => {
            blockchainData = data
            isLoading = false
            dataOutput.textContent = JSON.stringify(blockchainData, null, 2)
          })
          .catch(error => {
            dataOutput.textContent = 'An error occurred: ' + error
          })
      }
      fetchButton.addEventListener('click', fetchData)
    </script>
  </body>
</html>
```