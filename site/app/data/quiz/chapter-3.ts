import type { QuizData } from './types'

export const quiz3: QuizData = {
  it: [
    {
      question: 'Qual è la principale differenza tra TypeScript e JavaScript?',
      options: [
        { answer: 'TypeScript è più veloce di JavaScript', correct: false },
        { answer: 'TypeScript richiede la specifica dei tipi e deve essere compilato', correct: true },
        { answer: 'JavaScript supporta le classi, TypeScript no', correct: false },
        { answer: 'TypeScript funziona solo nel browser', correct: false },
      ],
    },
    {
      question: 'Quale parola chiave si usa per dichiarare una costante in TypeScript?',
      options: [
        { answer: 'var', correct: false },
        { answer: 'let', correct: false },
        { answer: 'const', correct: true },
        { answer: 'static', correct: false },
      ],
    },
    {
      question: "Qual è l'indice del primo elemento di un array in TypeScript?",
      options: [
        { answer: '1', correct: false },
        { answer: '0', correct: true },
        { answer: '-1', correct: false },
        { answer: 'Dipende dalla dichiarazione', correct: false },
      ],
    },
    {
      question: 'Quale metodo aggiunge un elemento alla fine di un array?',
      options: [
        { answer: 'shift()', correct: false },
        { answer: 'unshift()', correct: false },
        { answer: 'pop()', correct: false },
        { answer: 'push()', correct: true },
      ],
    },
    {
      question: 'Cosa indica il tipo di ritorno "void" in una funzione?',
      options: [
        { answer: 'La funzione restituisce null', correct: false },
        { answer: 'La funzione non restituisce alcun valore', correct: true },
        { answer: 'La funzione restituisce undefined', correct: false },
        { answer: 'La funzione ha un errore', correct: false },
      ],
    },
    {
      question: "Come si indica che una proprietà è opzionale in un'interfaccia?",
      options: [
        { answer: 'Usando la parola "optional"', correct: false },
        { answer: 'Mettendo "?" dopo il nome della proprietà', correct: true },
        { answer: 'Usando il tipo "any"', correct: false },
        { answer: 'Non è possibile in TypeScript', correct: false },
      ],
    },
    {
      question: "Quale parola chiave si usa per far ereditare una classe da un'altra?",
      options: [
        { answer: 'inherits', correct: false },
        { answer: 'implements', correct: false },
        { answer: 'extends', correct: true },
        { answer: 'derive', correct: false },
      ],
    },
    {
      question: "Quale modificatore di accesso rende una proprietà accessibile solo all'interno della classe?",
      options: [
        { answer: 'public', correct: false },
        { answer: 'protected', correct: false },
        { answer: 'private', correct: true },
        { answer: 'internal', correct: false },
      ],
    },
    {
      question: "Cosa fa la parola chiave `super()` nel costruttore di una classe figlia?",
      options: [
        { answer: 'Elimina la classe padre', correct: false },
        { answer: 'Chiama il costruttore della classe padre', correct: true },
        { answer: 'Accede a un metodo statico', correct: false },
        { answer: 'Crea una copia della classe', correct: false },
      ],
    },
    {
      question: 'Qual è la differenza tra `interface` e `type` in TypeScript?',
      options: [
        { answer: 'Sono identici e intercambiabili in ogni situazione', correct: false },
        { answer: '`interface` supporta l\'estensione con `extends`, `type` non può essere ri-dichiarato', correct: true },
        { answer: '`type` è per i tipi primitivi, `interface` per gli oggetti', correct: false },
        { answer: '`interface` compila più velocemente di `type`', correct: false },
      ],
    },
    {
      question: 'Quale parola chiave `let` differisce da `var` principalmente perché:',
      options: [
        { answer: '`let` è più veloce di `var`', correct: false },
        { answer: '`let` ha scope di blocco, `var` ha scope di funzione', correct: true },
        { answer: '`let` funziona solo nelle classi', correct: false },
        { answer: '`let` non può essere riassegnato', correct: false },
      ],
    },
    {
      question: 'Cosa fa il metodo `.map()` su un array?',
      options: [
        { answer: 'Filtra gli elementi secondo una condizione', correct: false },
        { answer: 'Riduce il array a un singolo valore', correct: false },
        { answer: 'Crea un nuovo array trasformando ogni elemento', correct: true },
        { answer: 'Ordina gli elementi del array', correct: false },
      ],
    },
  ],
  en: [
    {
      question: 'What is the main difference between TypeScript and JavaScript?',
      options: [
        { answer: 'TypeScript is faster than JavaScript', correct: false },
        { answer: 'TypeScript requires type specifications and must be compiled', correct: true },
        { answer: 'JavaScript supports classes, TypeScript does not', correct: false },
        { answer: 'TypeScript only works in the browser', correct: false },
      ],
    },
    {
      question: 'Which keyword is used to declare a constant in TypeScript?',
      options: [
        { answer: 'var', correct: false },
        { answer: 'let', correct: false },
        { answer: 'const', correct: true },
        { answer: 'static', correct: false },
      ],
    },
    {
      question: 'What is the index of the first element in a TypeScript array?',
      options: [
        { answer: '1', correct: false },
        { answer: '0', correct: true },
        { answer: '-1', correct: false },
        { answer: 'It depends on the declaration', correct: false },
      ],
    },
    {
      question: 'Which method adds an element to the end of an array?',
      options: [
        { answer: 'shift()', correct: false },
        { answer: 'unshift()', correct: false },
        { answer: 'pop()', correct: false },
        { answer: 'push()', correct: true },
      ],
    },
    {
      question: 'What does the return type "void" mean for a function?',
      options: [
        { answer: 'The function returns null', correct: false },
        { answer: 'The function returns no value', correct: true },
        { answer: 'The function returns undefined', correct: false },
        { answer: 'The function has an error', correct: false },
      ],
    },
    {
      question: 'How do you mark a property as optional in an interface?',
      options: [
        { answer: 'Using the word "optional"', correct: false },
        { answer: 'Putting "?" after the property name', correct: true },
        { answer: 'Using the type "any"', correct: false },
        { answer: "It's not possible in TypeScript", correct: false },
      ],
    },
    {
      question: 'Which keyword makes a class inherit from another?',
      options: [
        { answer: 'inherits', correct: false },
        { answer: 'implements', correct: false },
        { answer: 'extends', correct: true },
        { answer: 'derive', correct: false },
      ],
    },
    {
      question: 'Which access modifier makes a property accessible only within the class?',
      options: [
        { answer: 'public', correct: false },
        { answer: 'protected', correct: false },
        { answer: 'private', correct: true },
        { answer: 'internal', correct: false },
      ],
    },
    {
      question: 'What does the `super()` keyword do in a child class constructor?',
      options: [
        { answer: 'Deletes the parent class', correct: false },
        { answer: 'Calls the parent class constructor', correct: true },
        { answer: 'Accesses a static method', correct: false },
        { answer: 'Creates a copy of the class', correct: false },
      ],
    },
    {
      question: 'What is the difference between `interface` and `type` in TypeScript?',
      options: [
        { answer: 'They are identical and interchangeable in every situation', correct: false },
        { answer: '`interface` supports extension with `extends`, `type` cannot be re-declared', correct: true },
        { answer: '`type` is for primitive types, `interface` for objects', correct: false },
        { answer: '`interface` compiles faster than `type`', correct: false },
      ],
    },
    {
      question: 'The `let` keyword differs from `var` mainly because:',
      options: [
        { answer: '`let` is faster than `var`', correct: false },
        { answer: '`let` has block scope, `var` has function scope', correct: true },
        { answer: '`let` only works inside classes', correct: false },
        { answer: '`let` cannot be reassigned', correct: false },
      ],
    },
    {
      question: 'What does the `.map()` method do on an array?',
      options: [
        { answer: 'Filters elements based on a condition', correct: false },
        { answer: 'Reduces the array to a single value', correct: false },
        { answer: 'Creates a new array by transforming each element', correct: true },
        { answer: 'Sorts the array elements', correct: false },
      ],
    },
  ],
}
