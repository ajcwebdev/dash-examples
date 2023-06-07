# Dash Lit Example

[LitHTML](https://lit.dev/) is a lightweight, modern, and efficient JavaScript library for building web components and templates. It was developed by the Polymer Project team at Google.

The main selling point of `lit-html` is its use of JavaScript tagged template literals to create HTML templates. Since the templates are JavaScript, you can use features like variables, functions, and modules.

[Lit docs](https://lit.dev/docs/libraries/standalone-templates/)

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/lit
```

## Install Dependencies and Start Development Server

```bash
pnpm i
pnpm dev
```

## Dash Domain Name Component

```js
import { LitElement, html, css } from 'lit'
import { property, state } from 'lit/decorators.js'

class App extends LitElement {
  static styles = css`
    /* Your CSS here */
    .leftCenter { /* styles for leftCenter */ }
    .preLeft { /* styles for preLeft */ }
  `

  @state()
  blockchainData = null

  @state()
  triggerFetch = false

  @state()
  isLoading = false

  fetchData() {
    this.isLoading = true
    fetch('http://localhost:3001/name/ajcwebdevtest')
      .then(response => response.json())
      .then(data => {
        this.blockchainData = data
        this.isLoading = false
      })
  }

  updated(changedProperties) {
    if (changedProperties.has('triggerFetch') && this.triggerFetch) {
      this.fetchData()
      this.triggerFetch = false
    }
  }

  render() {
    return html`
      <h1>Dash + Lit + Express</h1>
      <button @click="${() => this.triggerFetch = true}">
        Fetch Data
      </button>
      <p class="leftCenter">
        <pre class="preLeft">
          ${this.isLoading
            ? 'Loading...'
            : JSON.stringify(this.blockchainData, null, 2)
          }
        </pre>
      </p>
    `
  }
}

customElements.define('my-app', App)
```