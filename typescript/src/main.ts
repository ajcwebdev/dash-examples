import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    TypeScript
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)