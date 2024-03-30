# Dash Analog Example

## Clone Repo and Navigate to Project Directory

```bash
git clone https://github.com/ajcwebdev/dash-examples.git
cd dash-examples/analog
```

## Install Dependencies and Start Development Server

```bash
npm i
npm run dev
```

## Dash Domain Name Component

```ts
// src/app/pages/index.page.ts

import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Dash + Angular/Analog + Express</h1>
    <button (click)="fetchData()">Fetch Data</button>
    <pre class="alignLeft">
      <p class="preLeft">
        {{isLoading ? 'Loading...' : blockchainData}}
      </p>
    </pre>
  `,
  styles: [`
    .alignLeft {
      display: flex;
      justify-content: flex-start;
    }
    .preLeft {
      text-align: left;
    }`,
  ],
})

export default class HomeComponent {
  blockchainData: any
  isLoading = false

  constructor(private http: HttpClient) {}

  fetchData() {
    this.isLoading = true
    this.http.get('http://localhost:3001/name/ajcwebdevtest').subscribe(
      data => {
        this.blockchainData = JSON.stringify(data, null, 2)
        this.isLoading = false
      },
      error => {
        console.error(error)
        this.isLoading = false
      }
    )
  }
}
```