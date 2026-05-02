---
title: 'Arcade Physics'
slug: '8-arcade-physics'
chapter: 8
difficulty: intermediate
readingTime: '~35 min'
---

## Introduction

Phaser uses a proprietary physics engine called **Arcade Physics**, designed to be simple and performant. It includes collision handling, gravity, and gameObject dynamics.

When physics is activated on a gameObject, the `body` property becomes available, providing access to all specific methods: velocity, acceleration, gravity, and much more.

### Rigid Body vs Soft Body

| Type | Behavior |
|---|---|
| **Rigid Body** | Distances between points of the object remain constant — it does not deform during physical interactions |
| **Soft Body** | Deforms in response to external forces (fabrics, rubber, fluids) |

Arcade Physics uses **rigid bodies**: excellent for arcade and platform games, not suitable for realistic physics simulations.

### Enabling physics on a gameObject

**Method 1** — enable physics on an existing sprite:

```typescript
let _sprite = this.add.sprite(100, 100, "mysprite");
this.physics.world.enableBody(_sprite);

let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
_body.setGravityY(100);
```

**Method 2** — create the sprite directly through the physics class (recommended):

```typescript
let _sprite: Phaser.Physics.Arcade.Image = this.physics.add.sprite(200, 200, "mysprite");
_sprite.setGravityY(200);
```

With the second method, the body is immediately available and physics methods can be chained directly on the object.

::info-box{type="tip"}
You can specify the body type: **dynamic** (has velocity and acceleration) or **static** (stays fixed, ideal for platforms and walls). `Phaser.Physics.Arcade.DYNAMIC_BODY` / `Phaser.Physics.Arcade.STATIC_BODY`.
::

---

## Body Properties

### blocked

Indicates whether the gameObject is colliding with a **Tile** (map element).

```typescript
if (_sprite1.body.blocked.down) {
  // the gameObject is resting on a tile
}
```

Available properties: `up`, `down`, `left`, `right`, `none`.

Equivalent methods: `.onCeiling()`, `.onFloor()`, `.onWall()` — return `true` if the gameObject collides with ceiling, floor, or walls respectively.

### touching

Indicates whether the gameObject is colliding with **other gameObjects**.

```typescript
if (_sprite1.body.touching.down) {
  // the gameObject is touching something below it
}
```

Available properties: `up`, `down`, `left`, `right`, `none`.

### top, bottom, left, right

Return the x or y values of the body edges. Useful for precise position calculations.

```typescript
const footY = _sprite.body.bottom;
const headY = _sprite.body.top;
```

---

## Body Methods — Shape

The body by default has the same dimensions as the sprite frame. It can be redefined.

::info-box{type="warning"}
The body in arcade physics **does not rotate** with the gameObject's rotation. This allows for faster collision calculations.
::

### .setSize(width, height, center?)

Redefines the hitbox dimensions. If called without parameters, restores the original dimensions. The `center` parameter (default `true`) centers the body in the sprite.

```typescript
_sprite1.body.setSize(20, 20);          // centered
_sprite2.body.setSize(20, 20, false);   // starts at (0, 0) of the sprite
```

### .setOffset(x, y)

Applies an offset to the body position relative to the sprite.

```typescript
_sprite.body.setOffset(5, 10);
```

### .setCircle(radius, offsetX?, offsetY?)

Redefines the body as a circle. Useful for bullets and round objects.

```typescript
_sprite1.body.setCircle(16, 0, 8);
_sprite2.body.setCircle(12, 2, 14);
```

::info-box{type="tip"}
Interactive examples → [body controls](https://labs.phaser.io/view.html?src=src/physics/arcade/body%20controls.js) — documentation → [Physics.Arcade.Body](https://docs.phaser.io/api-documentation/class/physics-arcade-body)
::

---

## Body Methods — Movement

### Acceleration

```typescript
_sprite.body.setAcceleration(100, 100);    // x and y
_sprite.body.setAccelerationX(100);        // x only
_sprite.body.setAccelerationY(100);        // y only
```

### Velocity

```typescript
_sprite.body.setVelocity(200, 0);          // x and y
_sprite.body.setVelocityX(200);            // x only
_sprite.body.setVelocityY(-300);           // y only (negative = up)
```

### Maximum velocity

Limits the maximum velocity the body can reach (useful with acceleration or gravity).

```typescript
_sprite.body.setMaxVelocity(400, 600);
_sprite.body.setMaxVelocityX(400);
_sprite.body.setMaxVelocityY(600);
```

---

## Body Methods — Gravity

### .setAllowGravity(value)

Enables or disables global gravity on this specific body.

```typescript
_sprite.body.setAllowGravity(false); // the gameObject is not affected by gravity
```

### .setGravity(x, y)

Applies local gravity to the gameObject, which adds to the scene's global gravity.

```typescript
_sprite.body.setGravity(0, 600); // falls quickly downward
_sprite.body.setGravityX(200);
_sprite.body.setGravityY(600);
```

---

## Body Methods — Behavior

### .setImmovable(value)

If `true`, the gameObject is not affected by physical forces from collisions with other gameObjects. It stays fixed regardless of impacts. Ideal for moving platforms.

```typescript
_platform.body.setImmovable(true);
```

### .setDirectControl(value)

If `true`, the body calculates its velocity based on the position change each frame. Use when moving the gameObject via a **Tween** or a path (`Path`), so that collisions are calculated correctly.

```typescript
_sprite.body.setDirectControl(true);
```

### .setBounce(x, y)

Defines the bounce level. `0` = no bounce, `1` = maximum bounce (perfect elastic).

```typescript
_sprite.body.setBounce(0.5, 0.5);
_sprite.body.setBounceX(0.8);
_sprite.body.setBounceY(0.3);
```

### .setFriction(x, y)

Defines the friction when colliding with other gameObjects. `0` = no friction, `1` = maximum friction.

```typescript
_sprite.body.setFriction(0.5, 0.5);
```

### .setCollideWorldBounds(value, bounceX?, bounceY?, onWorldBounds?)

Defines whether the gameObject should bounce off the edges of the game world (defined by `setBounds()`).

```typescript
_sprite.body.setCollideWorldBounds(true);
```

Advanced version with `worldbounds` event:

```typescript
let _sprite = this.physics.add.sprite(200, 200, "mysprite").setScale(2);
_sprite.body.setGravityY(200).setCollideWorldBounds(true, 1, 1, true);

this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
  let _gameObject = <Phaser.GameObjects.Sprite>body.gameObject;
  _gameObject.setAlpha(Phaser.Math.RND.realInRange(0, 1));
});
```

When a gameObject with `onWorldBounds: true` hits the edges, the `worldbounds` event is emitted with a reference to the body. From the body, the gameObject is accessed via cast and the desired behavior is handled.

---

## Physics class methods

Accessible via `this.physics`, they allow moving gameObjects, calculating distances, and managing collisions.

### .accelerateTo()

Sets the gameObject's acceleration so it moves toward the indicated coordinates at the specified speed (pixels/s²).

```typescript
let _sprite2 = this.physics.add.sprite(400, 200, "mysprite");
this.physics.accelerateTo(_sprite1, 400, 400, 200);
```

::info-box{type="warning"}
The gameObject **does not follow the target** if it changes position. For continuous pursuit, call the method in `update()`. The gameObject **does not stop** once it reaches the destination.
::

### .accelerateToObject()

Like `accelerateTo`, but the destination is another gameObject (not fixed coordinates).

```typescript
this.physics.accelerateToObject(_sprite1, _sprite2, 400);
```

### .moveTo()

Moves the gameObject toward the indicated coordinates at **constant speed**. If `maxTime` is specified, the speed is adjusted to arrive at the destination within that time (±50ms approximation).

```typescript
this.physics.moveTo(_sprite1, 400, 400, 400, 2000);
```

### .moveToObject()

Like `moveTo`, but the destination is a gameObject.

```typescript
this.physics.moveToObject(_sprite1, _sprite2, 400, 1000);
```

### .closest() / .furthest()

Returns the nearest (or furthest) body relative to a source gameObject, searching within an array of gameObjects.

```typescript
let _closest = this.physics.closest(_sprite1, this._enemyGroup.getChildren());
let _furthest = this.physics.furthest(_sprite1, this._enemyGroup.getChildren());

// from the body, access the position
console.log(_closest.x, _closest.y);
```

For an updated value, call `.closest()` / `.furthest()` in `update()`.

### .velocityFromAngle()

Given the angle in **degrees** and the speed, calculates the velocity vector and applies it to the body.

```typescript
this.physics.velocityFromAngle(45, 300, _sprite.body.velocity);
```

### .velocityFromRotation()

Like `velocityFromAngle`, but the angle is in **radians**.

```typescript
this.physics.velocityFromRotation(Math.PI / 4, 300, _sprite.body.velocity);
```

---

## Collisions between gameObjects

### collider vs overlap

| Method | Behavior |
|---|---|
| `collider` | Physical collision: objects bounce off each other modifying velocity and direction |
| `overlap` | Detects overlap without physical interaction — executes the callback but does not alter movement |

### .collider()

```typescript
let _sprite1 = this.physics.add.sprite(200, 200, "mysprite")
  .setCollideWorldBounds(true).setBounce(1, 1).setVelocity(200, 200);
let _sprite2 = this.physics.add.sprite(400, 150, "mysprite")
  .setCollideWorldBounds(true).setBounce(1, 1).setVelocity(200, 200);

this.physics.add.collider(_sprite1, _sprite2, this.onCollide, null, this);
```

The `onCollide` callback receives the two gameObjects that collided. To access their methods, a cast to the correct type is necessary:

```typescript
onCollide(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
  const _sprite1 = <Phaser.GameObjects.Sprite>object1;
  const _sprite2 = <Phaser.GameObjects.Sprite>object2;
  _sprite1.setTint(Math.random() * 0xffffff);
  _sprite2.setTint(Math.random() * 0xffffff);
}
```

The callback method name is arbitrary. Use descriptive names: `onPlayerVsEnemyCollide`, `onBulletHitsEnemy`.

The second parameter of `collider` can also be a **Group**: Phaser automatically handles collisions between the gameObject and all elements of the group, without manual loops.

```typescript
this.physics.add.collider(this._player, this._enemyGroup, this.onPlayerVsEnemy, null, this);
```

### .overlap()

Identical syntax to `collider`, but overlapping gameObjects **do not modify velocity and direction**. Typically used for power-ups, trigger zones, collectible objects.

```typescript
create() {
  this.physics.add.overlap(_sprite1, _sprite2, this.onOverlap, null, this);
}

onOverlap(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
  // handle the overlap
}
```

::info-box{type="tip"}
**Official documentation:**
- [ArcadePhysics](https://docs.phaser.io/api-documentation/class/physics-arcade-arcadephysics)
- [Physics.Arcade.Body](https://docs.phaser.io/api-documentation/class/physics-arcade-body)

::

::PhaserLabsBox{url="https://labs.phaser.io/?path=physics%2Farcade"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Arcade physics is the moment your gameObjects stop being images and start being objects in the world. That feeling when you add `setGravityY` and the character starts to fall — it's one of the most satisfying moments in game development.

The key concept to take away: **the body is separate from the sprite**. You can resize it, make it circular, give it an offset. This flexibility is what allows you to have a precise hitbox even on sprites with a lot of empty space around them.

`collider` for things that need to bounce physically (walls, platforms, enemies that collide). `overlap` for things that need to "detect" without interaction (collectible coins, trigger zones, checkpoints).

**Pro tip**: `setCollideWorldBounds(true)` is the first thing you add to any moving sprite. Without it, the character falls into the void and you don't understand why it's no longer visible. 🎮
::
