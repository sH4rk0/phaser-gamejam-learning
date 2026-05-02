# CLAUDE.md

Project: Phaser 4 Game Dev learning site. Static, chapter-based course covering Phaser.js v4.0. Multi-language (IT/EN). Spec in [prompt.md](prompt.md).

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | Nuxt | 4.4.2 |
| UI Library | Nuxt UI | 4.6.2 |
| Language | TypeScript | latest |
| Styling | Tailwind CSS v4 (via Nuxt UI) | v4 |
| Rendering | Static Site Generation (SSG) | — |
| Package Manager | pnpm | latest |
| Content | @nuxt/content | v3 |
| Progress tracking | @vueuse/core | — |
| Syntax highlighting | Shiki | — |

## Commands

```bash
pnpm dev       # Start dev server (run from site/)
pnpm build     # SSG production build
pnpm preview   # Preview production build
```

## nuxt.config.ts

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/ui', '@nuxt/content'],
  ssr: true,
  experimental: {
    payloadExtraction: false,  // Prevents ENOENT on Windows dev server
  },
  nitro: {
    prerender: {
      routes: ['/', '/it', '/en'],
      crawlLinks: true,
      failOnError: false,
    },
  },
})
```

## Architecture

### Directory Structure

```
pages/
├── index.vue                          # Redirects → /it
├── capitoli/
│   ├── index.vue                      # Redirects → /it/capitoli
│   └── [slug].vue                     # Redirects → /it/capitoli/[slug]
├── risorse.vue                        # Redirects → /it/risorse
└── [locale]/
    ├── index.vue                      # Locale-aware homepage
    ├── risorse.vue                    # Locale-aware resources page
    ├── capitoli/                      # IT canonical routes
    │   ├── index.vue                  # IT chapter listing (EN users → /en/chapters)
    │   └── [slug].vue                 # IT chapter page (EN users → /en/chapters/[enSlug])
    └── chapters/                      # EN canonical routes
        ├── index.vue                  # EN chapter listing (IT users → /it/capitoli)
        └── [slug].vue                 # EN chapter page (IT users → /it/capitoli/[itSlug])

components/
├── chapter/
│   ├── ChapterHeader.vue              # Title, difficulty badge, reading time (locale-aware)
│   ├── CodeBlock.vue                  # Shiki syntax highlighting + copy button
│   ├── InfoBox.vue                    # Tip / Warning / New / Deprecated boxes
│   ├── Quiz.vue                       # Multiple-choice quiz + localStorage state (IT only)
│   └── ChapterNav.vue                 # Prev / Next navigation (locale-aware)
├── AppSidebar.vue                     # Chapter list + TOC + progress (locale-aware)
└── AppNavbar.vue                      # Header: logo, nav links, language switcher

composables/
├── useLocale.ts                       # Reads route.params.locale → 'it' | 'en'; exposes sectionPath
├── useChapterProgress.ts              # localStorage chapter completion tracking
└── useQuizState.ts                    # localStorage quiz score persistence

data/
├── chapters.ts                        # Chapter metadata for IT and EN; slug maps; locale-aware utils
└── quiz/
    └── chapter-N.ts                   # Quiz questions per chapter (Italian only)

content/
└── chapters/
    ├── it/
    │   └── N-slug-it.md               # Italian chapter content (19 chapters, IT slugs)
    └── en/
        └── N-slug-en.md               # English chapter content (19 chapters, EN slugs)
```

### Locale Routing

- Default locale: `it`. Root `/` redirects to `/it`.
- IT canonical section path: `capitoli` → `/it/capitoli/1-introduzione`
- EN canonical section path: `chapters` → `/en/chapters/1-introduction`
- Old routes (`/capitoli`, `/capitoli/[slug]`, `/risorse`) kept as redirect stubs to `/it/...`.
- Global middleware `locale.global.ts` validates `[locale]` param; redirects invalid values to `/it`.
- Cross-locale protection: `capitoli/` pages redirect EN users to `chapters/` and vice versa.
- Language switcher in `AppNavbar` uses regex + slug mapping for smart cross-locale navigation.

### Locale Detection

`useLocale()` composable — reads `route.params.locale`, returns `{ locale, sectionPath }`:
- `locale`: `'it' | 'en'`
- `sectionPath`: `'capitoli'` (IT) or `'chapters'` (EN)

### i18n Strategy

No external i18n library. Each page/component defines a computed `t` object for UI strings. Example:
```ts
const t = computed(() => locale.value === 'en'
  ? { title: 'Chapters', ... }
  : { title: 'Capitoli', ... }
)
```

### Slug Mapping

IT and EN chapters use different slugs. `data/chapters.ts` maintains bidirectional maps:
```ts
// IT → EN (only for slugs that differ)
const itToEn: Record<string, string> = {
  '1-introduzione': '1-introduction',
  '2-il-template': '2-the-template',
  '3-typescript-basi': '3-typescript-basics',
  '4-configurazione-gioco': '4-game-configuration',
  '6-1-animazioni': '6-1-animations',
  '6-3-tempo': '6-3-time',
  '8-fisica-arcade': '8-arcade-physics',
  '9-gameobjects-specializzati': '9-specialized-gameobjects',
}
// EN → IT is derived automatically via Object.fromEntries
// Slugs not in the map are identical across locales (e.g. '7-camera', '5-1-gameobjects-intro')
```

Utility functions exported from `data/chapters.ts`:
- `getSectionPath(locale)` → `'capitoli'` | `'chapters'`
- `getSlugForLocale(slug, fromLocale, toLocale)` → mapped slug or same if identical
- `getChapters(locale)` → `Chapter[]`
- `getChapterBySlug(slug, locale)` → `Chapter | undefined`
- `getPrevChapter(slug, locale)` → `Chapter | undefined`
- `getNextChapter(slug, locale)` → `Chapter | undefined`

### Content Collections

Two named collections in `content.config.ts`:
```ts
chapters_it: defineCollection({ source: 'chapters/it/*.md', type: 'page', schema: chapterSchema })
chapters_en: defineCollection({ source: 'chapters/en/*.md', type: 'page', schema: chapterSchema })
```

Query pattern — each page queries its own locale's collection directly (no cross-locale queries):
```ts
// In capitoli/[slug].vue (IT only)
const { data: chapter } = await useAsyncData(
  `chapter-it-${slug}`,
  () => queryCollection('chapters_it').where('slug', '==', slug.value).first(),
  { watch: [slug] },
)

// In chapters/[slug].vue (EN only)
const { data: chapter } = await useAsyncData(
  `chapter-en-${slug}`,
  () => queryCollection('chapters_en').where('slug', '==', slug.value).first(),
  { watch: [slug] },
)
```

The `watch` option is required for SPA navigation to re-fetch when slug changes.

### Content Model

Chapters: Markdown under `content/chapters/{locale}/`. Front matter:
```yaml
---
title: "..."
slug: "..."        # locale-specific slug (e.g. "1-introduzione" for IT, "1-introduction" for EN)
chapter: 1
difficulty: "beginner" | "intermediate" | "advanced"
readingTime: "~15 min"
---
```

Quiz data in `data/quiz/chapter-N.ts`: typed arrays with `question`, `options[]`, `correct` index. Quiz is suppressed when `locale === 'en'`.

### State Management

No Pinia. State in two composables backed by `useLocalStorage` from `@vueuse/core`:
- `useChapterProgress()` — tracks completed chapters
- `useQuizState()` — stores score per chapter

## Visual Identity

- **Background**: `#0A0A1A`
- **Surface**: `#111128`
- **Primary**: `#00D4FF` (cyan)
- **Accent**: `#6C3FE8` (violet), `#E840E0` (magenta)
- **Text**: `#F0F0FF` / `#8888AA`
- **Fonts**: Orbitron/Exo 2 (titles), Inter/DM Sans (body), JetBrains Mono/Fira Code (code)
- Dark theme default; light mode toggle optional
- Logo: `phaser4-logo.webp` (repo root)

## Content Languages

- **IT**: primary language, full content + quizzes. Section: `/it/capitoli/`
- **EN**: full translated content, no quizzes. Section: `/en/chapters/`

## Chapters (19 total)

| # | IT slug | EN slug | Title (IT) |
|---|---------|---------|------------|
| 1 | 1-introduzione | 1-introduction | Introduzione alle Tecnologie |
| 2 | 2-il-template | 2-the-template | Il Template |
| 3 | 3-typescript-basi | 3-typescript-basics | Basi di TypeScript |
| 4 | 4-configurazione-gioco | 4-game-configuration | Configuriamo il Nostro Gioco |
| 5.1 | 5-1-gameobjects-intro | 5-1-gameobjects-intro | Introduzione ai GameObjects |
| 5.2 | 5-2-text | 5-2-text | Text |
| 5.3 | 5-3-image | 5-3-image | Image |
| 5.4 | 5-4-sprite | 5-4-sprite | Sprite |
| 5.5 | 5-5-tilesprite | 5-5-tilesprite | TileSprite |
| 5.6 | 5-6-group | 5-6-group | Group |
| 5.7 | 5-7-container | 5-7-container | Container |
| 6.1 | 6-1-animazioni | 6-1-animations | Animazioni con Tween |
| 6.2 | 6-2-audio | 6-2-audio | Audio |
| 6.3 | 6-3-tempo | 6-3-time | Tempo e Timer |
| 7 | 7-camera | 7-camera | Camera e Viewport |
| 8 | 8-fisica-arcade | 8-arcade-physics | La Fisica Arcade |
| 9 | 9-gameobjects-specializzati | 9-specialized-gameobjects | I Nostri GameObjects Specializzati |
| 10 | 10-tilemaps | 10-tilemaps | Tilemaps |
| 11 | 11-input | 11-input | Input Handling |
