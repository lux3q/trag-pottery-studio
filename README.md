# TRAG — pottery studio

Multimedia presentation site for a fictional pottery workshop, built as a university
project. Each subpage covers one tool: it shows the finished artefact and documents
how it was made — logo (Inkscape), photo editing (Photopea), brochure (Canva),
video ad (DaVinci Resolve), soundtrack (Audacity).

Live at [lucijabaljak.netlify.app](https://lucijabaljak.netlify.app/).

## Stack

Vite · React 18 · react-router-dom v6 · TypeScript (strict)

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # validate content, typecheck, then build
npm run validate   # check content against the JSON schema
```

## Architecture

No text lives in the components. All content sits in `src/content/`, and every page is
the same generic template rendering a list of blocks from JSON.

```
src/
  content/
    site.json           brand, author, navigation
    page.schema.json    schema for the page files below
    pages/*.json        one file per route
    types.ts            block and page types
  components/
    blocks/             one component per block type
    BlockRenderer.tsx   block.type -> component
    layout/  ui/
  lib/
    pages.ts            loads content/pages/*.json into slug -> data
    meta.ts             title, description and Open Graph tags per route
  styles/               tokens, base, blocks
```

**Adding a page** means adding `src/content/pages/<slug>.json` and one entry in
`site.json` nav. No component is touched.

Block types: `hero`, `cards`, `process`, `figure`, `video`. Their fields are described in
[`src/content/page.schema.json`](src/content/page.schema.json) and checked by
`npm run build` — a page with a missing `alt` or image dimensions fails the build.

## Accessibility

Semantic landmarks, one `<h1>` per page, skip-to-content link, visible `:focus-visible`
outline, required `alt` text, explicit image dimensions to avoid layout shift, and all
transitions disabled under `prefers-reduced-motion`.

## Deployment

Netlify, from `dist`. `public/_redirects` sends every route to `index.html` so client-side
routing survives a page refresh. Large images are resized and converted to modern formats
by the Netlify Image CDN at request time, so the repository keeps the originals.

## Author

Lucija Baljak
