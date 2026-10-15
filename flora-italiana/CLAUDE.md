# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Flora Italiana: a bilingual (Italian/English) illustrated encyclopedia of Italy's wild flora. Static prototype in plain HTML/CSS/JS — no framework, no build step, no dependencies, no API keys. Code comments, data, test messages and the README are in Italian; keep new comments and messages in Italian to match.

## Commands

- Run: `npm start` (= `python3 -m http.server 8000`, then open http://localhost:8000). Opening `index.html` directly via `file://` must also keep working.
- Test: `npm test` (= `node tests/run-tests.mjs`). There is a single test script with no framework and no way to run a subset; it prints each failing check and exits 1 on failure. There is no linter.

## Architecture

**Classic scripts on one global namespace.** Everything hangs off `window.FLORA` (aliased `F` inside each file's IIFE). No ES modules, because the site must work from `file://`. Load order in `index.html` matters: data (`js/data/*`) → UI strings (`js/i18n/*`) → `core.js` → `illustrations.js` → `components.js` → `pages.js` → `main.js`. A new script file needs a `<script>` tag in the right spot.

Layers:
- `js/data/taxonomy.js` — `FLORA.meta` (version, hero image) plus controlled vocabularies: `regions` (20, with `c`/`r` grid coordinates for the schematic tile map), `belts` (altitude belts), `habitats`, `routes`, `origins`, `quality`, `sources` (bibliography).
- `js/data/species.js` / `guides.js` — content records that reference vocabulary ids.
- `js/i18n/{it,en}.js` — flat key→string UI dictionaries on `FLORA.i18n[lang]`; both must have exactly the same keys.
- `core.js` — `F.t(key, vars)` (UI strings, `{var}` interpolation), `F.pick`/`F.tx` for bilingual content, `F.esc` for HTML escaping, lookups (`F.byId`, `F.belt`, `F.region`…), `F.store` (localStorage wrapper with in-memory fallback, keys prefixed `flora.`), favorites, catalog filter state (`F.state`).
- `illustrations.js` (`F.illus`) — procedurally drawn SVG botanical plates, driven by each species' `plate` object; used as fallback whenever a real image is `pending`.
- `components.js` (`F.ui`) — reusable HTML fragments (cards, map, altitude profile, badges).
- `pages.js` (`F.pages`) — each page is a function returning an HTML string; optional `bind*` functions attach events after render.
- `main.js` — hash router (`ROUTES` regex table, e.g. `#specie-<id>`, `#regione-<id>`, `#fascia-<id>`), header/footer rendering, and global delegated click handlers via `data-lang`, `data-fav`, `data-q`, `data-go` attributes. `F.render()` re-renders the whole page (used on language/favorite changes).

Rendering is string templating into `innerHTML`, so every data-derived value must go through `F.esc` (or `F.tx`, which escapes).

## Content rules (enforced by `tests/run-tests.mjs`)

- All visible content is `{ it, en }`. A missing translation is never invented: leave the language out and `F.pick`/`F.tx` falls back and shows a "translation missing" marker.
- Never invent botanical data. Unknown values are `null` (e.g. `conservation: null`), and every species needs `sources` keys that exist in `FLORA.sources`. `quality` is `"dimostrativo"` | `"da-verificare"` | `"verificato"` (only after human review).
- Species `belts`/`habitats`/`routes`/`regions`/`origin` must use vocabulary ids from `taxonomy.js`. Endemics need `endemism` text; naturalized/invasive species need `nativeRange` or `originNote`; gymnosperms have `flowering: null`. Altitude-belt texts must not contain numeric elevations without a source.
- `features.it` and `features.en` must have the same length. Ids are lowercase `genere-specie`.
- Images: `public/images/species/<id>.webp` (3:4) and the hero image (`FLORA.meta.hero`). Set `image.status` to `"ready"` only once the file exists (the test checks). AI-generated images keep `ai: true` and are always labelled as illustrative; licensed photos use `ai: false` with source cited. See `public/images/species/README.md`.

## Adding a language

Add `js/i18n/<code>.js` (same keys as `en.js`), a `<script>` tag in `index.html`, the code to `F.LANGS` in `core.js`, and to `LANGS` in `tests/run-tests.mjs`.

## Other notes

- Asset URLs in `index.html` carry a `?v=0.2.0` cache-busting query; bump it together with `FLORA.meta.version` and `package.json` on release.
- `css/style.css` defines color tokens on `:root` with dark-mode overrides (`prefers-color-scheme` plus `[data-theme]`); use the tokens rather than hard-coded colors.
- `archivio/flora-italiana-v1.html` is the archived single-file v1, kept for reference only — don't edit it.
