---
title: 'Basi di TypeScript'
slug: '3-typescript-basi'
chapter: 3
difficulty: beginner
readingTime: '~30 min'
---

## TypeScript vs JavaScript

**JavaScript** è un linguaggio di programmazione utilizzato principalmente per lo sviluppo di applicazioni web. **TypeScript** è un superset di JavaScript, il che significa che include tutte le funzionalità di JavaScript e ne aggiunge alcune nuove.

Mentre JavaScript funziona direttamente nel browser, TypeScript necessita di essere **compilato** per poter funzionare.

In TypeScript è necessario specificare il **tipo di dati** di ogni variabile (e struttura dati in generale), mentre in JavaScript non è richiesto. Questo può rendere il codice TypeScript più leggibile e più facile da mantenere, poiché gli errori di tipo possono essere individuati in fase di compilazione anziché in esecuzione.

TypeScript offre alcune funzionalità avanzate, come la possibilità di definire **interfacce** e **classi**, che non sono disponibili in JavaScript vanilla. Queste funzionalità possono rendere il codice TypeScript più organizzato e modulare.

::InfoBox{type="tip"}
In sintesi, TypeScript è un'estensione di JavaScript che offre una maggiore **type safety** e funzionalità avanzate per lo sviluppo di applicazioni web.
::

## I Tipi

In TypeScript, i tipi di dati possono essere suddivisi in due categorie: **tipi primitivi** e **tipi astratti**.

### Tipi primitivi

I tipi primitivi sono i tipi di base del linguaggio:

| Tipo | Descrizione |
|------|-------------|
| `number` | Per i numeri (interi o float) |
| `string` | Per le stringhe di caratteri |
| `boolean` | Per i valori vero/falso |
| `null` | Per il valore null |
| `undefined` | Per il valore undefined |

`null` è un valore assegnabile a una variabile che indica l'**assenza intenzionale** di un valore. Viene utilizzato per indicare che una variabile è vuota o non ha un valore valido.

`undefined` indica che una variabile **non è stata inizializzata** o che non ha un valore assegnato.

::InfoBox{type="warning"}
In pratica, `null` viene assegnato esplicitamente da un programmatore per indicare l'assenza di un valore, mentre `undefined` viene assegnato implicitamente dal linguaggio quando una variabile non ha un valore assegnato.
::

### Tipi astratti

I tipi astratti sono tipi che possono essere utilizzati per descrivere un insieme più ampio di valori:

| Tipo | Descrizione |
|------|-------------|
| `any` | La variabile può assumere qualsiasi tipo di valore |
| `unknown` | Il tipo è sconosciuto fino a quando non viene utilizzato |
| `object` | La variabile è un oggetto (non un tipo primitivo) |
| `array` | La variabile è un array di elementi di un certo tipo |
| `function` | La variabile è una funzione (un riferimento ad una funzione) |

::InfoBox{type="tip"}
Il tipo `unknown` è simile al tipo `any`, ma con una restrizione più forte. Mentre il tipo `any` consente di eseguire operazioni arbitrarie senza alcun controllo di tipo, il tipo `unknown` richiede una verifica di tipo prima di poter eseguire operazioni specifiche.
::

## Dichiarare le variabili

Quando si dichiara una variabile usando `const`, `var` o `let`, si può aggiungere un'**annotazione di tipo** per specificare esplicitamente il tipo della variabile:

```typescript
const _miaCostante: number = 100;
let _miaString: string = "Hello string!";
var _mioBooleano: boolean = true;

console.log(_miaCostante, _miaString, _mioBooleano);
```

In estrema sintesi:
- `var` è usato per variabili globali (quindi non lo useremo mai)
- `let` per variabili locali
- `const` per le costanti

::InfoBox{type="tip"}
Utilizziamo il comando `console.log()` per stampare nella console i valori delle variabili dichiarate nel nostro codice. Come potete vedere nell'esempio, `console.log()` può essere utilizzato per visualizzare più valori contemporaneamente separandoli con la virgola.
::

## Operatori

In TypeScript, ci sono diversi tipi di operatori che possono essere utilizzati per eseguire operazioni su variabili e valori.

### Operatori aritmetici

| Operatore | Descrizione |
|-----------|-------------|
| `+` | Addizione |
| `-` | Sottrazione |
| `*` | Moltiplicazione |
| `/` | Divisione |
| `%` | Modulo (resto della divisione) |

### Operatori di confronto

| Operatore | Descrizione |
|-----------|-------------|
| `==` | Uguaglianza |
| `===` | Uguaglianza rigorosa |
| `!=` | Diverso |
| `!==` | Diverso rigoroso |
| `>` | Maggiore di |
| `<` | Minore di |
| `>=` | Maggiore o uguale a |
| `<=` | Minore o uguale a |

### Operatori logici

| Operatore | Descrizione |
|-----------|-------------|
| `&&` | AND logico |
| `\|\|` | OR logico |
| `!` | NOT logico |

### Operatori di assegnazione

| Operatore | Descrizione |
|-----------|-------------|
| `=` | Assegnazione |
| `+=` | Assegnazione con addizione |
| `-=` | Assegnazione con sottrazione |
| `*=` | Assegnazione con moltiplicazione |
| `/=` | Assegnazione con divisione |

### Operatori di incremento/decremento

| Operatore | Descrizione |
|-----------|-------------|
| `++` | Incremento |
| `--` | Decremento |

### Operatori di accesso

| Operatore | Descrizione |
|-----------|-------------|
| `.` | Accesso alle proprietà di un oggetto |
| `[]` | Accesso agli elementi di un array |

## Costrutti condizionali

In TypeScript, i costrutti condizionali sono utilizzati per eseguire determinate azioni in base a condizioni specifiche.

### IF

Esegue un determinato blocco di codice solo se la condizione specificata è vera:

```typescript
let x: number = 0;

if (x == 0) {
  console.log("Il valore della variabile x è: " + x);
}
```

### IF ELSE

Esegue un blocco di codice se la condizione è vera e un altro blocco se la condizione è falsa:

```typescript
let y: number = 0;

if (y == 0) {
  console.log("Il valore di y è zero");
} else {
  console.log("Il valore di y non è zero");
}
```

### IF ELSE IF

Esegue blocchi diversi in base a condizioni multiple:

```typescript
let z: number = 0;

if (z == 0) {
  console.log("Il valore di z è zero");
} else if (z == 1) {
  console.log("Il valore di z è uno");
} else {
  console.log("Il valore di z è diverso da 0 e da 1");
}
```

### SWITCH

Quando siamo di fronte a diverse alternative, un `if` a cascata può risultare difficile da leggere. In questi casi possiamo ricorrere all'istruzione `switch`:

```typescript
let q: number = 0;

switch (q) {
  case 0:
    console.log("Il valore di q è zero");
    break;

  case 1:
    console.log("Il valore di q è uno");
    break;

  default:
    console.log("Il valore di q è diverso da 1 e 0");
    break;
}
```

::InfoBox{type="warning"}
È importante inserire l'istruzione `break` al termine del blocco di istruzioni per evitare la prosecuzione con il caso successivo. La presenza di un caso `default` è opzionale.
::

## Gli Array

Gli array in TypeScript sono un tipo di dato che permette di contenere una sequenza di elementi di un determinato tipo.

### Dichiarazione

```typescript
// Array di interi
let numArr1: number[] = [1, 2, 3, 4];
let numArr2: Array<number> = [1, 2, 3, 4];

// Array di stringhe
let strArr1: string[] = ['a', 'b', 'c'];
let strArr2: Array<string> = ['a', 'b', 'c'];

// Array misto
let myArr: Array<string | number> = ['a', 2, 'c'];
```

::InfoBox{type="tip"}
La sintassi `//` ci permette di inserire i commenti nel nostro codice. Possiamo anche usare `/* */` per inserire commenti più lunghi.
::

### Accesso agli elementi

Per accedere ai valori di un array, utilizza l'operatore `[]` e passa l'indice del valore:

```typescript
console.log(numArr1[0]); // stampa 1
console.log(strArr2[1]); // stampa 'b'
```

::InfoBox{type="warning"}
L'indice degli Array parte da **0**, non da 1!
::

### Iterare un Array

```typescript
numArr1.forEach((valore: number) => {
  console.log(valore);
});
// stampa 1, 2, 3, 4
```

### Aggiungere elementi

```typescript
// push aggiunge alla fine
numArr1.push(5);        // [1, 2, 3, 4, 5]
numArr1.push(6, 7);     // [1, 2, 3, 4, 5, 6, 7]

// unshift aggiunge all'inizio
numArr1.unshift(-1);    // [-1, 1, 2, 3, 4, 5, 6, 7]
numArr1.unshift(-2, -3);// [-2, -3, -1, 1, 2, 3, 4, 5, 6, 7]
```

### Rimuovere elementi

```typescript
// pop rimuove l'ultimo elemento
numArr1.pop();   // [-2, -3, -1, 1, 2, 3, 4, 5, 6]

// shift rimuove il primo elemento
numArr1.shift(); // [-3, -1, 1, 2, 3, 4, 5, 6]
```

## Le funzioni

Le funzioni sono un insieme riutilizzabile di istruzioni che eseguono un compito specifico. Possono avere dei parametri in ingresso e restituire un output.

```typescript
function sayHello(): void {
  console.log("hello!");
}

function sumValues(valueOne: number, valueTwo: number): number {
  return valueOne + valueTwo;
}
```

La prima funzione (`sayHello`) non ha parametri di input e non restituisce nessun dato, quindi il tipo restituito è `void`. Nel secondo caso (`sumValues`) la funzione accetta dei parametri tipizzati e restituisce un `number`.

::InfoBox{type="tip"}
Se proviamo ad invocare la funzione con valori che non siano numerici, otterremo un errore da parte del compilatore TypeScript.
::

Per richiamare le funzioni:

```typescript
sayHello();
console.log(sumValues(1, 1)); // stampa 2
```

## Arrow Functions

Le arrow function sono una sintassi abbreviata per la creazione di funzioni anonime. Utilizzano il simbolo `=>` (freccia) per separare gli argomenti dal corpo:

```typescript
const mySum = (a: number, b: number) => a + b;
```

Questa arrow function è equivalente a:

```typescript
function mySum2(a: number, b: number) {
  return a + b;
}
```

Le arrow function hanno alcune proprietà interessanti:

- Non hanno il loro proprio `this`, quindi il valore di `this` viene ereditato dal contesto in cui vengono chiamate
- Non possono essere utilizzate come costruttori (non possono essere chiamate con `new`)

## Enumerati (Enum)

Gli enumerati sono un tipo di dato che permette di assegnare un nome (chiave) a un insieme di valori numerici o stringhe. È come creare un set di costanti con dei valori specifici.

```typescript
enum Directions {
  top,    // valore 0
  bottom, // valore 1
  left,   // valore 2
  right   // valore 3
}
```

Per default ad ogni nome viene assegnato un valore numerico incrementale a partire da 0. È possibile anche indicare un valore di partenza diverso:

```typescript
enum Directions {
  top = 1,  // valore 1
  bottom,   // valore 2
  left,     // valore 3
  right     // valore 4
}
```

### Esempio pratico

```typescript
let playerDirection: Directions;
playerDirection = Directions.top;

function checkPlayerDirection(direction: Directions): void {
  switch (direction) {
    case Directions.bottom:
      console.log("Direzione: basso");
      break;
    case Directions.top:
      console.log("Direzione: alto");
      break;
    case Directions.left:
      console.log("Direzione: sinistra");
      break;
    case Directions.right:
      console.log("Direzione: destra");
      break;
  }
}

checkPlayerDirection(playerDirection);
```

È anche possibile assegnare valori specifici per ogni chiave:

```typescript
enum PlayerHP {
  hero = 1000,
  general = 800,
  captain = 500,
  soldier = 100
}
```

## Interfacce

Le interfacce in TypeScript sono un modo per definire un **contratto** che specifica quali proprietà e metodi devono avere un oggetto o una classe.

```typescript
interface IPerson {
  name: string;
  age?: number;
  greet?: (message: string) => void;
}
```

::InfoBox{type="tip"}
È buona norma inserire una **I** maiuscola prima del nome dell'interfaccia. Il `?` dopo una proprietà identifica che quella proprietà è **opzionale**.
::

Una volta dichiarata un'interfaccia, possiamo utilizzarla:

```typescript
const mario: IPerson = { name: "Francesco", age: 51 };
```

Qui abbiamo fatto qualcosa di "magico" rispetto agli altri linguaggi di programmazione: abbiamo creato un oggetto partendo da un'interfaccia (senza usare una classe).

## Classi e ereditarietà

In programmazione ad oggetti, una **classe** è un modello per un oggetto che definisce le sue proprietà e il suo comportamento. Una classe viene utilizzata per creare **istanze** di oggetti che hanno le stesse caratteristiche e comportamenti.

Una classe può avere:
- **Attributi** (proprietà): descrivono le caratteristiche dell'oggetto
- **Metodi** (funzioni): descrivono le azioni che l'oggetto può compiere

```typescript
class Person {
  name: string;
  age: number;

  greet(message: string): void {
    console.log("Ciao sono " + this.name + " e il mio messaggio è: " + message);
  }
}
```

### Ereditarietà

Le classi possono essere organizzate in gerarchie, dove una classe può **estendere** un'altra classe ed ereditarne le proprietà e il comportamento:

```typescript
class Student extends Person {
  instagram: string;

  share(): void {
    console.log("Il mio instagram è: " + this.instagram);
  }
}
```

Un'istanza di `Student` avrà tutti gli attributi di un'istanza di `Person`, oltre a `instagram` e al metodo `share()`.

::InfoBox{type="tip"}
I metodi delle classi non hanno bisogno della parola riservata `function` come le funzioni standalone.
::

## Il costruttore

Il **costruttore** di una classe è un metodo speciale che viene chiamato quando viene creata un'istanza della classe. Viene utilizzato per inizializzare le proprietà dell'oggetto.

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(message: string): void {
    console.log("Ciao sono " + this.name + " e il mio saluto è: " + message);
  }
}
```

Per creare un'istanza della classe:

```typescript
let me: Person = new Person("Francesco", 51);
me.greet("Hello!"); // stampa "Ciao sono Francesco e il mio saluto è: Hello!"
console.log(me.name); // stampa "Francesco"
```

## Classi e interfacce

In TypeScript, le classi possono **implementare** interfacce per assicurarsi che abbiano le proprietà e i metodi specificati:

```typescript
class Person implements IPerson {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(message: string): void {
    console.log("Ciao sono " + this.name + " e il mio saluto è: " + message);
  }
}
```

::InfoBox{type="warning"}
Se creassimo la classe `Person` senza inserire la proprietà `name`, il compilatore ci segnalerebbe immediatamente un errore del tipo: **Class 'Person' incorrectly implements interface 'IPerson'**.
::

## Public, Private e Protected

In TypeScript, è possibile usare le parole riservate `public`, `private` e `protected` per specificare il livello di accessibilità di proprietà e metodi:

| Modificatore | Accessibilità |
|--------------|---------------|
| `public` | Accessibile da qualsiasi parte del codice (default) |
| `private` | Accessibile solo all'interno della classe |
| `protected` | Accessibile dalla classe e dalle sue sottoclassi |

### Getter e Setter

Possiamo usare `get` e `set` per accedere o settare il valore delle proprietà private:

```typescript
class Person implements IPerson {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
  }

  greet(message: string): void {
    console.log("Ciao sono " + this.name + " e il mio saluto è: " + message);
  }
}
```

::InfoBox{type="tip"}
Questa metodologia ci permette di avere un **maggiore controllo** sulle proprietà della nostra classe, ad esempio validando i valori prima di assegnarli.
::

## Import ed Export

TypeScript (come JavaScript moderno) organizza il codice in **moduli**: ogni file `.ts` è un modulo separato. Per condividere classi, funzioni e variabili tra file diversi si usano le parole chiave `export` e `import`.

### Export

`export` rende disponibile all'esterno un elemento del modulo. Esistono due forme principali:

**Export con nome** — si possono esportare più elementi dallo stesso file:

```typescript
// nel file GameData.ts
export const MAX_LIVES: number = 3;
export const GAME_WIDTH: number = 800;

export interface IGameConfig {
  width: number;
  height: number;
}
```

**Export di default** — ogni file può avere un solo export default. Viene usato tipicamente per le classi principali del file:

```typescript
// nel file scenes/Boot.ts
export default class Boot extends Phaser.Scene {
  // ...
}
```

### Import

`import` permette di utilizzare all'interno di un file gli elementi esportati da un altro.

Per importare un **export di default** si sceglie liberamente il nome locale:

```typescript
import Boot from "./scenes/Boot";
import GamePlay from "./scenes/GamePlay";
```

Per importare **export con nome** si usano le parentesi graffe `{}`. Il nome deve corrispondere esattamente a quello esportato:

```typescript
import { GameData } from "./GameData";
import { MAX_LIVES, GAME_WIDTH } from "./GameData";
```

Si possono combinare i due stili nello stesso import:

```typescript
import Phaser, { Types } from "phaser";
```

::InfoBox{type="tip"}
Il percorso dopo `from` può essere relativo (`"./scenes/Boot"`, `"../GameData"`) oppure il nome di un pacchetto npm installato (`"phaser"`). TypeScript aggiunge automaticamente l'estensione `.ts` ai percorsi relativi.
::

### Esempio dal template

Nel file `index.ts` del nostro template trovi entrambe le forme in azione:

```typescript
// import da pacchetto npm (default)
import "phaser";

// import di classi con export default da file locali
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import GamePlay from "./scenes/GamePlay";

// import di export con nome
import { GameData } from "./GameData";
```

E nel file `GameData.ts`:

```typescript
// export con nome di un oggetto
export const GameData = {
  globals: {
    gameWidth: 800,
    gameHeight: 600,
    bgColor: "#000000",
    debug: false,
  },
};
```

::InfoBox{type="new"}
Grazie ai moduli, ogni scena del gioco vive nel suo file e viene importata solo dove serve. Questo rende il codice più organizzato e facilita la collaborazione in team.
::

## Riepilogo

In questo capitolo abbiamo:

- ✅ Compreso le differenze tra TypeScript e JavaScript
- ✅ Esplorato i tipi primitivi e astratti
- ✅ Imparato a dichiarare variabili con i tipi
- ✅ Utilizzato operatori e costrutti condizionali
- ✅ Lavorato con gli Array
- ✅ Creato funzioni e arrow functions
- ✅ Definito enumerati e interfacce
- ✅ Compreso classi, ereditarietà e costruttori
- ✅ Scoperto i modificatori di accesso
- ✅ Imparato a usare import ed export per organizzare il codice in moduli

::InfoBox{type="tip"}
Per un approfondimento su TypeScript è possibile consultare il manuale ufficiale: [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
::

Nel prossimo capitolo inizieremo a **configurare il nostro gioco** con Phaser 4 e a esplorare il sistema a scene.

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Sì, lo so. Questo capitolo sembrava quell'esame universitario per cui non ti senti mai abbastanza pronto. Tipi, interfacce, classi, getter, setter, import, export... è tanto.

Ma sai una cosa? Nei prossimi capitoli userai il **30% di tutto questo per l'80% del tempo**. Il resto lo rileggerai qui quando ne avrai bisogno — e averne bisogno è normale.

Quello che devi portarti a casa adesso è questo: TypeScript ti urla in faccia *prima* che il gioco parta quando fai qualcosa di sbagliato. Questo è un superpotere, non una scocciatura. Le classi hanno un costruttore, proprietà private con `_` davanti, e metodi che fanno le cose. Import ed export tengono tutto organizzato.

Il resto viene da sé con la pratica. Promesso. 💪
::
