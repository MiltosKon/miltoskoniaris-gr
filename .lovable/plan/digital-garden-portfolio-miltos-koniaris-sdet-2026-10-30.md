# Digital Garden & Portfolio — Miltos Koniaris (SDET)

Tagline: "Teetering in the unknown."

## Look & feel
- Dark-first. Midnight black base (#07080b / #0f1117 surfaces), electric blue primary (#3b82f6-ish, oklch), cantaloupe orange accent (#ffa36c) for tags, highlights, focus.
- Fonts: Geist-style sans (Space Grotesk headings, Inter-alternative body: "Manrope") + JetBrains Mono for code/meta.
- Hairline borders, subtle grid/noise backdrop, glass header (backdrop-blur), soft spring transitions, 65ch prose width.

## Navigation
- Desktop: sticky glass top header with links + Cmd/Ctrl+K command palette (search all pages/posts, filter by tag).
- Mobile: bottom tab bar (Home, CV, Garden, Deep Dives, Music) with press-scale micro-interactions, large touch targets, no horizontal overflow.

## Pages (each its own route with unique SEO)
- `/` Home: bio, expertise cards (Data, QA Automation, Infrastructure), philosophy, nav cards to sections, latest entries.
- `/cv` Resume: timeline of roles, achievements, stack badges grouped, "Download CV" (print-to-PDF stylesheet + JSON export).
- `/garden` Diary stream with date, read time, mood emoji, tag filter; `/garden/$slug` entry.
- `/deep-dives` article list with tag filter; `/deep-dives/$slug` article with sticky table of contents, copy-button code blocks, markdown typography.
- `/music` album/track cards with cover art, notes, and embedded Spotify/YouTube/Bandcamp players.
- `/admin` Authoring hub (password gate): pick section, fill title/summary/tags/mood/date, markdown editor with live side-by-side preview, buttons to download JSON and Markdown (+ copy to clipboard).

## Content
- Placeholder sample content (CV roles, a few diary notes, 2–3 deep dives, ~6 music picks) stored as typed data files with markdown bodies — you replace with real content later.

## Admin password
- Shared password checked on the server (stored as a secret you set), with an encrypted session cookie. No database; exports only, as you chose.

## Technical details
- TanStack Start routes; content in `src/content/*.ts`; markdown rendered via `react-markdown` + `remark-gfm` + `rehype-slug`, syntax highlighting via `shiki` (or `rehype-highlight`).
- Command palette via shadcn `cmdk` Dialog; global keydown listener.
- Gate: `createServerFn` + `useSession`, secrets `ADMIN_PASSWORD` and `SESSION_SECRET` (generated).
- Exports are client-side Blob downloads.
- Small tests: tag filtering and read-time calculation.
