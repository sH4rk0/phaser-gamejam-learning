---
title: 'Group'
slug: '5-6-group'
chapter: 5.6
difficulty: intermediate
readingTime: '~10 min'
---


The Group is a **logical container** for gameObjects of the same type. It has no visual representation of its own: it serves to manage collections of objects (enemies, bullets, coins) as a single entity, simplifying updates, iterations, and collisions.

```typescript
private _enemies: Phaser.GameObjects.Group;

// in create():
this._enemies = this.add.group({
  runChildUpdate: true,
  maxSize: 50,
});
```

| Option | Description |
|---|---|
| `runChildUpdate` | If `true`, automatically calls `update()` on each group element every frame |
| `maxSize` | Maximum number of elements; `-1` = unlimited |
| `classType` | Class used by `.create()` to instantiate new elements |

### Adding and creating elements

You can add an existing gameObject or create a new one directly through the group:

```typescript
// adds an already created object
const bomb = this.add.sprite(100, 100, "bomb");
this._enemies.add(bomb);

// creates and adds in one step
const enemy = this._enemies.create(200, 150, "enemy");
```

With `.create()` the gameObject is instantiated, added to the scene and the group all at once.

### Iterating over elements

```typescript
// perform an action on all elements
this._enemies.getChildren().forEach((child) => {
  const sprite = child as Phaser.GameObjects.Sprite;
  sprite.setVelocityX(-100);
});
```

### Main methods

| Method | Description |
|---|---|
| `.add(child)` | Adds an existing gameObject to the group |
| `.create(x, y, key)` | Creates a new gameObject and adds it to the group and scene |
| `.getChildren()` | Returns the array of all elements |
| `.getLength()` | Returns the number of elements present |
| `.getFirst(active)` | Returns the first element (active or inactive) |
| `.remove(child, removeFromScene, destroyChild)` | Removes an element from the group |
| `.clear(removeFromScene, destroyChild)` | Removes all elements |

`.remove()` and `.clear()` accept two booleans: the first also removes the object from the scene, the second calls `.destroy()` on the object, freeing memory.

### Object pooling

A common pattern with Groups is the **object pool**: instead of continuously creating and destroying gameObjects (a costly operation), existing ones are reused by deactivating them when not needed and reactivating them when needed again.

```typescript
// retrieve an inactive element from the pool
const bullet = this._bullets.getFirst(false) as Phaser.GameObjects.Sprite;
if (bullet) {
  bullet.setPosition(playerX, playerY);
  bullet.setActive(true).setVisible(true);
}
```

::InfoBox{type="tip"}
The Group is essential for **collisions** with Arcade Physics: `this.physics.add.collider(player, this._enemies)` automatically handles collisions between the player and all enemies in the group, without manual loops.
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fgroup"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

The Group solves the problem you have already encountered (or will encounter in ten minutes): how do you manage twenty enemies at the same time without twenty separate variables?

The answer is a group. One reference, all elements inside. `getChildren().forEach()` to update them, `physics.add.collider()` for collisions — Phaser does the loop for you.

**Object pooling** seems complicated until you understand the intuition: destroying and recreating objects is costly. Deactivating and reusing them is free. For bullets and enemies that constantly disappear and reappear, the pool makes the difference between 60fps and 20fps. It's worth understanding right from the start. 🎯
::
