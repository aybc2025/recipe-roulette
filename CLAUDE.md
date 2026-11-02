# recipe-roulette — notes for Claude Code

Static React + Vite PWA, Hebrew/RTL. Browse or randomly draw a recipe. No backend, no database, no secrets.
Live: https://aybc2025.github.io/recipe-roulette/ (project page, base path `/recipe-roulette/`).

## On opening this repo
Run `npm install && npm run build` first, without asking. Treat it as a real verification step and fix any
errors before doing anything else. The Vite build has not been exercised in every session — the sandbox that
last touched this repo could not reach the npm registry, so only the static PWA files were checked there.

## package-lock.json and CI
No `package-lock.json` is committed, so `.github/workflows/deploy.yml` is in **bootstrap state**
(`npm install`, no `cache:` key). Only switch to `cache: 'npm'` + `npm ci` after a lockfile is actually
committed (verify with `ls package-lock.json`).

## What you can NOT do here, even if asked
Enable GitHub Pages or change its settings, or push straight to `main` (every push to `main` deploys).
Work on a branch and open a PR. Name the manual step instead of working around it.

## Architecture
- `src/` — React app. `components/` one file per component, `hooks/useRecipes.js` owns all logic,
  `data/recipes.json` is the recipe content (edited by hand), `styles/index.css` holds tokens and styles.
- `public/` — copied as-is into `dist/`: `manifest.json`, `sw.js`, `icons/`, `og-image.png`.
- `icon-design/make_icons.py` — generates every icon plus the link-preview image (see App icons).
- `.github/workflows/deploy.yml` — builds and pushes `dist` to the `gh-pages` branch (`peaceiris/actions-gh-pages@v4`).

## Intentional decisions — do not revert without asking
- Deploys via the `gh-pages` branch, not Pages' automatic workflow (that served raw source and caused MIME errors).
- `npm install` instead of `npm ci` in CI (no lockfile yet).
- `sw.js` is network-first with cache fallback so edits to `recipes.json` show up without bumping the cache.
  It deletes only caches starting with `recipe-roulette-`, because every project on `aybc2025.github.io`
  shares one origin and must not wipe the others' caches. Bump the version suffix when changing the precache list.
- Manifest `background_color` is charcoal to match the icon and header (the page body itself is cream).

## Visual system (from `src/styles/index.css`)
cream `#f5f0e8`, cream-2 `#ede6d5`, mustard `#c8902a`, terracotta `#c0522a`, deep-red `#7a2020`,
charcoal `#2a2420`, warm-gray `#6b5c52`, white `#fff9f2`. Radius 16px / 10px.
Fonts: Fraunces (logo), Heebo (everything else). RTL throughout.

## App icons
Concept: a roulette wheel drawn as a dinner plate — cream rim, eight wedges in the palette, a pointer at the top —
on the charcoal of the app header. The earlier icon was a missing-glyph box (an emoji that the generating font
could not draw); never draw icons with text or emoji.
Regenerate with `python3 icon-design/make_icons.py` (Pillow only; draws at 8× and downsamples).
Set: `icon-192`, `icon-512`, `icon-512-maskable` (content inside the 80% safe circle), `apple-touch-icon` (180),
`favicon-32`, and `public/og-image.png` (1200×630, used by WhatsApp and similar previews). All wired in
`manifest.json` and `index.html`. After changing the design, view the 512 icon, the maskable crop and the
48/32px sizes before committing.

## PWA install identity
- `id`: `/recipe-roulette/app` — deliberately **not** equal to `start_url`, so a stale partial install of the
  start URL cannot poison later installs.
- `start_url` / `scope`: `./` (resolves to `/recipe-roulette/`). Icons are real PNG files with relative paths;
  the three entries are split by purpose (`any` 192, `any` 512, `maskable` 512).
- Cache prefix: `recipe-roulette-`. If you ever add `localStorage`/IndexedDB, prefix keys `recipe-roulette:`.
- Headless installability check (desktop Chromium, stand-in site at `/recipe-roulette/`): no manifest errors,
  no installability errors, service worker activated, all icons `200 image/png`. The Android install itself
  was **not** tested.
- If someone sees "This app is already installed" with no app: change `id` to a new value in the same commit,
  then have them remove the old home-screen shortcut, uninstall any entry in Android Settings → Apps, and use
  Chrome ⋮ → **Install app** (not "Add to home screen").

## Commands
`npm run dev` · `npm run build` · `npm run preview` (preview at `/recipe-roulette/`).

## Deployment model
Merging to `main` triggers the workflow, which builds and publishes to `gh-pages`. Pages is set to serve the
`gh-pages` branch (a one-time setting, done in the browser's desktop site, not the GitHub mobile app).
WhatsApp caches link previews; append `?v=2` to a shared link to force a fresh one.
