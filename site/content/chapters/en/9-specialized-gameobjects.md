---
title: "Our Custom GameObjects"
slug: "9-specialized-gameobjects"
chapter: 9
difficulty: "intermediate"
readingTime: "~35 min"
---

In this chapter we will see how to extend the `Phaser.GameObject.Sprite` class to create our own specialized classes, to which we will assign specific behaviors.

In the `src` folder of our template project we will create a folder we'll call `gameComponents`. This name is arbitrary — we could also call it `customGameObjects`, `customClasses`, or whatever we prefer. This folder will be the container for our custom classes. Inside this folder we will create as many subfolders as there are custom classes we will use in our game.

![Project folder structure](/images/ch9/folder-structure.jpg)

## Creating our Player

As you can see in the image, I created a `player` subfolder in which I created two files: `IPlayer.ts` and `Player.ts`. For the player implementation I used the following spritesheet.

![Robot Player Spritesheet](/images/ch9/robo-spritesheet.png)

Insert the snippet for loading the spritesheet into `GameData`:

```typescript
{ name: "robo", path: "assets/images/robo.png", width: 30, height: 50, frames: 8 }
```

### IPlayer.ts

As mentioned in chapter 2, interfaces are a way to define a contract that specifies which properties and methods an object or class must have.

```typescript
interface IPlayer {
    create(): void;
    update(time: number, delta: number): void;
}

export default IPlayer;
```

In this very simple interface we define that the mandatory methods for the class that will implement our interface are the `create()` and `update()` methods.

These two methods do not work like the `create()` and `update()` methods of scenes — they are not automatically called when the class is created.

The `export default` statement is used when creating JavaScript modules to export objects, functions, and variables from the module, so they can be used by other programs with the help of the `import` statement. As we will see later, the `IPlayer` interface will be imported by the `Player` class.

### Player.ts

What you see below is the basic implementation of a `Player` class that extends the `Phaser.GameObjects.Sprite` class and implements the `IPlayer` interface.

You could use this code as a base for implementing any other class that extends the `Sprite` class, simply by changing the class name from `Player` to `Enemy` and the interface from `IPlayer` to `IEnemy`.

```typescript
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
    // the genericConfig type is defined in the typings/custom.ts folder
    // it is an interface that defines the parameters to pass to the class
    // when creating a new instance
    private _config: genericConfig;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.create();
    }

    create() {}

    update(time: number, delta: number) {}
}
```

Let's add some code to the basic implementation:

```typescript
import IPlayer from "./IPlayer";
// Import the gameplay scene so we can access it
import GamePlay from "../../scenes/GamePlay";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
    private _config: genericConfig;
    // reference to the scene where our game object will be inserted
    private _scene: GamePlay;
    // local variable of type arcade.body to access Body methods
    private _body: Phaser.Physics.Arcade.Body;
    // local variable for managing cursor keys
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    // local variable to set the body velocity
    private _velocity: number = 200;
    // array of objects for creating animations
    private _animations: Array<{
        key: string;
        frames: Array<number>;
        frameRate: number;
        yoyo: boolean;
        repeat: number;
    }> = [
        { key: "idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { key: "move", frames: [4, 5, 6, 7], frameRate: 10, yoyo: false, repeat: -1 },
    ];

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        // call the create method in which some
        // initializations of our custom class are inserted
        this.create();
        // call a local method to implement sprite animations
        this.createAnimations();
    }

    create() {
        // Create a reference to the scene
        this._scene = <GamePlay>this._config.scene;
        // Enable this with Phaser's physics
        this._scene.physics.world.enable(this);
        // Assign the cast of this.body to this._body
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        // tell the body it should collide with world bounds
        this._body.setCollideWorldBounds(true);
        // Create cursor keys instance to move the Player
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        // Set depth level to 11
        this.setDepth(11);
        // Add the Player to the scene
        this._scene.add.existing(this);
    }

    createAnimations() {
        this._animations.forEach((element) => {
            if (!this._scene.anims.exists(element.key)) {
                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("robo", {
                        frames: element.frames,
                    }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat,
                };
                this._scene.anims.create(_animation);
            }
        });
    }

    update(time: number, delta: number) {
        this.setDepth(this.y);

        // if the left cursor is pressed
        if (this._cursors.left.isDown) {
            this.setFlipX(false);
            this.anims.play("move", true);
            this._body.setVelocityX(-this._velocity);
        }
        // if the right cursor is pressed
        if (this._cursors.right.isDown) {
            this.setFlipX(true);
            this.anims.play("move", true);
            this._body.setVelocityX(this._velocity);
        }
        // if the up cursor is pressed
        if (this._cursors.up.isDown) {
            this.anims.play("move", true);
            this._body.setVelocityY(-this._velocity);
        }
        // if the down cursor is pressed
        if (this._cursors.down.isDown) {
            this.anims.play("move", true);
            this._body.setVelocityY(this._velocity);
        }

        if (
            !this._cursors.left.isDown &&
            !this._cursors.right.isDown &&
            !this._cursors.up.isDown &&
            !this._cursors.down.isDown
        ) {
            this._body.setVelocity(0);
            this.anims.play("idle", true);
        }
    }
}
```

## Inserting the Player into the GamePlay scene

The code below shows the implementation of a basic `GamePlay` scene in which we will insert our `Player` instance.

```typescript
// import the Player class into the scene
import Player from "../gameComponents/player/Player";

export default class GamePlay extends Phaser.Scene {
    // local variable that we will associate with the main camera
    private _mainCamera: Phaser.Cameras.Scene2D.Camera;
    // local variable that will contain the Player instance
    private _player: Player;

    constructor() {
        super({ key: "GamePlay" });
    }

    create() {
        this._mainCamera = this.cameras.main;
        this._mainCamera.setBackgroundColor(0x000000);

        // add any image to the scene
        // to perceive the movement of the Player and the camera
        this.add.image(0, 0, "bg6").setOrigin(0);

        // set the bounds of the camera and the world
        this._mainCamera.setBounds(
            0,                          // x
            0,                          // y
            this.game.canvas.width * 2, // width
            this.game.canvas.height * 2 // height
        );
        this.physics.world.setBounds(
            0,
            0,
            this.game.canvas.width * 2,
            this.game.canvas.height * 2
        );

        // Create the Player instance
        this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });

        // Call the method that activates camera follow on the Player
        this.followPlayer();
    }

    followPlayer() {
        this._mainCamera.startFollow(this._player, true, 0.1, 0.1);
    }

    update(time: number, delta: number): void {
        // call the player's update method
        this._player.update(time, delta);
    }
}
```

## Calling a scene method from our Player

From our custom class it is possible to call custom methods of the `GamePlay` scene. Let's look at a simple example: in the `update` method of the `Player` we insert a call to a custom scene method. This method will receive the `x` and `y` values of the `Player` and display them in a `text` gameObject.

In the Player's `update` method, add:

```typescript
this._scene.updateValues(this.x, this.y);
```

In the scene, insert a private variable before the constructor to hold our text:

```typescript
private _text: Phaser.GameObjects.Text;
```

In `create`, immediately after the background image, create our text instance, setting the `scrollFactor` value to `0`. This way the text will not move with the camera movement:

```typescript
this._text = this.add.text(0, 0, "").setScrollFactor(0);
```

Insert our custom `updateValues()` method after the `create` method:

```typescript
updateValues(x: number, y: number) {
    this._text.setText("player position: " + Math.round(x) + " " + Math.round(y));
}
```

The `Math.round` method is native to JavaScript and serves to display the nearest integer of a decimal number.

## Creating a custom class for a bonus

This time, unlike what we did for the player, we will create three files in the `Bonus` subfolder: `IBonus.ts`, `Bonus.ts`, and `BonusCoin.ts`. For the bonus implementation I used the following spritesheet.

![Bonus Coin Spritesheet](/images/ch9/bonus-coin-spritesheet.png)

Insert the snippet for loading the spritesheet into `GameData.ts`:

```typescript
{ name: "bonus-coin", path: "assets/images/bonus-coin.png", width: 64, height: 64, frames: 8 }
```

### IBonus.ts

The interface implementation is identical to that of the player:

```typescript
interface IBonus {
    create(): void;
    update(time: number, delta: number): void;
}

export default IBonus;
```

### Bonus.ts

The implementation of the `Bonus` class is also very similar to that of the player:

```typescript
import GamePlay from "../../scenes/GamePlay";
import IBonus from "./IBonus";

export default class Bonus extends Phaser.GameObjects.Sprite implements IBonus {
    protected _config: genericConfig;
    protected _scene: GamePlay;
    protected _body: Phaser.Physics.Arcade.Body;

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._scene.addBonus(this);
        this._scene.add.existing(this);
        this._body.setImmovable(true);
        this.setDepth(100);
    }

    create() {}

    update(time: number, delta: number) {}

    // calls a scene method to remove this bonus
    getBonus() {
        this._scene.removeBonus(this);
    }
}
```

This implementation will serve as a base for creating different types of bonuses that extend the `Bonus` class. For example, let's create a `BonusCoin` type bonus.

### Bonus-coin.ts

As you can see, the `BonusCoin` class extends the `Bonus` class and therefore inherits its basic behaviors. Imagine that all bonuses have a common `.getBonus()` method. With this implementation model we can use the method present in `Bonus` without having to implement it in every derived class.

In the constructor we set the gameObject name by passing it the string `"coin"`. This will be useful later to differentiate bonus types when they are collected by the player.

```typescript
import GamePlay from "../../scenes/GamePlay";
import Bonus from "./Bonus";

export default class BonusCoin extends Bonus {
    constructor(params: genericConfig) {
        super(params);
        // set the name of this gameObject to coin
        this.setName("coin");
        this.create();
    }

    create() {
        if (!this._scene.anims.exists("bonus-coin-anim")) {
            let _animationConfig = {
                key: "bonus-coin-anim",
                frames: this._config.scene.anims.generateFrameNumbers(
                    this._config.key,
                    { frames: [0, 1, 2, 3, 4, 5, 6, 7] }
                ),
                frameRate: 10,
                yoyo: false,
                repeat: -1,
            };
            this._config.scene.anims.create(_animationConfig);
        }
        this.play("bonus-coin-anim");
        this.setScale(0.5);
    }
}
```

## Full integration in the GamePlay scene

Now we need to add our `Bonus` inside `GamePlay` with all the methods necessary for group management and collision.

```typescript
// [1] Import of Bonus and BonusCoin classes
import Bonus from "../gameComponents/bonus/Bonus";
import BonusCoin from "../gameComponents/bonus/BonusCoin";
import Player from "../gameComponents/player/Player";

export default class GamePlay extends Phaser.Scene {
    private _mainCamera: Phaser.Cameras.Scene2D.Camera;
    private _player: Player;
    private _text: Phaser.GameObjects.Text;
    // [2] Declaration of the _groupBonus variable
    private _groupBonus: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "GamePlay" });
    }

    create() {
        this._mainCamera = this.cameras.main;
        this._mainCamera.setBackgroundColor(0xffffff);

        // [3] Creation of the group instance in _groupBonus
        this._groupBonus = this.add.group({ runChildUpdate: true });

        this.add.image(0, 0, "bg6").setOrigin(0);
        this._text = this.add
            .text(0, 0, "")
            .setScrollFactor(0)
            .setFontSize(30)
            .setShadow(2, 2, "#000000", 2)
            .setStroke("#ff0000", 5);

        this._mainCamera.setBounds(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2);
        this.physics.world.setBounds(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2);

        this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });

        // [4] Call addBonus() to add a bonus to the group
        this.addBonus(new BonusCoin({ scene: this, x: 100, y: 100, key: "bonus-coin" }));

        this.followPlayer();

        // [5] Create the collider between _player and _groupBonus
        // when they collide the hitBonus method is called
        this.physics.add.collider(
            this._player,
            this._groupBonus,
            this.hitBonus,
            undefined,
            this
        );
    }

    followPlayer() {
        this._mainCamera.startFollow(this._player, true, 0.1, 0.1);
    }

    unfollowPlayer() {
        this._mainCamera.stopFollow();
    }

    updateValues(x: number, y: number) {
        this._text.setText("player position: " + Math.round(x) + " " + Math.round(y));
    }

    // [6] Method called when there is a collision between player and bonus
    hitBonus(player: any, bonus: any) {
        const _bonus: Bonus = <Bonus>bonus;
        _bonus.getBonus();
    }

    // [7] Method to add a bonus to the group
    addBonus(bonus: Bonus) {
        this._groupBonus.add(bonus);
    }

    // [8] Method to remove a bonus from the group
    removeBonus(bonus: Bonus) {
        this._groupBonus.remove(bonus, true, true);
    }

    update(time: number, delta: number): void {
        this._player.update(time, delta);
    }
}
```

Key points of the implementation:

1. **Import** of `Bonus` and `BonusCoin` classes
2. **Declaration** of the `_groupBonus` variable
3. **Creation** of the group instance in `_groupBonus`
4. **Adding** the bonus to the group via `addBonus()`
5. **Creation** of the collider between `_player` and `_groupBonus`
6. **Method** `.hitBonus()` called by the collider
7. **Method** `.addBonus()` to add bonuses to the group
8. **Method** `.removeBonus()` to remove bonuses from the group
