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
    id: 5,
    slug: '5-gameobjects',
    title: 'GameObjects',
    difficulty: 'intermediate',
    readingTime: '~35 min',
    available: true,
  },
  {
    id: 6,
    slug: '6-animazioni-audio-tempo',
    title: 'Animazioni, Tweens e Audio',
    difficulty: 'intermediate',
    readingTime: '~35 min',
    available: true,
  },
  {
    id: 7,
    slug: '7-camera',
    title: 'Camera e Viewport',
    difficulty: 'intermediate',
    readingTime: '~30 min',
    available: true,
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
