<template>
  <aside
    class="hidden md:flex flex-col w-64 sticky top-16 p-4 shrink-0 overflow-y-auto"
    :style="{
      backgroundColor: 'var(--color-surface)',
      height: 'calc(100vh - 4rem)',
      borderRight: '1px solid var(--color-border)'
    }"
  >
    <p
      class="text-xs font-bold mb-4 tracking-widest uppercase"
      style="color: var(--color-muted); font-family: 'Orbitron', sans-serif;"
    >
      Capitoli
    </p>

    <nav class="flex-1 space-y-1" aria-label="Capitoli">
      <div v-for="chapter in chapters" :key="chapter.slug">
        <component
          :is="chapter.available ? NuxtLink : 'span'"
          v-bind="chapter.available ? { to: `/capitoli/${chapter.slug}` } : {}"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
          :style="{
            color: isCurrentChapter(chapter.slug) ? 'var(--color-primary)' : 'var(--color-text)',
            backgroundColor: isCurrentChapter(chapter.slug) ? 'var(--color-hover)' : 'transparent',
            opacity: chapter.available ? 1 : 0.4,
            cursor: chapter.available ? 'pointer' : 'not-allowed'
          }"
        >
          <UIcon
            v-if="mounted && isComplete(chapter.slug)"
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
        </component>

        <!-- TOC for current chapter -->
        <div
          v-if="isCurrentChapter(chapter.slug) && toc && toc.length > 0"
          class="ml-6 mt-1 mb-2 space-y-0.5 border-l-2 pl-3"
          style="border-color: var(--color-border);"
        >
          <a
            v-for="heading in toc"
            :key="heading.id"
            :href="`#${heading.id}`"
            class="block text-xs py-1 transition-all duration-200"
            :class="[
              heading.depth === 3 ? 'ml-3' : '',
              activeId === heading.id ? 'font-medium translate-x-0.5' : ''
            ]"
            :style="activeId === heading.id ? 'color: var(--color-primary);' : 'color: var(--color-muted);'"
          >
            {{ heading.text }}
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { chapters } from '~/data/chapters'

interface TocItem {
  id: string
  text: string
  depth: number
}

defineProps<{
  toc?: TocItem[]
  activeId?: string
}>()
const route = useRoute()
const { isComplete } = useChapterProgress()

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

function isCurrentChapter(slug: string): boolean {
  return route.params.slug === slug
}
</script>
