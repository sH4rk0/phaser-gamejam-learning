// site/content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const chapterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  chapter: z.number(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  readingTime: z.string(),
})

export default defineContentConfig({
  collections: {
    chapters_it: defineCollection({
      source: 'chapters/it/*.md',
      type: 'page',
      schema: chapterSchema,
    }),
    chapters_en: defineCollection({
      source: 'chapters/en/*.md',
      type: 'page',
      schema: chapterSchema,
    }),
  },
})
