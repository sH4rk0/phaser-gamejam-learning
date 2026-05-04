<template>
  <div class="phaser-example my-8 rounded-xl overflow-hidden" style="border: 1px solid rgba(0, 212, 255, 0.2); box-shadow: 0 0 24px rgba(0, 212, 255, 0.06), 0 4px 20px rgba(0, 0, 0, 0.4);">

    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2" style="background: #111128; border-bottom: 1px solid rgba(0,212,255,0.12);">
      <div class="flex items-center gap-2">
        <!-- Traffic lights -->
        <div class="flex gap-1.5">
          <span class="w-3 h-3 rounded-full" style="background: #FF5F57;" />
          <span class="w-3 h-3 rounded-full" style="background: #FFBD2E;" />
          <span class="w-3 h-3 rounded-full" style="background: #28CA41;" />
        </div>
        <span style="font-size: 0.75rem; color: #8888AA; margin-left: 8px; font-family: monospace;">
          {{ title }}
        </span>
        <span style="font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; color: #00D4FF; background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.25); border-radius: 4px; padding: 1px 5px;">
          LIVE
        </span>
      </div>
      <div class="flex items-center gap-2">
        <!-- Code link -->
        <a
          v-if="code"
          :href="code"
          target="_blank"
          rel="noopener noreferrer"
          style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.72rem; color: #8888AA; text-decoration: none; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(136,136,170,0.2); transition: color 0.15s, border-color 0.15s;"
          @mouseenter="e => (e.target as HTMLElement).style.color = '#6C3FE8'"
          @mouseleave="e => (e.target as HTMLElement).style.color = '#8888AA'"
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
          </svg>
          codice
        </a>
        <!-- Open link -->
        <a
          :href="fullSrc"
          target="_blank"
          rel="noopener noreferrer"
          style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.72rem; color: #8888AA; text-decoration: none; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(136,136,170,0.2); transition: color 0.15s, border-color 0.15s;"
          @mouseenter="e => (e.target as HTMLElement).style.color = '#00D4FF'"
          @mouseleave="e => (e.target as HTMLElement).style.color = '#8888AA'"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          apri
        </a>
      </div>
    </div>

    <!-- Iframe sandbox -->
    <iframe
      :src="fullSrc"
      :style="{ height: height + 'px' }"
      style="width: 100%; border: none; display: block; background: #0A0A1A;"
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
      :title="title"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  title?: string
  height?: number
  code?: string
}>(), {
  title: 'Phaser Example',
  height: 320,
})

const baseUrl = import.meta.dev
  ? 'http://localhost:9000'
  : 'https://phaser-gamejam-examples.web.app'

const fullSrc = computed(() => baseUrl + props.src)
</script>
