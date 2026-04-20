<template>
  <div class="flex">
    <AppSidebar :toc="effectiveToc" :active-id="activeHeadingId" />

    <main class="flex-1 min-w-0 max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <!-- Not available -->
      <div
        v-if="chapterMeta && !chapterMeta.available"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <UIcon name="i-heroicons-lock-closed" class="w-16 h-16 mb-6" style="color: var(--color-muted);" />
        <h1
          class="text-2xl font-bold mb-3"
          style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
        >
          {{ chapterMeta.title }}
        </h1>
        <p class="mb-6" style="color: var(--color-muted);">
          Questo capitolo è in preparazione. Torna presto!
        </p>
        <UButton to="/capitoli" color="primary" variant="ghost">
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

        <ChapterQuiz
          v-if="quiz"
          :questions="quiz"
          :chapter-slug="slug"
        />

        <ChapterNav :current-slug="slug" />
      </template>

      <!-- Not found -->
      <div v-else class="py-24 text-center" style="color: var(--color-muted);">
        <UIcon name="i-heroicons-document-magnifying-glass" class="w-12 h-12 mx-auto mb-4" />
        <p>Capitolo non trovato.</p>
        <UButton to="/capitoli" color="primary" variant="ghost" class="mt-4">
          ← Torna ai capitoli
        </UButton>
      </div>
    </main>

    <!-- Image Lightbox -->
    <ChapterImageLightbox
      :is-open="lightboxOpen"
      :image-src="lightboxSrc"
      :image-alt="lightboxAlt"
      @close="lightboxOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { getChapterBySlug } from '~/data/chapters'
import { quiz1 } from '~/data/quiz/chapter-1'
import { quiz2 } from '~/data/quiz/chapter-2'
import { quiz3 } from '~/data/quiz/chapter-3'
import { quiz4 } from '~/data/quiz/chapter-4'
import { quiz5 } from '~/data/quiz/chapter-5'
import { quiz6 } from '~/data/quiz/chapter-6'
import { quiz7 } from '~/data/quiz/chapter-7'
import type { QuizQuestion } from '~/data/quiz/chapter-1'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const chapterMeta = computed(() => getChapterBySlug(slug.value))

const { data: chapter } = await useAsyncData(
  `chapter-${route.params.slug}`,
  () => queryCollection('chapters').where('slug', '==', slug.value).first(),
)

type TocItem = { id: string; text: string; depth: number }

const effectiveToc = computed((): TocItem[] => {
  const body = chapter.value?.body as any
  if (!body) return []

  // Standard @nuxt/content toc format
  const links = body?.toc?.links ?? chapter.value?.toc?.links
  if (links?.length) {
    const result: TocItem[] = []
    function walk(items: any[], depth = 2) {
      for (const item of items) {
        result.push({ id: item.id, text: item.text, depth })
        if (item.children?.length) walk(item.children, depth + 1)
      }
    }
    walk(links)
    return result
  }

  // Minimark format: body.value is array of [tag, attrs, ...children]
  if (body?.type === 'minimark' && Array.isArray(body.value)) {
    return (body.value as any[])
      .filter(n => Array.isArray(n) && (n[0] === 'h2' || n[0] === 'h3'))
      .map(n => ({
        id: (n[1] as any)?.id ?? '',
        text: typeof n[2] === 'string' ? n[2] : '',
        depth: n[0] === 'h2' ? 2 : 3,
      }))
      .filter(item => item.id)
  }

  return []
})

// Lightbox state
const lightboxOpen = ref(false)
const lightboxSrc = ref('')
const lightboxAlt = ref('')

function openLightbox(img: HTMLImageElement) {
  lightboxSrc.value = img.src
  lightboxAlt.value = img.alt || ''
  lightboxOpen.value = true
}

// Scroll spy for TOC highlighting
const activeHeadingId = ref<string>('')
let _observer: IntersectionObserver | null = null

onMounted(() => {
  _observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeHeadingId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )

  nextTick(() => {
    const headings = document.querySelectorAll('.chapter-content h2, .chapter-content h3')

    headings.forEach((heading) => {
      if (heading.id) _observer!.observe(heading)
    })

    // Add click handlers to images for lightbox
    document.querySelectorAll('.chapter-content img').forEach((img) => {
      img.classList.add('cursor-zoom-in', 'transition-transform', 'hover:scale-[1.02]')
      img.addEventListener('click', () => openLightbox(img as HTMLImageElement))
    })
  })
})

onUnmounted(() => {
  _observer?.disconnect()
})

const quizMap: Record<string, QuizQuestion[]> = {
  '1-introduzione': quiz1,
  '2-il-template': quiz2,
  '3-typescript-basi': quiz3,
  '4-configurazione-gioco': quiz4,
  '5-gameobjects': quiz5,
  '6-animazioni-audio-tempo': quiz6,
  '7-camera': quiz7,
}

const quiz = computed(() => quizMap[slug.value] ?? null)

useSeoMeta({
  title: () => `${chapterMeta.value?.title ?? 'Capitolo'} — Phaser 4 Game Dev`,
  description: () => `Capitolo ${chapterMeta.value?.id}: ${chapterMeta.value?.title}. Corso Phaser 4 in italiano.`,
})
</script>
