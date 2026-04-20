import { useLocalStorage } from '@vueuse/core'

interface QuizScore {
  score: number
  total: number
}

export function useQuizState() {
  const state = useLocalStorage<Record<string, QuizScore>>('quiz-state', {})

  function saveScore(slug: string, score: number, total: number): void {
    state.value = { ...state.value, [slug]: { score, total } }
  }

  function getScore(slug: string): QuizScore | null {
    return state.value[slug] ?? null
  }

  return { saveScore, getScore }
}
