---
name: new-chapter
description: Automates the 4-step workflow for adding new chapters to the Phaser 4 Game Dev course. Use when creating chapter 2-12 content or adding new chapters.
---

# New Chapter Skill

Automates the complete workflow for adding a new chapter to the Phaser 4 learning site.

## When to Use

- Creating chapters 2-12 (currently placeholders)
- Adding bonus chapters beyond the original 12
- User asks to "add a chapter", "create chapter N", or "write the next chapter"

## Chapter Creation Checklist

Copy and track progress when creating a new chapter:

```
Chapter: [N] - [slug]
Progress:
- [ ] 1. Create markdown content
- [ ] 2. Add chapter metadata  
- [ ] 3. Create quiz questions
- [ ] 4. Register quiz in page
- [ ] 5. Run tests
```

## Step 1: Create Markdown Content

Create file at `site/content/chapters/{N}-{slug}.md`:

```yaml
---
title: "Titolo in Italiano"
slug: "{N}-{slug}"
chapter: {N}
difficulty: "beginner" | "intermediate" | "advanced"
readingTime: "~{X} min"
---
```

### Content Guidelines

- **Language**: All content in Italian
- **Structure**: Start with intro paragraph, use `##` for sections
- **Code blocks**: Use language hints (`typescript`, `bash`, `json`)
- **InfoBox**: Use MDC syntax for callouts

```markdown
::InfoBox{type="tip"}
Contenuto del suggerimento in italiano.
::
```

InfoBox types:
| Type | Icon | Use for |
|------|------|---------|
| `tip` | 💡 Cyan | Helpful hints, best practices |
| `warning` | ⚠️ Amber | Gotchas, common mistakes |
| `new` | ✨ Magenta | Phaser 4 new features |
| `deprecated` | ❌ Gray | Phaser 3 patterns to avoid |

### Content Style (from Chapter 1)

- Conversational but technical tone
- Tables for comparisons and feature lists
- Code examples with inline comments
- Links to official documentation
- End with transition to next chapter

## Step 2: Add Chapter Metadata

Edit `site/app/data/chapters.ts`:

```typescript
// Add to chapters array
{
  id: N,
  slug: 'N-slug',
  title: 'Titolo Capitolo',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  readingTime: '~X min',
  available: true  // Set to true when content is ready
}
```

## Step 3: Create Quiz Questions

Create `site/app/data/quiz/chapter-{N}.ts`:

```typescript
import type { QuizQuestion } from './chapter-1'

export const quizN: QuizQuestion[] = [
  {
    question: "Domanda in italiano?",
    options: [
      "Opzione A",
      "Opzione B", 
      "Opzione C",
      "Opzione D"
    ],
    correct: 0  // Index of correct answer (0-3)
  },
  // Add 4-5 questions per chapter
]
```

### Quiz Guidelines

- 4-5 questions per chapter
- Questions test key concepts from the chapter
- Include code snippets in questions when relevant
- Randomize correct answer positions (not always 0)
- All text in Italian

## Step 4: Register Quiz in Page

Edit `site/app/pages/capitoli/[slug].vue`:

```typescript
// Add import at top
import { quizN } from '~/data/quiz/chapter-N'

// Add to quizMap object
const quizMap: Record<string, QuizQuestion[]> = {
  // ... existing entries
  'N-slug': quizN,
}
```

## Step 5: Verify

```bash
cd site
pnpm test           # Run tests
pnpm dev            # Check in browser at /capitoli/N-slug
```

## Chapter Reference

| # | Slug | Title | Difficulty |
|---|------|-------|------------|
| 1 | `1-introduzione` | Introduzione alle Tecnologie | beginner |
| 2 | `2-setup` | Setup dell'Ambiente di Sviluppo | beginner |
| 3 | `3-typescript` | Fondamenti di TypeScript per Phaser 4 | beginner |
| 4 | `4-concetti-core` | Concetti Core di Phaser 4 | intermediate |
| 5 | `5-scene-gameloop` | Scene e Game Loop | intermediate |
| 6 | `6-gameobjects` | GameObjects | intermediate |
| 7 | `7-fisica` | Fisica e Collisioni (Arcade Physics) | intermediate |
| 8 | `8-animazioni-audio` | Animazioni, Tweens e Audio | intermediate |
| 9 | `9-camera` | Camera e Viewport | intermediate |
| 10 | `10-tilemaps` | Tilemaps | advanced |
| 11 | `11-input` | Input Handling | intermediate |
| 12 | `12-deploy` | Deploy e Ottimizzazione | advanced |

## Important Notes

- The composables assume exactly **12 chapters** for progress calculation
- If adding chapters beyond 12, update the divisor in `useChapterProgress.ts`
- Always set `available: true` only when chapter content is complete
