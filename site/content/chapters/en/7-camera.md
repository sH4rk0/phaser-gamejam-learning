---
title: 'Camera and Viewport'
slug: '7-camera'
chapter: 7
difficulty: intermediate
readingTime: '~30 min'
---

## Introduction

The **Camera** is the way all games are rendered in Phaser. It provides a view of our game area and allows us to move, zoom, and apply visual effects such as shake, flash, and fade.

A camera is made up of two main elements:

- The **viewport**: the physical position and size of the display window within the game
- The **scroll** values: the portion of the game world the camera is currently showing

![Viewport and game area](/images/chapters/cap7/viewport-camera.png)

As shown in the image, the area within the red rectangle represents the **viewport** — what the player sees. The area outside the rectangle is the game world not currently visible.

The main camera (`main`) is created at the same dimensions as the game by default. It can be accessed as follows:

```typescript
let mainCam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;
```

---

## Moving the camera with SmoothedKeyControl

`Phaser.Cameras.Controls.SmoothedKeyControl` is a controller that allows moving and zooming the camera using the directional keys, with smooth acceleration and deceleration effects.

### Defining variables

Before the scene constructor, we declare the necessary variables:

```typescript
// Controller for smooth camera movement
private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;

// Reference to the main camera
private _mainCamera: Phaser.Cameras.Scene2D.Camera;

// Cursor keys
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
```

### Initializing the controller in create

```typescript
create() {
  // Add some sprites to the scene
  this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'logo');
  this.add.sprite(100, 100, 'bomb');
  this.add.sprite(900, 500, 'bomb');

  // Extend the camera bounds to twice the game dimensions
  this.cameras.main.setBounds(
    0,                          // x
    0,                          // y
    this.game.canvas.width * 2, // width
    this.game.canvas.height * 2 // height
  );

  // Initialize variables
  this._mainCamera = this.cameras.main;
  this._cursors = this.input.keyboard!.createCursorKeys();

  // Controller configuration
  const controlConfig: Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig = {
    camera: this._mainCamera,
    left: this._cursors.left,
    right: this._cursors.right,
    up: this._cursors.up,
    down: this._cursors.down,
    zoomIn: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    zoomOut: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    zoomSpeed: 0.02,
    acceleration: 0.06,
    drag: 0.0005,
    maxSpeed: 1.0,
  };

  // Create the controller
  this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}
```

| Property | Description |
|---|---|
| `camera` | The camera to control |
| `left/right/up/down` | Keys for movement |
| `zoomIn` / `zoomOut` | Keys for zoom (new in Phaser 4) |
| `zoomSpeed` | Zoom speed per frame |
| `acceleration` | Movement acceleration |
| `drag` | Deceleration when the key is released |
| `maxSpeed` | Maximum movement speed |
| `minZoom` / `maxZoom` | Zoom limits (default: 0.001 – 1000) |

::info-box{type="tip"}
In Phaser 4, `this.input.keyboard` can be `null`. Use the non-null assertion operator `!` when accessing `this.input.keyboard!.createCursorKeys()` in TypeScript.
::

### Updating the controller in update

The controller must be updated every frame in the `update` method:

```typescript
update(time: number, delta: number): void {
  this._controls.update(delta);
}
```

---

## Following the player

The camera can automatically follow the position of a gameObject, keeping it centered in the viewport. This is the typical behavior of platform or top-down games.

### Configuration

```typescript
private _mainCamera: Phaser.Cameras.Scene2D.Camera;
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
private _player: Phaser.GameObjects.Image;

create() {
  // Add background elements
  this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'logo');
  this.add.sprite(200, 200, 'bomb');
  this.add.sprite(800, 400, 'bomb');

  // Create the player
  this._player = this.add.image(
    this.game.canvas.width / 2,
    this.game.canvas.height / 2,
    'bomb'
  ).setScale(2);

  // Initialize cursors and camera
  this._cursors = this.input.keyboard!.createCursorKeys();
  this._mainCamera = this.cameras.main;

  // Extend the bounds
  this._mainCamera.setBounds(
    0, 0,
    this.game.canvas.width * 2,
    this.game.canvas.height * 2
  );

  // The camera will automatically follow the player
  this._mainCamera.startFollow(this._player, true, 0.05, 0.05);
}
```

The `startFollow` method accepts the following parameters:

| Parameter | Type | Description |
|---|---|---|
| `target` | `GameObject` | The gameObject to follow |
| `roundPixels` | `boolean` | If `true`, rounds pixels (avoids aliasing). Recommended |
| `lerpX` | `number` | Horizontal interpolation (0 = instant, 1 = no inertia) |
| `lerpY` | `number` | Vertical interpolation |

Low lerp values (e.g. `0.05`) create a **smooth camera** effect that follows the player with slight inertia, which is much more visually pleasing.

### Moving the player in update

```typescript
update(time: number, delta: number): void {
  if (this._cursors.left.isDown) {
    this._player.x -= 10;
  } else if (this._cursors.right.isDown) {
    this._player.x += 10;
  }

  if (this._cursors.up.isDown) {
    this._player.y -= 10;
  } else if (this._cursors.down.isDown) {
    this._player.y += 10;
  }
}
```

::info-box{type="warning"}
In this example we move the player directly on the `x`/`y` property. When we use Arcade physics (chapter 8), we will instead use the physics body velocities (`setVelocity`) — the `startFollow` principle remains the same.
::

### Stopping follow

```typescript
this._mainCamera.stopFollow();
```

---

## Moving the camera with pan()

The `pan()` method smoothly moves the camera from its current position to the destination coordinates, applying an animation with easing:

```typescript
this.cameras.main.pan(
  10,               // destination x
  10,               // destination y
  1000,             // duration in ms
  'Sine.easeInOut', // easing function
  true,             // force: starts immediately even if a pan is in progress
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('pan completed');
    }
  }
);
```

### Camera zoom with zoomTo()

The `zoomTo()` method animates the camera zoom to the indicated value:

```typescript
this.cameras.main.zoomTo(
  2,                // final zoom value (1 = normal, 2 = double)
  1000,             // duration in ms
  'Sine.easeInOut', // easing function
  true,             // force
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('zoom completed');
    }
  }
);
```

---

## WorldView

The `worldView` property of the camera represents the area of the game world the camera is currently displaying. It is of type `Phaser.Geom.Rectangle` and updates automatically every frame.

### Getting the viewport center

```typescript
const centerX: number = this.cameras.main.worldView.centerX;
const centerY: number = this.cameras.main.worldView.centerY;
```

### Getting the viewport edges

```typescript
const top: number    = this.cameras.main.worldView.top;
const bottom: number = this.cameras.main.worldView.bottom;
const left: number   = this.cameras.main.worldView.left;
const right: number  = this.cameras.main.worldView.right;
```

These properties are useful for **spawning** enemies or objects at the edges of the current view, or for destroying an element only when it exits the screen.

### Random point in the viewport

```typescript
const rndPoint: Phaser.Math.Vector2 = this.cameras.main.worldView.getRandomPoint();
console.log(rndPoint.x, rndPoint.y);
```

Useful for spawning bonuses or enemies at a random position within the current view.

::info-box{type="new"}
In Phaser 4, `Geom.Point` has been removed. `getRandomPoint()` now returns a `Phaser.Math.Vector2`. Update your type annotations accordingly.
::

### Checking if an object is in the viewport

```typescript
if (!this.cameras.main.worldView.contains(this._enemy.x, this._enemy.y)) {
  this._enemy.destroy();
}
```

Call `destroy()` on objects that exit the viewport to free resources.

---

## Special effects

The Camera class includes built-in visual effects: **flash**, **shake**, and **fade**. All accept an optional callback to intercept the effect's progress.

### Flash

Immediately sets the camera to the indicated color and then fades it out over the specified duration. Useful for hits, explosions, or transitions.

```typescript
this._mainCamera.flash(
  2000,           // duration in ms
  255, 0, 0,      // RGB color (red)
  true,           // force: starts immediately
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('flash completed');
    }
  }
);
```

| Parameter | Description |
|---|---|
| `duration` | Duration in ms (default: 250) |
| `red, green, blue` | RGB color, values 0–255 (default: 255, 255, 255 — white) |
| `force` | If `true`, restarts even if already in progress |
| `callback` | Function called every frame with `(camera, progress)` |

### Shake

Shakes the camera viewport with the indicated intensity for the specified duration. GameObjects are not moved — it is purely a visual effect.

```typescript
this._mainCamera.shake(
  1000,           // duration in ms
  0.05,           // intensity (use low values)
  true,           // force
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('shake completed');
    }
  }
);
```

::info-box{type="tip"}
Use very low intensity values: `0.01`–`0.05`. High values make the effect annoying and unprofessional.
::

### Fade

Fades the camera toward the indicated color for the specified duration. In Phaser 4, the methods **`fadeIn()`** and **`fadeOut()`** are also available as more explicit aliases.

```typescript
// Fade to black (fade out)
this._mainCamera.fadeOut(
  2000,     // duration in ms
  0, 0, 0,  // color (black by default)
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      this.scene.start('GameOver');
    }
  }
);

// Fade from black to visible (fade in)
this._mainCamera.fadeIn(
  1500,
  0, 0, 0,
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('scene visible');
    }
  }
);
```

| Method | Description |
|---|---|
| `fade()` | Generic method — fades toward the indicated color |
| `fadeOut()` | Explicit alias for fade toward the color (Phaser 4) |
| `fadeIn()` | Fades from the color toward visible (Phaser 4) |

A classic use case is **scene transition with dissolve**:

```typescript
this._mainCamera.fadeOut(500, 0, 0, 0, () => {
  this.scene.start('NextScene');
});
```

::info-box{type="tip"}
**Official documentation:**
- [Camera](https://docs.phaser.io/api-documentation/class/cameras-scene2d-camera)
- [SmoothedKeyControl](https://docs.phaser.io/api-documentation/class/cameras-controls-smoothedkeycontrol)
- [Effects.Flash](https://docs.phaser.io/api-documentation/class/cameras-scene2d-effects-flash)
- [Effects.Shake](https://docs.phaser.io/api-documentation/class/cameras-scene2d-effects-shake)
- [Effects.Fade](https://docs.phaser.io/api-documentation/class/cameras-scene2d-effects-fade)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=camera"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

The camera is one of those systems that seems superfluous at first — "my game fits entirely on screen anyway" — and then becomes indispensable the exact second you try `startFollow` on your character. From that moment you can't live without it.

Three effects that alone elevate any game by a level: **flash** when the player takes damage, **shake** when there's an explosion, **fadeOut** to transition to a new scene. They're five lines of code each and make an enormous impact.

**Pro tip**: `fadeOut` in the callback with `this.scene.start('SceneName')` is the elegant way to do transitions. No abrupt cuts — players always notice.

`worldView` you'll use as soon as your world grows larger than the screen: enemy spawning at the edges, destroying objects that exit the view. Stuff that truly optimizes performance. 🎬
::
