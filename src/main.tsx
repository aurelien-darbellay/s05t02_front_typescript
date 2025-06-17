import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TypesConfigProvider } from './contexts/TypesConfigProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TypesConfigProvider>
      <App />
    </TypesConfigProvider>
  </StrictMode>,
)
