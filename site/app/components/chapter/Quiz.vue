<template>
  <div
    class="mt-12 rounded-xl border border-white/10 overflow-hidden"
    style="background-color: var(--color-surface);"
  >
    <div class="px-6 py-4 border-b border-white/10 flex items-center gap-3">
      <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" style="color: var(--color-primary);" />
      <h2 class="text-lg font-bold" style="font-family: 'Orbitron', sans-serif; color: var(--color-text);">
        {{ locale === 'en' ? 'Self-Assessment Quiz' : 'Quiz di Autovalutazione' }}
      </h2>
    </div>

    <div class="p-6 space-y-8">
      <div v-for="(q, qi) in activeQuestions" :key="qi" class="space-y-3">
        <p class="font-semibold" style="color: var(--color-text);">
          {{ qi + 1 }}. {{ q.question }}
        </p>

        <div class="space-y-2">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="w-full text-left px-4 py-3 rounded-lg border text-sm transition-all"
            :class="optionClass(qi, oi, opt.correct)"
            :disabled="submitted"
            @click="selectAnswer(qi, oi)"
          >
            <div class="flex items-center gap-3">
              <span
                class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0"
                :class="optionLetterClass(qi, oi)"
              >
                {{ String.fromCharCode(65 + oi) }}
              </span>
              <span>{{ opt.answer }}</span>
              <UIcon
                v-if="submitted && opt.correct"
                name="i-heroicons-check"
                class="w-4 h-4 ml-auto"
                style="color: #10B981;"
              />
              <UIcon
                v-else-if="submitted && answers[qi] === oi && !opt.correct"
                name="i-heroicons-x-mark"
                class="w-4 h-4 ml-auto"
                style="color: #EF4444;"
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 py-4 border-t border-white/10 flex items-center justify-between">
      <div v-if="submitted" class="text-sm" style="color: var(--color-muted);">
        {{ locale === 'en' ? 'Score:' : 'Punteggio:' }}
        <span class="font-bold" :style="{ color: scoreColor }">{{ score }}/{{ activeQuestions.length }}</span>
        <span v-if="isPerfect" class="ml-2" style="color: var(--color-primary);">
          🎉 {{ locale === 'en' ? 'Perfect!' : 'Perfetto!' }}
        </span>
      </div>
      <div v-else class="text-sm" style="color: var(--color-muted);">
        {{ answeredCount }}/{{ activeQuestions.length }} {{ locale === 'en' ? 'answers' : 'risposte' }}
      </div>

      <div class="flex gap-3">
        <UButton
          v-if="submitted"
          variant="ghost"
          size="sm"
          color="neutral"
          @click="reset"
        >
          {{ locale === 'en' ? 'Try again' : 'Riprova' }}
        </UButton>
        <UButton
          v-if="!submitted"
          :disabled="answeredCount < activeQuestions.length"
          size="sm"
          @click="submit"
        >
          {{ locale === 'en' ? 'Check answers' : 'Verifica risposte' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizData } from '~/data/quiz/types'

interface ActiveQuestion {
  question: string
  options: { answer: string; correct: boolean }[]
}

const props = defineProps<{
  quizData: QuizData
  locale: string
  chapterSlug: string
}>()

const { saveScore } = useQuizState()
const answers = ref<Record<number, number>>({})
const submitted = ref(false)
const activeQuestions = ref<ActiveQuestion[]>([])

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions() {
  const pool = props.quizData[props.locale as 'it' | 'en'] ?? props.quizData.it
  const picked = shuffle([...pool]).slice(0, 5)
  activeQuestions.value = picked.map(q => ({
    question: q.question,
    options: shuffle([...q.options]),
  }))
}

onMounted(() => {
  buildQuestions()
})

function reset() {
  answers.value = {}
  submitted.value = false
  buildQuestions()
}

const answeredCount = computed(() => Object.keys(answers.value).length)

const score = computed(() =>
  activeQuestions.value.reduce((acc, q, qi) => {
    const selected = answers.value[qi] !== undefined ? q.options[answers.value[qi]] : null
    return acc + (selected?.correct ? 1 : 0)
  }, 0),
)

const isPerfect = computed(() => score.value === activeQuestions.value.length)

const scoreColor = computed(() => {
  const pct = score.value / activeQuestions.value.length
  if (pct >= 0.8) return '#10B981'
  if (pct >= 0.5) return '#F59E0B'
  return '#EF4444'
})

function selectAnswer(qi: number, oi: number) {
  if (!submitted.value) {
    answers.value = { ...answers.value, [qi]: oi }
  }
}

function submit() {
  submitted.value = true
  saveScore(props.chapterSlug, score.value, activeQuestions.value.length)
}

function optionClass(qi: number, oi: number, isCorrect: boolean): Record<string, boolean> {
  const selected = answers.value[qi] === oi

  if (!submitted.value) {
    return {
      'border-white/20 hover:border-white/40 hover:bg-white/5': !selected,
      'border-phaser-cyan bg-phaser-cyan/10': selected,
      'cursor-pointer': true,
    }
  }

  return {
    'border-green-500/50 bg-green-500/10': isCorrect,
    'border-red-500/50 bg-red-500/10': selected && !isCorrect,
    'border-white/10': !selected && !isCorrect,
    'cursor-not-allowed': true,
  }
}

function optionLetterClass(qi: number, oi: number): Record<string, boolean> {
  const selected = answers.value[qi] === oi
  if (!submitted.value && selected) {
    return { 'border-phaser-cyan text-phaser-cyan': true }
  }
  return { 'border-white/30 text-phaser-muted': true }
}
</script>
