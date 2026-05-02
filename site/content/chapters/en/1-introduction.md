---
title: 'Introduction to Technologies'
slug: '1-introduction'
chapter: 1
difficulty: beginner
readingTime: '~20 min'
---

## The technologies behind the project

In this first chapter we will take a quick look at the technologies that will help us build our first video game with **Phaser 4**.

We will see how TypeScript helps us write more understandable code, examine in detail the structure of the template project we will use as a starting point, and learn some commands that allow us to run the template.

It is important to be familiar with, even if not in depth, the technologies that underpin the development of our project.

## Node.js

Node.js is one of the most revolutionary JavaScript frameworks of the last decade, as it allows the use of **V8**, Google Chrome's JavaScript interpreter. This enables developers to build web applications with JavaScript not only on the client side, but also as a server-side programming language.

A prerequisite for the course is having Node.js installed on your computer.

::InfoBox{type="tip"}
A useful guide for installing Node.js: [kinsta.com/it/blog/come-installare-node-js](https://kinsta.com/it/blog/come-installare-node-js/). Download Node.js from [nodejs.org](https://nodejs.org/).
::

To verify the installation, open a terminal and type:

```bash
node --version   # should show v20.x.x or higher
npm --version    # included with Node.js
```

> "Node.js provides the basic infrastructure on which we develop our game."

## NPM (Node Package Manager)

**npm** is the official package manager installed with the Node.js platform. Open source developers from every continent use npm to share and borrow packages, and many organizations also use npm to manage private development.

```bash
# Main commands
npm install          # installs the dependencies listed in package.json
npm run start        # starts the development server
npm run build        # creates the production bundle
```

> "npm provides us with all the libraries that will help us in development."

Official reference: [npmjs.com](https://www.npmjs.com/)

## Webpack

**Webpack** is described by its own developers as a *static module bundler* for JavaScript applications. Its purpose is to create a bundle of assets usable directly in the browser, starting from a set of source files structured across multiple files with complex dependency patterns.

Our games are composed of dozens of TypeScript files, images, audio, and configurations. Webpack takes all these source files and combines them into an optimized package that the browser can efficiently load.

> "Webpack helps us in development and allows us to create our final package."

Official reference: [webpack.js.org](https://webpack.js.org/)

## TypeScript

**TypeScript** is an open source programming language developed by **Microsoft**. More specifically, TypeScript is a **superset** of JavaScript that adds optional types, classes, interfaces, and modules to traditional JavaScript. It is essentially an extension of JavaScript.

Why use it with Phaser 4?

- **Intelligent autocompletion**: your editor automatically suggests available methods on the correct object
- **Compile-time errors**: discover bugs before even running the game
- **More readable code**: types document code intent, making projects easier to maintain

```typescript
// JavaScript: it's unclear what x, y and vita are
function spawnNemico(x, y, vita) {
  // ...
}

// TypeScript: everything is explicit and verified
function spawnNemico(x: number, y: number, vita: number): void {
  // ...
}

// TypeScript catches errors like this before execution
spawnNemico(100, 200, 'molto')  // ❌ Error: 'molto' is not a number
spawnNemico(100, 200, 100)      // ✅ Correct
```

> "TypeScript is our programming language."

Official reference: [typescriptlang.org](https://www.typescriptlang.org/)

## Firebase

**Firebase** is a serverless platform for developing mobile and web applications. Open source but supported by Google, Firebase leverages Google's infrastructure and cloud to provide a set of tools for writing, analyzing, and maintaining cross-platform applications.

In browser games, Firebase is particularly useful for:

| Service | Use in games |
|---|---|
| **Cloud Firestore** | Real-time leaderboards, cloud saves |
| **Authentication** | Anonymous login, Google or email sign-in |
| **Storage** | Uploading screenshots or game files |
| **Hosting** | Deploying the game on a global CDN with SSL |

```bash
# Install Firebase in the project
npm install firebase
```

::InfoBox{type="tip"}
Firebase is not required to start developing with Phaser 4. You can comfortably build complete games without a backend. Add Firebase only when you need online features.
::

Official reference: [firebase.google.com](https://firebase.google.com/)

## PhaserJS

**Phaser** is a fast, free, and fun open source framework for creating browser games based on Canvas and WebGL. Games can be compiled for iOS, Android, and native apps using third-party tools. You can use JavaScript or TypeScript for development.

> "PhaserJS is the video game development library we will use to build our game."

Phaser 4 represents a **significant rewrite** compared to Phaser 3. The main new features:

- **Unified WebGL renderer**: Phaser 4 uses WebGL as its primary renderer, with significantly superior performance
- **TypeScript-first**: the Phaser 4 source code is written entirely in TypeScript
- **Simplified API**: many concepts redesigned and simplified compared to v3
- **Smaller bundle**: modular architecture, you import only what you use

::InfoBox{type="warning"}
Phaser 4 **is not backward compatible** with Phaser 3. If you have experience with Phaser 3, many APIs have changed. This course teaches Phaser 4 from scratch — we do not assume prior knowledge of Phaser 3.
::

```bash
# Install Phaser 4 in your project
npm install phaser
```

Official resources:

- Website: [phaser.io](https://phaser.io)
- Documentation: [docs.phaser.io](https://docs.phaser.io/)
- Examples: [labs.phaser.io](https://labs.phaser.io/)

## Visual Studio Code

**Visual Studio Code** is a lightweight but powerful source code editor that runs on the desktop and is available for Windows, macOS, and Linux. It has built-in support for JavaScript, TypeScript, and Node.js and has a rich ecosystem of extensions for other languages and runtimes (such as C++, C#, Java, Python, PHP, Go, .NET).

I almost forgot: it's developed in TypeScript!

> "VS Code is our code editor."

Recommended extensions for Phaser 4 + TypeScript development:

| Extension | Function |
|---|---|
| **ESLint** | Static analysis of TypeScript code |
| **Prettier** | Automatic code formatting |
| **Error Lens** | Displays TypeScript errors directly inline |
| **vscode-icons** | Intuitive icons for file types |
| **GitLens** | Advanced integrated Git tools |

```bash
# Open VS Code in the project folder
code .
```

::InfoBox{type="tip"}
Enable "Format on Save" in VS Code (setting `editor.formatOnSave: true`) to have your code automatically formatted every time you save a file.
::

Official reference: [code.visualstudio.com](https://code.visualstudio.com/)

---


::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

OK, I know — you just read about Node.js, npm, Webpack, TypeScript, Firebase and Phaser 4 all in one go. Seems like a lot, right?

Breathe. You don't have to become an expert in any of these technologies right now.

Think of this chapter as the introduction of the film's main characters: you've seen their faces, you know their names, and now you can move on. Throughout the course you'll meet them one at a time, in the right context, and everything will start to make sense.

The only thing I ask of you for now: **make sure you have Node.js installed**. The rest follows naturally. See you in the next chapter! 🚀
::
