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
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="~/assets/images/phaser4-logo.webp"
            alt="Phaser 4"
            class="h-8 w-auto"
          />
        </NuxtLink>

        <!-- Navigation -->
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/capitoli"
            class="px-3 py-2 rounded-md text-sm transition-colors"
            :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
            :style="{ color: 'var(--color-text)' }"
          >
            Capitoli
          </NuxtLink>

          <NuxtLink
            to="/risorse"
            class="px-3 py-2 rounded-md text-sm transition-colors"
            :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
            :style="{ color: 'var(--color-text)' }"
          >
            Risorse
          </NuxtLink>

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

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
