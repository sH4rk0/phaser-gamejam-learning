import type { QuizQuestion } from './chapter-1'

export const quiz6: QuizQuestion[] = [
  {
    question: 'Quale metodo si usa per aggiungere un tween alla scena?',
    options: [
      'this.tween.create()',
      'this.tweens.add()',
      'this.add.tween()',
      'this.scene.tween()',
    ],
    correct: 1,
  },
  {
    question: 'Quale valore di `repeat` fa ripetere un tween all\'infinito?',
    options: ['0', '999', '-1', 'Infinity'],
    correct: 2,
  },
  {
    question: 'Quale evento del Tween viene eseguito quando l\'animazione inverte la direzione?',
    options: ['onComplete', 'onReverse', 'onYoyo', 'onLoop'],
    correct: 2,
  },
  {
    question: 'Qual è il tipo TypeScript corretto per dichiarare una variabile musica in Phaser 4?',
    options: [
      'Phaser.Sound.AudioSprite',
      'Phaser.Sound.BaseSound',
      'Phaser.Sound.Music',
      'Phaser.Audio.BaseSound',
    ],
    correct: 1,
  },
  {
    question: 'Quale metodo si usa per riprodurre un effetto sonoro da un AudioSprite?',
    options: [
      'this.sound.play("sfx", "splash")',
      'this.sound.playSprite("sfx", "splash")',
      'this.sound.playAudioSprite("sfx", "splash")',
      'this.sound.addSprite("sfx", "splash")',
    ],
    correct: 2,
  },
  {
    question: 'Cosa restituisce `this.time.now`?',
    options: [
      'La data corrente come oggetto Date',
      'Il numero di frame dall\'inizio del gioco',
      'Il tempo trascorso in millisecondi dall\'inizializzazione del gioco',
      'Il timestamp Unix corrente',
    ],
    correct: 2,
  },
  {
    question: 'Quale attributo di `time.addEvent` permette di iniziare il timer come se del tempo fosse già trascorso?',
    options: ['offset', 'startAt', 'skip', 'initialDelay'],
    correct: 1,
  },
  {
    question: 'In una Timeline, cosa rappresenta la proprietà `at`?',
    options: [
      'Il ritardo rispetto all\'evento precedente',
      'Il momento assoluto in ms dall\'inizio del play() in cui l\'evento si attiva',
      'Il frame in cui eseguire l\'evento',
      'Il numero d\'ordine dell\'evento',
    ],
    correct: 1,
  },
]
