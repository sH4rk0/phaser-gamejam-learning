---
title: 'Particle System'
slug: '12-particles'
chapter: 12
difficulty: intermediate
readingTime: '~30 min'
---

## Introduction

Phaser 4's **particle system** is one of the most powerful tools for adding dynamic visual effects to your games: explosions, fire, smoke, sparks, magic, rain, stars. The core object is the `ParticleEmitter`, a GameObject that autonomously generates and manages hundreds of particles per frame.

In Phaser 4, the particle system was completely rewritten compared to Phaser 3. The emitter is now a **first-class GameObject**, supporting depth, alpha, tint, and can be added directly to the scene like any other object.

---

## Creating a ParticleEmitter

The most direct method is `this.add.particles()`:

```typescript
const emitter = this.add.particles(x, y, 'texture-key', config);
```

| Parameter | Type | Description |
|---|---|---|
| `x` | `number` | Horizontal position of the emitter |
| `y` | `number` | Vertical position of the emitter |
| `texture` | `string` | Key of the texture loaded in preload |
| `config` | `ParticleEmitterConfig` | Object with all particle settings |

Minimal example — emitter generating particles in continuous flow:

```typescript
const emitter = this.add.particles(400, 300, 'star', {
  speed: 100,
  lifespan: 1000,
  quantity: 5,
});
```

---

## Emission Modes

An emitter can operate in two distinct modes.

### Flow (continuous)

The default mode. The emitter generates `quantity` particles every `frequency` milliseconds until stopped. Starts automatically on creation.

```typescript
const emitter = this.add.particles(400, 300, 'spark', {
  speed: { min: 50, max: 200 },
  lifespan: 800,
  quantity: 3,
  frequency: 100,   // emits every 100ms
});
```

### Explode (burst)

Emits a fixed number of particles in a single moment, then stops. Useful for explosions, impacts, on-demand effects.

```typescript
const emitter = this.add.particles(0, 0, 'spark', {
  speed: { min: 100, max: 300 },
  lifespan: 600,
  quantity: 30,
  emitting: false,   // does not start automatically
});

// burst at a specific point
emitter.explode(30, x, y);
```

`explode(count, x, y)` emits `count` particles at position `(x, y)`, ignoring the emitter's current position.

---

## Main Config Properties

### Speed and Direction

```typescript
{
  speed: 200,                     // fixed speed in px/sec
  speed: { min: 50, max: 300 },   // random speed in range
  speedX: 100,                    // horizontal axis only
  speedY: -200,                   // vertical axis only (negative = up)
  angle: { min: 0, max: 360 },    // emission direction in degrees
}
```

### Lifespan

```typescript
{
  lifespan: 1000,                      // fixed 1 second
  lifespan: { min: 500, max: 1500 },   // random duration
}
```

### Scale

```typescript
{
  scale: 0.5,                            // fixed scale
  scale: { start: 1, end: 0 },          // shrinks to zero over lifetime
  scaleX: { start: 1, end: 2 },         // X axis only
}
```

### Alpha

```typescript
{
  alpha: 0.8,                           // fixed
  alpha: { start: 1, end: 0 },          // gradual fade out
}
```

### Gravity and Acceleration

```typescript
{
  gravityY: 300,    // downward gravity (px/sec²)
  gravityX: -50,    // constant horizontal push
}
```

### Tint and Color

```typescript
{
  tint: 0xff4400,                        // fixed orange tint
  tint: [ 0xff0000, 0xffff00, 0x00ff00 ],// randomly chosen color
  color: [ 0xffffff, 0xff4400, 0x000000 ], // color interpolation over lifetime
}
```

::info-box{type="warning"}
`color` and `tint` are mutually exclusive. If you use `color`, the `tint` value is ignored. `color` interpolates the array values over the particle's lifetime.
::

### Quantity and Frequency

```typescript
{
  quantity: 5,        // particles per cycle
  frequency: 50,      // milliseconds between cycles (lower = denser)
  maxParticles: 100,  // total instance cap
  maxAliveParticles: 50,  // max simultaneously alive particles
}
```

### Bounce and Bounds

```typescript
{
  bounds: { x: 0, y: 0, w: 800, h: 600 },  // bounding box particles stay within
  bounce: 0.5,  // bounce coefficient on edges (0 = stop, 1 = elastic)
}
```

---

## Dynamic Values — the EmitterOp System

Most properties accept values in multiple formats. This is the `EmitterOp` system, the heart of the particle system's flexibility.

| Format | Example | Behavior |
|---|---|---|
| Static | `speed: 100` | Fixed value for all particles |
| Array | `speed: [50, 100, 200]` | Random pick from array |
| Min/Max | `speed: { min: 50, max: 200 }` | Random value in range |
| Start/End | `scale: { start: 1, end: 0 }` | Linear interpolation over lifetime |
| Callback | `x: (p, k, t, v) => v + 10` | Function called on every update |

Advanced example — particle that changes scale and alpha over its lifetime:

```typescript
const emitter = this.add.particles(400, 300, 'circle', {
  speed: { min: 80, max: 200 },
  angle: { min: 0, max: 360 },
  lifespan: 1200,
  scale: { start: 0.8, end: 0 },
  alpha: { start: 1, end: 0 },
  gravityY: 150,
  quantity: 2,
  frequency: 30,
});
```

---

## Emit at Click / Pointer

Common pattern: emit particles where the user clicks or drags the mouse.

```typescript
create() {
  const emitter = this.add.particles(0, 0, 'spark', {
    speed: { min: 50, max: 150 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.5, end: 0 },
    alpha: { start: 1, end: 0 },
    lifespan: 600,
    quantity: 15,
    emitting: false,   // does not start automatically
  });

  this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    emitter.explode(15, pointer.x, pointer.y);
  });
}
```

For a continuous effect while the mouse is held down:

```typescript
this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
  if (pointer.isDown) {
    emitter.explode(5, pointer.x, pointer.y);
  }
});
```

---

## Follow — Attaching an Emitter to a GameObject

The emitter can automatically track another GameObject's position via `setFollow()`:

```typescript
const player = this.physics.add.sprite(400, 300, 'player');

const trail = this.add.particles(0, 0, 'smoke', {
  speed: { min: 10, max: 40 },
  scale: { start: 0.3, end: 0.8 },
  alpha: { start: 0.6, end: 0 },
  lifespan: 800,
  quantity: 1,
  frequency: 30,
});

trail.setFollow(player);
```

With optional offset (e.g. for a rocket exhaust):

```typescript
trail.setFollow(player, 0, 20); // 20px offset downward
```

---

## EmitZone — Emission Zones

By default particles originate from the emitter's `(x, y)` point. With `emitZone` you can define an area or shape they start from.

### Rectangular Zone

```typescript
const emitter = this.add.particles(0, 0, 'rain', {
  lifespan: 1500,
  speedY: { min: 200, max: 400 },
  scale: { min: 0.1, max: 0.3 },
  quantity: 5,
  frequency: 50,
  emitZone: {
    type: 'random',
    source: new Phaser.Geom.Rectangle(0, 0, 800, 10), // strip at the top
  },
});
```

### Circular Zone

```typescript
emitZone: {
  type: 'random',
  source: new Phaser.Geom.Circle(0, 0, 100), // circle of radius 100
}
```

### Edge Zone

```typescript
emitZone: {
  type: 'edge',   // particles start from the perimeter, not inside
  source: new Phaser.Geom.Ellipse(0, 0, 200, 100),
  quantity: 30,
}
```

| `type` | Behavior |
|---|---|
| `'random'` | Random position inside the shape |
| `'edge'` | Position on the perimeter of the shape |

---

## DeathZone — Death Zones

Particles are destroyed when they enter (or leave) a defined zone.

```typescript
const emitter = this.add.particles(400, 500, 'bubble', {
  speed: { min: 50, max: 100 },
  angle: { min: 250, max: 290 },
  lifespan: 3000,
  quantity: 1,
  frequency: 200,
  deathZone: {
    type: 'onEnter',   // dies when entering the zone
    source: new Phaser.Geom.Rectangle(0, 0, 800, 50), // strip at the top
  },
});
```

| `type` | Behavior |
|---|---|
| `'onEnter'` | Particle dies as soon as it enters the zone |
| `'onLeave'` | Particle dies as soon as it leaves the zone |

---

## Controlling the Emitter

```typescript
emitter.start();    // start flow
emitter.stop();     // stop emission (existing particles continue their life)
emitter.pause();    // pause (world freezes)
emitter.resume();   // resume from pause

// timed flow (3 seconds then auto-stop)
emitter.flow(100, 3000);

// stop after N particles emitted
const emitter = this.add.particles(400, 300, 'star', {
  speed: 100,
  lifespan: 800,
  stopAfter: 50,   // stops after emitting 50 particles
});
```

---

## Emit and Death Callbacks

```typescript
const emitter = this.add.particles(400, 300, 'spark', {
  speed: 150,
  lifespan: 600,
  quantity: 2,

  emitCallback: (particle: Phaser.GameObjects.Particles.Particle) => {
    // called every time a particle is born
    particle.setTint(Phaser.Math.Between(0xff0000, 0xffff00));
  },

  deathCallback: (particle: Phaser.GameObjects.Particles.Particle) => {
    // called every time a particle dies
    console.log('particle dead at', particle.x, particle.y);
  },
});
```

---

## Practical Examples

### Explosion on Collider

Typical pattern: the emitter is ready but silent. The burst fires at the moment of impact.

```typescript
private _explosion: Phaser.GameObjects.Particles.ParticleEmitter;

create() {
  this._explosion = this.add.particles(0, 0, 'spark', {
    speed: { min: 100, max: 400 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.6, end: 0 },
    alpha: { start: 1, end: 0 },
    gravityY: 200,
    lifespan: { min: 300, max: 700 },
    emitting: false,
  });

  this.physics.add.overlap(this._bullet, this._enemy, (bullet, enemy) => {
    this._explosion.explode(20, enemy.x, enemy.y);
    enemy.destroy();
    bullet.destroy();
  });
}
```

### Fire Effect

```typescript
const fire = this.add.particles(400, 500, 'particle', {
  speed: { min: 20, max: 60 },
  angle: { min: 260, max: 280 },   // upward with slight variation
  scale: { start: 0.4, end: 0 },
  alpha: { start: 0.8, end: 0 },
  color: [ 0xffff00, 0xff6600, 0xff0000, 0x330000 ],
  lifespan: { min: 400, max: 900 },
  quantity: 3,
  frequency: 20,
});
```

### Rain

```typescript
const rain = this.add.particles(0, -10, 'raindrop', {
  speedY: { min: 400, max: 700 },
  speedX: { min: -20, max: 20 },
  scale: { min: 0.1, max: 0.3 },
  alpha: 0.6,
  lifespan: 1500,
  quantity: 8,
  frequency: 30,
  emitZone: {
    type: 'random',
    source: new Phaser.Geom.Rectangle(0, 0, 800, 1),
  },
});
```

---

## Depth and Rendering Order

`ParticleEmitter` is a GameObject. You can control its depth relative to other objects:

```typescript
const emitter = this.add.particles(400, 300, 'spark', { ... });
emitter.setDepth(10);   // above sprites with depth < 10
```

---

## Complete Schema

```typescript
create() {
  // texture loaded in preload as image or atlas frame
  const emitter = this.add.particles(400, 300, 'star', {
    // position and motion
    speed: { min: 50, max: 250 },
    angle: { min: 0, max: 360 },
    gravityY: 200,

    // appearance
    scale: { start: 1, end: 0 },
    alpha: { start: 1, end: 0 },
    tint: [ 0xffffff, 0x00d4ff, 0x6c3fe8 ],

    // lifecycle
    lifespan: { min: 500, max: 1200 },

    // flow
    quantity: 4,
    frequency: 50,

    // limits
    maxAliveParticles: 200,

    // depth
    depth: 5,
  });

  // stop after 3 seconds
  this.time.delayedCall(3000, () => emitter.stop());
}
```

::info-box{type="tip"}
**Official docs:** [ParticleEmitter API](https://docs.phaser.io/api-documentation/class/gameobjects-particles-particleemitter)

**Phaser Labs examples:** [labs.phaser.io — particle emitter](https://labs.phaser.io/?path=game+objects%2Fparticle+emitter)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fparticle+emitter"}
::
