import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WrapperApp from './components/WrapperApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WrapperApp></WrapperApp>
  </StrictMode>,
)
