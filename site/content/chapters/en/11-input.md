---
title: 'Input Handling'
slug: '11-input'
chapter: 11
difficulty: intermediate
readingTime: '~25 min'
---

## Keyboard

Phaser makes it very easy to handle keyboard input through the `Phaser.Input.Keyboard` class.

---

## Cursors

As seen in some previous examples, it is possible to manage character movement through a specific class for cursor keys.

First we define a variable that will hold the cursor keys instance:

```typescript
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
```

In the `create()` method, we use `createCursorKeys()` to create the instance:

```typescript
this._cursors = this.input.keyboard!.createCursorKeys();
```

`_cursors` provides references to the 4 directions (`up`, `down`, `left`, `right`) and the `space` and `shift` keys.

In the `update()` method we check the `isDown` property to verify if a key is pressed:

```typescript
if (this._cursors.left.isDown) {
  // move the character left
}

if (this._cursors.right.isDown) {
  // move the character right
}

if (this._cursors.up.isDown) {
  // jump
}
```

::info-box{type="tip"}
`isDown` is `true` for the entire duration of the key press — useful for continuous character movement.
::

---

## Custom Keys

It is possible to handle input with custom keys other than the directional arrows. We define variables for each key:

```typescript
private _w: Phaser.Input.Keyboard.Key;
private _a: Phaser.Input.Keyboard.Key;
private _s: Phaser.Input.Keyboard.Key;
private _d: Phaser.Input.Keyboard.Key;
private _space: Phaser.Input.Keyboard.Key;
```

In the `create()` method, we use `addKey()` to create a reference to each key:

```typescript
this._w = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this._a = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this._s = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this._d = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this._space = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
```

In the `update()` method, we check the key state exactly as with cursors:

```typescript
if (this._d.isDown) {
  // move the character right
}
```

### isDown vs JustDown

| Method | Behavior | Typical use |
|--------|--------------|------------|
| `isDown` | `true` for the entire duration of the press | Character movement |
| `JustDown()` | `true` only on the first frame of the press | Shooting, jumping, interaction |

When we want to detect a **single press** (for example to fire a bullet), `isDown` is not effective because it executes the code continuously. In these cases we use the static method `Phaser.Input.Keyboard.JustDown()`:

```typescript
// fire only one bullet per key press
if (Phaser.Input.Keyboard.JustDown(this._space)) {
  this.shoot();
}
```

`JustDown()` detects the "single" press: the code is executed **only once** for each key press.

::info-box{type="tip"}
There is also `Phaser.Input.Keyboard.JustUp()` which detects the key release — useful for charged shots or long-press controls.
::

---

## A Virtual Joystick

When developing games for touch devices (smartphones and tablets), an alternative to keyboard input is needed. One solution is to use the external library **nipplejs** which creates a real virtual joystick.

### Installation

Add the dependency in the `package.json` file:

```json
"dependencies": {
  "nipplejs": "^0.10.1",
  "phaser": "^4.0.0"
}
```

Run in the terminal:

```bash
npm update
```

### Import

Import the library into the player class:

```typescript
import nipplejs from 'nipplejs';
```

### Implementation

In the player's initialization method, insert the code to handle movement via virtual joystick:

```typescript
// create a joystick instance
const joystickManager: nipplejs.JoystickManager = nipplejs.create({
  color: 'red'
});

// movement start event
joystickManager.on('start', () => {
  // the joystick was touched
});

// movement event
joystickManager.on('move', (data: nipplejs.EventData, output: nipplejs.JoystickOutputData) => {
  // force: displacement intensity (0-1)
  const force: number = Math.min(output.force, 1);

  // angle: angle in radians
  const angle: number = output.angle.radian;

  // calculate speed based on force and maximum player speed
  const speed: number = this._acceleration * force;

  // set velocity using trigonometry
  this.setVelocity(
    speed * Math.cos(angle),
    speed * Math.sin(angle) * -1
  );
});

// movement end event
joystickManager.on('end', () => {
  // the joystick was released — stop the character
  this.setVelocity(0, 0);
});
```

::info-box{type="tip"}
The virtual joystick works via events (`start`, `move`, `end`) — it is not necessary to check its state in `update()` as is done with keyboard keys.
::

::info-box{type="new"}
The `output.force` and `output.angle.radian` parameters allow implementing analog movement: the further the joystick is moved from center, the greater the character's speed.
::

---

## Comparison of input methods

| Method | Device | When to use it |
|--------|-------------|---------------|
| `CursorKeys` | Keyboard | Rapid prototyping, 4-direction movement |
| `Custom Keys (WASD)` | Keyboard | Alternative layout, more simultaneous keys |
| `Virtual Joystick` | Touch | Mobile and tablet |

---

## Resources

- [Keyboard Documentation — Phaser](https://docs.phaser.io/api-documentation/namespace/input-keyboard)
- [input/keyboard examples — Phaser Labs](https://labs.phaser.io/index.html?dir=input/keyboard/)
- [CursorKeys example](https://labs.phaser.io/edit.html?src=src/input/keyboard/cursor%20keys.js)
- [JustDown example](https://labs.phaser.io/edit.html?src=src/input/keyboard/just%20down.js)
- [nipplejs library](https://yoannmoi.net/nipplejs/)
