import { describe, it, expect, beforeEach } from 'vitest'
import { useChapterProgress } from '../app/composables/useChapterProgress'

describe('useChapterProgress', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty progress', () => {
    const { completionPercent } = useChapterProgress()
    expect(completionPercent.value).toBe(0)
  })

  it('marks a chapter as complete', () => {
    const { markComplete, isComplete } = useChapterProgress()
    markComplete('1-introduzione')
    expect(isComplete('1-introduzione')).toBe(true)
  })

  it('does not double-add a completed chapter', () => {
    const { markComplete, completionPercent } = useChapterProgress()
    markComplete('1-introduzione')
    markComplete('1-introduzione')
    expect(completionPercent.value).toBe(8) // 1/12 ≈ 8%
  })

  it('calculates completion percent correctly', () => {
    const { markComplete, completionPercent } = useChapterProgress()
    markComplete('1-introduzione')
    markComplete('2-setup-ambiente')
    expect(completionPercent.value).toBe(17) // 2/12 ≈ 17%
  })

  it('returns false for incomplete chapter', () => {
    const { isComplete } = useChapterProgress()
    expect(isComplete('5-scene-game-loop')).toBe(false)
  })
})
