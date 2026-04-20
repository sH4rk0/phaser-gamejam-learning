import { describe, it, expect, beforeEach } from 'vitest'
import { useQuizState } from '../app/composables/useQuizState'

describe('useQuizState', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null for unsaved chapter', () => {
    const { getScore } = useQuizState()
    expect(getScore('1-introduzione')).toBeNull()
  })

  it('saves and retrieves a score', () => {
    const { saveScore, getScore } = useQuizState()
    saveScore('1-introduzione', 4, 5)
    const result = getScore('1-introduzione')
    expect(result).toEqual({ score: 4, total: 5 })
  })

  it('overwrites previous score', () => {
    const { saveScore, getScore } = useQuizState()
    saveScore('1-introduzione', 3, 5)
    saveScore('1-introduzione', 5, 5)
    expect(getScore('1-introduzione')).toEqual({ score: 5, total: 5 })
  })

  it('saves scores for multiple chapters independently', () => {
    const { saveScore, getScore } = useQuizState()
    saveScore('1-introduzione', 5, 5)
    saveScore('2-setup-ambiente', 3, 5)
    expect(getScore('1-introduzione')).toEqual({ score: 5, total: 5 })
    expect(getScore('2-setup-ambiente')).toEqual({ score: 3, total: 5 })
  })
})
