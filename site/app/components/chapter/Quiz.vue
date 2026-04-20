<template>
  <div
    class="mt-12 rounded-xl border border-white/10 overflow-hidden"
    style="background-color: var(--color-surface);"
  >
    <div class="px-6 py-4 border-b border-white/10 flex items-center gap-3">
      <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" style="color: var(--color-primary);" />
      <h2 class="text-lg font-bold" style="font-family: 'Orbitron', sans-serif; color: var(--color-text);">
        Quiz di Autovalutazione
      </h2>
    </div>

    <div class="p-6 space-y-8">
      <div v-for="(q, qi) in questions" :key="qi" class="space-y-3">
        <p class="font-semibold" style="color: var(--color-text);">
          {{ qi + 1 }}. {{ q.question }}
        </p>

        <div class="space-y-2">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            class="w-full text-left px-4 py-3 rounded-lg border text-sm transition-all"
            :class="optionClass(qi, oi)"
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
              <span>{{ opt }}</span>
              <UIcon
                v-if="submitted && oi === q.correct"
                name="i-heroicons-check"
                class="w-4 h-4 ml-auto"
                style="color: #10B981;"
              />
              <UIcon
                v-else-if="submitted && answers[qi] === oi && oi !== q.correct"
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
        Punteggio:
        <span class="font-bold" :style="{ color: scoreColor }">{{ score }}/{{ questions.length }}</span>
        <span v-if="isPerfect" class="ml-2" style="color: var(--color-primary);">🎉 Perfetto!</span>
      </div>
      <div v-else class="text-sm" style="color: var(--color-muted);">
        {{ answeredCount }}/{{ questions.length }} risposte
      </div>

      <div class="flex gap-3">
        <UButton
          v-if="submitted"
          variant="ghost"
          size="sm"
          color="neutral"
          @click="reset"
        >
          Riprova
        </UButton>
        <UButton
          v-if="!submitted"
          :disabled="answeredCount < questions.length"
          size="sm"
          @click="submit"
        >
          Verifica risposte
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/data/quiz/chapter-1'

const props = defineProps<{
  questions: QuizQuestion[]
  chapterSlug: string
}>()

const { saveScore } = useQuizState()

const answers = ref<Record<number, number>>({})
const submitted = ref(false)

const answeredCount = computed(() => Object.keys(answers.value).length)

const score = computed(() =>
  props.questions.reduce((acc, q, qi) => acc + (answers.value[qi] === q.correct ? 1 : 0), 0),
)

const isPerfect = computed(() => score.value === props.questions.length)

const scoreColor = computed(() => {
  const pct = score.value / props.questions.length
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
  saveScore(props.chapterSlug, score.value, props.questions.length)
}

function reset() {
  answers.value = {}
  submitted.value = false
}

function optionClass(qi: number, oi: number): Record<string, boolean> {
  const selected = answers.value[qi] === oi
  const correct = props.questions[qi].correct === oi

  if (!submitted.value) {
    return {
      'border-white/20 hover:border-white/40 hover:bg-white/5': !selected,
      'border-phaser-cyan bg-phaser-cyan/10': selected,
      'cursor-pointer': true,
    }
  }

  return {
    'border-green-500/50 bg-green-500/10': correct,
    'border-red-500/50 bg-red-500/10': selected && !correct,
    'border-white/10': !selected && !correct,
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
