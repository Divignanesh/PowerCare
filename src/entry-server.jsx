// Build-time renderer. scripts/prerender.mjs calls render() once per route
// and writes the result into dist/, so every page ships as real HTML with its
// own title, description, canonical, Open Graph tags and JSON-LD. Crawlers
// that do not run JavaScript (most AI answer engines, social previews) then
// see the same page a visitor does. The browser still boots the SPA as usual.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { IconContext } from '@phosphor-icons/react'
import { AppShell } from './App.jsx'

// React 19 renders Helmet's <title>, <meta>, <link> and JSON-LD tags straight
// into the output instead of filling a context, so the pre-renderer lifts
// them into <head> itself (see scripts/prerender.mjs).
export const render = (url) =>
  renderToString(
    <StrictMode>
      <HelmetProvider>
        <IconContext.Provider value={{ weight: 'fill' }}>
          <StaticRouter location={url}>
            <AppShell />
          </StaticRouter>
        </IconContext.Provider>
      </HelmetProvider>
    </StrictMode>,
  )
