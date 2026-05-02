---
title: 'Container'
slug: '5-7-container'
chapter: 5.7
difficulty: intermediate
readingTime: '~12 min'
---


The Container is a gameObject that can **contain other gameObjects** as children. Unlike the Group (which is purely logical), the Container exists in the display list and participates in rendering: position, scale, rotation, and alpha applied to the container automatically propagate to all its children.

```typescript
private _popup: Phaser.GameObjects.Container;

// in create():
const bg    = this.add.rectangle(0, 0, 400, 200, 0x222244);
const title = this.add.text(-180, -70, "Game Over", { fontSize: "28px" });
const btn   = this.add.text(-40, 50, "Retry", { fontSize: "20px" });

this._popup = this.add.container(512, 300, [bg, title, btn]);
```

The third parameter of `this.add.container(x, y, children)` directly accepts the array of children.

### Relative coordinates

Children's positions are **relative to the container's origin**, not the scene. If the container is at `(512, 300)` and a child has position `(0, 0)`, the child will appear exactly at the center of the container.

```typescript
// move the entire popup 100px to the right — children follow
this._popup.setPosition(612, 300);
```

### Adding and removing children

```typescript
this._popup.add(newElement);           // adds a child
this._popup.remove(btn);               // removes without destroying
this._popup.remove(btn, true);         // removes and destroys
this._popup.getAll();                  // returns all children
this._popup.getByName("title-text");   // finds a child by name
```

To find a child by name, the gameObject must have its `name` property set:

```typescript
title.name = "title-text";
```

### Complete example: popup with tween

```typescript
// hide the popup at startup
this._popup.setAlpha(0).setScale(0.8);

// show it on button click
this._openButton.setInteractive().on("pointerdown", () => {
  this.tweens.add({
    targets: this._popup,
    alpha: 1,
    scale: 1,
    duration: 250,
    ease: "Back.Out",
  });
}, this);

// hide it on close
btn.setInteractive().on("pointerdown", () => {
  this.tweens.add({
    targets: this._popup,
    alpha: 0,
    scale: 0.8,
    duration: 200,
  });
}, this);
```

::InfoBox{type="warning"}
Children of a Container **cannot have an Arcade physics body**. If you need physics on objects, use a Group instead of a Container.
::

### Group vs Container — when to use which

| | Group | Container |
|---|---|---|
| Visual representation | No | Yes |
| Children coordinates | Independent | Relative to container |
| Inherited transformations | No | Yes (position, scale, alpha, rotation) |
| Compatible with Arcade Physics | Yes | No |
| Typical use | Enemies, bullets, collectibles | UI, popups, HUD, visual groups |

::InfoBox{type="new"}
In the next chapter we will look at **Tweens** and **audio**: essential tools for animating gameObjects over time and adding sound effects to the game.
::

## Summary

In this group of chapters we have:

- ✅ Understood the concept of gameObjects and the GameObjectsFactory
- ✅ Used common properties (position, depth, alpha, scale, origin, tint, flip, setToTop/setToBack)
- ✅ Made gameObjects interactive with `setInteractive()` and `.on()`
- ✅ Created texts, images, and sprites with their specific properties
- ✅ Created a background with parallax effect using TileSprite
- ✅ Organized gameObjects with Group and Container

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fcontainer"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

The rule that saves you from confusion: **Container for UI, Group for physics**.

Popups, HUD, panels, life bars made of multiple pieces — all of that is Container. Move the container 10 pixels and all children follow. That's the behavior you expect from a composite visual element.

Enemies, bullets, collectible coins — everything that needs to collide with something is Group. Children of a Container cannot have a physics body, so don't try to use it for game objects.

The popup pattern with `alpha: 0` + tween to `alpha: 1` with `ease: 'Back.Out'` that I showed in the example? Use it always. It costs nothing and makes the game look professional. 🖼️
::
