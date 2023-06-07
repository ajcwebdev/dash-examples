import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    JavaScript
  </div>
`

setupCounter(document.querySelector('#counter'))
