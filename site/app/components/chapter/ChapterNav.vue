<template>
  <div class="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
    <div class="flex-1">
      <component
        :is="prev && prev.available ? NuxtLink : 'span'"
        v-if="prev"
        v-bind="prev.available ? { to: `/capitoli/${prev.slug}` } : {}"
        class="flex flex-col gap-1 group"
        :class="{ 'opacity-40': prev && !prev.available }"
      >
        <span class="text-xs" style="color: var(--color-muted);">← Precedente</span>
        <span class="text-sm font-semibold group-hover:underline" style="color: var(--color-text);">
          {{ prev.title }}
        </span>
      </component>
    </div>

    <div class="flex-1 flex flex-col items-end gap-3">
      <component
        :is="next && next.available ? NuxtLink : 'span'"
        v-if="next"
        v-bind="next.available ? { to: `/capitoli/${next.slug}` } : {}"
        class="flex flex-col items-end gap-1 group"
        :class="{ 'opacity-40': next && !next.available }"
      >
        <span class="text-xs" style="color: var(--color-muted);">Successivo →</span>
        <span class="text-sm font-semibold group-hover:underline" style="color: var(--color-text);">
          {{ next.title }}
        </span>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPrevChapter, getNextChapter } from '~/data/chapters'

const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps<{
  currentSlug: string
}>()

const prev = computed(() => getPrevChapter(props.currentSlug))
const next = computed(() => getNextChapter(props.currentSlug))
</script>
