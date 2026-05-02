import type { QuizData } from './types'

export const quiz7: QuizData = {
  it: [
    {
      question: 'Come si accede alla camera principale in Phaser?',
      options: [
        { answer: 'this.camera.main', correct: false },
        { answer: 'this.cameras.main', correct: true },
        { answer: 'this.scene.camera', correct: false },
        { answer: 'this.game.camera', correct: false },
      ],
    },
    {
      question: 'Cosa fa il metodo setBounds() sulla camera?',
      options: [
        { answer: 'Imposta la dimensione del viewport', correct: false },
        { answer: 'Definisce i limiti entro cui la camera può scorrere nel mondo di gioco', correct: true },
        { answer: 'Aggiunge un bordo visivo attorno alla camera', correct: false },
        { answer: 'Imposta la dimensione del canvas', correct: false },
      ],
    },
    {
      question: 'Quale metodo deve essere chiamato ogni frame per aggiornare lo SmoothedKeyControl?',
      options: [
        { answer: 'this._controls.tick()', correct: false },
        { answer: 'this._controls.refresh(delta)', correct: false },
        { answer: 'this._controls.update(delta)', correct: true },
        { answer: 'this._controls.apply()', correct: false },
      ],
    },
    {
      question: 'Quali parametri di startFollow() controllano la fluidità del movimento della camera?',
      options: [
        { answer: 'speedX e speedY', correct: false },
        { answer: 'lerpX e lerpY', correct: true },
        { answer: 'smoothX e smoothY', correct: false },
        { answer: 'followX e followY', correct: false },
      ],
    },
    {
      question: 'Cosa fa il metodo pan() della camera?',
      options: [
        { answer: 'Ruota la camera attorno al suo centro', correct: false },
        { answer: 'Sposta fluidamente la camera verso le coordinate indicate con easing', correct: true },
        { answer: 'Aggiunge un effetto panoramico statico', correct: false },
        { answer: 'Ridimensiona il viewport', correct: false },
      ],
    },
    {
      question: 'Cosa restituisce worldView.getRandomPoint()?',
      options: [
        { answer: 'Un numero casuale tra 0 e 1', correct: false },
        { answer: 'Le coordinate del centro del viewport', correct: false },
        { answer: "Un oggetto Phaser.Geom.Point con coordinate casuali all'interno del viewport", correct: true },
        { answer: 'Un punto casuale nel mondo di gioco intero', correct: false },
      ],
    },
    {
      question: 'Quale effetto Phaser 4 sfuma la camera verso il nero per cambiare scena?',
      options: [
        { answer: 'camera.dim()', correct: false },
        { answer: 'camera.fadeOut()', correct: true },
        { answer: 'camera.blackout()', correct: false },
        { answer: 'camera.dissolve()', correct: false },
      ],
    },
    {
      question: 'Qual è il valore di intensità consigliato per il metodo shake()?',
      options: [
        { answer: '1.0 (valore massimo)', correct: false },
        { answer: '0.5 (valore medio)', correct: false },
        { answer: 'Valori molto bassi, come 0.01–0.05', correct: true },
        { answer: '100 (in pixel)', correct: false },
      ],
    },
    {
      question: 'Cosa fa setZoom(2) sulla camera?',
      options: [
        { answer: 'Rimpicciolisce il mondo a metà', correct: false },
        { answer: 'Ingrandisce la vista raddoppiando la dimensione degli oggetti', correct: true },
        { answer: 'Sposta la camera di 2 unità', correct: false },
        { answer: 'Raddoppia la velocità di scorrimento', correct: false },
      ],
    },
    {
      question: "Qual è la differenza tra scrollX e startFollow()?",
      options: [
        { answer: "Non c'è differenza, entrambi muovono la camera", correct: false },
        { answer: 'scrollX posiziona manualmente la camera, startFollow() la muove automaticamente seguendo un target', correct: true },
        { answer: 'scrollX funziona solo sull\'asse X, startFollow solo sull\'asse Y', correct: false },
        { answer: 'startFollow() è deprecato in Phaser 4', correct: false },
      ],
    },
    {
      question: 'Come si ottiene la dimensione visibile del mondo tramite la camera?',
      options: [
        { answer: 'this.cameras.main.size', correct: false },
        { answer: 'this.cameras.main.worldView', correct: true },
        { answer: 'this.cameras.main.viewport', correct: false },
        { answer: 'this.game.canvas.getBoundingRect()', correct: false },
      ],
    },
    {
      question: 'Quale metodo imposta il colore di sfondo del viewport della camera?',
      options: [
        { answer: 'camera.background(color)', correct: false },
        { answer: 'camera.setBackgroundColor(color)', correct: true },
        { answer: 'camera.fillColor(color)', correct: false },
        { answer: 'camera.clearColor(color)', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'How do you access the main camera in Phaser?',
      options: [
        { answer: 'this.camera.main', correct: false },
        { answer: 'this.cameras.main', correct: true },
        { answer: 'this.scene.camera', correct: false },
        { answer: 'this.game.camera', correct: false },
      ],
    },
    {
      question: 'What does the setBounds() method do on the camera?',
      options: [
        { answer: 'Sets the viewport size', correct: false },
        { answer: 'Defines the limits within which the camera can scroll the game world', correct: true },
        { answer: 'Adds a visual border around the camera', correct: false },
        { answer: 'Sets the canvas size', correct: false },
      ],
    },
    {
      question: 'Which method must be called every frame to update SmoothedKeyControl?',
      options: [
        { answer: 'this._controls.tick()', correct: false },
        { answer: 'this._controls.refresh(delta)', correct: false },
        { answer: 'this._controls.update(delta)', correct: true },
        { answer: 'this._controls.apply()', correct: false },
      ],
    },
    {
      question: 'Which startFollow() parameters control the smoothness of camera movement?',
      options: [
        { answer: 'speedX and speedY', correct: false },
        { answer: 'lerpX and lerpY', correct: true },
        { answer: 'smoothX and smoothY', correct: false },
        { answer: 'followX and followY', correct: false },
      ],
    },
    {
      question: 'What does the camera pan() method do?',
      options: [
        { answer: 'Rotates the camera around its center', correct: false },
        { answer: 'Smoothly moves the camera to the given coordinates with easing', correct: true },
        { answer: 'Adds a static panoramic effect', correct: false },
        { answer: 'Resizes the viewport', correct: false },
      ],
    },
    {
      question: 'What does worldView.getRandomPoint() return?',
      options: [
        { answer: 'A random number between 0 and 1', correct: false },
        { answer: 'The coordinates of the viewport center', correct: false },
        { answer: 'A Phaser.Geom.Point with random coordinates inside the viewport', correct: true },
        { answer: 'A random point in the entire game world', correct: false },
      ],
    },
    {
      question: 'Which Phaser 4 effect fades the camera to black for scene transitions?',
      options: [
        { answer: 'camera.dim()', correct: false },
        { answer: 'camera.fadeOut()', correct: true },
        { answer: 'camera.blackout()', correct: false },
        { answer: 'camera.dissolve()', correct: false },
      ],
    },
    {
      question: 'What is the recommended intensity value for the shake() method?',
      options: [
        { answer: '1.0 (maximum value)', correct: false },
        { answer: '0.5 (medium value)', correct: false },
        { answer: 'Very low values, such as 0.01–0.05', correct: true },
        { answer: '100 (in pixels)', correct: false },
      ],
    },
    {
      question: 'What does setZoom(2) do on the camera?',
      options: [
        { answer: 'Shrinks the world to half', correct: false },
        { answer: 'Zooms in by doubling the size of objects', correct: true },
        { answer: 'Moves the camera by 2 units', correct: false },
        { answer: 'Doubles the scrolling speed', correct: false },
      ],
    },
    {
      question: 'What is the difference between scrollX and startFollow()?',
      options: [
        { answer: "There's no difference, both move the camera", correct: false },
        { answer: 'scrollX manually positions the camera, startFollow() automatically tracks a target', correct: true },
        { answer: 'scrollX only works on the X axis, startFollow only on Y', correct: false },
        { answer: 'startFollow() is deprecated in Phaser 4', correct: false },
      ],
    },
    {
      question: 'How do you get the visible area of the world through the camera?',
      options: [
        { answer: 'this.cameras.main.size', correct: false },
        { answer: 'this.cameras.main.worldView', correct: true },
        { answer: 'this.cameras.main.viewport', correct: false },
        { answer: 'this.game.canvas.getBoundingRect()', correct: false },
      ],
    },
    {
      question: 'Which method sets the background color of the camera viewport?',
      options: [
        { answer: 'camera.background(color)', correct: false },
        { answer: 'camera.setBackgroundColor(color)', correct: true },
        { answer: 'camera.fillColor(color)', correct: false },
        { answer: 'camera.clearColor(color)', correct: false },
      ],
    },
  ],
}
