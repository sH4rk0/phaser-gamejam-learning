<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1
      class="text-3xl font-black mb-2"
      style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
    >
      Tutti i Capitoli
    </h1>
    <p class="mb-8" style="color: var(--color-muted);">
      {{ availableCount }} capitoli disponibili su {{ chapters.length }} totali.
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
        v-bind="chapter.available ? { to: `/capitoli/${chapter.slug}` } : {}"
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
              Prossimamente
            </UBadge>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chapters } from '~/data/chapters'

const NuxtLink = resolveComponent('NuxtLink')
const { isComplete } = useChapterProgress()

const activeFilter = ref('all')

const filters = [
  { label: 'Tutti', value: 'all' },
  { label: 'Principiante', value: 'beginner' },
  { label: 'Intermedio', value: 'intermediate' },
  { label: 'Avanzato', value: 'advanced' },
]

const availableCount = computed(() => chapters.filter((c) => c.available).length)

const filteredChapters = computed(() =>
  activeFilter.value === 'all'
    ? chapters
    : chapters.filter((c) => c.difficulty === activeFilter.value),
)

function difficultyColor(d: string) {
  return ({ beginner: 'success', intermediate: 'warning', advanced: 'error' }[d] ?? 'neutral') as 'success' | 'warning' | 'error' | 'neutral'
}

function difficultyLabel(d: string) {
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[d] ?? d
}

useSeoMeta({
  title: 'Capitoli — Phaser 4 Game Dev',
  description: 'Tutti i capitoli del corso Phaser 4 Game Dev in italiano.',
})
</script>
