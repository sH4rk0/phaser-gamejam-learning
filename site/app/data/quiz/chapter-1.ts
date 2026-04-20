// site/data/quiz/chapter-1.ts
export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
}

export const quiz1: QuizQuestion[] = [
  {
    question: 'Qual è il ruolo principale di Node.js nello sviluppo con Phaser 4?',
    options: [
      'Eseguire il gioco direttamente senza browser',
      'Fornire il runtime per gli strumenti di sviluppo, build e gestione pacchetti',
      'Sostituire TypeScript come linguaggio di programmazione',
      'Funzionare come database per i punteggi del gioco',
    ],
    correct: 1,
  },
  {
    question: 'Quale bundler è utilizzato nel nostro template Phaser 4?',
    options: [
      'Webpack',
      'Parcel',
      'Vite',
      'Rollup',
    ],
    correct: 0,
  },
  {
    question: 'TypeScript è un superset di quale linguaggio?',
    options: [
      'Python',
      'Java',
      'JavaScript',
      'C#',
    ],
    correct: 2,
  },
  {
    question: 'Quale renderer usa Phaser 4 come principale?',
    options: [
      'Canvas 2D',
      'SVG',
      'DOM',
      'WebGL',
    ],
    correct: 3,
  },
  {
    question: 'Quale servizio Firebase è più utile per gestire una classifica (leaderboard) in un gioco browser?',
    options: [
      'Firebase Authentication',
      'Firebase Hosting',
      'Realtime Database',
      'Firebase Storage',
    ],
    correct: 2,
  },
]
