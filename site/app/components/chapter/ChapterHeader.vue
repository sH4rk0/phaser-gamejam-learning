<template>
  <div class="mb-8">
    <nav class="flex items-center gap-2 text-sm mb-4" style="color: var(--color-muted);">
      <NuxtLink to="/" class="hover:underline" style="color: var(--color-muted);">Home</NuxtLink>
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
      <NuxtLink to="/capitoli" class="hover:underline" style="color: var(--color-muted);">Capitoli</NuxtLink>
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
      <span style="color: var(--color-text);">Capitolo {{ chapter }}</span>
    </nav>

    <p class="text-sm font-bold mb-2" style="color: var(--color-primary); font-family: 'Orbitron', sans-serif; letter-spacing: 0.2em;">
      CAPITOLO {{ chapter }}
    </p>

    <h1
      class="text-3xl md:text-4xl font-black mb-4 glow-cyan"
      style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
    >
      {{ title }}
    </h1>

    <div class="flex flex-wrap items-center gap-3">
      <span 
        class="px-3 py-1 text-xs font-semibold rounded-full"
        :style="{
          backgroundColor: difficultyBg,
          color: difficultyText
        }"
      >
        {{ difficultyLabel }}
      </span>
      <div class="flex items-center gap-1 text-sm" style="color: var(--color-muted);">
        <UIcon name="i-heroicons-clock" class="w-4 h-4" />
        <span>{{ readingTime }}</span>
      </div>
    </div>

    <div class="mt-6 border-t" style="border-color: var(--color-border);" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  chapter: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readingTime: string
}>()

const difficultyColor = computed(() => {
  return { beginner: 'success', intermediate: 'warning', advanced: 'error' }[props.difficulty] as 'success' | 'warning' | 'error'
})

const difficultyBg = computed(() => {
  return { beginner: 'rgba(16, 185, 129, 0.2)', intermediate: 'rgba(245, 158, 11, 0.2)', advanced: 'rgba(239, 68, 68, 0.2)' }[props.difficulty]
})

const difficultyText = computed(() => {
  return { beginner: '#10B981', intermediate: '#F59E0B', advanced: '#EF4444' }[props.difficulty]
})

const difficultyLabel = computed(() => {
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[props.difficulty]
})
</script>
