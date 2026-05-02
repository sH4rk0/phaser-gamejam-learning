import type { QuizData } from './types'

export const quiz5: QuizData = {
  it: [
    {
      question: 'Quale metodo si usa per aggiungere un testo alla scena corrente?',
      options: [
        { answer: 'this.create.text()', correct: false },
        { answer: 'this.add.text()', correct: true },
        { answer: 'this.scene.add()', correct: false },
        { answer: 'this.spawn.text()', correct: false },
      ],
    },
    {
      question: 'Cosa controlla il metodo .setDepth()?',
      options: [
        { answer: 'La profondità fisica del gameObject nella scena 3D', correct: false },
        { answer: 'Lo z-index di visualizzazione del gameObject', correct: true },
        { answer: 'La distanza dalla camera', correct: false },
        { answer: 'La dimensione del gameObject', correct: false },
      ],
    },
    {
      question: 'Quale valore di setScrollFactor mantiene un gameObject fisso sullo schermo indipendentemente dalla camera?',
      options: [
        { answer: '1', correct: false },
        { answer: '-1', correct: false },
        { answer: '0', correct: true },
        { answer: '0.5', correct: false },
      ],
    },
    {
      question: 'Qual è la differenza principale tra setTint e setTintFill?',
      options: [
        { answer: 'setTint funziona solo sugli sprite, setTintFill sulle immagini', correct: false },
        { answer: 'setTint moltiplica i colori della texture, setTintFill li sostituisce completamente', correct: true },
        { answer: 'setTint accetta valori RGB, setTintFill accetta valori esadecimali', correct: false },
        { answer: "Non c'è differenza, sono sinonimi", correct: false },
      ],
    },
    {
      question: 'Qual è la differenza tra Image e Sprite in Phaser?',
      options: [
        { answer: 'Image supporta le animazioni, Sprite no', correct: false },
        { answer: 'Sprite supporta le animazioni, Image no', correct: true },
        { answer: 'Image è più grande di Sprite', correct: false },
        { answer: "Non c'è differenza pratica", correct: false },
      ],
    },
    {
      question: "Cosa fa il parametro repeat: -1 nella configurazione di un'animazione?",
      options: [
        { answer: "Riproduce l'animazione al contrario", correct: false },
        { answer: "Esegue l'animazione una sola volta", correct: false },
        { answer: "Ripete l'animazione all'infinito", correct: true },
        { answer: "Ferma l'animazione dopo un secondo", correct: false },
      ],
    },
    {
      question: 'A cosa serve la TileSprite?',
      options: [
        { answer: 'Visualizzare sprite con più livelli di colore', correct: false },
        { answer: 'Creare sfondi con texture ripetuta, ad esempio per effetti parallasse', correct: true },
        { answer: 'Gestire collisioni tra tile', correct: false },
        { answer: 'Animare immagini statiche', correct: false },
      ],
    },
    {
      question: 'Quale metodo del Group restituisce tutti gli elementi che contiene?',
      options: [
        { answer: '.getAll()', correct: false },
        { answer: '.children()', correct: false },
        { answer: '.getChildren()', correct: true },
        { answer: '.list()', correct: false },
      ],
    },
    {
      question: 'Cosa fa setOrigin(0.5, 0.5) su un gameObject?',
      options: [
        { answer: 'Sposta il gameObject al centro dello schermo', correct: false },
        { answer: 'Imposta il punto di ancoraggio al centro del gameObject', correct: true },
        { answer: 'Ridimensiona il gameObject alla metà delle sue dimensioni', correct: false },
        { answer: 'Ruota il gameObject di 45 gradi', correct: false },
      ],
    },
    {
      question: 'Come si crea un Container in Phaser?',
      options: [
        { answer: 'this.add.group()', correct: false },
        { answer: 'this.add.container(x, y)', correct: true },
        { answer: 'this.add.layer(x, y)', correct: false },
        { answer: 'new Phaser.Container(this, x, y)', correct: false },
      ],
    },
    {
      question: "Quale metodo si usa per scalare un gameObject proporzionalmente?",
      options: [
        { answer: '.setSize(w, h)', correct: false },
        { answer: '.setScale(value)', correct: true },
        { answer: '.resize(value)', correct: false },
        { answer: '.zoom(value)', correct: false },
      ],
    },
    {
      question: 'Cosa fa .setAlpha(0) su un gameObject?',
      options: [
        { answer: 'Lo elimina dalla scena', correct: false },
        { answer: 'Lo rende completamente invisibile senza rimuoverlo', correct: true },
        { answer: 'Disabilita le sue collisioni', correct: false },
        { answer: 'Lo mette in pausa', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'Which method adds text to the current scene?',
      options: [
        { answer: 'this.create.text()', correct: false },
        { answer: 'this.add.text()', correct: true },
        { answer: 'this.scene.add()', correct: false },
        { answer: 'this.spawn.text()', correct: false },
      ],
    },
    {
      question: 'What does the .setDepth() method control?',
      options: [
        { answer: 'The physical depth of the gameObject in 3D space', correct: false },
        { answer: 'The display z-index of the gameObject', correct: true },
        { answer: 'The distance from the camera', correct: false },
        { answer: 'The size of the gameObject', correct: false },
      ],
    },
    {
      question: 'Which setScrollFactor value keeps a gameObject fixed on screen regardless of the camera?',
      options: [
        { answer: '1', correct: false },
        { answer: '-1', correct: false },
        { answer: '0', correct: true },
        { answer: '0.5', correct: false },
      ],
    },
    {
      question: 'What is the main difference between setTint and setTintFill?',
      options: [
        { answer: 'setTint works only on sprites, setTintFill on images', correct: false },
        { answer: 'setTint multiplies texture colors, setTintFill replaces them completely', correct: true },
        { answer: 'setTint accepts RGB values, setTintFill accepts hex values', correct: false },
        { answer: 'There is no difference, they are synonyms', correct: false },
      ],
    },
    {
      question: 'What is the difference between Image and Sprite in Phaser?',
      options: [
        { answer: 'Image supports animations, Sprite does not', correct: false },
        { answer: 'Sprite supports animations, Image does not', correct: true },
        { answer: 'Image is larger than Sprite', correct: false },
        { answer: 'There is no practical difference', correct: false },
      ],
    },
    {
      question: 'What does the repeat: -1 parameter do in an animation config?',
      options: [
        { answer: 'Plays the animation in reverse', correct: false },
        { answer: 'Plays the animation only once', correct: false },
        { answer: 'Repeats the animation indefinitely', correct: true },
        { answer: 'Stops the animation after one second', correct: false },
      ],
    },
    {
      question: 'What is TileSprite used for?',
      options: [
        { answer: 'Displaying sprites with multiple color layers', correct: false },
        { answer: 'Creating tiling backgrounds, for example for parallax effects', correct: true },
        { answer: 'Managing collisions between tiles', correct: false },
        { answer: 'Animating static images', correct: false },
      ],
    },
    {
      question: 'Which Group method returns all its child elements?',
      options: [
        { answer: '.getAll()', correct: false },
        { answer: '.children()', correct: false },
        { answer: '.getChildren()', correct: true },
        { answer: '.list()', correct: false },
      ],
    },
    {
      question: 'What does setOrigin(0.5, 0.5) do on a gameObject?',
      options: [
        { answer: 'Moves the gameObject to the center of the screen', correct: false },
        { answer: 'Sets the anchor point to the center of the gameObject', correct: true },
        { answer: 'Scales the gameObject to half its size', correct: false },
        { answer: 'Rotates the gameObject by 45 degrees', correct: false },
      ],
    },
    {
      question: 'How do you create a Container in Phaser?',
      options: [
        { answer: 'this.add.group()', correct: false },
        { answer: 'this.add.container(x, y)', correct: true },
        { answer: 'this.add.layer(x, y)', correct: false },
        { answer: 'new Phaser.Container(this, x, y)', correct: false },
      ],
    },
    {
      question: 'Which method scales a gameObject proportionally?',
      options: [
        { answer: '.setSize(w, h)', correct: false },
        { answer: '.setScale(value)', correct: true },
        { answer: '.resize(value)', correct: false },
        { answer: '.zoom(value)', correct: false },
      ],
    },
    {
      question: 'What does .setAlpha(0) do on a gameObject?',
      options: [
        { answer: 'Removes it from the scene', correct: false },
        { answer: 'Makes it completely invisible without removing it', correct: true },
        { answer: 'Disables its collisions', correct: false },
        { answer: 'Pauses it', correct: false },
      ],
    },
  ],
}
