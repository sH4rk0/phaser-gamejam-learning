import type { QuizData } from './types'

export const quiz1: QuizData = {
  it: [
    {
      question: 'Qual è il ruolo principale di Node.js nello sviluppo con Phaser 4?',
      options: [
        { answer: 'Eseguire il gioco direttamente senza browser', correct: false },
        { answer: 'Fornire il runtime per gli strumenti di sviluppo, build e gestione pacchetti', correct: true },
        { answer: 'Sostituire TypeScript come linguaggio di programmazione', correct: false },
        { answer: 'Funzionare come database per i punteggi del gioco', correct: false },
      ],
    },
    {
      question: 'Quale bundler è utilizzato nel nostro template Phaser 4?',
      options: [
        { answer: 'Webpack', correct: true },
        { answer: 'Parcel', correct: false },
        { answer: 'Vite', correct: false },
        { answer: 'Rollup', correct: false },
      ],
    },
    {
      question: 'TypeScript è un superset di quale linguaggio?',
      options: [
        { answer: 'Python', correct: false },
        { answer: 'Java', correct: false },
        { answer: 'JavaScript', correct: true },
        { answer: 'C#', correct: false },
      ],
    },
    {
      question: 'Quale renderer usa Phaser 4 come principale?',
      options: [
        { answer: 'Canvas 2D', correct: false },
        { answer: 'SVG', correct: false },
        { answer: 'DOM', correct: false },
        { answer: 'WebGL', correct: true },
      ],
    },
    {
      question: 'Quale servizio Firebase è più utile per gestire una classifica (leaderboard) in un gioco browser?',
      options: [
        { answer: 'Firebase Authentication', correct: false },
        { answer: 'Firebase Hosting', correct: false },
        { answer: 'Realtime Database', correct: true },
        { answer: 'Firebase Storage', correct: false },
      ],
    },
    {
      question: 'Quale strumento a riga di comando si usa per installare le dipendenze di un progetto Node.js?',
      options: [
        { answer: 'pip', correct: false },
        { answer: 'npm', correct: true },
        { answer: 'brew', correct: false },
        { answer: 'apt', correct: false },
      ],
    },
    {
      question: "Qual è l'estensione standard dei file TypeScript?",
      options: [
        { answer: '.js', correct: false },
        { answer: '.tsx', correct: false },
        { answer: '.ts', correct: true },
        { answer: '.tscript', correct: false },
      ],
    },
    {
      question: 'Phaser è una libreria specializzata per lo sviluppo di:',
      options: [
        { answer: 'Applicazioni mobile native', correct: false },
        { answer: 'Siti web statici', correct: false },
        { answer: 'Videogiochi browser 2D', correct: true },
        { answer: 'API REST', correct: false },
      ],
    },
    {
      question: 'Quale fase del processo di sviluppo trasforma il codice TypeScript in JavaScript?',
      options: [
        { answer: 'Bundling', correct: false },
        { answer: 'Compilazione (transpiling)', correct: true },
        { answer: 'Minificazione', correct: false },
        { answer: 'Deploy', correct: false },
      ],
    },
    {
      question: 'In quale formato sono scritti i file di configurazione come package.json?',
      options: [
        { answer: 'XML', correct: false },
        { answer: 'YAML', correct: false },
        { answer: 'JSON', correct: true },
        { answer: 'TOML', correct: false },
      ],
    },
    {
      question: 'Qual è il comando per avviare il server di sviluppo con hot reload nel template?',
      options: [
        { answer: 'npm run build', correct: false },
        { answer: 'npm run serve', correct: false },
        { answer: 'npm run start', correct: true },
        { answer: 'npm run dev', correct: false },
      ],
    },
    {
      question: 'Firebase Hosting è principalmente usato per:',
      options: [
        { answer: 'Gestire autenticazioni utente', correct: false },
        { answer: 'Ospitare file statici (HTML, CSS, JS) su CDN', correct: true },
        { answer: 'Fare query al database', correct: false },
        { answer: 'Gestire notifiche push', correct: false },
      ],
    },
  ],
  en: [
    {
      question: "What is Node.js's main role in Phaser 4 development?",
      options: [
        { answer: 'Run the game directly without a browser', correct: false },
        { answer: 'Provide the runtime for development tools, build pipeline and package management', correct: true },
        { answer: 'Replace TypeScript as the programming language', correct: false },
        { answer: 'Act as a database for game scores', correct: false },
      ],
    },
    {
      question: 'Which bundler is used in our Phaser 4 template?',
      options: [
        { answer: 'Webpack', correct: true },
        { answer: 'Parcel', correct: false },
        { answer: 'Vite', correct: false },
        { answer: 'Rollup', correct: false },
      ],
    },
    {
      question: 'TypeScript is a superset of which language?',
      options: [
        { answer: 'Python', correct: false },
        { answer: 'Java', correct: false },
        { answer: 'JavaScript', correct: true },
        { answer: 'C#', correct: false },
      ],
    },
    {
      question: 'Which renderer does Phaser 4 use as its primary renderer?',
      options: [
        { answer: 'Canvas 2D', correct: false },
        { answer: 'SVG', correct: false },
        { answer: 'DOM', correct: false },
        { answer: 'WebGL', correct: true },
      ],
    },
    {
      question: 'Which Firebase service is most useful for managing a game leaderboard?',
      options: [
        { answer: 'Firebase Authentication', correct: false },
        { answer: 'Firebase Hosting', correct: false },
        { answer: 'Realtime Database', correct: true },
        { answer: 'Firebase Storage', correct: false },
      ],
    },
    {
      question: 'Which command-line tool is used to install Node.js project dependencies?',
      options: [
        { answer: 'pip', correct: false },
        { answer: 'npm', correct: true },
        { answer: 'brew', correct: false },
        { answer: 'apt', correct: false },
      ],
    },
    {
      question: 'What is the standard file extension for TypeScript files?',
      options: [
        { answer: '.js', correct: false },
        { answer: '.tsx', correct: false },
        { answer: '.ts', correct: true },
        { answer: '.tscript', correct: false },
      ],
    },
    {
      question: 'Phaser is a library specialized for:',
      options: [
        { answer: 'Native mobile app development', correct: false },
        { answer: 'Static websites', correct: false },
        { answer: '2D browser game development', correct: true },
        { answer: 'REST APIs', correct: false },
      ],
    },
    {
      question: 'Which development step transforms TypeScript code into JavaScript?',
      options: [
        { answer: 'Bundling', correct: false },
        { answer: 'Compilation (transpiling)', correct: true },
        { answer: 'Minification', correct: false },
        { answer: 'Deployment', correct: false },
      ],
    },
    {
      question: 'In which format are configuration files like package.json written?',
      options: [
        { answer: 'XML', correct: false },
        { answer: 'YAML', correct: false },
        { answer: 'JSON', correct: true },
        { answer: 'TOML', correct: false },
      ],
    },
    {
      question: 'What is the command to start the development server with hot reload in the template?',
      options: [
        { answer: 'npm run build', correct: false },
        { answer: 'npm run serve', correct: false },
        { answer: 'npm run start', correct: true },
        { answer: 'npm run dev', correct: false },
      ],
    },
    {
      question: 'Firebase Hosting is mainly used for:',
      options: [
        { answer: 'Managing user authentication', correct: false },
        { answer: 'Hosting static files (HTML, CSS, JS) on CDN', correct: true },
        { answer: 'Querying the database', correct: false },
        { answer: 'Managing push notifications', correct: false },
      ],
    },
  ],
}
