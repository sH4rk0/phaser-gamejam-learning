---
title: 'Introduction to GameObjects'
slug: '5-1-gameobjects-intro'
chapter: 5.1
difficulty: intermediate
readingTime: '~20 min'
---

## What are GameObjects

In Phaser, **gameObjects** are all those elements we use to display objects within our scene. They all derive from the base class `Phaser.GameObjects` and extend it with their own implementations.

In the following chapters we will examine these gameObjects:

| GameObject | Purpose |
|---|---|
| `text` | Display text on screen |
| `image` | Display static images |
| `sprite` | Display animated images |
| `tileSprite` | Create repeating backgrounds and parallax |
| `group` | Group and manage similar gameObjects |
| `container` | Contain gameObjects in a common visual context |

All are part of the **GameObjectsFactory**. Some (like `container` and `group`) have no direct visual output but serve to organize others.

### Creating an instance

To add a gameObject to the scene, use `this.add` followed by the type:

```typescript
create() {
  this.add.text(0, 0, "Hello World", { fontSize: "20px" });
}
```

`this` represents the current scene, `add` is the method that accesses the GameObjectFactory. The instance can be assigned to a private variable for reuse:

```typescript
create() {
  this._helloWorld = this.add.text(0, 0, "Hello World", { fontSize: "20px" });
  this._helloWorld.setPosition(10, 10);
}
```

## Common properties

These methods are available on all gameObjects.

### .setPosition(x, y)

Sets the x and y position of the gameObject in the game world.

```typescript
this._myObject.setPosition(400, 300);
```

### .setDepth(value)

Controls the **z-index** of the gameObject. By default, the display order depends on the creation sequence in the code: the second object created overlaps the first.

```typescript
create() {
  this._image1 = this.add.image(850, 200, "immagine1"); // below
  this._image2 = this.add.image(855, 200, "immagine2"); // above
}
```

With `setDepth` we can invert the order without changing the initialization sequence:

```typescript
create() {
  this._image1 = this.add.image(850, 200, "immagine1").setDepth(1); // above
  this._image2 = this.add.image(855, 200, "immagine2");             // below
}
```

::InfoBox{type="tip"}
The default depth value is `0`. A higher value brings the object to the foreground.
::

### .setAbove(gameObject) / .setBelow(gameObject)

Alternative to `setDepth`: positions the gameObject immediately above or below another specific gameObject.

```typescript
this._image1.setAbove(this._image2); // image1 in front of image2
```

### .setToTop() / .setToBack()

New in Phaser 4: brings the gameObject to the top or bottom of the display list, without needing to know the depths of other objects.

```typescript
this._overlay.setToTop();  // absolute foreground
this._background.setToBack(); // absolute background
```

### .setAlpha(alpha)

Controls **opacity**. Values between `0` (transparent) and `1` (opaque).

```typescript
this._myObject.setAlpha(0.5); // semi-transparent
```

### .setAngle(degrees) / .setRotation(radians)

Rotates the gameObject. `setAngle` accepts degrees, `setRotation` radians.

```typescript
this._myObject.setAngle(45);           // 45 degrees
this._myObject.setRotation(Math.PI);   // 180 degrees in radians
```

### .setTint / .setTintMode / .clearTint

`setTint` sets the tint color. It accepts a single hexadecimal color or four values to color the individual corners of the gameObject.

```typescript
this._sprite.setTint(0xff6600);

// different corners
this._sprite.setTint(0xff0000, 0x00ff00, 0x0000ff, 0xffffff);
```

![setTint example: tint applied to three robots](/images/chapters/cap5/setTint.png)

`clearTint` removes any applied tint:

```typescript
this._sprite.clearTint();
```

To color **individual corners** via direct properties:

```typescript
this._sprite.tintTopLeft     = 0xff0000;
this._sprite.tintTopRight    = 0x00ff00;
this._sprite.tintBottomLeft  = 0x0000ff;
this._sprite.tintBottomRight = 0xffffff;
```

### .setTintMode(mode)

Controls how the tint is applied to the texture. In Phaser 4, color and blending mode are separate operations.

```typescript
this._sprite.setTintMode(Phaser.TintModes.FILL);
```

Or via the direct property:

```typescript
this._sprite.tintMode = Phaser.TintModes.MULTIPLY;
```

**Available modes (`Phaser.TintModes`):**

| TintMode | Effect |
|---|---|
| `MULTIPLY` | Multiplies RGB channels: default, classic tint effect |
| `FILL` | Completely replaces pixel colors — useful for "white flash" when a character takes damage |
| `ADD` | Adds RGB channels: luminous effect, glow |
| `SCREEN` | Inverse of multiply: lightens pixels |
| `OVERLAY` | Combines multiply and screen based on base luminosity |
| `HARD_LIGHT` | Like overlay but with source and destination inverted |

Example — white flash on damage:

```typescript
// v3 (removed in v4)
// this._sprite.setTintFill(0xffffff);

// v4
this._sprite.setTint(0xffffff).setTintMode(Phaser.TintModes.FILL);
```

![FILL mode example: complete color replacement](/images/chapters/cap5/setTintFill.png)

::info-box{type="new"}
In Phaser 4, `setTintFill()` and the `tintFill` property have been removed. Use `setTintMode(Phaser.TintModes.FILL)` as a replacement. The `FILL` mode now correctly handles partial alpha values.
::

### .setBlendMode(mode)

Controls how the gameObject's pixels combine with those already drawn below. Default: `Phaser.BlendModes.NORMAL` (no effect).

```typescript
this._myObject.setBlendMode(Phaser.BlendModes.ADD);
```

Or via the direct property:

```typescript
this._myObject.blendMode = Phaser.BlendModes.MULTIPLY;
```

**Available modes:**

| BlendMode | Effect |
|---|---|
| `NORMAL` | Default — no blending |
| `ADD` | Adds RGB channels: light effect, glow, explosion |
| `MULTIPLY` | Multiplies colors: darkens, shadow effect |
| `SCREEN` | Inverse of multiply: lightens, projected screen effect |
| `OVERLAY` | Combines multiply and screen based on luminosity |
| `ERASE` | Erases pixels from destination (only on RenderTexture) |
| `SOURCE_IN` | Shows only the intersection (Canvas only) |
| `SOURCE_OUT` | Shows only the part outside the intersection (Canvas only) |
| `SOURCE_ATOP` | Overlays respecting destination alpha (Canvas only) |
| `DESTINATION_OVER` | Draws below existing destination (Canvas only) |
| `DESTINATION_IN` | Keeps only the intersection (Canvas only) |
| `DESTINATION_OUT` | Keeps only the part outside (Canvas only) |
| `DESTINATION_ATOP` | Inverse of source-atop (Canvas only) |
| `LIGHTER` | Like ADD but limited to values [0, 1] (Canvas only) |
| `COPY` | Completely overwrites the destination (Canvas only) |
| `XOR` | Bitwise XOR on alpha (Canvas only) |

::info-box{type="warning"}
Modes marked as *Canvas only* do not work with the WebGL renderer. `ADD`, `MULTIPLY`, `SCREEN`, and `NORMAL` work on both.
::

::info-box{type="tip"}
`ADD` is the most common choice for particle effects, explosions, and glowing power-ups. `MULTIPLY` for shadows and atmospheric overlays.
::

**Support by gameObject type:**

| GameObject | WebGL | Canvas |
|---|---|---|
| `Image`, `Sprite`, `TileSprite` | All WebGL modes | All Canvas modes |
| `Text` | `NORMAL`, `ADD`, `MULTIPLY`, `SCREEN` | All |
| `Graphics` | `NORMAL`, `ADD` | All |
| `RenderTexture` | All + `ERASE` | All |
| `Container` | Inherited from renderer | Inherited from renderer |
| `Group` | Not directly supported | Not directly supported |

::info-box{type="new"}
In Phaser 4, you can also pass a CSS blend mode string directly: `setBlendMode('multiply')`. Phaser automatically maps it to the corresponding internal constant.
::

### .setFlip(x, y)

Flips the gameObject horizontally and/or vertically. `.setFlipX()` and `.setFlipY()` are also available.

```typescript
this._myObject.setFlipX(true);  // horizontal mirror
this._myObject.setFlip(true, false);
```

::InfoBox{type="warning"}
Flipping is purely visual: it does not modify position values or the physics body.
::

### vertexRoundMode

Controls whether and when vertex coordinates are rounded to the nearest pixel. Useful for eliminating aliasing on axis-aligned pixel-art objects.

```typescript
this._myObject.vertexRoundMode = "off";      // never round
this._myObject.vertexRoundMode = "safe";     // only if no scale/rotation
this._myObject.vertexRoundMode = "safeAuto"; // safe, only if camera has roundPixels (default)
this._myObject.vertexRoundMode = "full";     // always (may cause wobble on rotated objects)
this._myObject.vertexRoundMode = "fullAuto"; // full, only if camera has roundPixels
```

::info-box{type="new"}
In Phaser 4, `roundPixels` is `false` by default (was `true` in v3). The `vertexRoundMode` property replaces the old global flag with per-object granular control.
::

### .setScrollFactor(x, y)

Controls how much the gameObject moves relative to the camera. Useful for UI elements or backgrounds.

| Value | Behavior |
|---|---|
| `1` | Moves in sync with the camera (default) |
| `0` | Stays fixed on screen (ideal for HUD) |
| `0.5` | Moves at half the camera speed (parallax) |

```typescript
this._scoreText.setScrollFactor(0); // the score stays fixed
```

### .setScale(x, y)

Resizes the gameObject. If only one value is passed, it is applied uniformly.

```typescript
this._myObject.setScale(2);      // double size
this._myObject.setScale(2, 0.5); // wide and flat
```

### .setOrigin(x, y)

Sets the **anchor point** of the gameObject. Values are between `0` and `1`, where `0.5, 0.5` is the center.

```typescript
this._myObject.setOrigin(0, 0);     // top-left corner
this._myObject.setOrigin(0.5, 0.5); // center (default)
this._myObject.setOrigin(1, 1);     // bottom-right corner
```

![Diagram of origin points (0,0 → 1,1)](/images/chapters/cap5/setOrigin.png)

### .setInteractive()

Enables the gameObject to receive input events (click, touch, hover).

```typescript
this._button.setInteractive();
```

### .on(event, callback, context)

Adds an event **listener** to the gameObject. The `setInteractive()` and `on()` methods are often chained with `setScale()`:

```typescript
this._helloWorld
  .setScale(2)
  .setInteractive()
  .on("pointerdown", () => { /* execute on click */ }, this)
  .on("pointerover", () => { /* execute on hover */ }, this)
  .on("pointerout",  () => { /* execute on exit */ }, this);
```

| Event | When it fires |
|---|---|
| `pointerdown` | Mouse click / tap on mobile |
| `pointerup` | Mouse release / finger release |
| `pointerover` | Cursor enters the gameObject |
| `pointerout` | Cursor exits the gameObject |

### .destroy()

Removes the gameObject from the scene and from memory. Use when an object will no longer be needed (bullet that went off screen, eliminated enemy).

```typescript
this._bullet.destroy();
```

::InfoBox{type="tip"}
For the complete list of available gameObjects: [docs.phaser.io/api-documentation/class/gameobjects](https://docs.phaser.io/api-documentation/class/gameobjects)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

I already know: you haven't memorized all these methods. And that's completely fine.

What you need to take away is a handful of methods you'll use in 90% of cases: `setPosition`, `setAlpha`, `setScale`, and `setOrigin`. With those you put anything anywhere, resize it, and make it transparent.

`setInteractive()` + `.on('pointerdown', ...)` is the magic combo for making something clickable — buttons, collectibles, enemies to hit.

`setDepth` when something appears behind when it should be in front. `destroy()` when something needs to disappear forever.

The rest? You copy from the documentation every time you need it. **Google and the Phaser docs are tools of the trade**, not signs of weakness. 🔍
::
