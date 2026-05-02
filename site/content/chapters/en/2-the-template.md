---
title: 'The Template'
slug: '2-the-template'
chapter: 2
difficulty: beginner
readingTime: '~25 min'
---

## The starting template

In this chapter we will explore the **template** we will use as a base for developing our video game with Phaser 4. The template is a project already configured with all the necessary tools: TypeScript, Webpack, and the PhaserJS library.

Before proceeding, make sure you have completed the Node.js installation as described in the previous chapter.

::InfoBox{type="tip"}
You can download the template from the course's GitHub repository: [github.com/sH4rk0/pgj](https://github.com/sH4rk0/pgj/tree/main/2026-2027/Template)
::

## JSON (JavaScript Object Notation)

Much of the data we will use will be structured as **JSON objects**. It is essential to understand this format before proceeding.

JSON (JavaScript Object Notation) is a lightweight text format for data exchange. It is often used to transmit data in text format from a server to a web application or vice versa.

A JSON file consists of a sequence of **key:value** pairs, separated by colons `:` and enclosed in curly braces `{}`. Each pair is separated from the next by a comma `,`.

```json
{
  "name": "Francesco Raimondo",
  "yearBornDate": 1972,
  "city": "Salerno",
  "interests": ["making", "retrogaming", "3d printing"]
}
```

In this example the keys are `name`, `yearBornDate`, `city` and `interests`. The respective values are `"Francesco Raimondo"`, `1972`, `"Salerno"` and the array `["making", "retrogaming", "3d printing"]`.

::InfoBox{type="warning"}
Keys must not contain spaces or special characters. If your key is made up of multiple words, use **camelCase** syntax: the first word in lowercase and the first letters of subsequent words capitalized. Example: `yearBornDate`.
::

The values assigned to keys can be:
- **Strings**: `"text"`
- **Numbers**: `42`, `3.14`
- **Booleans**: `true`, `false`
- **Arrays**: `[1, 2, 3]`
- **Other JSON objects**: `{ "nested": "object" }`

Useful references:
- [json.org](https://www.json.org/json-it.html) — Official specification
- [jsonlint.com](https://jsonlint.com/) — Online tool to validate JSON

## The package.json file

The `package.json` file, located in the main folder of the template, is a fundamental configuration file for every Node.js project. It describes the project's **dependencies** and other information such as the name, version, and author details.

```json
{
  "name": "phaser-project-template",
  "version": "4.0.0",
  "description": "Phaser 4.0.0 starter template with TypeScript and webpack.",
  "scripts": {
    "start": "webpack serve --open --config webpack/webpack.dev.js",
    "build": "rimraf public && webpack --config webpack/webpack.prod.js"
  }
}
```

This file is used by npm when we run the `npm install` command.

## Essential npm commands

Three npm commands will be fundamental for developing our game:

| Command | Description |
|---------|-------------|
| `npm install` | Installs all necessary libraries in the `node_modules` folder |
| `npm run start` | Starts the development server with hot-reload |
| `npm run build` | Creates the final optimized package for production |

## Template structure

Once you have unzipped the template into a folder on your computer, opening the folder in VS Code you will find the following structure:

```
template/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   ├── sounds/
│   │   └── map/
│   ├── pwa/
│   ├── scenes/
│   │   ├── Boot.ts
│   │   ├── Preloader.ts
│   │   ├── Intro.ts
│   │   ├── GamePlay.ts
│   │   ├── Hud.ts
│   │   └── GameOver.ts
│   ├── scss/
│   ├── favicon.ico
│   ├── GameData.ts
│   ├── index.html
│   ├── index.ts
│   └── style.ts
├── typings/
├── webpack/
├── package.json
└── tsconfig.json
```

### The src folder

This is the main folder where all the source code lives:

#### assets/

Contains all the game's multimedia resources:

| Subfolder | Contents |
|---------------|-----------|
| `fonts/` | Custom bitmap fonts |
| `icons/` | Icons for mobile devices (PWA) |
| `images/` | All game images and sprites |
| `sounds/` | Music and sound effects |
| `map/` | Tilemap maps (if used) |

#### scenes/

In this folder we find the **scenes** that make up our game. Each scene is a separate TypeScript file that "extends" the `Phaser.Scene` class.

The scene flow is:

```
Boot → Preloader → Intro → GamePlay → GameOver
                    ↕
                   Hud (parallel overlay)
```

- **Boot**: loads only the initial logo
- **Preloader**: loads all assets and shows the loading bar
- **Intro**: title/splash screen
- **GamePlay**: the main game logic
- **Hud**: overlay scene for UI elements (score, lives, etc.)
- **GameOver**: end-of-game screen

#### Main files

| File | Description |
|------|-------------|
| `index.html` | The HTML page that hosts the game |
| `index.ts` | Initial Phaser configuration and scene registration |
| `GameData.ts` | Game configuration and asset registry |
| `style.ts` | Imports SCSS styles for Webpack |

### The typings folder

Contains the `custom.ts` file with **TypeScript interfaces** that describe the structure of objects used in the project.

### The webpack folder

Contains the configuration files for Webpack:

- `webpack.common.js` — Shared configuration
- `webpack.dev.js` — Development configuration
- `webpack.prod.js` — Production build configuration

## GameData.ts — The asset registry

The `GameData.ts` file is the **heart of our game's configuration**. All assets are declared here and automatically loaded by the Preloader.

```typescript
export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: false
  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Caricamento...",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
  },

  spritesheets: [
    { name: "player", path: "assets/images/player.png", width: 82, height: 70, frames: 50 },
  ],

  images: [
    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "bg-1", path: "assets/images/bg/1.png" },
  ],

  sounds: [],
  fonts: [],
  webfonts: [{ key: 'Roboto' }, { key: 'Press+Start+2P' }],
};
```

::InfoBox{type="tip"}
To add a new asset to the game, simply add it to the corresponding array in `GameData.ts`. The Preloader will load it automatically!
::

## Installing the template

### Step 1: Open the terminal

To run npm commands, we need to open VS Code's integrated terminal. Right-click on the `package.json` file and select **"Open in Integrated Terminal"**.

![Opening the terminal in VS Code](/images/chapters/2/open-terminal.png)

### Step 2: npm install

In the terminal, type:

```bash
npm install
```

![Running npm install](/images/chapters/2/npm-install.png)

This command will read the `package.json` file and download all the necessary packages into the `node_modules` folder.

::InfoBox{type="warning"}
Don't be alarmed by the size of the `node_modules` folder! It contains hundreds of packages, but in most cases you will never need to access it directly.
::

![Installation complete](/images/chapters/2/npm-install-finish.png)

### Step 3: npm run start

Once the installation is complete, start the development server:

```bash
npm run start
```

![Running npm run start](/images/chapters/2/npm-run-start.png)

The first run will take a few seconds. Webpack will compile the project and automatically open a new browser window at `http://localhost:9000/` with the template's welcome page.

![Compilation complete](/images/chapters/2/npm-run-start-finish.png)

::InfoBox{type="tip"}
To **stop the development server**, go back to the terminal and press **Ctrl+C**. This will stop Webpack and free up port 9000.
::

![Template welcome page](/images/chapters/2/localhost-9000.png)

## The JavaScript Console

To view debug messages and game output, we need to access the browser's **JavaScript Console**.

1. Press `F12` (or `fn+F12` on some laptops)
2. Or right-click on the page and select **"Inspect"**
3. Select the **"Console"** tab

![Browser's JavaScript Console](/images/chapters/2/console-javascript.png)

The console allows you to:
- View log messages with `console.log()`
- See errors and warnings
- Execute JavaScript code directly

```typescript
// In your TypeScript code
console.log("Hello World");
```

## Hot Reload

One of Webpack's most useful features is **Hot Reload**: every time you save a file (Ctrl+S), the browser window automatically refreshes showing the changes.

This greatly speeds up the development cycle, letting you immediately see the effect of your changes without having to manually restart the server.

## Creating the production build

When the game is ready to be published, use the command:

```bash
npm run build
```

![Running npm run build](/images/chapters/2/npm-run-build.png)

Webpack will bundle all the source files and create a `public/` folder containing the optimized files for online publication.

::InfoBox{type="tip"}
To test the build locally, you can use the **Live Server** extension for VS Code. Right-click on `public/index.html` and select **"Open with Live Server"**.
::

![Open with Live Server](/images/chapters/2/open-live-server.png)

::InfoBox{type="warning"}
If after launching the build you see unexpected errors in the JavaScript console, they may be caused by the **browser cache**. Perform a **Hard Refresh** to reload the page ignoring the cache: **Ctrl + Shift + R** (or **Cmd + Shift + R** on Mac).
::

## Summary

In this chapter we have:

- ✅ Understood the JSON structure
- ✅ Explored the `package.json` file
- ✅ Analyzed the template's folder structure
- ✅ Discovered the role of `GameData.ts`
- ✅ Installed dependencies with `npm install`
- ✅ Started the development server
- ✅ Learned how to create the production build

In the next chapter we will begin exploring the **basics of TypeScript**, the language we will use to write our game code.

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

OK, I heard the eye-rolling when you saw that folder structure. I know. It looks like an enormous amount of stuff.

But let me tell you a secret: in 90% of development you'll only use three things — `npm run start`, the `GameData.ts` file to add assets, and the `create()` method of the `GamePlay` scene. Everything else is there, but you can ignore it until you need it.

The one truly essential thing: **always run `npm install` the first time** you open the project. Forget that and you'll spend half an hour staring at mysterious errors.

The server starts, the browser opens, you see the template screen — you're all set. See you soon! 🚀
::
