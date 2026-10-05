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
const { PAGE_META, BASE_URL } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'seo-meta.js')).href)

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

// Job postings live in the Google Sheet, so their pages render in the
// browser. Listing them in the sitemap lets search engines find each one,
// and dist/jobs.json gives the Careers page something to show at once; a
// posting added later is picked up live, and by the next build. If the Sheet can't
// be reached the build goes on with the static pages only.
const ENDPOINT = fs
  .readFileSync(path.join(root, 'src/lib/submitForm.js'), 'utf8')
  .match(/https:\/\/script\.google\.com\/macros\/s\/[^'"]+\/exec/)?.[0]
try {
  // Apps Script now and then answers with an HTML error page; one retry
  // is enough to get past it.
  const getJobs = async () => {
    const res = await fetch(`${ENDPOINT}?jobs`, { signal: AbortSignal.timeout(45000) })
    return (await res.json()).jobs ?? []
  }
  const jobs = await getJobs().catch(getJobs)
  // Same slug rule as jobSlug() in src/lib/jobs.js.
  const key = (h) => h.toLowerCase().replace(/[^a-z0-9]/g, '')
  const slugs = jobs
    .map((row) => Object.fromEntries(Object.entries(row).map(([h, v]) => [key(h), v])))
    .map((row) => (row.roleid || row.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    .filter(Boolean)
  // The snapshot src/lib/jobs.js shows while the live list loads.
  fs.writeFileSync(path.join(dist, 'jobs.json'), JSON.stringify({ ok: true, jobs }))
  const today = new Date().toISOString().slice(0, 10)
  const entries = slugs
    .map((slug) => `  <url>\n    <loc>${BASE_URL}/careers/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`)
    .join('')
  const sitemap = path.join(dist, 'sitemap.xml')
  fs.writeFileSync(sitemap, fs.readFileSync(sitemap, 'utf8').replace('</urlset>', `${entries}</urlset>`))
  console.log(`sitemap: added ${slugs.length} job posting${slugs.length === 1 ? '' : 's'}`)
} catch (err) {
  console.warn(`sitemap: job postings skipped (${err.message})`)
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
