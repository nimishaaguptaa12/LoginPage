import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Changed to relative path
import App from './App'  // Changed to relative path

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)