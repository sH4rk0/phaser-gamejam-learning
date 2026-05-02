<template>
  <nav
    class="sticky top-0 z-50"
    :style="{
      backgroundColor: isDark ? 'rgba(10, 10, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid var(--color-border)`
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink :to="`/${locale}`" class="flex items-center gap-3">
          <img
            src="~/assets/images/phaser4-logo.webp"
            alt="Phaser 4"
            class="h-8 w-auto"
          />
        </NuxtLink>

        <!-- Navigation -->
        <div class="flex items-center gap-2">
          <NuxtLink
            :to="`/${locale}/${sectionPath}`"
            class="px-3 py-2 rounded-md text-sm transition-colors"
            :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
            :style="{ color: 'var(--color-text)' }"
          >
            {{ locale === 'en' ? 'Chapters' : 'Capitoli' }}
          </NuxtLink>

          <NuxtLink
            :to="`/${locale}/risorse`"
            class="px-3 py-2 rounded-md text-sm transition-colors"
            :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
            :style="{ color: 'var(--color-text)' }"
          >
            {{ locale === 'en' ? 'Resources' : 'Risorse' }}
          </NuxtLink>

          <!-- Language switcher -->
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            class="font-mono text-xs font-bold tracking-widest px-2"
            :style="{ color: 'var(--color-primary)' }"
            :aria-label="locale === 'en' ? 'Switch to Italian' : 'Switch to English'"
            @click="switchLocale"
          >
            {{ locale === 'en' ? '🇮🇹 IT' : '🇬🇧 EN' }}
          </UButton>

          <!-- Theme toggle -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="isDark ? 'Attiva tema chiaro' : 'Attiva tema scuro'"
            @click="toggleColorMode"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const route = useRoute()

import { getSectionPath, getSlugForLocale } from '~/data/chapters'

const { locale, sectionPath } = useLocale()

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

function switchLocale() {
  const other = locale.value === 'it' ? 'en' : 'it'
  const currentSection = getSectionPath(locale.value)
  const otherSection = getSectionPath(other)

  const match = route.path.match(new RegExp(`^/(it|en)/${currentSection}/(.+)$`))
  if (match) {
    const currentSlug = match[2]
    const newSlug = getSlugForLocale(currentSlug, locale.value, other)
    navigateTo(`/${other}/${otherSection}/${newSlug}`)
    return
  }

  let newPath = route.path.replace(/^\/(it|en)/, `/${other}`)
  newPath = newPath.replace(`/${currentSection}`, `/${otherSection}`)
  navigateTo(newPath)
}
</script>
