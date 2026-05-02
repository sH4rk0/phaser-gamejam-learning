export interface Chapter {
  id: number
  slug: string
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readingTime: string
  available: boolean
}

const chapters_it: Chapter[] = [
  { id: 1, slug: '1-introduzione', title: 'Introduzione alle Tecnologie', difficulty: 'beginner', readingTime: '~20 min', available: true },
  { id: 2, slug: '2-il-template', title: 'Il Template', difficulty: 'beginner', readingTime: '~25 min', available: true },
  { id: 3, slug: '3-typescript-basi', title: 'Basi di TypeScript', difficulty: 'beginner', readingTime: '~30 min', available: true },
  { id: 4, slug: '4-configurazione-gioco', title: 'Configuriamo il Nostro Gioco', difficulty: 'intermediate', readingTime: '~30 min', available: true },
  { id: 5.1, slug: '5-1-gameobjects-intro', title: 'Introduzione ai GameObjects', difficulty: 'intermediate', readingTime: '~20 min', available: true },
  { id: 5.2, slug: '5-2-text', title: 'Text', difficulty: 'intermediate', readingTime: '~5 min', available: true },
  { id: 5.3, slug: '5-3-image', title: 'Image', difficulty: 'intermediate', readingTime: '~5 min', available: true },
  { id: 5.4, slug: '5-4-sprite', title: 'Sprite', difficulty: 'intermediate', readingTime: '~10 min', available: true },
  { id: 5.5, slug: '5-5-tilesprite', title: 'TileSprite', difficulty: 'intermediate', readingTime: '~8 min', available: true },
  { id: 5.6, slug: '5-6-group', title: 'Group', difficulty: 'intermediate', readingTime: '~10 min', available: true },
  { id: 5.7, slug: '5-7-container', title: 'Container', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 6.1, slug: '6-1-animazioni', title: 'Animazioni con Tween', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 6.2, slug: '6-2-audio', title: 'Audio', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 6.3, slug: '6-3-tempo', title: 'Tempo e Timer', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 7, slug: '7-camera', title: 'Camera e Viewport', difficulty: 'intermediate', readingTime: '~30 min', available: true },
  { id: 8, slug: '8-fisica-arcade', title: 'La Fisica Arcade', difficulty: 'intermediate', readingTime: '~35 min', available: true },
  { id: 9, slug: '9-gameobjects-specializzati', title: 'I Nostri GameObjects Specializzati', difficulty: 'intermediate', readingTime: '~35 min', available: true },
  { id: 10, slug: '10-tilemaps', title: 'Tilemaps', difficulty: 'intermediate', readingTime: '~40 min', available: true },
  { id: 11, slug: '11-input', title: 'Input Handling', difficulty: 'intermediate', readingTime: '~25 min', available: true },
]

const chapters_en: Chapter[] = [
  { id: 1, slug: '1-introduction', title: 'Introduction to Technologies', difficulty: 'beginner', readingTime: '~20 min', available: true },
  { id: 2, slug: '2-the-template', title: 'The Template', difficulty: 'beginner', readingTime: '~25 min', available: true },
  { id: 3, slug: '3-typescript-basics', title: 'TypeScript Basics', difficulty: 'beginner', readingTime: '~30 min', available: true },
  { id: 4, slug: '4-game-configuration', title: 'Configuring Our Game', difficulty: 'intermediate', readingTime: '~30 min', available: true },
  { id: 5.1, slug: '5-1-gameobjects-intro', title: 'Introduction to GameObjects', difficulty: 'intermediate', readingTime: '~20 min', available: true },
  { id: 5.2, slug: '5-2-text', title: 'Text', difficulty: 'intermediate', readingTime: '~5 min', available: true },
  { id: 5.3, slug: '5-3-image', title: 'Image', difficulty: 'intermediate', readingTime: '~5 min', available: true },
  { id: 5.4, slug: '5-4-sprite', title: 'Sprite', difficulty: 'intermediate', readingTime: '~10 min', available: true },
  { id: 5.5, slug: '5-5-tilesprite', title: 'TileSprite', difficulty: 'intermediate', readingTime: '~8 min', available: true },
  { id: 5.6, slug: '5-6-group', title: 'Group', difficulty: 'intermediate', readingTime: '~10 min', available: true },
  { id: 5.7, slug: '5-7-container', title: 'Container', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 6.1, slug: '6-1-animations', title: 'Tween Animations', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 6.2, slug: '6-2-audio', title: 'Audio', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 6.3, slug: '6-3-time', title: 'Time and Timers', difficulty: 'intermediate', readingTime: '~12 min', available: true },
  { id: 7, slug: '7-camera', title: 'Camera and Viewport', difficulty: 'intermediate', readingTime: '~30 min', available: true },
  { id: 8, slug: '8-arcade-physics', title: 'Arcade Physics', difficulty: 'intermediate', readingTime: '~35 min', available: true },
  { id: 9, slug: '9-specialized-gameobjects', title: 'Our Custom GameObjects', difficulty: 'intermediate', readingTime: '~35 min', available: true },
  { id: 10, slug: '10-tilemaps', title: 'Tilemaps', difficulty: 'intermediate', readingTime: '~40 min', available: true },
  { id: 11, slug: '11-input', title: 'Input Handling', difficulty: 'intermediate', readingTime: '~25 min', available: true },
]

// Maps IT slug → EN slug
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

const enToIt: Record<string, string> = Object.fromEntries(
  Object.entries(itToEn).map(([it, en]) => [en, it]),
)

export function getSectionPath(locale: string): string {
  return locale === 'en' ? 'chapters' : 'capitoli'
}

export function getSlugForLocale(slug: string, fromLocale: string, toLocale: string): string {
  if (fromLocale === toLocale) return slug
  if (fromLocale === 'it') return itToEn[slug] ?? slug
  return enToIt[slug] ?? slug
}

export function getChapters(locale: string): Chapter[] {
  return locale === 'en' ? chapters_en : chapters_it
}

export function getChapterBySlug(slug: string, locale = 'it'): Chapter | undefined {
  return getChapters(locale).find((c) => c.slug === slug)
}

export function getPrevChapter(slug: string, locale = 'it'): Chapter | undefined {
  const list = getChapters(locale)
  const idx = list.findIndex((c) => c.slug === slug)
  return idx > 0 ? list[idx - 1] : undefined
}

export function getNextChapter(slug: string, locale = 'it'): Chapter | undefined {
  const list = getChapters(locale)
  const idx = list.findIndex((c) => c.slug === slug)
  return idx !== -1 && idx < list.length - 1 ? list[idx + 1] : undefined
}

export const chapters = chapters_it
