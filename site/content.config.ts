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
