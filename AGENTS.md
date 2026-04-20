# AGENTS.md

> AI agent instructions for the **Phaser 4 Game Dev** learning website. For full spec, see [prompt.md](prompt.md).

## Quick Start

```bash
cd site
pnpm install
pnpm dev       # Dev server at localhost:3000
pnpm test      # Run Vitest tests
pnpm build     # SSG production build
```

## Content Language

**All user-facing text must be in Italian.** This includes:
- Chapter content, UI labels, error messages
- Quiz questions and answers
- Component prop values for user-visible text

## Architecture At a Glance

| What | Where |
|------|-------|
| Pages | `site/app/pages/` |
| Components | `site/app/components/` |
| Composables | `site/app/composables/` |
| Chapter content | `site/content/chapters/*.md` |
| Quiz data | `site/app/data/quiz/chapter-N.ts` |
| Chapter metadata | `site/app/data/chapters.ts` |
| Styles | `site/app/assets/css/app.css` |

## Key Patterns

### Adding a New Chapter

1. **Create markdown** at `site/content/chapters/{N}-{slug}.md`:
   ```yaml
   ---
   title: "Titolo in Italiano"
   slug: "N-slug"
   chapter: N
   difficulty: "beginner" | "intermediate" | "advanced"
   readingTime: "~20 min"
   ---
   ```

2. **Add metadata** to `site/app/data/chapters.ts` → `chapters` array

3. **Create quiz** at `site/app/data/quiz/chapter-N.ts`:
   ```typescript
   import type { QuizQuestion } from './chapter-1'
   
   export const quizN: QuizQuestion[] = [
     { question: "...", options: ["A", "B", "C", "D"], correct: 0 }
   ]
   ```

4. **Register quiz** in `site/app/pages/capitoli/[slug].vue`:
   ```typescript
   const quizMap: Record<string, QuizQuestion[]> = {
     // ... existing
     'N-slug': quizN,  // ← Add this line
   }
   ```

### InfoBox in Markdown

Use MDC syntax for callouts:
```markdown
::InfoBox{type="tip"}
Content here (Italian)
::
```

Types: `tip`, `warning`, `new`, `deprecated`

### Components

- Use Nuxt UI components (`UButton`, `UCard`, `UBadge`, etc.)
- Icons: Heroicons via `i-heroicons-*` prefix
- No scoped CSS — use CSS variables from `app.css`
- TypeScript strict: `defineProps<T>()`, no `any`

### State Management

No Pinia. Use composables with `useLocalStorage`:
- `useChapterProgress()` → chapter completion
- `useQuizState()` → quiz scores

Both assume **12 chapters** (hardcoded divisor).

## Testing

- Framework: Vitest
- Location: `site/tests/`
- Run: `pnpm test`
- Pattern: `describe()` / `it()` / `expect()`
- Always clear localStorage in `beforeEach()`

## Visual Identity

| Token | Value |
|-------|-------|
| Background | `#0A0A1A` |
| Surface | `#111128` |
| Primary (cyan) | `#00D4FF` |
| Accent (violet) | `#6C3FE8` |
| Accent2 (magenta) | `#E840E0` |
| Text | `#F0F0FF` |

Dark theme default. See [prompt.md](prompt.md) for fonts.

## Skills & Agents

| Resource | Purpose |
|----------|---------|
| [.github/skills/new-chapter/SKILL.md](.github/skills/new-chapter/SKILL.md) | 4-step chapter creation workflow with checklist |
| [.github/agents/content-writer.md](.github/agents/content-writer.md) | Generates Italian chapter content matching established style |
