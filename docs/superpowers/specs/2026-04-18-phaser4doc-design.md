# Phaser 4 Game Dev — Design Spec

**Data:** 2026-04-18
**Scope:** Prototipo funzionante — struttura Nuxt completa + Capitolo 1

---

## Obiettivo

Sito web statico di apprendimento per Phaser.js v4, in italiano, strutturato come corso a capitoli. Il prototipo implementa la struttura completa del sito e il Capitolo 1 con contenuto reale. I capitoli 2-12 sono presenti come placeholder "Prossimamente".

---

## Stack Tecnologico

| Layer | Tecnologia | Versione |
|---|---|---|
| Framework | Nuxt | 4.4.2 |
| UI Library | Nuxt UI | 4.6.2 |
| Linguaggio | TypeScript | latest |
| Styling | Tailwind CSS v4 (via Nuxt UI) | v4 |
| Rendering | SSG | — |
| Package Manager | pnpm | latest |
| Content | @nuxt/content | v3 |
| Progress tracking | @vueuse/core | — |

---

## Struttura Progetto

Il progetto Nuxt risiede in `phaser4doc/site/`.

```
phaser4doc/
├── site/
│   ├── nuxt.config.ts
│   ├── app.vue
│   ├── assets/
│   │   ├── css/app.css            ← CSS custom properties + font
│   │   └── images/
│   │       └── phaser4-logo.webp  ← copiato dalla root
│   ├── pages/
│   │   ├── index.vue              ← homepage hero + griglia capitoli
│   │   └── capitoli/
│   │       ├── index.vue          ← lista capitoli
│   │       └── [slug].vue         ← pagina capitolo dinamica
│   ├── components/
│   │   ├── AppNavbar.vue
│   │   ├── AppSidebar.vue
│   │   └── chapter/
│   │       ├── ChapterHeader.vue
│   │       ├── ChapterNav.vue
│   │       ├── InfoBox.vue
│   │       └── Quiz.vue
│   ├── composables/
│   │   ├── useChapterProgress.ts
│   │   └── useQuizState.ts
│   ├── data/
│   │   ├── chapters.ts
│   │   └── quiz/
│   │       └── chapter-1.ts
│   └── content/
│       └── chapters/
│           └── 1-introduzione.md
├── CLAUDE.md
├── prompt.md
└── phaser4-logo.webp
```

---

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
  colorMode: {
    preference: 'dark',
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono&display=swap',
        },
      ],
    },
  },
})
```

---

## Visual Identity

**CSS custom properties** in `assets/css/app.css`:

```css
:root {
  --color-bg: #0A0A1A;
  --color-surface: #111128;
  --color-primary: #00D4FF;
  --color-accent: #6C3FE8;
  --color-magenta: #E840E0;
  --color-text: #F0F0FF;
  --color-muted: #8888AA;
}
```

Font: Orbitron per titoli h1/h2, Inter per corpo testo, JetBrains Mono per codice.
Dark theme default. Classe `.glow-cyan` applica `text-shadow` neon sul titolo hero.

---

## Data Model

### `data/chapters.ts`

```ts
export interface Chapter {
  id: number
  slug: string
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readingTime: string
  available: boolean
}

export const chapters: Chapter[] = [
  { id: 1, slug: '1-introduzione', title: 'Introduzione alle Tecnologie', difficulty: 'beginner', readingTime: '~20 min', available: true },
  { id: 2, slug: '2-setup-ambiente', title: 'Setup dell\'Ambiente di Sviluppo', difficulty: 'beginner', readingTime: '~20 min', available: false },
  // ... capitoli 3-12 con available: false
]
```

### `data/quiz/chapter-1.ts`

```ts
export interface QuizQuestion {
  question: string
  options: string[]
  correct: number  // indice della risposta corretta
}

export const quiz1: QuizQuestion[] = [
  // 5 domande su Node.js, NPM, TypeScript, Phaser 4, VS Code
]
```

### Content frontmatter (`content/chapters/1-introduzione.md`)

```yaml
---
title: 'Introduzione alle Tecnologie'
slug: '1-introduzione'
chapter: 1
difficulty: beginner
readingTime: '~20 min'
---
```

---

## Componenti

### `AppNavbar.vue`
Header fisso. Logo `phaser4-logo.webp` a sinistra. `UNavigationMenu` con link "Capitoli" (dropdown lista capitoli) e "Risorse". Bottone toggle dark/light mode a destra.

### `AppSidebar.vue`
Visibile solo su desktop (md+). Lista tutti i 12 capitoli da `chapters.ts`. Icona check per capitoli completati (da `useChapterProgress`). `UProgress` in fondo con percentuale completamento.

### `chapter/ChapterHeader.vue`
Props: `title`, `difficulty`, `readingTime`, `chapter`. Mostra numero capitolo, titolo, `UBadge` difficoltà (verde/giallo/rosso), stima tempo lettura.

### `chapter/InfoBox.vue`
Props: `type: 'tip' | 'warning' | 'new' | 'deprecated'`. Bordo sinistro colorato + icona + slot per contenuto. Usato nel Markdown tramite MDC component.

### `chapter/Quiz.vue`
Props: `questions: QuizQuestion[]`, `chapterSlug: string`.
- Stato interno: risposte selezionate, submitted boolean
- Al submit: calcola score, chiama `useQuizState().saveScore()`
- Mostra feedback per ogni risposta (✓ verde / ✗ rosso)
- Score finale + confetti (via CSS animation) se 100%
- Bottone "Riprova" per azzerare stato locale

### `chapter/ChapterNav.vue`
Props: `currentSlug: string`. Calcola prev/next da `chapters.ts`. Al click "Avanti" chiama `useChapterProgress().markComplete(currentSlug)`. Link disabilitato se capitolo non `available`.

---

## Composables

### `useChapterProgress.ts`

```ts
const progress = useLocalStorage<string[]>('chapter-progress', [])

const markComplete = (slug: string) => { ... }
const isComplete = (slug: string): boolean => { ... }
const completionPercent = computed(() => Math.round(progress.value.length / 12 * 100))
```

### `useQuizState.ts`

```ts
const state = useLocalStorage<Record<string, { score: number; total: number }>>('quiz-state', {})

const saveScore = (slug: string, score: number, total: number) => { ... }
const getScore = (slug: string) => state.value[slug] ?? null
```

---

## Pagine

### `pages/index.vue` — Homepage
- Hero: logo Phaser 4, headline "Impara Phaser 4 da zero", sottotitolo, CTA "Inizia il Corso"
- Griglia 3 colonne di `UCard` per i 12 capitoli (badge difficoltà, readingTime, link al capitolo o badge "Prossimamente")
- Sezione "Stack Tecnologico" con icone badge

### `pages/capitoli/index.vue` — Lista Capitoli
- Lista verticale di tutti i capitoli con progress indicator della sidebar
- Filtrabile per difficoltà

### `pages/capitoli/[slug].vue` — Pagina Capitolo
- Carica contenuto: `await queryCollection('chapters').where('slug', '==', slug).first()`
- Se capitolo non disponibile → mostra componente "Prossimamente"
- Layout: `AppSidebar` a sinistra + main content
- Struttura main: `ChapterHeader` → `<ContentRenderer>` → `Quiz` → `ChapterNav`
- Il quiz viene importato dinamicamente da `data/quiz/chapter-N.ts`

---

## Contenuto Capitolo 1

**Titolo:** Introduzione alle Tecnologie

**Sezioni** (in italiano, contenuti nuovi per Phaser 4):

1. **Node.js** — runtime JavaScript, perché serve per sviluppare giochi browser, come installarlo (v20+)
2. **NPM / pnpm** — gestore pacchetti, differenza npm vs pnpm, comandi base (`install`, `run`, `add`)
3. **Webpack / Vite** — bundler: il libro usa Webpack, Phaser 4 consiglia Vite; spiegazione del ruolo, confronto, perché Vite è più veloce in development
4. **TypeScript** — superset di JavaScript, perché usarlo con Phaser 4, type safety, configurazione base `tsconfig.json`
5. **Firebase** — piattaforma serverless Google, use case nei giochi (leaderboard, auth, storage), quando usarlo
6. **PhaserJS v4** — cos'è, storia, differenze v3→v4, renderer WebGL unificato, link docs ufficiali
7. **Visual Studio Code** — editor consigliato, estensioni utili per sviluppo Phaser+TypeScript

**Quiz (5 domande):**
1. Cosa fornisce Node.js allo sviluppatore di giochi browser?
2. Quale bundler è consigliato per Phaser 4?
3. TypeScript è un superset di quale linguaggio?
4. Quale renderer usa Phaser 4 di default?
5. Quale servizio Google è utile per gestire leaderboard online in un gioco?

---

## Capitoli 2-12 (placeholder)

Presenti in `chapters.ts` con `available: false`. La pagina `[slug].vue` mostra un componente "Prossimamente" con titolo del capitolo e data TBD.

---

## Approccio Implementazione (Content-first)

1. Scaffold progetto Nuxt in `site/`
2. Configura `nuxt.config.ts`, installa dipendenze
3. Crea `data/chapters.ts` con tutti i 12 capitoli
4. Implementa composables `useChapterProgress` e `useQuizState`
5. Implementa componenti (Navbar, Sidebar, ChapterHeader, InfoBox, Quiz, ChapterNav)
6. Implementa pagine (index, capitoli/index, capitoli/[slug])
7. Scrivi contenuto `content/chapters/1-introduzione.md`
8. Scrivi quiz `data/quiz/chapter-1.ts`
9. Test `pnpm dev` e verifica navigazione completa
