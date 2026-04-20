import type { QuizQuestion } from './chapter-1'

export const quiz2: QuizQuestion[] = [
  {
    question: "Qual è il comando npm per installare le dipendenze del progetto?",
    options: [
      "npm run start",
      "npm install",
      "npm build",
      "npm dependencies"
    ],
    correct: 1
  },
  {
    question: "In quale file sono dichiarati tutti gli assets del gioco?",
    options: [
      "index.ts",
      "package.json",
      "GameData.ts",
      "webpack.common.js"
    ],
    correct: 2
  },
  {
    question: "Qual è il formato corretto per scrivere una chiave JSON composta da più parole?",
    options: [
      "year-born-date",
      "year_born_date",
      "YearBornDate",
      "yearBornDate"
    ],
    correct: 3
  },
  {
    question: "Qual è l'ordine corretto del flusso delle scene nel template?",
    options: [
      "Intro → Boot → Preloader → GamePlay",
      "Boot → Preloader → Intro → GamePlay",
      "Preloader → Boot → GamePlay → Intro",
      "GamePlay → Boot → Preloader → Intro"
    ],
    correct: 1
  },
  {
    question: "Quale cartella contiene tutti i pacchetti npm installati?",
    options: [
      "src/",
      "webpack/",
      "node_modules/",
      "public/"
    ],
    correct: 2
  },
  {
    question: "Qual è il comando per creare il pacchetto finale del gioco?",
    options: [
      "npm run start",
      "npm install",
      "npm run build",
      "npm run serve"
    ],
    correct: 2
  },
  {
    question: "Quale scena è responsabile del caricamento di tutti gli assets?",
    options: [
      "Boot",
      "Preloader",
      "Intro",
      "GamePlay"
    ],
    correct: 1
  },
  {
    question: "Cos'è l'Hot Reload?",
    options: [
      "Una tecnica per velocizzare il caricamento del gioco",
      "Un aggiornamento automatico del browser al salvataggio dei file",
      "Un metodo per comprimere gli assets",
      "Un sistema di cache del browser"
    ],
    correct: 1
  }
]
