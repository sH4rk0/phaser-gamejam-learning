import type { QuizQuestion } from './chapter-1'

export const quiz4: QuizQuestion[] = [
  {
    question: 'In quale file si trova la configurazione iniziale del gioco Phaser?',
    options: [
      'GameData.ts',
      'index.ts',
      'Boot.ts',
      'package.json',
    ],
    correct: 1,
  },
  {
    question: 'Quale evento del browser viene usato per inizializzare il gioco Phaser?',
    options: [
      'DOMContentLoaded',
      'click',
      'load',
      'ready',
    ],
    correct: 2,
  },
  {
    question: 'Quante volte al secondo viene eseguito il metodo update() di una scena Phaser?',
    options: [
      '30',
      '24',
      '60',
      '120',
    ],
    correct: 2,
  },
  {
    question: 'Quale metodo di una scena viene eseguito prima di create() e serve a caricare gli asset?',
    options: [
      'init()',
      'preload()',
      'load()',
      'setup()',
    ],
    correct: 1,
  },
  {
    question: 'Quale metodo usi per avviare una nuova scena Phaser?',
    options: [
      'this.scene.launch("NomeScena")',
      'this.scene.run("NomeScena")',
      'this.scene.start("NomeScena")',
      'this.scene.open("NomeScena")',
    ],
    correct: 2,
  },
  {
    question: 'Come si passa un valore tra due scene che vengono eseguite contemporaneamente (es. GamePlay → Hud)?',
    options: [
      'Usando una variabile globale window',
      'Emettendo un evento con this.events.emit()',
      'Riavviando entrambe le scene',
      'Usando localStorage',
    ],
    correct: 1,
  },
  {
    question: 'Cosa fa this.registry.set("level", 0) in una scena Phaser?',
    options: [
      'Crea un nuovo livello di gioco',
      'Salva il valore 0 nella chiave "level" di uno storage condiviso tra scene',
      'Imposta la difficoltà del gioco a 0',
      'Registra un evento chiamato "level"',
    ],
    correct: 1,
  },
]
