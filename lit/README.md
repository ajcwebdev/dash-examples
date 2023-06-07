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