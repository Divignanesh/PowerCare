// Writes one static HTML file per route after `vite build`.
//
//   dist/index.html       → /
//   dist/about.html       → /about        (served clean by vercel.json)
//   dist/app-shell.html   → everything else; the SPA renders the 404
//
// The routes come from PAGE_META in the SEO component, so a page added there
// is pre-rendered without touching this script.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(ssrEntry).href)
const { PAGE_META } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'seo-meta.js')).href)

// The untouched template becomes the fallback for unknown URLs.
fs.writeFileSync(path.join(dist, 'app-shell.html'), template)

// Helmet supplies each page's own <title>; drop the template's default.
const base = template.replace(/<title[^>]*>[\s\S]*?<\/title>\s*/, '')

// Head tags React rendered in place. Only Helmet emits these, so every match
// belongs in <head>.
const HEAD_TAG = /<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g

for (const { path: route } of Object.values(PAGE_META)) {
  const rendered = render(route)
  // Marked so src/main.jsx can drop them on boot: React then renders its own
  // copy, and leaving these would put every tag in <head> twice.
  const head = (rendered.match(HEAD_TAG) || [])
    .map((tag) => tag.replace(/^<(\w+)/, '<$1 data-ssr'))
    .join('\n    ')
  const html = rendered.replace(HEAD_TAG, '')
  const page = base
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  fs.writeFileSync(path.join(dist, file), page)
  console.log(`prerendered ${route.padEnd(16)} → dist/${file}`)
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
