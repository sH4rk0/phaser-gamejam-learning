# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the specification and assets for a **Phaser 4 Game Dev** Italian-language learning website — a static, chapter-based course covering Phaser.js v4.0. The main spec is in [prompt.md](prompt.md). The actual Nuxt project must be created from that spec.

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
pnpm dev       # Start dev server
pnpm build     # SSG production build
pnpm preview   # Preview production build
```

## nuxt.config.ts

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/ui', '@nuxt/content'],
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
})
```

## Architecture

### Directory Structure

```
pages/
├── index.vue                          # Homepage with hero section + chapter cards
├── capitoli/
│   ├── index.vue                      # Chapter listing
│   └── [slug].vue                     # Dynamic chapter page
└── risorse/
    ├── index.vue                      # Resources & cheatsheet
    └── glossario.vue                  # Technical glossary

components/
├── chapter/
│   ├── ChapterHeader.vue              # Title, difficulty badge, reading time
│   ├── CodeBlock.vue                  # Shiki syntax highlighting + copy button
│   ├── InfoBox.vue                    # Tip / Warning / New / Deprecated boxes
│   ├── Quiz.vue                       # Multiple-choice quiz + localStorage state
│   └── ChapterNav.vue                 # Prev / Next navigation
├── sidebar/
│   └── CourseSidebar.vue              # Chapter list + progress bar
└── layout/
    └── CourseNavbar.vue               # Header: logo, Capitoli menu, search, theme toggle

composables/
├── useChapterProgress.ts              # localStorage chapter completion tracking
└── useQuizState.ts                    # localStorage quiz score persistence

data/
├── chapters.ts                        # Chapter metadata array (title, slug, duration, difficulty)
└── quiz/
    └── chapter-N.ts                   # Quiz questions per chapter

content/
└── chapters/
    └── N-slug.md                      # Chapter Markdown content (12 chapters)
```

### Key Nuxt UI Components Used

- `UNavigationMenu` — navbar and chapter dropdown
- `UAccordion` — collapsible sidebar sections on mobile
- `UCard` — chapter cards, quiz cards, info boxes
- `UBadge` — difficulty level badges
- `UProgress` — sidebar completion progress bar
- `UButton`, `UIcon`, `UTooltip`

### Content Model

Chapters are Markdown files under `content/chapters/`. Each chapter has front matter:
```yaml
---
title: "..."
slug: "..."
chapter: 1
difficulty: "beginner" | "intermediate" | "advanced"
readingTime: "~15 min"
---
```

Quiz data lives in `data/quiz/chapter-N.ts` as typed arrays with `question`, `options[]`, and `correct` index.

### State Management

No Pinia — state lives in two composables backed by `useLocalStorage` from `@vueuse/core`:
- `useChapterProgress()` — tracks which chapters are marked complete
- `useQuizState()` — stores score per chapter

## Visual Identity

- **Background**: `#0A0A1A` (near-black)
- **Surface**: `#111128`
- **Primary**: `#00D4FF` (cyan)
- **Accent**: `#6C3FE8` (violet), `#E840E0` (magenta)
- **Text**: `#F0F0FF` / `#8888AA`
- **Fonts**: Orbitron/Exo 2 (titles), Inter/DM Sans (body), JetBrains Mono/Fira Code (code)
- Dark theme default; light mode toggle optional
- Logo asset: `phaser4-logo.webp` (provided in repo root)

## Content Language

All user-facing text, chapter content, and UI labels must be in **Italian**.

## Chapters (12 total)

1. Introduzione a Phaser 4
2. Setup dell'Ambiente di Sviluppo
3. Fondamenti di TypeScript per Phaser 4
4. Concetti Core di Phaser 4
5. Scene e Game Loop
6. GameObjects
7. Fisica e Collisioni (Arcade Physics)
8. Animazioni, Tweens e Audio
9. Camera e Viewport
10. Tilemaps
11. Input Handling
12. Deploy e Ottimizzazione
