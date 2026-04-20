import type { QuizQuestion } from './chapter-1'

export const quiz7: QuizQuestion[] = [
  {
    question: 'Come si accede alla camera principale in Phaser?',
    options: [
      'this.camera.main',
      'this.cameras.main',
      'this.scene.camera',
      'this.game.camera',
    ],
    correct: 1,
  },
  {
    question: 'Cosa fa il metodo setBounds() sulla camera?',
    options: [
      'Imposta la dimensione del viewport',
      'Definisce i limiti entro cui la camera può scorrere nel mondo di gioco',
      'Aggiunge un bordo visivo attorno alla camera',
      'Imposta la dimensione del canvas',
    ],
    correct: 1,
  },
  {
    question: 'Quale metodo deve essere chiamato ogni frame per aggiornare lo SmoothedKeyControl?',
    options: [
      'this._controls.tick()',
      'this._controls.refresh(delta)',
      'this._controls.update(delta)',
      'this._controls.apply()',
    ],
    correct: 2,
  },
  {
    question: 'Quali parametri di startFollow() controllano la fluidità del movimento della camera?',
    options: [
      'speedX e speedY',
      'lerpX e lerpY',
      'smoothX e smoothY',
      'followX e followY',
    ],
    correct: 1,
  },
  {
    question: 'Cosa fa il metodo pan() della camera?',
    options: [
      'Ruota la camera attorno al suo centro',
      'Sposta fluidamente la camera verso le coordinate indicate con easing',
      'Aggiunge un effetto panoramico statico',
      'Ridimensiona il viewport',
    ],
    correct: 1,
  },
  {
    question: 'Cosa restituisce worldView.getRandomPoint()?',
    options: [
      'Un numero casuale tra 0 e 1',
      'Le coordinate del centro del viewport',
      'Un oggetto Phaser.Geom.Point con coordinate casuali all\'interno del viewport',
      'Un punto casuale nel mondo di gioco intero',
    ],
    correct: 2,
  },
  {
    question: 'Quale effetto Phaser 4 sfuma la camera verso il nero per cambiare scena?',
    options: [
      'camera.dim()',
      'camera.fadeOut()',
      'camera.blackout()',
      'camera.dissolve()',
    ],
    correct: 1,
  },
  {
    question: 'Qual è il valore di intensità consigliato per il metodo shake()?',
    options: [
      '1.0 (valore massimo)',
      '0.5 (valore medio)',
      'Valori molto bassi, come 0.01–0.05',
      '100 (in pixel)',
    ],
    correct: 2,
  },
]
