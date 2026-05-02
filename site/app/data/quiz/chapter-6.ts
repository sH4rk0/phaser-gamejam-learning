import type { QuizData } from './types'

export const quiz6: QuizData = {
  it: [
    {
      question: 'Quale metodo si usa per aggiungere un tween alla scena?',
      options: [
        { answer: 'this.tween.create()', correct: false },
        { answer: 'this.tweens.add()', correct: true },
        { answer: 'this.add.tween()', correct: false },
        { answer: 'this.scene.tween()', correct: false },
      ],
    },
    {
      question: "Quale valore di `repeat` fa ripetere un tween all'infinito?",
      options: [
        { answer: '0', correct: false },
        { answer: '999', correct: false },
        { answer: '-1', correct: true },
        { answer: 'Infinity', correct: false },
      ],
    },
    {
      question: "Quale evento del Tween viene eseguito quando l'animazione inverte la direzione?",
      options: [
        { answer: 'onComplete', correct: false },
        { answer: 'onReverse', correct: false },
        { answer: 'onYoyo', correct: true },
        { answer: 'onLoop', correct: false },
      ],
    },
    {
      question: 'Qual è il tipo TypeScript corretto per dichiarare una variabile musica in Phaser 4?',
      options: [
        { answer: 'Phaser.Sound.AudioSprite', correct: false },
        { answer: 'Phaser.Sound.BaseSound', correct: true },
        { answer: 'Phaser.Sound.Music', correct: false },
        { answer: 'Phaser.Audio.BaseSound', correct: false },
      ],
    },
    {
      question: 'Quale metodo si usa per riprodurre un effetto sonoro da un AudioSprite?',
      options: [
        { answer: 'this.sound.play("sfx", "splash")', correct: false },
        { answer: 'this.sound.playSprite("sfx", "splash")', correct: false },
        { answer: 'this.sound.playAudioSprite("sfx", "splash")', correct: true },
        { answer: 'this.sound.addSprite("sfx", "splash")', correct: false },
      ],
    },
    {
      question: 'Cosa restituisce `this.time.now`?',
      options: [
        { answer: 'La data corrente come oggetto Date', correct: false },
        { answer: "Il numero di frame dall'inizio del gioco", correct: false },
        { answer: "Il tempo trascorso in millisecondi dall'inizializzazione del gioco", correct: true },
        { answer: 'Il timestamp Unix corrente', correct: false },
      ],
    },
    {
      question: 'Quale attributo di `time.addEvent` permette di iniziare il timer come se del tempo fosse già trascorso?',
      options: [
        { answer: 'offset', correct: false },
        { answer: 'startAt', correct: true },
        { answer: 'skip', correct: false },
        { answer: 'initialDelay', correct: false },
      ],
    },
    {
      question: "In una Timeline, cosa rappresenta la proprietà `at`?",
      options: [
        { answer: "Il ritardo rispetto all'evento precedente", correct: false },
        { answer: "Il momento assoluto in ms dall'inizio del play() in cui l'evento si attiva", correct: true },
        { answer: "Il frame in cui eseguire l'evento", correct: false },
        { answer: "Il numero d'ordine dell'evento", correct: false },
      ],
    },
    {
      question: 'Cosa fa yoyo: true in un tween?',
      options: [
        { answer: "Ripete l'animazione all'infinito", correct: false },
        { answer: "Inverte la direzione dell'animazione al termine di ogni ciclo", correct: true },
        { answer: "Ferma l'animazione a metà percorso", correct: false },
        { answer: "Inizia l'animazione dalla fine", correct: false },
      ],
    },
    {
      question: 'Come si crea un timer che si ripete ogni 2 secondi?',
      options: [
        { answer: 'this.time.setInterval(fn, 2000)', correct: false },
        { answer: 'this.time.addEvent({ delay: 2000, callback: fn, loop: true })', correct: true },
        { answer: 'this.time.repeat(2000, fn)', correct: false },
        { answer: 'setTimeout(fn, 2000)', correct: false },
      ],
    },
    {
      question: 'Quale proprietà del tween controlla la durata in millisecondi?',
      options: [
        { answer: 'speed', correct: false },
        { answer: 'duration', correct: true },
        { answer: 'time', correct: false },
        { answer: 'length', correct: false },
      ],
    },
    {
      question: 'Come si mette in pausa tutta la musica del gioco?',
      options: [
        { answer: 'this.music.pause()', correct: false },
        { answer: 'this.sound.pauseAll()', correct: true },
        { answer: 'this.audio.stop()', correct: false },
        { answer: 'Phaser.Sound.pause()', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'Which method adds a tween to the scene?',
      options: [
        { answer: 'this.tween.create()', correct: false },
        { answer: 'this.tweens.add()', correct: true },
        { answer: 'this.add.tween()', correct: false },
        { answer: 'this.scene.tween()', correct: false },
      ],
    },
    {
      question: 'Which `repeat` value makes a tween repeat indefinitely?',
      options: [
        { answer: '0', correct: false },
        { answer: '999', correct: false },
        { answer: '-1', correct: true },
        { answer: 'Infinity', correct: false },
      ],
    },
    {
      question: 'Which Tween event fires when the animation reverses direction?',
      options: [
        { answer: 'onComplete', correct: false },
        { answer: 'onReverse', correct: false },
        { answer: 'onYoyo', correct: true },
        { answer: 'onLoop', correct: false },
      ],
    },
    {
      question: 'What is the correct TypeScript type for a music variable in Phaser 4?',
      options: [
        { answer: 'Phaser.Sound.AudioSprite', correct: false },
        { answer: 'Phaser.Sound.BaseSound', correct: true },
        { answer: 'Phaser.Sound.Music', correct: false },
        { answer: 'Phaser.Audio.BaseSound', correct: false },
      ],
    },
    {
      question: 'Which method plays a sound effect from an AudioSprite?',
      options: [
        { answer: 'this.sound.play("sfx", "splash")', correct: false },
        { answer: 'this.sound.playSprite("sfx", "splash")', correct: false },
        { answer: 'this.sound.playAudioSprite("sfx", "splash")', correct: true },
        { answer: 'this.sound.addSprite("sfx", "splash")', correct: false },
      ],
    },
    {
      question: 'What does `this.time.now` return?',
      options: [
        { answer: 'The current date as a Date object', correct: false },
        { answer: 'The number of frames since game start', correct: false },
        { answer: 'The elapsed time in milliseconds since game initialization', correct: true },
        { answer: 'The current Unix timestamp', correct: false },
      ],
    },
    {
      question: 'Which `time.addEvent` attribute starts the timer as if time had already elapsed?',
      options: [
        { answer: 'offset', correct: false },
        { answer: 'startAt', correct: true },
        { answer: 'skip', correct: false },
        { answer: 'initialDelay', correct: false },
      ],
    },
    {
      question: 'In a Timeline, what does the `at` property represent?',
      options: [
        { answer: 'The delay relative to the previous event', correct: false },
        { answer: 'The absolute moment in ms from the play() call when the event fires', correct: true },
        { answer: 'The frame at which to execute the event', correct: false },
        { answer: 'The sequence number of the event', correct: false },
      ],
    },
    {
      question: 'What does yoyo: true do in a tween?',
      options: [
        { answer: 'Repeats the animation indefinitely', correct: false },
        { answer: 'Reverses the animation direction at the end of each cycle', correct: true },
        { answer: 'Stops the animation halfway', correct: false },
        { answer: 'Starts the animation from the end', correct: false },
      ],
    },
    {
      question: 'How do you create a timer that repeats every 2 seconds?',
      options: [
        { answer: 'this.time.setInterval(fn, 2000)', correct: false },
        { answer: 'this.time.addEvent({ delay: 2000, callback: fn, loop: true })', correct: true },
        { answer: 'this.time.repeat(2000, fn)', correct: false },
        { answer: 'setTimeout(fn, 2000)', correct: false },
      ],
    },
    {
      question: 'Which tween property controls the duration in milliseconds?',
      options: [
        { answer: 'speed', correct: false },
        { answer: 'duration', correct: true },
        { answer: 'time', correct: false },
        { answer: 'length', correct: false },
      ],
    },
    {
      question: 'How do you pause all game music?',
      options: [
        { answer: 'this.music.pause()', correct: false },
        { answer: 'this.sound.pauseAll()', correct: true },
        { answer: 'this.audio.stop()', correct: false },
        { answer: 'Phaser.Sound.pause()', correct: false },
      ],
    },
  ],
}
