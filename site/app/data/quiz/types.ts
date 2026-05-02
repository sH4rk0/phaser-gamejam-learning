export interface QuizOption {
  answer: string
  correct: boolean
}

export interface QuizQuestion {
  question: string
  options: QuizOption[]
}

export interface QuizData {
  it: QuizQuestion[]
  en: QuizQuestion[]
}
