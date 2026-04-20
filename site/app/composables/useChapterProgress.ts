import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useChapterProgress() {
  const progress = useLocalStorage<string[]>('chapter-progress', [])

  function markComplete(slug: string): void {
    if (!progress.value.includes(slug)) {
      progress.value = [...progress.value, slug]
    }
  }

  function isComplete(slug: string): boolean {
    return progress.value.includes(slug)
  }

  const completionPercent = computed(() =>
    Math.round((progress.value.length / 12) * 100),
  )

  return { markComplete, isComplete, completionPercent }
}
