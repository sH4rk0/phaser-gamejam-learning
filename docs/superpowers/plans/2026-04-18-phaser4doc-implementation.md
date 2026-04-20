# Phaser 4 Doc — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Nuxt 4 learning site for Phaser.js v4 with complete Chapter 1 content covering Node.js, NPM, Webpack/Vite, TypeScript, Firebase, PhaserJS, and VS Code.

**Architecture:** Content-first SSG. Nuxt 4.4.2 + Nuxt UI 4.6.2 render chapter pages from `@nuxt/content` v3 Markdown files. Quiz state and chapter progress persist to localStorage via `@vueuse/core` composables. Chapters 2-12 are metadata-only placeholders.

**Tech Stack:** Nuxt 4.4.2, Nuxt UI 4.6.2, @nuxt/content v3, @vueuse/core, TypeScript, Tailwind CSS v4, pnpm

---

## File Map

| File | Responsibility |
|---|---|
| `site/nuxt.config.ts` | Modules, SSG config, Google Fonts, colorMode |
| `site/content.config.ts` | @nuxt/content v3 collection schema |
| `site/app.vue` | Root layout shell with `<NuxtPage>` |
| `site/assets/css/app.css` | CSS custom properties + Tailwind v4 @theme tokens |
| `site/data/chapters.ts` | Chapter metadata array (12 items, typed) |
| `site/data/quiz/chapter-1.ts` | Quiz questions for chapter 1 (5 questions) |
| `site/composables/useChapterProgress.ts` | localStorage chapter completion tracking |
| `site/composables/useQuizState.ts` | localStorage quiz score persistence |
| `site/components/AppNavbar.vue` | Fixed header: logo + nav + theme toggle |
| `site/components/AppSidebar.vue` | Desktop sidebar: chapter list + progress bar |
| `site/components/chapter/ChapterHeader.vue` | Chapter title, difficulty badge, reading time |
| `site/components/chapter/InfoBox.vue` | Styled MDC component: tip/warning/new/deprecated |
| `site/components/chapter/Quiz.vue` | Multi-choice quiz with localStorage persistence |
| `site/components/chapter/ChapterNav.vue` | Prev/Next chapter navigation |
| `site/pages/index.vue` | Homepage: hero + chapter cards grid |
| `site/pages/capitoli/index.vue` | Chapter listing page |
| `site/pages/capitoli/[slug].vue` | Dynamic chapter page |
| `site/content/chapters/1-introduzione.md` | Full chapter 1 content in Italian |
| `site/tests/useChapterProgress.test.ts` | Vitest tests for progress composable |
| `site/tests/useQuizState.test.ts` | Vitest tests for quiz state composable |
| `site/vitest.config.ts` | Vitest configuration |

---

## Task 1: Scaffold Nuxt project and install dependencies

**Files:**
- Create: `site/` (via nuxi init)
- Create: `site/vitest.config.ts`

- [ ] **Step 1: Init Nuxt project**

Run from `phaser4doc/`:
```bash
pnpm dlx nuxi@latest init site --package-manager pnpm
```
When prompted for template, choose **default**. When asked about git init, choose **No**.

- [ ] **Step 2: Install core dependencies**

```bash
cd site
pnpm add @nuxt/ui@4.6.2 @nuxt/content @vueuse/core
```

- [ ] **Step 3: Install dev dependencies**

```bash
pnpm add -D vitest @nuxt/test-utils happy-dom
```

- [ ] **Step 4: Copy logo asset**

```bash
mkdir -p assets/images
cp ../phaser4-logo.webp assets/images/phaser4-logo.webp
```

- [ ] **Step 5: Create vitest.config.ts**

```ts
// site/vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
```

- [ ] **Step 6: Add test script to package.json**

Open `site/package.json` and add to `scripts`:
```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
pnpm dev
```
Expected: Nuxt dev server starts at `http://localhost:3000`. Browser shows default Nuxt welcome page.

- [ ] **Step 8: Commit**

```bash
cd site
git add .
git commit -m "feat: scaffold Nuxt 4 project with core dependencies"
```

---

## Task 2: Configure nuxt.config.ts, content.config.ts, app.vue, and app.css

**Files:**
- Modify: `site/nuxt.config.ts`
- Create: `site/content.config.ts`
- Modify: `site/app.vue`
- Create: `site/assets/css/app.css`
- Create: `site/assets/css/` directory

- [ ] **Step 1: Write nuxt.config.ts**

```ts
// site/nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['~/assets/css/app.css'],
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
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },
})
```

- [ ] **Step 2: Write content.config.ts**

```ts
// site/content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    chapters: defineCollection({
      source: 'chapters/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        chapter: z.number(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        readingTime: z.string(),
      }),
    }),
  },
})
```

- [ ] **Step 3: Write app.css**

```css
/* site/assets/css/app.css */
@import "tailwindcss";

@theme {
  --color-phaser-cyan: #00D4FF;
  --color-phaser-purple: #6C3FE8;
  --color-phaser-magenta: #E840E0;
  --color-phaser-bg: #0A0A1A;
  --color-phaser-surface: #111128;
  --color-phaser-text: #F0F0FF;
  --color-phaser-muted: #8888AA;
}

:root {
  --color-bg: #0A0A1A;
  --color-surface: #111128;
  --color-primary: #00D4FF;
  --color-accent: #6C3FE8;
  --color-magenta: #E840E0;
  --color-text: #F0F0FF;
  --color-muted: #8888AA;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
}

h1, h2, h3 {
  font-family: 'Orbitron', sans-serif;
}

code, pre, kbd {
  font-family: 'JetBrains Mono', monospace;
}

.glow-cyan {
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.2);
}

/* Chapter content prose styles */
.chapter-content h2 {
  font-family: 'Orbitron', sans-serif;
  color: var(--color-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.chapter-content p {
  line-height: 1.8;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.chapter-content pre {
  background: #0d0d1f;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.chapter-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.chapter-content th {
  background: var(--color-surface);
  color: var(--color-primary);
  padding: 0.75rem 1rem;
  text-align: left;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
}

.chapter-content td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(136, 136, 170, 0.2);
}

.chapter-content ul, .chapter-content ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.chapter-content li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.chapter-content a {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Confetti animation for perfect quiz score */
@keyframes confetti-fall {
  0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

.confetti-piece {
  position: fixed;
  width: 10px;
  height: 10px;
  animation: confetti-fall 3s ease-in forwards;
  pointer-events: none;
}
```

- [ ] **Step 4: Write app.vue**

```vue
<!-- site/app.vue -->
<template>
  <div class="min-h-screen" style="background-color: var(--color-bg);">
    <AppNavbar />
    <NuxtPage />
  </div>
</template>
```

- [ ] **Step 5: Verify dev server with new config**

```bash
pnpm dev
```
Expected: dev server starts without errors. No TypeScript errors in console.

- [ ] **Step 6: Commit**

```bash
git add nuxt.config.ts content.config.ts app.vue assets/
git commit -m "feat: configure Nuxt, content, and design tokens"
```

---

## Task 3: Create data/chapters.ts

**Files:**
- Create: `site/data/chapters.ts`

- [ ] **Step 1: Create the chapters data file**

```ts
// site/data/chapters.ts
export interface Chapter {
  id: number
  slug: string
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readingTime: string
  available: boolean
}

export const chapters: Chapter[] = [
  {
    id: 1,
    slug: '1-introduzione',
    title: 'Introduzione alle Tecnologie',
    difficulty: 'beginner',
    readingTime: '~20 min',
    available: true,
  },
  {
    id: 2,
    slug: '2-setup-ambiente',
    title: "Setup dell'Ambiente di Sviluppo",
    difficulty: 'beginner',
    readingTime: '~20 min',
    available: false,
  },
  {
    id: 3,
    slug: '3-typescript-basi',
    title: 'Fondamenti di TypeScript per Phaser 4',
    difficulty: 'beginner',
    readingTime: '~25 min',
    available: false,
  },
  {
    id: 4,
    slug: '4-concetti-core',
    title: 'Concetti Core di Phaser 4',
    difficulty: 'intermediate',
    readingTime: '~25 min',
    available: false,
  },
  {
    id: 5,
    slug: '5-scene-game-loop',
    title: 'Scene e Game Loop',
    difficulty: 'intermediate',
    readingTime: '~30 min',
    available: false,
  },
  {
    id: 6,
    slug: '6-game-objects',
    title: 'GameObjects',
    difficulty: 'intermediate',
    readingTime: '~30 min',
    available: false,
  },
  {
    id: 7,
    slug: '7-fisica-collisioni',
    title: 'Fisica e Collisioni (Arcade Physics)',
    difficulty: 'intermediate',
    readingTime: '~30 min',
    available: false,
  },
  {
    id: 8,
    slug: '8-animazioni-audio',
    title: 'Animazioni, Tweens e Audio',
    difficulty: 'intermediate',
    readingTime: '~25 min',
    available: false,
  },
  {
    id: 9,
    slug: '9-camera-viewport',
    title: 'Camera e Viewport',
    difficulty: 'intermediate',
    readingTime: '~20 min',
    available: false,
  },
  {
    id: 10,
    slug: '10-tilemaps',
    title: 'Tilemaps',
    difficulty: 'advanced',
    readingTime: '~35 min',
    available: false,
  },
  {
    id: 11,
    slug: '11-input',
    title: 'Input Handling',
    difficulty: 'intermediate',
    readingTime: '~25 min',
    available: false,
  },
  {
    id: 12,
    slug: '12-deploy-ottimizzazione',
    title: 'Deploy e Ottimizzazione',
    difficulty: 'advanced',
    readingTime: '~30 min',
    available: false,
  },
]

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug)
}

export function getPrevChapter(slug: string): Chapter | undefined {
  const idx = chapters.findIndex((c) => c.slug === slug)
  return idx > 0 ? chapters[idx - 1] : undefined
}

export function getNextChapter(slug: string): Chapter | undefined {
  const idx = chapters.findIndex((c) => c.slug === slug)
  return idx !== -1 && idx < chapters.length - 1 ? chapters[idx + 1] : undefined
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add data/chapters.ts
git commit -m "feat: add chapters metadata with 12 chapters"
```

---

## Task 4: Create data/quiz/chapter-1.ts

**Files:**
- Create: `site/data/quiz/chapter-1.ts`

- [ ] **Step 1: Create quiz data file**

```ts
// site/data/quiz/chapter-1.ts
export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
}

export const quiz1: QuizQuestion[] = [
  {
    question: 'Qual è il ruolo principale di Node.js nello sviluppo con Phaser 4?',
    options: [
      'Eseguire il gioco direttamente senza browser',
      'Fornire il runtime per gli strumenti di sviluppo, build e gestione pacchetti',
      'Sostituire TypeScript come linguaggio di programmazione',
      'Funzionare come database per i punteggi del gioco',
    ],
    correct: 1,
  },
  {
    question: 'Quale bundler è raccomandato per i progetti Phaser 4?',
    options: [
      'Webpack',
      'Parcel',
      'Vite',
      'Rollup',
    ],
    correct: 2,
  },
  {
    question: 'TypeScript è un superset di quale linguaggio?',
    options: [
      'Python',
      'Java',
      'JavaScript',
      'C#',
    ],
    correct: 2,
  },
  {
    question: 'Quale renderer usa Phaser 4 come principale?',
    options: [
      'Canvas 2D',
      'SVG',
      'DOM',
      'WebGL',
    ],
    correct: 3,
  },
  {
    question: 'Quale servizio Firebase è più utile per gestire una classifica (leaderboard) in un gioco browser?',
    options: [
      'Firebase Authentication',
      'Firebase Hosting',
      'Cloud Firestore',
      'Firebase Storage',
    ],
    correct: 2,
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add data/quiz/chapter-1.ts
git commit -m "feat: add chapter 1 quiz questions"
```

---

## Task 5: Implement useChapterProgress composable (TDD)

**Files:**
- Create: `site/composables/useChapterProgress.ts`
- Create: `site/tests/useChapterProgress.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// site/tests/useChapterProgress.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useChapterProgress } from '~/composables/useChapterProgress'

describe('useChapterProgress', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty progress', () => {
    const { completionPercent } = useChapterProgress()
    expect(completionPercent.value).toBe(0)
  })

  it('marks a chapter as complete', () => {
    const { markComplete, isComplete } = useChapterProgress()
    markComplete('1-introduzione')
    expect(isComplete('1-introduzione')).toBe(true)
  })

  it('does not double-add a completed chapter', () => {
    const { markComplete, completionPercent } = useChapterProgress()
    markComplete('1-introduzione')
    markComplete('1-introduzione')
    expect(completionPercent.value).toBe(8) // 1/12 ≈ 8%
  })

  it('calculates completion percent correctly', () => {
    const { markComplete, completionPercent } = useChapterProgress()
    markComplete('1-introduzione')
    markComplete('2-setup-ambiente')
    expect(completionPercent.value).toBe(17) // 2/12 ≈ 17%
  })

  it('returns false for incomplete chapter', () => {
    const { isComplete } = useChapterProgress()
    expect(isComplete('5-scene-game-loop')).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
pnpm test
```
Expected: 5 tests fail with "Cannot find module '~/composables/useChapterProgress'".

- [ ] **Step 3: Implement the composable**

```ts
// site/composables/useChapterProgress.ts
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useChapterProgress() {
  const TOTAL_CHAPTERS = 12
  const progress = useLocalStorage<string[]>('chapter-progress', [])

  function markComplete(slug: string): void {
    if (!progress.value.includes(slug)) {
      progress.value = [...progress.value, slug]
    }
  }

  function isComplete(slug: string): boolean {
    return progress.value.includes(slug)
  }

  const completionPercent = computed(() =>
    Math.round((progress.value.length / TOTAL_CHAPTERS) * 100),
  )

  return { markComplete, isComplete, completionPercent, progress }
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
pnpm test
```
Expected: 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add composables/useChapterProgress.ts tests/useChapterProgress.test.ts
git commit -m "feat: add useChapterProgress composable with tests"
```

---

## Task 6: Implement useQuizState composable (TDD)

**Files:**
- Create: `site/composables/useQuizState.ts`
- Create: `site/tests/useQuizState.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// site/tests/useQuizState.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useQuizState } from '~/composables/useQuizState'

describe('useQuizState', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null for unsaved chapter', () => {
    const { getScore } = useQuizState()
    expect(getScore('1-introduzione')).toBeNull()
  })

  it('saves and retrieves a score', () => {
    const { saveScore, getScore } = useQuizState()
    saveScore('1-introduzione', 4, 5)
    const result = getScore('1-introduzione')
    expect(result).toEqual({ score: 4, total: 5 })
  })

  it('overwrites previous score', () => {
    const { saveScore, getScore } = useQuizState()
    saveScore('1-introduzione', 3, 5)
    saveScore('1-introduzione', 5, 5)
    expect(getScore('1-introduzione')).toEqual({ score: 5, total: 5 })
  })

  it('saves scores for multiple chapters independently', () => {
    const { saveScore, getScore } = useQuizState()
    saveScore('1-introduzione', 5, 5)
    saveScore('2-setup-ambiente', 3, 5)
    expect(getScore('1-introduzione')).toEqual({ score: 5, total: 5 })
    expect(getScore('2-setup-ambiente')).toEqual({ score: 3, total: 5 })
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
pnpm test
```
Expected: 4 tests fail with "Cannot find module '~/composables/useQuizState'".

- [ ] **Step 3: Implement the composable**

```ts
// site/composables/useQuizState.ts
import { useLocalStorage } from '@vueuse/core'

interface QuizScore {
  score: number
  total: number
}

export function useQuizState() {
  const state = useLocalStorage<Record<string, QuizScore>>('quiz-state', {})

  function saveScore(slug: string, score: number, total: number): void {
    state.value = { ...state.value, [slug]: { score, total } }
  }

  function getScore(slug: string): QuizScore | null {
    return state.value[slug] ?? null
  }

  return { saveScore, getScore, state }
}
```

- [ ] **Step 4: Run all tests — verify they pass**

```bash
pnpm test
```
Expected: 9 tests pass (5 from Task 5 + 4 from Task 6).

- [ ] **Step 5: Commit**

```bash
git add composables/useQuizState.ts tests/useQuizState.test.ts
git commit -m "feat: add useQuizState composable with tests"
```

---

## Task 7: Implement AppNavbar component

**Files:**
- Create: `site/components/AppNavbar.vue`

- [ ] **Step 1: Create AppNavbar.vue**

```vue
<!-- site/components/AppNavbar.vue -->
<template>
  <nav
    class="sticky top-0 z-50 border-b border-white/10"
    style="background-color: rgba(10, 10, 26, 0.95); backdrop-filter: blur(12px);"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="~/assets/images/phaser4-logo.webp"
            alt="Phaser 4"
            class="h-8 w-auto"
          />
        </NuxtLink>

        <!-- Navigation -->
        <div class="flex items-center gap-6">
          <UNavigationMenu :items="navItems" />

          <!-- Theme toggle -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="colorMode.value === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro'"
            @click="toggleColorMode"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { chapters } from '~/data/chapters'

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navItems = [
  {
    label: 'Capitoli',
    to: '/capitoli',
    children: chapters.slice(0, 6).map((c) => ({
      label: `${c.id}. ${c.title}`,
      to: c.available ? `/capitoli/${c.slug}` : undefined,
      disabled: !c.available,
    })),
  },
  {
    label: 'Risorse',
    to: '/risorse',
  },
]
</script>
```

- [ ] **Step 2: Verify in browser**

```bash
pnpm dev
```
Expected: navbar visible at top with logo + navigation items. Theme toggle button present.

- [ ] **Step 3: Commit**

```bash
git add components/AppNavbar.vue
git commit -m "feat: add AppNavbar with logo, navigation menu, and theme toggle"
```

---

## Task 8: Implement AppSidebar component

**Files:**
- Create: `site/components/AppSidebar.vue`

- [ ] **Step 1: Create AppSidebar.vue**

```vue
<!-- site/components/AppSidebar.vue -->
<template>
  <aside
    class="hidden md:flex flex-col w-64 min-h-screen border-r border-white/10 p-4 shrink-0"
    style="background-color: var(--color-surface);"
  >
    <p
      class="text-xs font-bold mb-4 tracking-widest uppercase"
      style="color: var(--color-muted); font-family: 'Orbitron', sans-serif;"
    >
      Capitoli
    </p>

    <nav class="flex-1 space-y-1">
      <NuxtLink
        v-for="chapter in chapters"
        :key="chapter.slug"
        :to="chapter.available ? `/capitoli/${chapter.slug}` : undefined"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
        :class="[
          chapter.available
            ? 'hover:bg-white/5 cursor-pointer'
            : 'opacity-40 cursor-not-allowed',
          isCurrentChapter(chapter.slug)
            ? 'bg-white/10'
            : '',
        ]"
        :style="isCurrentChapter(chapter.slug) ? 'color: var(--color-primary);' : 'color: var(--color-text);'"
      >
        <UIcon
          v-if="isComplete(chapter.slug)"
          name="i-heroicons-check-circle"
          class="w-4 h-4 shrink-0"
          style="color: var(--color-primary);"
        />
        <UIcon
          v-else-if="chapter.available"
          name="i-heroicons-book-open"
          class="w-4 h-4 shrink-0"
          style="color: var(--color-muted);"
        />
        <UIcon
          v-else
          name="i-heroicons-lock-closed"
          class="w-4 h-4 shrink-0"
          style="color: var(--color-muted);"
        />
        <span class="truncate">{{ chapter.id }}. {{ chapter.title }}</span>
      </NuxtLink>
    </nav>

    <!-- Progress -->
    <div class="mt-6 pt-4 border-t border-white/10">
      <div class="flex justify-between text-xs mb-2" style="color: var(--color-muted);">
        <span>Progresso</span>
        <span style="color: var(--color-primary);">{{ completionPercent }}%</span>
      </div>
      <UProgress :value="completionPercent" color="primary" size="sm" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { chapters } from '~/data/chapters'

const route = useRoute()
const { isComplete, completionPercent } = useChapterProgress()

function isCurrentChapter(slug: string): boolean {
  return route.params.slug === slug
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/AppSidebar.vue
git commit -m "feat: add AppSidebar with chapter list and progress bar"
```

---

## Task 9: Implement chapter/ChapterHeader component

**Files:**
- Create: `site/components/chapter/ChapterHeader.vue`

- [ ] **Step 1: Create ChapterHeader.vue**

```vue
<!-- site/components/chapter/ChapterHeader.vue -->
<template>
  <div class="mb-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm mb-4" style="color: var(--color-muted);">
      <NuxtLink to="/" class="hover:underline" style="color: var(--color-muted);">Home</NuxtLink>
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
      <NuxtLink to="/capitoli" class="hover:underline" style="color: var(--color-muted);">Capitoli</NuxtLink>
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
      <span style="color: var(--color-text);">Capitolo {{ chapter }}</span>
    </nav>

    <!-- Chapter number -->
    <p class="text-sm font-bold mb-2" style="color: var(--color-primary); font-family: 'Orbitron', sans-serif; letter-spacing: 0.2em;">
      CAPITOLO {{ chapter }}
    </p>

    <!-- Title -->
    <h1
      class="text-3xl md:text-4xl font-black mb-4 glow-cyan"
      style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
    >
      {{ title }}
    </h1>

    <!-- Meta -->
    <div class="flex flex-wrap items-center gap-3">
      <UBadge :color="difficultyColor" variant="soft" size="md">
        {{ difficultyLabel }}
      </UBadge>
      <div class="flex items-center gap-1 text-sm" style="color: var(--color-muted);">
        <UIcon name="i-heroicons-clock" class="w-4 h-4" />
        <span>{{ readingTime }}</span>
      </div>
    </div>

    <UDivider class="mt-6" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  chapter: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readingTime: string
}>()

const difficultyColor = computed(() => {
  return { beginner: 'success', intermediate: 'warning', advanced: 'error' }[props.difficulty] as 'success' | 'warning' | 'error'
})

const difficultyLabel = computed(() => {
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[props.difficulty]
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/chapter/ChapterHeader.vue
git commit -m "feat: add ChapterHeader with breadcrumb, title, and meta badges"
```

---

## Task 10: Implement chapter/InfoBox component

**Files:**
- Create: `site/components/chapter/InfoBox.vue`

- [ ] **Step 1: Create InfoBox.vue**

This component is used as an MDC component in Markdown via `::InfoBox{type="tip"}` syntax.

```vue
<!-- site/components/chapter/InfoBox.vue -->
<template>
  <div
    class="flex gap-3 p-4 rounded-lg my-4 border-l-4"
    :style="boxStyle"
  >
    <UIcon :name="icon" class="w-5 h-5 mt-0.5 shrink-0" :style="{ color: iconColor }" />
    <div class="text-sm leading-relaxed" style="color: var(--color-text);">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'tip' | 'warning' | 'new' | 'deprecated'
}>()

const config = {
  tip: {
    icon: 'i-heroicons-light-bulb',
    iconColor: '#00D4FF',
    borderColor: '#00D4FF',
    bg: 'rgba(0, 212, 255, 0.05)',
  },
  warning: {
    icon: 'i-heroicons-exclamation-triangle',
    iconColor: '#F59E0B',
    borderColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.05)',
  },
  new: {
    icon: 'i-heroicons-sparkles',
    iconColor: '#E840E0',
    borderColor: '#E840E0',
    bg: 'rgba(232, 64, 224, 0.05)',
  },
  deprecated: {
    icon: 'i-heroicons-x-circle',
    iconColor: '#6B7280',
    borderColor: '#6B7280',
    bg: 'rgba(107, 114, 128, 0.05)',
  },
}

const { icon, iconColor, borderColor, bg } = config[props.type]

const boxStyle = {
  borderLeftColor: borderColor,
  backgroundColor: bg,
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/chapter/InfoBox.vue
git commit -m "feat: add InfoBox MDC component for tip/warning/new/deprecated"
```

---

## Task 11: Implement chapter/Quiz component

**Files:**
- Create: `site/components/chapter/Quiz.vue`

- [ ] **Step 1: Create Quiz.vue**

```vue
<!-- site/components/chapter/Quiz.vue -->
<template>
  <div
    class="mt-12 rounded-xl border border-white/10 overflow-hidden"
    style="background-color: var(--color-surface);"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-white/10 flex items-center gap-3">
      <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" style="color: var(--color-primary);" />
      <h2 class="text-lg font-bold" style="font-family: 'Orbitron', sans-serif; color: var(--color-text);">
        Quiz di Autovalutazione
      </h2>
    </div>

    <!-- Questions -->
    <div class="p-6 space-y-8">
      <div v-for="(q, qi) in questions" :key="qi" class="space-y-3">
        <p class="font-semibold" style="color: var(--color-text);">
          {{ qi + 1 }}. {{ q.question }}
        </p>

        <div class="space-y-2">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="w-full text-left px-4 py-3 rounded-lg border text-sm transition-all"
            :class="optionClass(qi, oi)"
            :disabled="submitted"
            @click="selectAnswer(qi, oi)"
          >
            <div class="flex items-center gap-3">
              <span
                class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0"
                :class="optionLetterClass(qi, oi)"
              >
                {{ String.fromCharCode(65 + oi) }}
              </span>
              <span>{{ opt }}</span>
              <UIcon
                v-if="submitted && oi === q.correct"
                name="i-heroicons-check"
                class="w-4 h-4 ml-auto"
                style="color: #10B981;"
              />
              <UIcon
                v-else-if="submitted && answers[qi] === oi && oi !== q.correct"
                name="i-heroicons-x-mark"
                class="w-4 h-4 ml-auto"
                style="color: #EF4444;"
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-white/10 flex items-center justify-between">
      <div v-if="submitted" class="text-sm" style="color: var(--color-muted);">
        Punteggio:
        <span class="font-bold" :style="{ color: scoreColor }">{{ score }}/{{ questions.length }}</span>
        <span v-if="isPerfect" class="ml-2" style="color: var(--color-primary);">🎉 Perfetto!</span>
      </div>
      <div v-else class="text-sm" style="color: var(--color-muted);">
        {{ answeredCount }}/{{ questions.length }} risposte
      </div>

      <div class="flex gap-3">
        <UButton
          v-if="submitted"
          variant="ghost"
          size="sm"
          color="neutral"
          @click="reset"
        >
          Riprova
        </UButton>
        <UButton
          v-if="!submitted"
          :disabled="answeredCount < questions.length"
          size="sm"
          @click="submit"
        >
          Verifica risposte
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/data/quiz/chapter-1'

const props = defineProps<{
  questions: QuizQuestion[]
  chapterSlug: string
}>()

const { saveScore } = useQuizState()

const answers = ref<Record<number, number>>({})
const submitted = ref(false)

const answeredCount = computed(() => Object.keys(answers.value).length)

const score = computed(() =>
  props.questions.reduce((acc, q, qi) => acc + (answers.value[qi] === q.correct ? 1 : 0), 0),
)

const isPerfect = computed(() => score.value === props.questions.length)

const scoreColor = computed(() => {
  const pct = score.value / props.questions.length
  if (pct >= 0.8) return '#10B981'
  if (pct >= 0.5) return '#F59E0B'
  return '#EF4444'
})

function selectAnswer(qi: number, oi: number) {
  if (!submitted.value) {
    answers.value = { ...answers.value, [qi]: oi }
  }
}

function submit() {
  submitted.value = true
  saveScore(props.chapterSlug, score.value, props.questions.length)
}

function reset() {
  answers.value = {}
  submitted.value = false
}

function optionClass(qi: number, oi: number): Record<string, boolean> {
  const selected = answers.value[qi] === oi
  const correct = props.questions[qi].correct === oi

  if (!submitted.value) {
    return {
      'border-white/20 hover:border-white/40 hover:bg-white/5': !selected,
      'border-phaser-cyan bg-phaser-cyan/10': selected,
      'cursor-pointer': true,
    }
  }

  return {
    'border-green-500/50 bg-green-500/10': correct,
    'border-red-500/50 bg-red-500/10': selected && !correct,
    'border-white/10': !selected && !correct,
    'cursor-not-allowed': true,
  }
}

function optionLetterClass(qi: number, oi: number): Record<string, boolean> {
  const selected = answers.value[qi] === oi
  if (!submitted.value && selected) {
    return { 'border-phaser-cyan text-phaser-cyan': true }
  }
  return { 'border-white/30 text-phaser-muted': true }
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/chapter/Quiz.vue
git commit -m "feat: add Quiz component with answer tracking and score persistence"
```

---

## Task 12: Implement chapter/ChapterNav component

**Files:**
- Create: `site/components/chapter/ChapterNav.vue`

- [ ] **Step 1: Create ChapterNav.vue**

```vue
<!-- site/components/chapter/ChapterNav.vue -->
<template>
  <div class="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
    <!-- Previous -->
    <div class="flex-1">
      <NuxtLink
        v-if="prev"
        :to="prev.available ? `/capitoli/${prev.slug}` : ''"
        class="flex flex-col gap-1 group"
        :class="{ 'pointer-events-none opacity-40': !prev.available }"
      >
        <span class="text-xs" style="color: var(--color-muted);">← Precedente</span>
        <span
          class="text-sm font-semibold group-hover:underline"
          style="color: var(--color-text);"
        >
          {{ prev.title }}
        </span>
      </NuxtLink>
    </div>

    <!-- Mark complete + Next -->
    <div class="flex-1 flex flex-col items-end gap-3">
      <UButton
        v-if="!isCompleted"
        size="sm"
        variant="soft"
        color="primary"
        leading-icon="i-heroicons-check"
        @click="markCurrentComplete"
      >
        Segna come completato
      </UButton>
      <div v-else class="flex items-center gap-2 text-sm" style="color: #10B981;">
        <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
        Completato
      </div>

      <NuxtLink
        v-if="next"
        :to="next.available ? `/capitoli/${next.slug}` : ''"
        class="flex flex-col items-end gap-1 group"
        :class="{ 'pointer-events-none opacity-40': !next.available }"
      >
        <span class="text-xs" style="color: var(--color-muted);">Successivo →</span>
        <span
          class="text-sm font-semibold group-hover:underline"
          style="color: var(--color-text);"
        >
          {{ next.title }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPrevChapter, getNextChapter } from '~/data/chapters'

const props = defineProps<{
  currentSlug: string
}>()

const { markComplete, isComplete } = useChapterProgress()

const prev = computed(() => getPrevChapter(props.currentSlug))
const next = computed(() => getNextChapter(props.currentSlug))
const isCompleted = computed(() => isComplete(props.currentSlug))

function markCurrentComplete() {
  markComplete(props.currentSlug)
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/chapter/ChapterNav.vue
git commit -m "feat: add ChapterNav with prev/next links and chapter completion"
```

---

## Task 13: Implement pages/index.vue (Homepage)

**Files:**
- Create: `site/pages/index.vue`

- [ ] **Step 1: Create pages/index.vue**

```vue
<!-- site/pages/index.vue -->
<template>
  <div>
    <!-- Hero -->
    <section
      class="relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden"
      style="background: radial-gradient(ellipse at top, rgba(108, 63, 232, 0.15) 0%, transparent 60%), var(--color-bg);"
    >
      <img
        src="~/assets/images/phaser4-logo.webp"
        alt="Phaser 4"
        class="h-24 w-auto mb-8"
      />
      <h1
        class="text-4xl md:text-6xl font-black mb-4 glow-cyan"
        style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
      >
        Impara Phaser 4
      </h1>
      <p class="text-xl md:text-2xl mb-2" style="color: var(--color-primary);">
        da zero
      </p>
      <p class="max-w-xl mx-auto mb-10 text-base" style="color: var(--color-muted);">
        Un corso italiano completo per creare videogiochi browser con Phaser.js v4 e TypeScript.
        12 capitoli, esempi pratici e quiz di autovalutazione.
      </p>
      <NuxtLink to="/capitoli/1-introduzione">
        <UButton size="xl" color="primary">
          Inizia il Corso
        </UButton>
      </NuxtLink>
    </section>

    <!-- Chapter grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2
        class="text-2xl font-bold mb-8 text-center"
        style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
      >
        Contenuto del Corso
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="chapter in chapters"
          :key="chapter.slug"
          :to="chapter.available ? `/capitoli/${chapter.slug}` : undefined"
          :class="['block', chapter.available ? 'hover:scale-[1.02] transition-transform' : 'cursor-default']"
        >
          <UCard
            class="h-full"
            :style="{
              backgroundColor: 'var(--color-surface)',
              borderColor: chapter.available ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)',
              opacity: chapter.available ? 1 : 0.6,
            }"
          >
            <div class="flex items-start justify-between mb-3">
              <span
                class="text-xs font-bold"
                style="font-family: 'Orbitron', sans-serif; color: var(--color-muted); letter-spacing: 0.15em;"
              >
                CAP. {{ String(chapter.id).padStart(2, '0') }}
              </span>
              <UBadge
                v-if="!chapter.available"
                color="neutral"
                variant="soft"
                size="xs"
              >
                Prossimamente
              </UBadge>
              <UBadge
                v-else
                :color="difficultyColor(chapter.difficulty)"
                variant="soft"
                size="xs"
              >
                {{ difficultyLabel(chapter.difficulty) }}
              </UBadge>
            </div>

            <h3
              class="font-bold mb-2"
              style="color: var(--color-text);"
            >
              {{ chapter.title }}
            </h3>

            <div class="flex items-center gap-1 text-xs" style="color: var(--color-muted);">
              <UIcon name="i-heroicons-clock" class="w-3 h-3" />
              {{ chapter.readingTime }}
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </section>

    <!-- Tech stack badges -->
    <section
      class="border-t border-white/10 py-12"
      style="background-color: var(--color-surface);"
    >
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm mb-6" style="color: var(--color-muted); font-family: 'Orbitron', sans-serif; letter-spacing: 0.15em;">
          STACK TECNOLOGICO
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <UBadge v-for="tech in techStack" :key="tech" color="primary" variant="outline" size="lg">
            {{ tech }}
          </UBadge>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { chapters } from '~/data/chapters'

useSeoMeta({
  title: 'Phaser 4 Game Dev — Corso Italiano',
  description: 'Impara a creare videogiochi browser con Phaser.js v4 e TypeScript. Corso in italiano con 12 capitoli, esempi pratici e quiz.',
  ogTitle: 'Phaser 4 Game Dev — Corso Italiano',
  ogDescription: 'Corso italiano completo per imparare Phaser.js v4 da zero.',
})

const techStack = ['Phaser 4', 'TypeScript', 'Vite', 'Node.js', 'Firebase']

function difficultyColor(d: string) {
  return { beginner: 'success', intermediate: 'warning', advanced: 'error' }[d] as 'success' | 'warning' | 'error'
}

function difficultyLabel(d: string) {
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[d]
}
</script>
```

- [ ] **Step 2: Verify in browser**

```bash
pnpm dev
```
Navigate to `http://localhost:3000`. Expected: hero with logo, chapter grid with 12 cards (chapter 1 clickable), tech stack badges at bottom.

- [ ] **Step 3: Commit**

```bash
git add pages/index.vue
git commit -m "feat: add homepage with hero and chapter grid"
```

---

## Task 14: Implement pages/capitoli/index.vue

**Files:**
- Create: `site/pages/capitoli/index.vue`

- [ ] **Step 1: Create pages/capitoli/index.vue**

```vue
<!-- site/pages/capitoli/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1
      class="text-3xl font-black mb-2"
      style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
    >
      Tutti i Capitoli
    </h1>
    <p class="mb-8" style="color: var(--color-muted);">
      {{ availableCount }} capitoli disponibili su {{ chapters.length }} totali.
    </p>

    <!-- Filter -->
    <div class="flex gap-2 mb-8">
      <UButton
        v-for="f in filters"
        :key="f.value"
        :variant="activeFilter === f.value ? 'solid' : 'ghost'"
        color="primary"
        size="sm"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
      </UButton>
    </div>

    <!-- List -->
    <div class="space-y-3">
      <NuxtLink
        v-for="chapter in filteredChapters"
        :key="chapter.slug"
        :to="chapter.available ? `/capitoli/${chapter.slug}` : undefined"
        :class="['block', chapter.available ? '' : 'cursor-default']"
      >
        <div
          class="flex items-center gap-4 px-5 py-4 rounded-xl border transition-colors"
          :style="{
            backgroundColor: 'var(--color-surface)',
            borderColor: chapter.available ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
          }"
          :class="{ 'hover:border-phaser-cyan/40': chapter.available }"
        >
          <span
            class="text-sm font-bold w-8 shrink-0"
            style="font-family: 'Orbitron', sans-serif; color: var(--color-muted);"
          >
            {{ String(chapter.id).padStart(2, '0') }}
          </span>

          <UIcon
            v-if="isComplete(chapter.slug)"
            name="i-heroicons-check-circle"
            class="w-5 h-5 shrink-0"
            style="color: var(--color-primary);"
          />
          <UIcon
            v-else-if="!chapter.available"
            name="i-heroicons-lock-closed"
            class="w-5 h-5 shrink-0"
            style="color: var(--color-muted);"
          />
          <UIcon
            v-else
            name="i-heroicons-book-open"
            class="w-5 h-5 shrink-0"
            style="color: var(--color-muted);"
          />

          <div class="flex-1 min-w-0">
            <p class="font-semibold" :style="{ color: chapter.available ? 'var(--color-text)' : 'var(--color-muted)' }">
              {{ chapter.title }}
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="text-xs" style="color: var(--color-muted);">{{ chapter.readingTime }}</span>
            <UBadge
              v-if="chapter.available"
              :color="difficultyColor(chapter.difficulty)"
              variant="soft"
              size="xs"
            >
              {{ difficultyLabel(chapter.difficulty) }}
            </UBadge>
            <UBadge v-else color="neutral" variant="soft" size="xs">
              Prossimamente
            </UBadge>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chapters } from '~/data/chapters'

const { isComplete } = useChapterProgress()

const activeFilter = ref('all')

const filters = [
  { label: 'Tutti', value: 'all' },
  { label: 'Principiante', value: 'beginner' },
  { label: 'Intermedio', value: 'intermediate' },
  { label: 'Avanzato', value: 'advanced' },
]

const availableCount = computed(() => chapters.filter((c) => c.available).length)

const filteredChapters = computed(() =>
  activeFilter.value === 'all'
    ? chapters
    : chapters.filter((c) => c.difficulty === activeFilter.value),
)

function difficultyColor(d: string) {
  return { beginner: 'success', intermediate: 'warning', advanced: 'error' }[d] as 'success' | 'warning' | 'error'
}

function difficultyLabel(d: string) {
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[d]
}

useSeoMeta({
  title: 'Capitoli — Phaser 4 Game Dev',
  description: 'Tutti i capitoli del corso Phaser 4 Game Dev in italiano.',
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add pages/capitoli/index.vue
git commit -m "feat: add chapter listing page with difficulty filter"
```

---

## Task 15: Implement pages/capitoli/[slug].vue

**Files:**
- Create: `site/pages/capitoli/[slug].vue`

- [ ] **Step 1: Create the dynamic chapter page**

```vue
<!-- site/pages/capitoli/[slug].vue -->
<template>
  <div class="flex">
    <AppSidebar />

    <main class="flex-1 min-w-0 max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <!-- Not available -->
      <div
        v-if="!chapterMeta?.available"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <UIcon name="i-heroicons-lock-closed" class="w-16 h-16 mb-6" style="color: var(--color-muted);" />
        <h1
          class="text-2xl font-bold mb-3"
          style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
        >
          {{ chapterMeta?.title ?? 'Capitolo' }}
        </h1>
        <p class="mb-6" style="color: var(--color-muted);">
          Questo capitolo è in preparazione. Torna presto!
        </p>
        <UButton to="/capitoli" variant="ghost" color="primary">
          ← Torna ai capitoli
        </UButton>
      </div>

      <!-- Chapter content -->
      <template v-else-if="chapter">
        <ChapterHeader
          :title="chapter.title"
          :chapter="chapter.chapter"
          :difficulty="chapter.difficulty"
          :reading-time="chapter.readingTime"
        />

        <div class="chapter-content">
          <ContentRenderer :value="chapter" />
        </div>

        <Quiz
          v-if="quiz"
          :questions="quiz"
          :chapter-slug="slug"
        />

        <ChapterNav :current-slug="slug" />
      </template>

      <!-- Loading / 404 -->
      <div v-else class="py-24 text-center" style="color: var(--color-muted);">
        Capitolo non trovato.
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getChapterBySlug } from '~/data/chapters'
import { quiz1 } from '~/data/quiz/chapter-1'
import type { QuizQuestion } from '~/data/quiz/chapter-1'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const chapterMeta = computed(() => getChapterBySlug(slug.value))

const { data: chapter } = await useAsyncData(
  () => `chapter-${slug.value}`,
  () => queryCollection('chapters').where('slug', slug.value).first(),
)

const quizMap: Record<string, QuizQuestion[]> = {
  '1-introduzione': quiz1,
}

const quiz = computed(() => quizMap[slug.value] ?? null)

useSeoMeta({
  title: () => `${chapterMeta.value?.title ?? 'Capitolo'} — Phaser 4 Game Dev`,
  description: () => `Capitolo ${chapterMeta.value?.id}: ${chapterMeta.value?.title}. Corso Phaser 4 in italiano.`,
})
</script>
```

- [ ] **Step 2: Verify chapter page renders**

```bash
pnpm dev
```
Navigate to `http://localhost:3000/capitoli/1-introduzione`. Expected: page shows "Capitolo non trovato" or ChapterHeader (content file doesn't exist yet — that's normal). Navigate to `/capitoli/2-setup-ambiente` — expected: "Prossimamente" placeholder.

- [ ] **Step 3: Commit**

```bash
git add pages/capitoli/[slug].vue
git commit -m "feat: add dynamic chapter page with content renderer and quiz"
```

---

## Task 16: Write content/chapters/1-introduzione.md

**Files:**
- Create: `site/content/chapters/1-introduzione.md`

- [ ] **Step 1: Create the chapter 1 Markdown file**

```markdown
---
title: 'Introduzione alle Tecnologie'
slug: '1-introduzione'
chapter: 1
difficulty: beginner
readingTime: '~20 min'
---

In questo primo capitolo daremo un rapido sguardo alle tecnologie che ci aiuteranno nel realizzare giochi browser con **Phaser 4**. Conoscere, anche superficialmente, gli strumenti che utilizzeremo è fondamentale per muoversi con sicurezza durante lo sviluppo.

## Node.js

Node.js è un runtime JavaScript basato sul motore **V8 di Google Chrome**, che permette di eseguire JavaScript al di fuori del browser. Anche se i nostri giochi gireranno nel browser, Node.js è indispensabile durante lo **sviluppo**: fornisce l'ambiente su cui girano gli strumenti di build, il server di sviluppo locale e il gestore di pacchetti.

Per sviluppare con Phaser 4 è necessario avere **Node.js versione 20 o superiore** installato sul proprio computer.

::InfoBox{type="tip"}
Scarica Node.js da [nodejs.org](https://nodejs.org/). Scegli la versione **LTS** (Long Term Support) per la massima stabilità. Al momento della scrittura di questo capitolo, la versione LTS consigliata è la 22.x.
::

Per verificare l'installazione, apri un terminale e digita:

```bash
node --version   # deve mostrare v20.x.x o superiore
npm --version    # incluso con Node.js
```

"Node.js ci fornisce l'infrastruttura di base sulla quale sviluppare il nostro gioco."

## NPM e pnpm

**NPM** (Node Package Manager) è il gestore di pacchetti ufficiale di Node.js. Ti permette di installare librerie esterne — come Phaser stesso — con un singolo comando, senza dover scaricare e configurare manualmente ogni dipendenza.

In questo corso utilizziamo **pnpm**, una versione più veloce ed efficiente di npm che condivide i pacchetti tra i progetti, riducendo lo spazio su disco e i tempi di installazione in modo significativo.

```bash
# Installa pnpm globalmente
npm install -g pnpm

# Comandi principali
pnpm install          # installa le dipendenze elencate nel package.json
pnpm add phaser       # aggiunge Phaser come dipendenza del progetto
pnpm add -D vitest    # aggiunge Vitest come dipendenza di sviluppo
pnpm run dev          # avvia il server di sviluppo (script "dev" nel package.json)
pnpm run build        # crea il bundle di produzione (script "build")
```

"NPM e pnpm ci forniscono tutte le librerie che ci aiuteranno nello sviluppo."

## Webpack e Vite

I nostri giochi sono composti da decine di file TypeScript, immagini, audio e configurazioni. Un **bundler** prende tutti questi file sorgente e li combina in un pacchetto ottimizzato che il browser può caricare efficacemente.

**Webpack** è stato per anni lo standard del settore. Potente e configurabile, è ancora molto diffuso. Il materiale originale di questo corso (basato su Phaser 3) lo utilizzava come bundler principale.

**Vite** è il bundler moderno raccomandato per **Phaser 4**. Usa i moduli ES nativi del browser durante lo sviluppo — il che significa che non crea nessun bundle durante il dev! Il risultato:

- Server di sviluppo che si avvia in **meno di un secondo**
- Aggiornamenti **istantanei** nel browser ad ogni modifica (Hot Module Replacement)
- Build di produzione ottimizzata tramite Rollup

::InfoBox{type="new"}
Phaser 4 è progettato per funzionare con Vite out-of-the-box. Tutti i template ufficiali Phaser 4 usano Vite come bundler predefinito.
::

```bash
# Crea un nuovo progetto Vite con TypeScript
pnpm create vite nome-gioco --template vanilla-ts
cd nome-gioco
pnpm install
pnpm dev    # avvia il server su http://localhost:5173
```

## TypeScript

**TypeScript** è un linguaggio di programmazione open source sviluppato da **Microsoft**. È un **superset** di JavaScript: tutto il codice JavaScript valido è anche TypeScript valido, ma TypeScript aggiunge la **tipizzazione statica** opzionale.

Perché usarlo con Phaser 4?

- **Autocompletamento intelligente**: il tuo editor suggerisce automaticamente i metodi disponibili sull'oggetto giusto
- **Errori a compile time**: scopri i bug prima ancora di avviare il gioco
- **Codice più leggibile**: i tipi documentano le intenzioni del codice, rendendo i progetti più facili da mantenere
- **Phaser 4 è scritto in TypeScript**: le definizioni dei tipi sono incluse nella libreria senza installare pacchetti aggiuntivi

```typescript
// JavaScript: non è chiaro cosa siano x, y e vita
function spawnNemico(x, y, vita) {
  // ...
}

// TypeScript: tutto è esplicito e verificato
function spawnNemico(x: number, y: number, vita: number): void {
  // ...
}

// TypeScript cattura errori come questo prima dell'esecuzione
spawnNemico(100, 200, 'molto')  // ❌ Errore: 'molto' non è un number
spawnNemico(100, 200, 100)      // ✅ Corretto
```

Un file `tsconfig.json` minimale per Phaser 4 con Vite:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

"TypeScript è il nostro linguaggio di programmazione."

## Firebase

**Firebase** è una piattaforma **serverless** sviluppata da Google per applicazioni web e mobile. "Serverless" significa che non è necessario gestire un server: Firebase si occupa di tutta l'infrastruttura backend.

Nei giochi browser, Firebase è particolarmente utile per:

| Servizio | Utilizzo nei giochi |
|---|---|
| **Cloud Firestore** | Leaderboard in tempo reale, salvataggi cloud |
| **Authentication** | Login anonimo, con Google o email |
| **Storage** | Upload di screenshot o file di gioco |
| **Hosting** | Deploy del gioco su CDN globale con SSL |

```bash
# Installa Firebase nel progetto
pnpm add firebase

# Nel codice del gioco
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const app = initializeApp({ /* tua configurazione */ })
const db = getFirestore(app)

// Salva un punteggio nella leaderboard
await addDoc(collection(db, 'leaderboard'), {
  nome: 'Mario',
  punteggio: 1500,
  data: new Date()
})
```

::InfoBox{type="tip"}
Firebase non è obbligatorio per iniziare a sviluppare con Phaser 4. Puoi tranquillamente costruire giochi completi senza backend. Aggiungi Firebase solo quando hai bisogno di funzionalità online.
::

## PhaserJS v4

**Phaser** è il framework open source più popolare per la creazione di videogiochi 2D che girano direttamente nel browser. Gratuito, veloce, supporta sia JavaScript che TypeScript.

Phaser 4 rappresenta una **riscrittura significativa** rispetto a Phaser 3. Le principali novità:

- **Renderer WebGL unificato**: Phaser 4 usa WebGL come renderer principale, con performance nettamente superiori a Phaser 3
- **TypeScript-first**: il codice sorgente di Phaser 4 è scritto interamente in TypeScript
- **API semplificata**: molti concetti ridisegnati e semplificati rispetto alla v3
- **Bundle più piccolo**: architettura modulare, importi solo ciò che usi
- **Migliori performance**: object pooling migliorato, batch rendering ottimizzato

::InfoBox{type="warning"}
Phaser 4 **non è retrocompatibile** con Phaser 3. Se hai esperienza con Phaser 3, molte API sono cambiate. Questo corso insegna Phaser 4 from scratch — non assumiamo conoscenza pregressa di Phaser 3.
::

```bash
# Installa Phaser 4 nel tuo progetto
pnpm add phaser@^4
```

Risorse ufficiali:
- Documentazione: [phaser.io](https://phaser.io)
- Repository: [github.com/phaserjs/phaser](https://github.com/phaserjs/phaser)

"PhaserJS è la libreria per lo sviluppo di videogiochi che utilizzeremo."

## Visual Studio Code

**Visual Studio Code** (VS Code) è l'editor di codice consigliato per sviluppare con Phaser 4 e TypeScript. Gratuito, open source, disponibile per Windows, macOS e Linux.

Estensioni consigliate per lo sviluppo Phaser 4 + TypeScript:

| Estensione | Funzione |
|---|---|
| **ESLint** | Analisi statica del codice TypeScript |
| **Prettier** | Formattazione automatica del codice |
| **Error Lens** | Visualizza errori TypeScript direttamente inline |
| **vscode-icons** | Icone intuitive per i tipi di file |
| **GitLens** | Strumenti Git avanzati integrati |

```bash
# Apri VS Code nella cartella del progetto
code .
```

::InfoBox{type="tip"}
Abilita "Format on Save" in VS Code (impostazione `editor.formatOnSave: true`) per avere il codice sempre formattato automaticamente quando salvi un file.
::

Sei pronto per iniziare! Nel prossimo capitolo configureremo l'ambiente di sviluppo completo e creeremo il nostro primo progetto Phaser 4.
```

- [ ] **Step 2: Verify chapter renders in browser**

```bash
pnpm dev
```
Navigate to `http://localhost:3000/capitoli/1-introduzione`. Expected: full chapter renders with ChapterHeader showing "Capitolo 1 — Introduzione alle Tecnologie", all 7 sections visible, InfoBox components styled correctly.

- [ ] **Step 3: Verify quiz appears and works**

Scroll to bottom of chapter page. Expected: Quiz section shows 5 questions. Select answers and click "Verifica risposte" — expected: correct answers highlighted green, wrong ones red, score shown.

- [ ] **Step 4: Commit**

```bash
git add content/chapters/1-introduzione.md
git commit -m "feat: add chapter 1 content - introduzione alle tecnologie"
```

---

## Task 17: Final build verification

- [ ] **Step 1: Run all tests**

```bash
pnpm test
```
Expected: 9 tests pass (5 useChapterProgress + 4 useQuizState). No failures.

- [ ] **Step 2: TypeScript check**

```bash
pnpm exec tsc --noEmit
```
Expected: no TypeScript errors.

- [ ] **Step 3: Run production build**

```bash
pnpm generate
```
Expected: build completes without errors. Output in `.output/public/`.

- [ ] **Step 4: Preview production build**

```bash
pnpm preview
```
Navigate to `http://localhost:3000`. Expected:
- Homepage renders with logo, hero, chapter grid
- `/capitoli` shows chapter list with filter buttons
- `/capitoli/1-introduzione` shows full chapter with content, InfoBoxes, Quiz, ChapterNav
- `/capitoli/2-setup-ambiente` shows "Prossimamente" placeholder
- Sidebar shows chapter list with progress bar
- Navbar theme toggle works
- Quiz: answering questions + submit shows score + persists in localStorage on page reload

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Phaser 4 doc prototype - chapter 1 fully functional"
```
