import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import GlobalState from './gcontext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GlobalState>
            <App />
      </GlobalState>
  </StrictMode>,
)