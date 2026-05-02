---
title: 'Configuring Our Game'
slug: '4-game-configuration'
chapter: 4
difficulty: intermediate
readingTime: '~30 min'
---

## Initial configuration

The `index.ts` file contains the initialization of our game. In the first part of the file we proceed to `import` Phaser, the scenes, and `GameData`.

```typescript
// import the phaser library
import "phaser";

// import our scenes
import Boot from "./scenes/Boot";
import Hud from "./scenes/Hud";
import Preloader from "./scenes/Preloader";
import GamePlay from "./scenes/GamePlay";
import GameOver from "./scenes/GameOver";
import Intro from "./scenes/Intro";

// import GameData which contains the global game values
import { GameData } from "./GameData";
```

The `load` event is fired by the browser when the entire page has been loaded, including all dependent resources (stylesheets, scripts, images). When this event completes, the code included in the arrow function `() => { /* our code */ }` is executed.

In this function we declare the configuration code for our game. In the `config` constant, of type `Phaser.Types.Core.GameConfig`, we insert an object with all the attributes Phaser needs to configure the game.

```typescript
window.addEventListener("load", () => {

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },
    scene: [Boot, Hud, Preloader, Intro, GamePlay, GameOver],
    physics: {
      default: "arcade",
      arcade: { debug: GameData.globals.debug },
    },
    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  const game = new Phaser.Game(config);
});
```

::InfoBox{type="tip"}
You can consult the description of each `GameConfig` parameter in the official documentation: [photonstorm.github.io/phaser3-docs](https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig). You can also find practical examples at [labs.phaser.io](https://labs.phaser.io/index.html?dir=game%20config/&q=).
::

## Our game is divided into Scenes

Scenes allow us to divide our game into **separate logical containers**, making the code simpler and more maintainable. Each scene is a TypeScript file where a class is defined that extends the base class `Phaser.Scene`.

In our template we have defined **6 base scenes**:

| Scene | Function |
|---|---|
| `Boot.ts` | First scene initialized by Phaser. Loads minimal configurations and resources for the next scene. |
| `Preloader.ts` | Loads all game assets defined in `GameData.ts`. Upon completion, prompts for a click to move to `Intro.ts`. |
| `Intro.ts` | Title screen: game description, instructions, leaderboard, and play button. |
| `GamePlay.ts` | Contains the main game logic: protagonist, enemies, and all interactive elements. |
| `Hud.ts` | Heads-up display: shows score, lives, timer, and other UI elements overlaid on the gameplay scene. |
| `GameOver.ts` | Final scene activated when the player runs out of lives or time. Allows saving the score and replaying. |

### Scene methods

Each scene exposes some fundamental methods that Phaser calls in sequence:

| Method | When it is called |
|---|---|
| `constructor()` | At the time of creation; calls `super()` of the parent constructor. |
| `init()` | Once at startup; used to initialize scene parameters. |
| `preload()` | Before `create()`; loads assets needed by the scene. |
| `create()` | After `preload()`; initializes variables and performs initial setup operations. |
| `update()` | 60 times per second; contains the game logic. |

### Example: the Boot.ts scene

```typescript
import { GameData } from "../GameData";

export default class Boot extends Phaser.Scene {

  constructor() {
    super({ key: "Boot" });
  }

  init() { }

  preload() {
    this.cameras.main.setBackgroundColor(GameData.globals.bgColor);
    this.load.image("logo", "assets/images/phaser.png");
  }

  create() {
    this.scene.stop("Boot");
    this.scene.start("Preloader");
  }
}
```

::InfoBox{type="warning"}
The class name (`Boot`) must be identical in both the declaration `class Boot extends Phaser.Scene` and the key passed to `super({ key: "Boot" })`.
::

Before the constructor, you can declare the private variables you will use in the scene:

```typescript
export default class Boot extends Phaser.Scene {
  private _helloWorld: Phaser.GameObjects.Text;
  private _counter: number;

  constructor() {
    super({ key: "Boot" });
  }

  create() {
    this._counter = 0;
    this._helloWorld = this.add.text(0, 0, "Hello World");
  }
}
```

Variables declared as `private` will only be visible within the current scene.

### Starting a new scene

To start a new scene, use:

```typescript
this.scene.start("sceneName");
```

The `Boot` scene is the first automatically loaded by Phaser. Its `preload()` method loads the resources needed for the next scene, then `create()` starts it:

```typescript
this.scene.start("Preloader");
```

In turn, `Preloader`, after completing its cycle, waits for a user click before moving to `Intro`:

```typescript
this.input.once("pointerdown", () => {
  this.tweens.add({
    targets: [this._image, this._loading],
    alpha: 0,
    duration: 500,
    onComplete: () => {
      this.scene.start("Intro");
    },
  });
});
```

## Communication between scenes

Sometimes it is necessary to pass data from one scene to another. Phaser offers three main approaches.

### Registry

The first method uses the `registry` class with the `set()` and `get()` methods — it works like a shared storage between all scenes.

```typescript
// save a value
this.registry.set("level", 0);

// retrieve the value in any scene
let _currentLevel: number = this.registry.get("level");
```

### Data in the scene start

The second method consists of passing data at the time of initializing the new scene:

```typescript
// in the Intro scene, start GamePlay passing the level
this.scene.start("GamePlay", { level: levelValue });
```

In the destination scene, the `init()` method receives the data:

```typescript
init(data: { level: number }) {
  if (data.level != null) {
    this._level = data.level;
  } else {
    this._level = 0;
  }
}
```

### Emitting events between parallel scenes

The `GamePlay` and `Hud` scenes run **at the same time**. To make them communicate, events are used. From the `Intro` scene, for example, both are started:

```typescript
this.scene.stop("Intro");
this.scene.start("GamePlay", { level: 0 });
this.scene.start("Hud");
this.scene.bringToTop("Hud");
```

In the `GamePlay` scene, when an enemy is hit, we emit an event toward `Hud`:

```typescript
hitEnemy(weapon: any, enemy: any) {
  // emit the event with the score as parameter
  this.events.emit("update-score", [100]);
}
```

In the `Hud` scene, within the `create()` method, we listen for the event:

```typescript
// retrieve the GamePlay scene instance
this._gamePlay = <GamePlay>this.scene.get("GamePlay");

// remove and recreate the listener to avoid duplicates
this._gamePlay.events.off("update-score", this.updateScore, this);
this._gamePlay.events.on("update-score", this.updateScore, this);
```

::InfoBox{type="tip"}
It is good practice to always remove a listener before recreating it (`.off()` followed by `.on()`) to avoid an event being received and executed multiple times.
::

Finally, the `updateScore()` method in the `Hud` scene handles the score update:

```typescript
private updateScore(parameters: Array<any>): void {
  this._score += parameters[0];
  this._scoreText.setText(this._score + "");
  // save the score in the registry for the GameOver scene
  this.registry.set("score", this._score);
}
```

::InfoBox{type="new"}
Phaser's scene system is one of its strengths: each scene is isolated and reusable, but can communicate with others via registry, start data, or events.
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Here we are. The scenes chapter. You survived this one too.

The truth is that the flow is always the same: Boot → Preloader → Intro → GamePlay → GameOver. **You will almost always work on `GamePlay.ts`** and occasionally touch `Hud.ts` to update score and lives. You'll rarely touch the other scenes.

The `constructor`, `preload`, `create`, and `update` methods are the rhythm of your game — memorizing them changes your life. The `registry` is the simplest way to pass data between scenes; use it without guilt.

Communication with events (`emit` / `on`) seems like magic the first time. Then it becomes your favorite tool. Trust me. 🎮
::
