import type { QuizQuestion } from './chapter-1'

export const quiz3: QuizQuestion[] = [
  {
    question: 'Qual è la principale differenza tra TypeScript e JavaScript?',
    options: [
      'TypeScript è più veloce di JavaScript',
      'TypeScript richiede la specifica dei tipi e deve essere compilato',
      'JavaScript supporta le classi, TypeScript no',
      'TypeScript funziona solo nel browser'
    ],
    correct: 1
  },
  {
    question: 'Quale parola chiave si usa per dichiarare una costante in TypeScript?',
    options: [
      'var',
      'let',
      'const',
      'static'
    ],
    correct: 2
  },
  {
    question: 'Qual è l\'indice del primo elemento di un array in TypeScript?',
    options: [
      '1',
      '0',
      '-1',
      'Dipende dalla dichiarazione'
    ],
    correct: 1
  },
  {
    question: 'Quale metodo aggiunge un elemento alla fine di un array?',
    options: [
      'shift()',
      'unshift()',
      'pop()',
      'push()'
    ],
    correct: 3
  },
  {
    question: 'Cosa indica il tipo di ritorno "void" in una funzione?',
    options: [
      'La funzione restituisce null',
      'La funzione non restituisce alcun valore',
      'La funzione restituisce undefined',
      'La funzione ha un errore'
    ],
    correct: 1
  },
  {
    question: 'Come si indica che una proprietà è opzionale in un\'interfaccia?',
    options: [
      'Usando la parola "optional"',
      'Mettendo "?" dopo il nome della proprietà',
      'Usando il tipo "any"',
      'Non è possibile in TypeScript'
    ],
    correct: 1
  },
  {
    question: 'Quale parola chiave si usa per far ereditare una classe da un\'altra?',
    options: [
      'inherits',
      'implements',
      'extends',
      'derive'
    ],
    correct: 2
  },
  {
    question: 'Quale modificatore di accesso rende una proprietà accessibile solo all\'interno della classe?',
    options: [
      'public',
      'protected',
      'private',
      'internal'
    ],
    correct: 2
  }
]
