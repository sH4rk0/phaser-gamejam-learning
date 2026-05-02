import type { QuizData } from './types'

export const quiz2: QuizData = {
  it: [
    {
      question: 'Qual è il comando npm per installare le dipendenze del progetto?',
      options: [
        { answer: 'npm run start', correct: false },
        { answer: 'npm install', correct: true },
        { answer: 'npm build', correct: false },
        { answer: 'npm dependencies', correct: false },
      ],
    },
    {
      question: 'In quale file sono dichiarati tutti gli assets del gioco?',
      options: [
        { answer: 'index.ts', correct: false },
        { answer: 'package.json', correct: false },
        { answer: 'GameData.ts', correct: true },
        { answer: 'webpack.common.js', correct: false },
      ],
    },
    {
      question: 'Qual è il formato corretto per scrivere una chiave JSON composta da più parole?',
      options: [
        { answer: 'year-born-date', correct: false },
        { answer: 'year_born_date', correct: false },
        { answer: 'YearBornDate', correct: false },
        { answer: 'yearBornDate', correct: true },
      ],
    },
    {
      question: "Qual è l'ordine corretto del flusso delle scene nel template?",
      options: [
        { answer: 'Intro → Boot → Preloader → GamePlay', correct: false },
        { answer: 'Boot → Preloader → Intro → GamePlay', correct: true },
        { answer: 'Preloader → Boot → GamePlay → Intro', correct: false },
        { answer: 'GamePlay → Boot → Preloader → Intro', correct: false },
      ],
    },
    {
      question: 'Quale cartella contiene tutti i pacchetti npm installati?',
      options: [
        { answer: 'src/', correct: false },
        { answer: 'webpack/', correct: false },
        { answer: 'node_modules/', correct: true },
        { answer: 'public/', correct: false },
      ],
    },
    {
      question: 'Qual è il comando per creare il pacchetto finale del gioco?',
      options: [
        { answer: 'npm run start', correct: false },
        { answer: 'npm install', correct: false },
        { answer: 'npm run build', correct: true },
        { answer: 'npm run serve', correct: false },
      ],
    },
    {
      question: 'Quale scena è responsabile del caricamento di tutti gli assets?',
      options: [
        { answer: 'Boot', correct: false },
        { answer: 'Preloader', correct: true },
        { answer: 'Intro', correct: false },
        { answer: 'GamePlay', correct: false },
      ],
    },
    {
      question: "Cos'è l'Hot Reload?",
      options: [
        { answer: 'Una tecnica per velocizzare il caricamento del gioco', correct: false },
        { answer: 'Un aggiornamento automatico del browser al salvataggio dei file', correct: true },
        { answer: 'Un metodo per comprimere gli assets', correct: false },
        { answer: 'Un sistema di cache del browser', correct: false },
      ],
    },
    {
      question: 'La scena Boot in Phaser serve principalmente a:',
      options: [
        { answer: 'Mostrare animazioni di apertura', correct: false },
        { answer: 'Configurare il gioco e caricare un preloader minimo', correct: true },
        { answer: "Gestire l'input dell'utente", correct: false },
        { answer: 'Calcolare la fisica del gioco', correct: false },
      ],
    },
    {
      question: 'Dove si definisce la lista delle scene nella configurazione di Phaser?',
      options: [
        { answer: 'Nel file package.json', correct: false },
        { answer: "Nella proprietà `scene` dell'oggetto di configurazione", correct: true },
        { answer: 'In un file separato chiamato scenes.ts', correct: false },
        { answer: 'Direttamente nel HTML tramite attributi data-', correct: false },
      ],
    },
    {
      question: 'Cosa fa il webpack nella build del progetto?',
      options: [
        { answer: 'Compila il TypeScript in Java', correct: false },
        { answer: 'Raggruppa tutti i moduli in uno o più file distribuibili', correct: true },
        { answer: 'Gestisce il database del gioco', correct: false },
        { answer: 'Avvia un server web per il deploy', correct: false },
      ],
    },
    {
      question: 'Cosa contiene la cartella src/ in un progetto Phaser?',
      options: [
        { answer: 'I file di configurazione webpack', correct: false },
        { answer: 'Il codice sorgente TypeScript del gioco', correct: true },
        { answer: 'Gli asset grafici e audio', correct: false },
        { answer: 'I file di dipendenze npm', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'What is the npm command to install project dependencies?',
      options: [
        { answer: 'npm run start', correct: false },
        { answer: 'npm install', correct: true },
        { answer: 'npm build', correct: false },
        { answer: 'npm dependencies', correct: false },
      ],
    },
    {
      question: 'In which file are all game assets declared?',
      options: [
        { answer: 'index.ts', correct: false },
        { answer: 'package.json', correct: false },
        { answer: 'GameData.ts', correct: true },
        { answer: 'webpack.common.js', correct: false },
      ],
    },
    {
      question: 'What is the correct format for a multi-word JSON key?',
      options: [
        { answer: 'year-born-date', correct: false },
        { answer: 'year_born_date', correct: false },
        { answer: 'YearBornDate', correct: false },
        { answer: 'yearBornDate', correct: true },
      ],
    },
    {
      question: 'What is the correct scene flow order in the template?',
      options: [
        { answer: 'Intro → Boot → Preloader → GamePlay', correct: false },
        { answer: 'Boot → Preloader → Intro → GamePlay', correct: true },
        { answer: 'Preloader → Boot → GamePlay → Intro', correct: false },
        { answer: 'GamePlay → Boot → Preloader → Intro', correct: false },
      ],
    },
    {
      question: 'Which folder contains all installed npm packages?',
      options: [
        { answer: 'src/', correct: false },
        { answer: 'webpack/', correct: false },
        { answer: 'node_modules/', correct: true },
        { answer: 'public/', correct: false },
      ],
    },
    {
      question: 'What is the command to build the final game bundle?',
      options: [
        { answer: 'npm run start', correct: false },
        { answer: 'npm install', correct: false },
        { answer: 'npm run build', correct: true },
        { answer: 'npm run serve', correct: false },
      ],
    },
    {
      question: 'Which scene is responsible for loading all game assets?',
      options: [
        { answer: 'Boot', correct: false },
        { answer: 'Preloader', correct: true },
        { answer: 'Intro', correct: false },
        { answer: 'GamePlay', correct: false },
      ],
    },
    {
      question: 'What is Hot Reload?',
      options: [
        { answer: 'A technique to speed up game loading', correct: false },
        { answer: 'Automatic browser refresh when files are saved', correct: true },
        { answer: 'A method to compress assets', correct: false },
        { answer: 'A browser caching system', correct: false },
      ],
    },
    {
      question: 'The Boot scene in Phaser is primarily used to:',
      options: [
        { answer: 'Show opening animations', correct: false },
        { answer: 'Configure the game and load a minimal preloader', correct: true },
        { answer: 'Handle user input', correct: false },
        { answer: 'Calculate game physics', correct: false },
      ],
    },
    {
      question: 'Where is the list of scenes defined in Phaser configuration?',
      options: [
        { answer: 'In package.json', correct: false },
        { answer: 'In the `scene` property of the configuration object', correct: true },
        { answer: 'In a separate file called scenes.ts', correct: false },
        { answer: 'Directly in HTML via data- attributes', correct: false },
      ],
    },
    {
      question: "What does webpack do during the project build?",
      options: [
        { answer: 'Compiles TypeScript into Java', correct: false },
        { answer: 'Bundles all modules into one or more distributable files', correct: true },
        { answer: 'Manages the game database', correct: false },
        { answer: 'Starts a web server for deployment', correct: false },
      ],
    },
    {
      question: 'What does the src/ folder contain in a Phaser project?',
      options: [
        { answer: 'Webpack configuration files', correct: false },
        { answer: 'The TypeScript source code of the game', correct: true },
        { answer: 'Graphic and audio assets', correct: false },
        { answer: 'npm dependency files', correct: false },
      ],
    },
  ],
}
