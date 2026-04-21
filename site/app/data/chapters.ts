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
    slug: '2-il-template',
    title: 'Il Template',
    difficulty: 'beginner',
    readingTime: '~25 min',
    available: true,
  },
  {
    id: 3,
    slug: '3-typescript-basi',
    title: 'Basi di TypeScript',
    difficulty: 'beginner',
    readingTime: '~30 min',
    available: true,
  },
  {
    id: 4,
    slug: '4-configurazione-gioco',
    title: 'Configuriamo il Nostro Gioco',
    difficulty: 'intermediate',
    readingTime: '~30 min',
    available: true,
  },
  {
    id: 5.1,
    slug: '5-1-gameobjects-intro',
    title: 'Introduzione ai GameObjects',
    difficulty: 'intermediate',
    readingTime: '~20 min',
    available: true,
  },
  {
    id: 5.2,
    slug: '5-2-text',
    title: 'Text',
    difficulty: 'intermediate',
    readingTime: '~5 min',
    available: true,
  },
  {
    id: 5.3,
    slug: '5-3-image',
    title: 'Image',
    difficulty: 'intermediate',
    readingTime: '~5 min',
    available: true,
  },
  {
    id: 5.4,
    slug: '5-4-sprite',
    title: 'Sprite',
    difficulty: 'intermediate',
    readingTime: '~10 min',
    available: true,
  },
  {
    id: 5.5,
    slug: '5-5-tilesprite',
    title: 'TileSprite',
    difficulty: 'intermediate',
    readingTime: '~8 min',
    available: true,
  },
  {
    id: 5.6,
    slug: '5-6-group',
    title: 'Group',
    difficulty: 'intermediate',
    readingTime: '~10 min',
    available: true,
  },
  {
    id: 5.7,
    slug: '5-7-container',
    title: 'Container',
    difficulty: 'intermediate',
    readingTime: '~12 min',
    available: true,
  },
  {
    id: 6.1,
    slug: '6-1-animazioni',
    title: 'Animazioni con Tween',
    difficulty: 'intermediate',
    readingTime: '~12 min',
    available: true,
  },
  {
    id: 6.2,
    slug: '6-2-audio',
    title: 'Audio',
    difficulty: 'intermediate',
    readingTime: '~12 min',
    available: true,
  },
  {
    id: 6.3,
    slug: '6-3-tempo',
    title: 'Tempo e Timer',
    difficulty: 'intermediate',
    readingTime: '~12 min',
    available: true,
  },
  {
    id: 7,
    slug: '7-camera',
    title: 'Camera e Viewport',
    difficulty: 'intermediate',
    readingTime: '~30 min',
    available: true,
  }
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
