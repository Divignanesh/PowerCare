import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { IconContext } from '@phosphor-icons/react'
import './index.css'
import App from './App.jsx'

// Head tags written by the pre-renderer (or the shell's fallback title). The
// app renders its own through Helmet, so these go first to avoid duplicates.
document.querySelectorAll('[data-ssr]').forEach((node) => node.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      {/* Pictograms are drawn solid site-wide; line icons stay for UI controls. */}
      <IconContext.Provider value={{ weight: 'fill' }}>
        <App />
      </IconContext.Provider>
    </HelmetProvider>
  </StrictMode>,
)
