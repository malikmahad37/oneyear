import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { MemoryProvider } from './context/MemoryContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MemoryProvider>
        <App />
      </MemoryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
