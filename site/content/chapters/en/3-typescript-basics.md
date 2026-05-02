---
title: 'TypeScript Basics'
slug: '3-typescript-basics'
chapter: 3
difficulty: beginner
readingTime: '~30 min'
---

## TypeScript vs JavaScript

**JavaScript** is a programming language primarily used for developing web applications. **TypeScript** is a superset of JavaScript, which means it includes all the features of JavaScript and adds some new ones.

While JavaScript works directly in the browser, TypeScript needs to be **compiled** in order to run.

In TypeScript it is necessary to specify the **data type** of every variable (and data structure in general), while in JavaScript this is not required. This can make TypeScript code more readable and easier to maintain, since type errors can be caught at compile time rather than at runtime.

TypeScript offers some advanced features, such as the ability to define **interfaces** and **classes**, which are not available in vanilla JavaScript. These features can make TypeScript code more organized and modular.

::InfoBox{type="tip"}
In summary, TypeScript is an extension of JavaScript that offers greater **type safety** and advanced features for web application development.
::

## Types

In TypeScript, data types can be divided into two categories: **primitive types** and **abstract types**.

### Primitive types

Primitive types are the basic types of the language:

| Type | Description |
|------|-------------|
| `number` | For numbers (integers or floats) |
| `string` | For character strings |
| `boolean` | For true/false values |
| `null` | For the null value |
| `undefined` | For the undefined value |

`null` is a value assignable to a variable that indicates the **intentional absence** of a value. It is used to indicate that a variable is empty or has no valid value.

`undefined` indicates that a variable **has not been initialized** or has no assigned value.

::InfoBox{type="warning"}
In practice, `null` is explicitly assigned by a programmer to indicate the absence of a value, while `undefined` is implicitly assigned by the language when a variable has no assigned value.
::

### Abstract types

Abstract types are types that can be used to describe a broader set of values:

| Type | Description |
|------|-------------|
| `any` | The variable can take on any type of value |
| `unknown` | The type is unknown until it is used |
| `object` | The variable is an object (not a primitive type) |
| `array` | The variable is an array of elements of a certain type |
| `function` | The variable is a function (a reference to a function) |

::InfoBox{type="tip"}
The `unknown` type is similar to the `any` type, but with a stronger restriction. While the `any` type allows performing arbitrary operations without any type checking, the `unknown` type requires a type check before specific operations can be performed.
::

## Declaring variables

When declaring a variable using `const`, `var`, or `let`, you can add a **type annotation** to explicitly specify the variable's type:

```typescript
const _miaCostante: number = 100;
let _miaString: string = "Hello string!";
var _mioBooleano: boolean = true;

console.log(_miaCostante, _miaString, _mioBooleano);
```

In brief:
- `var` is used for global variables (so we will never use it)
- `let` for local variables
- `const` for constants

::InfoBox{type="tip"}
We use the `console.log()` command to print the values of variables declared in our code to the console. As you can see in the example, `console.log()` can be used to display multiple values at the same time by separating them with a comma.
::

## Operators

In TypeScript, there are various types of operators that can be used to perform operations on variables and values.

### Arithmetic operators

| Operator | Description |
|-----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo (remainder of division) |

### Comparison operators

| Operator | Description |
|-----------|-------------|
| `==` | Equality |
| `===` | Strict equality |
| `!=` | Not equal |
| `!==` | Strict not equal |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

### Logical operators

| Operator | Description |
|-----------|-------------|
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `!` | Logical NOT |

### Assignment operators

| Operator | Description |
|-----------|-------------|
| `=` | Assignment |
| `+=` | Assignment with addition |
| `-=` | Assignment with subtraction |
| `*=` | Assignment with multiplication |
| `/=` | Assignment with division |

### Increment/decrement operators

| Operator | Description |
|-----------|-------------|
| `++` | Increment |
| `--` | Decrement |

### Access operators

| Operator | Description |
|-----------|-------------|
| `.` | Access to object properties |
| `[]` | Access to array elements |

## Conditional constructs

In TypeScript, conditional constructs are used to execute certain actions based on specific conditions.

### IF

Executes a specific block of code only if the specified condition is true:

```typescript
let x: number = 0;

if (x == 0) {
  console.log("Il valore della variabile x è: " + x);
}
```

### IF ELSE

Executes one block of code if the condition is true and another block if the condition is false:

```typescript
let y: number = 0;

if (y == 0) {
  console.log("Il valore di y è zero");
} else {
  console.log("Il valore di y non è zero");
}
```

### IF ELSE IF

Executes different blocks based on multiple conditions:

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

When faced with multiple alternatives, a cascading `if` can be hard to read. In these cases we can use the `switch` statement:

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
It is important to include the `break` statement at the end of each instruction block to avoid falling through to the next case. The `default` case is optional.
::

## Arrays

Arrays in TypeScript are a data type that can hold a sequence of elements of a given type.

### Declaration

```typescript
// Array of integers
let numArr1: number[] = [1, 2, 3, 4];
let numArr2: Array<number> = [1, 2, 3, 4];

// Array of strings
let strArr1: string[] = ['a', 'b', 'c'];
let strArr2: Array<string> = ['a', 'b', 'c'];

// Mixed array
let myArr: Array<string | number> = ['a', 2, 'c'];
```

::InfoBox{type="tip"}
The `//` syntax allows us to insert comments in our code. We can also use `/* */` for longer comments.
::

### Accessing elements

To access the values in an array, use the `[]` operator and pass the index of the value:

```typescript
console.log(numArr1[0]); // prints 1
console.log(strArr2[1]); // prints 'b'
```

::InfoBox{type="warning"}
Array indices start at **0**, not 1!
::

### Iterating an Array

```typescript
numArr1.forEach((valore: number) => {
  console.log(valore);
});
// prints 1, 2, 3, 4
```

### Adding elements

```typescript
// push adds to the end
numArr1.push(5);        // [1, 2, 3, 4, 5]
numArr1.push(6, 7);     // [1, 2, 3, 4, 5, 6, 7]

// unshift adds to the beginning
numArr1.unshift(-1);    // [-1, 1, 2, 3, 4, 5, 6, 7]
numArr1.unshift(-2, -3);// [-2, -3, -1, 1, 2, 3, 4, 5, 6, 7]
```

### Removing elements

```typescript
// pop removes the last element
numArr1.pop();   // [-2, -3, -1, 1, 2, 3, 4, 5, 6]

// shift removes the first element
numArr1.shift(); // [-3, -1, 1, 2, 3, 4, 5, 6]
```

## Functions

Functions are a reusable set of instructions that perform a specific task. They can have input parameters and return an output.

```typescript
function sayHello(): void {
  console.log("hello!");
}

function sumValues(valueOne: number, valueTwo: number): number {
  return valueOne + valueTwo;
}
```

The first function (`sayHello`) has no input parameters and returns no data, so the return type is `void`. In the second case (`sumValues`) the function accepts typed parameters and returns a `number`.

::InfoBox{type="tip"}
If we try to call the function with values that are not numbers, we will get an error from the TypeScript compiler.
::

To call the functions:

```typescript
sayHello();
console.log(sumValues(1, 1)); // prints 2
```

## Arrow Functions

Arrow functions are a shorthand syntax for creating anonymous functions. They use the `=>` symbol (arrow) to separate the arguments from the body:

```typescript
const mySum = (a: number, b: number) => a + b;
```

This arrow function is equivalent to:

```typescript
function mySum2(a: number, b: number) {
  return a + b;
}
```

Arrow functions have some interesting properties:

- They do not have their own `this`, so the value of `this` is inherited from the context in which they are called
- They cannot be used as constructors (cannot be called with `new`)

## Enums

Enums are a data type that allows assigning a name (key) to a set of numeric values or strings. It is like creating a set of constants with specific values.

```typescript
enum Directions {
  top,    // value 0
  bottom, // value 1
  left,   // value 2
  right   // value 3
}
```

By default, each name is assigned an incrementing numeric value starting from 0. It is also possible to specify a different starting value:

```typescript
enum Directions {
  top = 1,  // value 1
  bottom,   // value 2
  left,     // value 3
  right     // value 4
}
```

### Practical example

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

It is also possible to assign specific values for each key:

```typescript
enum PlayerHP {
  hero = 1000,
  general = 800,
  captain = 500,
  soldier = 100
}
```

## Interfaces

Interfaces in TypeScript are a way to define a **contract** that specifies which properties and methods an object or class must have.

```typescript
interface IPerson {
  name: string;
  age?: number;
  greet?: (message: string) => void;
}
```

::InfoBox{type="tip"}
It is good practice to put a capital **I** before the interface name. The `?` after a property identifies that property as **optional**.
::

Once an interface is declared, we can use it:

```typescript
const mario: IPerson = { name: "Francesco", age: 51 };
```

Here we have done something "magical" compared to other programming languages: we created an object from an interface (without using a class).

## Classes and inheritance

In object-oriented programming, a **class** is a blueprint for an object that defines its properties and behavior. A class is used to create **instances** of objects that have the same characteristics and behaviors.

A class can have:
- **Attributes** (properties): describe the characteristics of the object
- **Methods** (functions): describe the actions the object can perform

```typescript
class Person {
  name: string;
  age: number;

  greet(message: string): void {
    console.log("Ciao sono " + this.name + " e il mio messaggio è: " + message);
  }
}
```

### Inheritance

Classes can be organized into hierarchies, where one class can **extend** another class and inherit its properties and behavior:

```typescript
class Student extends Person {
  instagram: string;

  share(): void {
    console.log("Il mio instagram è: " + this.instagram);
  }
}
```

An instance of `Student` will have all the attributes of a `Person` instance, plus `instagram` and the `share()` method.

::InfoBox{type="tip"}
Class methods do not need the reserved word `function` like standalone functions.
::

## The constructor

The **constructor** of a class is a special method that is called when an instance of the class is created. It is used to initialize the object's properties.

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

To create an instance of the class:

```typescript
let me: Person = new Person("Francesco", 51);
me.greet("Hello!"); // prints "Ciao sono Francesco e il mio saluto è: Hello!"
console.log(me.name); // prints "Francesco"
```

## Classes and interfaces

In TypeScript, classes can **implement** interfaces to ensure they have the specified properties and methods:

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
If we created the `Person` class without including the `name` property, the compiler would immediately report an error like: **Class 'Person' incorrectly implements interface 'IPerson'**.
::

## Public, Private and Protected

In TypeScript, you can use the reserved words `public`, `private`, and `protected` to specify the accessibility level of properties and methods:

| Modifier | Accessibility |
|--------------|---------------|
| `public` | Accessible from anywhere in the code (default) |
| `private` | Accessible only within the class |
| `protected` | Accessible from the class and its subclasses |

### Getters and Setters

We can use `get` and `set` to access or set the values of private properties:

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
This approach gives us **greater control** over our class properties, for example by validating values before assigning them.
::

## Import and Export

TypeScript (like modern JavaScript) organizes code into **modules**: each `.ts` file is a separate module. To share classes, functions, and variables between different files, the keywords `export` and `import` are used.

### Export

`export` makes an element of the module available externally. There are two main forms:

**Named export** — you can export multiple elements from the same file:

```typescript
// in the file GameData.ts
export const MAX_LIVES: number = 3;
export const GAME_WIDTH: number = 800;

export interface IGameConfig {
  width: number;
  height: number;
}
```

**Default export** — each file can have only one default export. It is typically used for the main classes of the file:

```typescript
// in the file scenes/Boot.ts
export default class Boot extends Phaser.Scene {
  // ...
}
```

### Import

`import` allows you to use elements exported from another file within a file.

To import a **default export**, you freely choose the local name:

```typescript
import Boot from "./scenes/Boot";
import GamePlay from "./scenes/GamePlay";
```

To import **named exports**, curly braces `{}` are used. The name must exactly match the exported one:

```typescript
import { GameData } from "./GameData";
import { MAX_LIVES, GAME_WIDTH } from "./GameData";
```

Both styles can be combined in the same import:

```typescript
import Phaser, { Types } from "phaser";
```

::InfoBox{type="tip"}
The path after `from` can be relative (`"./scenes/Boot"`, `"../GameData"`) or the name of an installed npm package (`"phaser"`). TypeScript automatically adds the `.ts` extension to relative paths.
::

### Example from the template

In the `index.ts` file of our template you will find both forms in action:

```typescript
// import from npm package (default)
import "phaser";

// import of classes with default export from local files
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import GamePlay from "./scenes/GamePlay";

// import of named exports
import { GameData } from "./GameData";
```

And in the `GameData.ts` file:

```typescript
// named export of an object
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
Thanks to modules, each game scene lives in its own file and is imported only where needed. This keeps the code organized and facilitates team collaboration.
::

## Summary

In this chapter we have:

- ✅ Understood the differences between TypeScript and JavaScript
- ✅ Explored primitive and abstract types
- ✅ Learned to declare variables with types
- ✅ Used operators and conditional constructs
- ✅ Worked with Arrays
- ✅ Created functions and arrow functions
- ✅ Defined enums and interfaces
- ✅ Understood classes, inheritance, and constructors
- ✅ Discovered access modifiers
- ✅ Learned to use import and export to organize code into modules

::InfoBox{type="tip"}
For a deeper dive into TypeScript, you can consult the official handbook: [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
::

In the next chapter we will begin to **configure our game** with Phaser 4 and explore the scene system.

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Yes, I know. This chapter felt like that university exam you never feel quite ready for. Types, interfaces, classes, getters, setters, import, export... it's a lot.

But you know what? In the coming chapters you'll use **30% of all this for 80% of the time**. The rest you'll re-read here when you need it — and needing to look it up is completely normal.

What you need to take away right now is this: TypeScript yells at you *before* the game starts when you do something wrong. That is a superpower, not a nuisance. Classes have a constructor, private properties with `_` in front, and methods that do things. Import and export keep everything organized.

The rest comes with practice. I promise. 💪
::
