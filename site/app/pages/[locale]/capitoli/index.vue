<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1
      class="text-3xl font-black mb-2"
      style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
    >
      {{ t.heading }}
    </h1>
    <p class="mb-8" style="color: var(--color-muted);">
      {{ availableCount }} {{ t.available }} {{ localChapters.length }} {{ t.total }}.
    </p>

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

    <div class="space-y-3">
      <component
        :is="chapter.available ? NuxtLink : 'div'"
        v-for="chapter in filteredChapters"
        :key="chapter.slug"
        v-bind="chapter.available ? { to: `/${locale}/capitoli/${chapter.slug}` } : {}"
        :class="['block', chapter.available ? '' : 'cursor-default']"
      >
        <div
          class="flex items-center gap-4 px-5 py-4 rounded-xl border transition-colors"
          :style="{
            backgroundColor: 'var(--color-surface)',
            borderColor: chapter.available ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
          }"
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
              {{ t.comingSoon }}
            </UBadge>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getChapters } from '~/data/chapters'

const NuxtLink = resolveComponent('NuxtLink')
const { isComplete } = useChapterProgress()
const { locale } = useLocale()
if (locale.value === 'en') {
  await navigateTo(`/en/chapters`, { replace: true })
}

const localChapters = computed(() => getChapters(locale.value))

const activeFilter = ref('all')

const t = computed(() => locale.value === 'en' ? {
  heading: 'All Chapters',
  available: 'chapters available out of',
  total: 'total',
  comingSoon: 'Coming Soon',
  filters: [
    { label: 'All', value: 'all' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ],
} : {
  heading: 'Tutti i Capitoli',
  available: 'capitoli disponibili su',
  total: 'totali',
  comingSoon: 'Prossimamente',
  filters: [
    { label: 'Tutti', value: 'all' },
    { label: 'Principiante', value: 'beginner' },
    { label: 'Intermedio', value: 'intermediate' },
    { label: 'Avanzato', value: 'advanced' },
  ],
})

const filters = computed(() => t.value.filters)

const availableCount = computed(() => localChapters.value.filter((c) => c.available).length)

const filteredChapters = computed(() =>
  activeFilter.value === 'all'
    ? localChapters.value
    : localChapters.value.filter((c) => c.difficulty === activeFilter.value),
)

function difficultyColor(d: string) {
  return ({ beginner: 'success', intermediate: 'warning', advanced: 'error' }[d] ?? 'neutral') as 'success' | 'warning' | 'error' | 'neutral'
}

function difficultyLabel(d: string) {
  if (locale.value === 'en') {
    return { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }[d] ?? d
  }
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[d] ?? d
}

useSeoMeta({
  title: () => locale.value === 'en'
    ? 'Chapters — Phaser 4 Game Dev'
    : 'Capitoli — Phaser 4 Game Dev',
  description: () => locale.value === 'en'
    ? 'All chapters of the Phaser 4 Game Dev course in English.'
    : 'Tutti i capitoli del corso Phaser 4 Game Dev in italiano.',
})
</script>
