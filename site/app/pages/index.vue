<template>
  <div>
    <!-- Hero -->
    <section
      class="relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden"
      style="background: radial-gradient(ellipse at top, rgba(108, 63, 232, 0.15) 0%, transparent 60%), var(--color-bg);"
    >
 
      <h1
        class="text-4xl md:text-6xl font-black mb-4 glow-cyan"
        style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
      >
        CREA IL TUO VIDEOGAME
      </h1>
      <p class="text-xl md:text-2xl mb-2" style="color: var(--color-primary);">
        con PhaserJs e TypeScript
      </p>
      <p class="max-w-xl mx-auto mb-10 text-base" style="color: var(--color-muted);">
    Promosso dall'<strong>I.I.S. Margherita Hack</strong> in collaborazione con <strong>HackFarm E.T.S.</strong><br>Il corso è parte integrante della <a href="https://phaser-gamejam.web.app" target="_blank" rel="noopener noreferrer"><strong>Phaser GameJam</strong></a>.
      </p>
      <NuxtLink to="/capitoli/1-introduzione">
        <UButton
          size="xl"
          color="primary"
          class="px-10 py-4 text-lg font-bold tracking-wide shadow-[0_0_32px_rgba(0,212,255,0.45)] hover:shadow-[0_0_48px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
        >
          🎮 Esplora il Corso →
        </UButton>
      </NuxtLink>

      <!-- Course stats strip -->
      <div class="mt-16 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="stat in courseStats"
          :key="stat.label"
          class="flex flex-col items-center gap-1 px-4 py-4 rounded-xl border"
          style="background: rgba(255,255,255,0.07); border-color: rgba(0,212,255,0.3);"
        >
          <UIcon :name="stat.icon" class="w-6 h-6 mb-1" style="color: var(--color-primary);" />
          <span class="text-xl font-black" style="font-family: 'Orbitron', sans-serif; color: var(--color-primary);">{{ stat.value }}</span>
          <span class="text-xs text-center" style="color: var(--color-text);">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Tutor section -->
    <section class="py-20 border-t border-white/5" style="background-color: #0e0e22;">
      <div class="max-w-4xl mx-auto px-4">
        <p
          class="text-xs font-bold text-center mb-10 tracking-widest uppercase"
          style="color: #aaaacc; font-family: 'Orbitron', sans-serif;"
        >
          Il tutor
        </p>

        <div
          class="flex flex-col md:flex-row items-center md:items-start gap-10 p-8 rounded-2xl border relative overflow-hidden"
          style="background: #181836; border-color: rgba(108,63,232,0.4); box-shadow: 0 0 40px rgba(108,63,232,0.1);"
        >
          <!-- decorative glow -->
          <div
            class="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style="background: radial-gradient(circle, rgba(108,63,232,0.22) 0%, transparent 70%);"
          />

          <!-- Avatar -->
          <div class="shrink-0 flex flex-col items-center gap-4">
            <div
              class="w-36 h-36 rounded-2xl overflow-hidden border-2"
              style="border-color: rgba(0,212,255,0.4);"
            >
              <img
                src="/images/francesco-raimondo.jpg"
                alt="Francesco Raimondo"
                class="w-full h-full object-cover object-top"
              />
            </div>

            <!-- Social links -->
            <div class="flex gap-2">
              <a
                href="https://www.linkedin.com/in/francescoraimondo"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style="background: rgba(0,119,181,0.25); border: 1px solid rgba(0,119,181,0.5); color: #7dc8e8;"
              >
                <UIcon name="i-simple-icons-linkedin" class="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/francescoraimondo"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style="background: rgba(24,119,242,0.22); border: 1px solid rgba(24,119,242,0.45); color: #8ab4f8;"
              >
                <UIcon name="i-simple-icons-facebook" class="w-3.5 h-3.5" />
                Facebook
              </a>
            </div>
          </div>

          <!-- Bio -->
          <div class="flex-1 text-left">
            <h3
              class="text-2xl font-black mb-1"
              style="font-family: 'Orbitron', sans-serif; color: #F0F0FF;"
            >
              Francesco Raimondo
            </h3>
            <p class="text-sm mb-4 font-medium" style="color: var(--color-primary);">
             Director, Development @ EVERSANA INTOUCH · Game Developer · Maker
            </p>
            <p class="text-sm leading-relaxed mb-6" style="color: #c0c0dd;">
             Dal 2022 tutor della Phaser GameJam organizzata in collaborazione con <strong style="color: #F0F0FF;">HackFarm E.T.S.</strong> <br>Appassionato di game development, maker culture e stampa 3D, ha progettato questo corso per avvicinare gli studenti al mondo dei videogiochi in modo semplice, pratico e divertente.
            </p>

            <!-- Tag pills -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in tutorTags"
                :key="tag"
                class="px-3 py-1 rounded-full text-xs font-medium"
                style="background: rgba(108,63,232,0.25); border: 1px solid rgba(108,63,232,0.45); color: #c4aff5;"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2
        class="text-2xl font-bold mb-8 text-center"
        style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
      >
        Contenuto del Corso
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="chapter in chapters"
          :key="chapter.slug"
          :to="`/capitoli/${chapter.slug}`"
          :class="['block transition-all duration-300', chapter.available ? 'hover:scale-[1.03] hover:-translate-y-1' : 'cursor-default']"
        >
          <UCard
            class="h-full"
            :style="chapter.available ? {
              backgroundColor: 'var(--color-surface)',
              borderColor: 'rgba(0,212,255,0.35)',
              boxShadow: '0 0 18px rgba(0,212,255,0.12)',
            } : {
              backgroundColor: 'rgba(17,17,40,0.5)',
              borderColor: 'rgba(255,255,255,0.05)',
              opacity: '0.45',
              filter: 'grayscale(0.4)',
            }"
          >
            <div class="flex items-start justify-between mb-3">
              <span
                class="text-xs font-bold"
                :style="chapter.available
                  ? 'font-family: Orbitron, sans-serif; color: var(--color-primary); letter-spacing: 0.15em;'
                  : 'font-family: Orbitron, sans-serif; color: var(--color-muted); letter-spacing: 0.15em;'"
              >
                CAP. {{ String(chapter.id).padStart(2, '0') }}
              </span>
              <UBadge
                v-if="!chapter.available"
                color="neutral"
                variant="soft"
                size="xs"
              >
                Prossimamente
              </UBadge>
              <UBadge
                v-else
                :color="difficultyColor(chapter.difficulty)"
                variant="soft"
                size="xs"
              >
                {{ difficultyLabel(chapter.difficulty) }}
              </UBadge>
            </div>

            <h3
              class="font-bold mb-2"
              :style="chapter.available ? 'color: var(--color-text);' : 'color: var(--color-muted);'"
            >
              {{ chapter.title }}
            </h3>

            <div class="flex items-center gap-1 text-xs" style="color: var(--color-muted);">
              <UIcon name="i-heroicons-clock" class="w-3 h-3" />
              {{ chapter.readingTime }}
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </section>

    <!-- Tech stack badges -->
    <section
      class="border-t border-white/10 py-12"
      style="background-color: var(--color-surface);"
    >
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm mb-6" style="color: var(--color-muted); font-family: 'Orbitron', sans-serif; letter-spacing: 0.15em;">
          STACK TECNOLOGICO
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <UBadge v-for="tech in techStack" :key="tech" color="primary" variant="outline" size="lg">
            {{ tech }}
          </UBadge>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { chapters } from '~/data/chapters'

useSeoMeta({
  title: 'Phaser 4 Game Dev — Corso Italiano',
  description: 'Impara a creare videogiochi browser con Phaser.js v4 e TypeScript. Corso in italiano con 12 capitoli, esempi pratici e quiz.',
  ogTitle: 'Phaser 4 Game Dev — Corso Italiano',
  ogDescription: 'Corso italiano completo per imparare Phaser.js v4 da zero.',
})
const techStack = ['Node.js', 'Npm', 'Webpack', 'TypeScript', 'Phaser 4', 'Firebase']

const tutorTags = ['TypeScript', 'Phaser.js', 'Game Development', 'Node.js', 'Maker', 'Stampa 3D', 'Retrogaming','Commodore 64', ]

const courseStats = [
  { icon: 'i-heroicons-book-open', value: '12', label: 'Capitoli' },
  { icon: 'i-heroicons-clock', value: '~5h', label: 'Contenuto' },
  { icon: 'i-heroicons-trophy', value: 'Quiz', label: 'per ogni capitolo' },
  { icon: 'i-heroicons-currency-dollar', value: 'Free', label: 'Completamente gratuito' },
]

function difficultyColor(d: string) {
  return ({ beginner: 'success', intermediate: 'warning', advanced: 'error' }[d] ?? 'neutral') as 'success' | 'warning' | 'error' | 'neutral'
}

function difficultyLabel(d: string) {
  return { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' }[d] ?? d
}
</script>
