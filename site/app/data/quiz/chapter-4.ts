import type { QuizData } from './types'

export const quiz4: QuizData = {
  it: [
    {
      question: 'In quale file si trova la configurazione iniziale del gioco Phaser?',
      options: [
        { answer: 'GameData.ts', correct: false },
        { answer: 'index.ts', correct: true },
        { answer: 'Boot.ts', correct: false },
        { answer: 'package.json', correct: false },
      ],
    },
    {
      question: 'Quale evento del browser viene usato per inizializzare il gioco Phaser?',
      options: [
        { answer: 'DOMContentLoaded', correct: false },
        { answer: 'click', correct: false },
        { answer: 'load', correct: true },
        { answer: 'ready', correct: false },
      ],
    },
    {
      question: 'Quante volte al secondo viene eseguito il metodo update() di una scena Phaser?',
      options: [
        { answer: '30', correct: false },
        { answer: '24', correct: false },
        { answer: '60', correct: true },
        { answer: '120', correct: false },
      ],
    },
    {
      question: 'Quale metodo di una scena viene eseguito prima di create() e serve a caricare gli asset?',
      options: [
        { answer: 'init()', correct: false },
        { answer: 'preload()', correct: true },
        { answer: 'load()', correct: false },
        { answer: 'setup()', correct: false },
      ],
    },
    {
      question: 'Quale metodo usi per avviare una nuova scena Phaser?',
      options: [
        { answer: 'this.scene.launch("NomeScena")', correct: false },
        { answer: 'this.scene.run("NomeScena")', correct: false },
        { answer: 'this.scene.start("NomeScena")', correct: true },
        { answer: 'this.scene.open("NomeScena")', correct: false },
      ],
    },
    {
      question: 'Come si passa un valore tra due scene eseguite contemporaneamente?',
      options: [
        { answer: 'Usando una variabile globale window', correct: false },
        { answer: 'Emettendo un evento con this.events.emit()', correct: true },
        { answer: 'Riavviando entrambe le scene', correct: false },
        { answer: 'Usando localStorage', correct: false },
      ],
    },
    {
      question: 'Cosa fa this.registry.set("level", 0) in una scena Phaser?',
      options: [
        { answer: 'Crea un nuovo livello di gioco', correct: false },
        { answer: 'Salva il valore 0 nella chiave "level" di uno storage condiviso tra scene', correct: true },
        { answer: 'Imposta la difficoltà del gioco a 0', correct: false },
        { answer: 'Registra un evento chiamato "level"', correct: false },
      ],
    },
    {
      question: 'Quale proprietà nella configurazione Phaser imposta la larghezza del canvas?',
      options: [
        { answer: 'canvasWidth', correct: false },
        { answer: 'size.width', correct: false },
        { answer: 'width', correct: true },
        { answer: 'viewport', correct: false },
      ],
    },
    {
      question: 'Come si forza Phaser a usare il renderer Canvas 2D invece di WebGL?',
      options: [
        { answer: 'Impostando `renderer: Phaser.CANVAS` nella config', correct: false },
        { answer: 'Impostando `type: Phaser.CANVAS` nella config', correct: true },
        { answer: 'Aggiungendo `webgl: false` nella config', correct: false },
        { answer: 'Non è possibile, Phaser usa sempre WebGL', correct: false },
      ],
    },
    {
      question: 'Quale metodo del ciclo di vita della scena viene chiamato una sola volta quando la scena viene avviata?',
      options: [
        { answer: 'update()', correct: false },
        { answer: 'render()', correct: false },
        { answer: 'create()', correct: true },
        { answer: 'tick()', correct: false },
      ],
    },
    {
      question: 'Cosa fa this.scene.pause() su una scena in esecuzione?',
      options: [
        { answer: 'Distrugge la scena rimuovendola dalla memoria', correct: false },
        { answer: 'Sospende il game loop della scena mantenendola visibile', correct: true },
        { answer: 'Nasconde la scena senza fermare il game loop', correct: false },
        { answer: 'Avvia una nuova istanza della scena', correct: false },
      ],
    },
    {
      question: "Qual è il parametro `parent` nell'oggetto di configurazione Phaser?",
      options: [
        { answer: 'La scena da cui deriva il gioco', correct: false },
        { answer: "L'ID o il riferimento all'elemento DOM che conterrà il canvas", correct: true },
        { answer: 'La configurazione della scena padre', correct: false },
        { answer: 'Il renderer genitore', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'In which file is the initial Phaser game configuration found?',
      options: [
        { answer: 'GameData.ts', correct: false },
        { answer: 'index.ts', correct: true },
        { answer: 'Boot.ts', correct: false },
        { answer: 'package.json', correct: false },
      ],
    },
    {
      question: 'Which browser event is used to initialize the Phaser game?',
      options: [
        { answer: 'DOMContentLoaded', correct: false },
        { answer: 'click', correct: false },
        { answer: 'load', correct: true },
        { answer: 'ready', correct: false },
      ],
    },
    {
      question: "How many times per second is a scene's update() method executed?",
      options: [
        { answer: '30', correct: false },
        { answer: '24', correct: false },
        { answer: '60', correct: true },
        { answer: '120', correct: false },
      ],
    },
    {
      question: 'Which scene method runs before create() and is used to load assets?',
      options: [
        { answer: 'init()', correct: false },
        { answer: 'preload()', correct: true },
        { answer: 'load()', correct: false },
        { answer: 'setup()', correct: false },
      ],
    },
    {
      question: 'Which method starts a new Phaser scene?',
      options: [
        { answer: 'this.scene.launch("SceneName")', correct: false },
        { answer: 'this.scene.run("SceneName")', correct: false },
        { answer: 'this.scene.start("SceneName")', correct: true },
        { answer: 'this.scene.open("SceneName")', correct: false },
      ],
    },
    {
      question: 'How do you pass a value between two concurrently running scenes?',
      options: [
        { answer: 'Using a global window variable', correct: false },
        { answer: 'Emitting an event with this.events.emit()', correct: true },
        { answer: 'Restarting both scenes', correct: false },
        { answer: 'Using localStorage', correct: false },
      ],
    },
    {
      question: 'What does this.registry.set("level", 0) do in a Phaser scene?',
      options: [
        { answer: 'Creates a new game level', correct: false },
        { answer: 'Saves value 0 under key "level" in a cross-scene shared storage', correct: true },
        { answer: 'Sets game difficulty to 0', correct: false },
        { answer: 'Registers an event called "level"', correct: false },
      ],
    },
    {
      question: 'Which property in the Phaser config sets the canvas width?',
      options: [
        { answer: 'canvasWidth', correct: false },
        { answer: 'size.width', correct: false },
        { answer: 'width', correct: true },
        { answer: 'viewport', correct: false },
      ],
    },
    {
      question: 'How do you force Phaser to use Canvas 2D instead of WebGL?',
      options: [
        { answer: 'Set `renderer: Phaser.CANVAS` in config', correct: false },
        { answer: 'Set `type: Phaser.CANVAS` in config', correct: true },
        { answer: 'Add `webgl: false` in config', correct: false },
        { answer: 'It\'s not possible, Phaser always uses WebGL', correct: false },
      ],
    },
    {
      question: 'Which scene lifecycle method is called only once when the scene starts?',
      options: [
        { answer: 'update()', correct: false },
        { answer: 'render()', correct: false },
        { answer: 'create()', correct: true },
        { answer: 'tick()', correct: false },
      ],
    },
    {
      question: 'What does this.scene.pause() do on a running scene?',
      options: [
        { answer: 'Destroys the scene removing it from memory', correct: false },
        { answer: 'Suspends the scene game loop while keeping it visible', correct: true },
        { answer: 'Hides the scene without stopping the game loop', correct: false },
        { answer: 'Starts a new instance of the scene', correct: false },
      ],
    },
    {
      question: 'What is the `parent` parameter in the Phaser configuration object?',
      options: [
        { answer: 'The scene this game derives from', correct: false },
        { answer: 'The ID or reference to the DOM element that will contain the canvas', correct: true },
        { answer: 'The parent scene configuration', correct: false },
        { answer: 'The parent renderer', correct: false },
      ],
    },
  ],
}
