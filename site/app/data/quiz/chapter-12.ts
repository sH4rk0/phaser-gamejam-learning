import type { QuizData } from './types'

export const quiz12: QuizData = {
  it: [
    {
      question: 'Quale metodo si usa per creare un ParticleEmitter in Phaser 4?',
      options: [
        { answer: 'this.particles.create()', correct: false },
        { answer: 'this.add.particles()', correct: true },
        { answer: 'this.make.emitter()', correct: false },
        { answer: 'new Phaser.Particles.Emitter()', correct: false },
      ],
    },
    {
      question: 'Quale modalità si usa per emettere tutte le particelle in un singolo burst?',
      options: [
        { answer: 'emitter.burst()', correct: false },
        { answer: 'emitter.fire()', correct: false },
        { answer: 'emitter.explode()', correct: true },
        { answer: 'emitter.emit()', correct: false },
      ],
    },
    {
      question: 'Come si configura una particella che si rimpicciolisce fino a scomparire durante la sua vita?',
      options: [
        { answer: 'scale: 0', correct: false },
        { answer: 'scale: { min: 1, max: 0 }', correct: false },
        { answer: 'scale: { start: 1, end: 0 }', correct: true },
        { answer: 'scaleEnd: 0', correct: false },
      ],
    },
    {
      question: 'Qual è la differenza tra `tint` e `color` nella config di un emitter?',
      options: [
        { answer: 'Non c\'è differenza, sono sinonimi', correct: false },
        { answer: '`color` interpola i valori dell\'array durante la vita della particella, `tint` applica un colore fisso o casuale', correct: true },
        { answer: '`tint` supporta l\'interpolazione, `color` no', correct: false },
        { answer: '`color` è deprecato in Phaser 4', correct: false },
      ],
    },
    {
      question: 'Come si aggiunge gravità verso il basso alle particelle?',
      options: [
        { answer: 'gravity: 300', correct: false },
        { answer: 'physics.gravity: 300', correct: false },
        { answer: 'gravityY: 300', correct: true },
        { answer: 'acceleration: { y: 300 }', correct: false },
      ],
    },
    {
      question: 'Quale proprietà impedisce all\'emitter di partire automaticamente alla creazione?',
      options: [
        { answer: 'autoStart: false', correct: false },
        { answer: 'emitting: false', correct: true },
        { answer: 'active: false', correct: false },
        { answer: 'paused: true', correct: false },
      ],
    },
    {
      question: 'Cosa fa `emitter.setFollow(gameObject)`?',
      options: [
        { answer: 'Fa sì che il gameObject segua l\'emitter', correct: false },
        { answer: 'Attacca l\'emitter al gameObject, seguendone la posizione automaticamente', correct: true },
        { answer: 'Copia la posizione del gameObject una sola volta', correct: false },
        { answer: 'Fa collisionare le particelle con il gameObject', correct: false },
      ],
    },
    {
      question: 'Quale tipo di `emitZone` emette particelle dal perimetro di una forma invece che dall\'interno?',
      options: [
        { answer: 'type: \'border\'', correct: false },
        { answer: 'type: \'perimeter\'', correct: false },
        { answer: 'type: \'edge\'', correct: true },
        { answer: 'type: \'outline\'', correct: false },
      ],
    },
    {
      question: 'Come si ferma l\'emissione dopo aver emesso esattamente 50 particelle?',
      options: [
        { answer: 'maxParticles: 50', correct: false },
        { answer: 'stopAfter: 50', correct: true },
        { answer: 'quantity: 50, repeat: 1', correct: false },
        { answer: 'limit: 50', correct: false },
      ],
    },
    {
      question: 'Cosa fa `deathZone` con `type: \'onLeave\'`?',
      options: [
        { answer: 'La particella muore quando entra nella zona', correct: false },
        { answer: 'La particella muore quando esce dalla zona', correct: true },
        { answer: 'La zona viene distrutta quando una particella la tocca', correct: false },
        { answer: 'Le particelle rimbalzano fuori dalla zona', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'Which method is used to create a ParticleEmitter in Phaser 4?',
      options: [
        { answer: 'this.particles.create()', correct: false },
        { answer: 'this.add.particles()', correct: true },
        { answer: 'this.make.emitter()', correct: false },
        { answer: 'new Phaser.Particles.Emitter()', correct: false },
      ],
    },
    {
      question: 'Which mode is used to emit all particles in a single burst?',
      options: [
        { answer: 'emitter.burst()', correct: false },
        { answer: 'emitter.fire()', correct: false },
        { answer: 'emitter.explode()', correct: true },
        { answer: 'emitter.emit()', correct: false },
      ],
    },
    {
      question: 'How do you configure a particle that shrinks to nothing during its lifetime?',
      options: [
        { answer: 'scale: 0', correct: false },
        { answer: 'scale: { min: 1, max: 0 }', correct: false },
        { answer: 'scale: { start: 1, end: 0 }', correct: true },
        { answer: 'scaleEnd: 0', correct: false },
      ],
    },
    {
      question: 'What is the difference between `tint` and `color` in an emitter config?',
      options: [
        { answer: 'There is no difference, they are synonyms', correct: false },
        { answer: '`color` interpolates array values over the particle\'s lifetime, `tint` applies a fixed or randomly picked color', correct: true },
        { answer: '`tint` supports interpolation, `color` does not', correct: false },
        { answer: '`color` is deprecated in Phaser 4', correct: false },
      ],
    },
    {
      question: 'How do you add downward gravity to particles?',
      options: [
        { answer: 'gravity: 300', correct: false },
        { answer: 'physics.gravity: 300', correct: false },
        { answer: 'gravityY: 300', correct: true },
        { answer: 'acceleration: { y: 300 }', correct: false },
      ],
    },
    {
      question: 'Which property prevents the emitter from starting automatically on creation?',
      options: [
        { answer: 'autoStart: false', correct: false },
        { answer: 'emitting: false', correct: true },
        { answer: 'active: false', correct: false },
        { answer: 'paused: true', correct: false },
      ],
    },
    {
      question: 'What does `emitter.setFollow(gameObject)` do?',
      options: [
        { answer: 'Makes the gameObject follow the emitter', correct: false },
        { answer: 'Attaches the emitter to the gameObject, automatically tracking its position', correct: true },
        { answer: 'Copies the gameObject\'s position once', correct: false },
        { answer: 'Makes particles collide with the gameObject', correct: false },
      ],
    },
    {
      question: 'Which `emitZone` type emits particles from the perimeter of a shape instead of its interior?',
      options: [
        { answer: 'type: \'border\'', correct: false },
        { answer: 'type: \'perimeter\'', correct: false },
        { answer: 'type: \'edge\'', correct: true },
        { answer: 'type: \'outline\'', correct: false },
      ],
    },
    {
      question: 'How do you stop emission after exactly 50 particles have been emitted?',
      options: [
        { answer: 'maxParticles: 50', correct: false },
        { answer: 'stopAfter: 50', correct: true },
        { answer: 'quantity: 50, repeat: 1', correct: false },
        { answer: 'limit: 50', correct: false },
      ],
    },
    {
      question: 'What does `deathZone` with `type: \'onLeave\'` do?',
      options: [
        { answer: 'The particle dies when it enters the zone', correct: false },
        { answer: 'The particle dies when it leaves the zone', correct: true },
        { answer: 'The zone is destroyed when a particle touches it', correct: false },
        { answer: 'Particles bounce off the zone boundary', correct: false },
      ],
    },
  ],
}
