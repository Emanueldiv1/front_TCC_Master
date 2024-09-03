import { Component } from '@angular/core';

@Component({
  selector: 'LOADER',
  standalone: true,
  template: `
    <div class="main">
      <div class="spinner"></div>
    </div>
  `,
  styles: `
  .main {
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: center;
  }
  .spinner {
    width: 80px;
    height: 80px;
    border: 4px solid #0feedf33;
    border-top: 4px solid #0feee0;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`,
})
export class LoadingComponent {}
