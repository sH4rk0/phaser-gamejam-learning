---
title: 'Tilemaps'
slug: '10-tilemaps'
chapter: 10
difficulty: intermediate
readingTime: '~40 min'
---

## Introduction

A **tilemap** is a data structure that allows creating and manipulating maps composed of small regular-shaped images called **tiles**. These maps can be used to create 2D levels, apply physics, detect collisions, and control sprite positions.

![Tilemap concept: single tile and complete tileset](/images/ch10/tile-concept.png)

Terminology:
- **Tile** — single square image that makes up the map
- **Tileset** — the collection of all available tiles, gathered in a single PNG image
- **Layer** — map level; a map can have multiple overlapping layers (visual, collisions, objects)

![Tileset example: tiles grouped in a single PNG image](/images/ch10/tileset-example.png)

**Tiled** is the recommended tool for creating maps. It is open source and free.

---

## Tile-extruder — eliminating bleeding

When tiles are exactly 32×32 px, Phaser can generate small visible gaps between adjacent tiles (bleeding). The `tile-extruder` library solves this problem by adding a one-pixel border to each tile that replicates the perimeter pixels.

![Bleeding effect (left) vs extruded tileset without artifacts (right)](/images/ch10/tile-bleeding.png)

Example: 4 tiles of 32×32 → 128×32 px PNG → 136×34 px extruded PNG (each tile adds 2px).

![Diagram of the margin added by tile-extruder to each tile](/images/ch10/tile-extruder-margin.png)

**Installation:**

```bash
npm install --global tile-extruder
```

**Usage:**

```bash
tile-extruder -w 32 -h 32 -i tilemap-example.png -o tilemap-extruded.png
```

| Parameter | Meaning |
|---|---|
| `-w` | Tile width in px |
| `-h` | Tile height in px |
| `-i` | Input PNG file |
| `-o` | Output PNG file |

![tile-extruder command output in terminal](/images/ch10/tiled-extruder-cli.jpg)

The extruded image `tilemap-extruded.png` is the one to import in Tiled and in Phaser.

---

## Creating the map with Tiled

### New map

Open Tiled. You will see the application's start screen.

![Tiled start screen](/images/ch10/tiled-new-project.jpg)

Click **New Map**. This dialog opens:

![Tiled "New Map" dialog](/images/ch10/tiled-new-map-dialog.jpg)

Set the tile dimensions to **32×32** to match the tileset. Click OK and you will be in this view:

![Empty map view after creation](/images/ch10/tiled-map-view.jpg)

Go to **File → Save As**:

![File → Save As menu in Tiled](/images/ch10/tiled-save-as.jpg)

Save the map as `level-0.json` (format: JSON map files `*.tmj *.json`):

![Save As dialog with name level-0.json](/images/ch10/tiled-save-json.jpg)

### Importing the tileset

Click **New Tileset**:

![New Tileset button in the Tilesets panel](/images/ch10/tiled-new-tileset.png)

Browse and select `tilemap-extruded.png` → check **Embed in map** → set:
- **Margin**: 1 px
- **Spacing**: 2 px

![Margin and spacing settings in the tileset dialog](/images/ch10/tiled-tileset-settings.jpg)

These values correspond to the border added by tile-extruder. Click OK.

![Tileset loaded and visible in the Tilesets panel](/images/ch10/tiled-tileset-loaded.jpg)

### World layer (visual)

Rename the default layer to `world`. Select a tile and use the **fill tool** to cover the area:

![Fill tool applied to the map](/images/ch10/tiled-fill-tool.png)

Or use the **brush tool** to manually draw perimeters and structures:

![Brush tool to draw the map tile by tile](/images/ch10/tiled-brush-tool.png)

### Collision layer

Right-click in the layers area → **New Tile Layer** → name: `collision`:

![Creating the new collision layer in Tiled](/images/ch10/tiled-collision-layer.jpg)

Now you have two layers. The eye and lock icons are used to hide/show and enable/disable editing on individual layers:

![Layers panel with eye and lock icons](/images/ch10/tiled-layers-panel.png)

Draw on this layer the same zones that should collide with the character.

### Setting the collision property on tiles

1. Click the **Edit Tileset** icon:

![Edit Tileset button in the panel](/images/ch10/tiled-edit-tileset-btn.png)

2. Select the tile to use for collisions and add a **custom property**:

![Dialog to add custom property to tile](/images/ch10/tiled-add-property.png)

3. Set type `bool` and name `collision`:

![Setting the name "collision" for the property](/images/ch10/tiled-property-name.jpg)

4. Enter the value `true` and save with `CTRL+S`:

![Value "true" set on the collision property](/images/ch10/tiled-property-value.png)

This property will be read by Phaser to activate physical collision.

---

## Importing the tilemap in Phaser

### GameData.ts

```typescript
tilemaps: [
  {
    key: "level-0",
    path: "assets/map/level-0.json",
  },
],
```

For the tileset, add it as a spritesheet with margin and spacing:

```typescript
spritesheets: [
  {
    name: "tilemap-extruded",
    path: "assets/map/tilemap-extruded.png",
    width: 32,
    height: 32,
    spacing: 2,
    margin: 1,
  },
],
```

::info-box{type="warning"}
The `name` of the tileset in the code must exactly match the name you assigned in Tiled when you imported the tileset.
::

### Variables in the scene

```typescript
private map: Phaser.Tilemaps.Tilemap;
private tileset: Phaser.Tilemaps.Tileset;
private layer: Phaser.Tilemaps.TilemapLayer;    // visual layer
private layer2: Phaser.Tilemaps.TilemapLayer;   // collision layer
```

### Initialization in create()

**1. Create the tilemap from the key:**

```typescript
this.map = this.make.tilemap({ key: "level-0" });
```

**2. Adapt camera and physics world bounds to the map dimensions:**

```typescript
this.cameras.main.setBounds(
  0,
  0,
  this.map.widthInPixels,
  this.map.heightInPixels
);

this.physics.world.setBounds(
  0,
  0,
  this.map.widthInPixels,
  this.map.heightInPixels
);
```

**3. Add the tileset to the map:**

```typescript
this.tileset = this.map.addTilesetImage("tilemap-extruded")!;
```

::info-box{type="new"}
In Phaser 4, `addTilesetImage()` can return `null`. Use the non-null assertion operator `!` if you are sure the tileset exists, or add an explicit check.
::

**4. Create the layers:**

```typescript
// Visual layer (high depth = foreground)
this.layer = this.map.createLayer("world", this.tileset, 0, 0)!
  .setDepth(9)
  .setAlpha(1);

// Collision layer (can be transparent in production)
this.layer2 = this.map.createLayer("collision", this.tileset, 0, 0)!
  .setDepth(0)
  .setAlpha(0); // set to 1 during debugging
```

**5. Activate collisions on the layer:**

```typescript
this.layer2.setCollisionByProperty({ collide: true });
```

**6. Create the collider between player and layer:**

```typescript
this.physics.add.collider(
  this._player,
  this.layer2,
  (_player: any, _tile: any) => {
    // check custom tile properties
    if (_tile.properties.exit === true) {
      console.log("level complete");
    }
    if (_tile.properties.death === true) {
      // decrement life or game over
    }
  },
  undefined,
  this
);
```

The collider callback receives the gameObject and the tile that interacted. You can add any custom property to each tile in Tiled — `exit`, `death`, `damage`, `speed` — and read them here to handle specific behaviors.

::info-box{type="tip"}
During development set `setAlpha(1)` on the collision layer to visually see where the active tiles are. In production set `setAlpha(0)` to hide them.
::

---

## Advanced custom properties — exit and death

You can add further custom properties to tiles to handle special behaviors. For example, a level exit tile.

In **Edit Tileset**, select the tile with the up arrow and add two custom properties:

![Exit tile with collide=true and exit=true properties](/images/ch10/tiled-exit-properties.png)

In the `world` layer, insert the tile that visually indicates the exit:

![Exit tile positioned in the world layer](/images/ch10/tiled-exit-world.jpg)

In the `collision` layer, place the same tile (or a transparent one) with the properties `collide=true` and `exit=true`:

![Collision tile with exit=true in collision layer](/images/ch10/tiled-exit-collision.jpg)

When the player collides with this tile, the collider callback detects the `exit=true` property:

![Code of the callback that checks the exit property](/images/ch10/tiled-exit-callback.jpg)

---

## Object layers — placing gameObjects on the map

An **Object Layer** in Tiled is a special type of layer that stores placeholders on the map. It is used to define where dynamic gameObjects will appear (enemies, bonuses, spawn points, checkpoints).

### Configuring the layer in Tiled

Right-click in the layer area → **New → Object Layer** → name: `gameObjects`:

![Creating the Object Layer in Tiled](/images/ch10/tiled-object-layer.jpg)

Select the tile to use as a placeholder and add a custom property of type `string` called `behaviour`:

![behaviour property of type string added to the tile](/images/ch10/tiled-behaviour-property.png)

Enter a JSON object as the value and place the tiles on the map:

![JSON value for behaviour and tiles positioned on the map](/images/ch10/tiled-behaviour-json.png)

```json
{"type":"bonus","score":50}
```

::info-box{type="warning"}
If the property value appears grayed out in Tiled, it means it is not active. Click on the field and add a space at the end of the string to activate it, then save.
::

![Grayed out property (inactive) — add a space to activate it](/images/ch10/tiled-opacity-fix.jpg)

Save `level-0.json`.

### Retrieving objects in Phaser

Create a dedicated method in the scene, to be called in `create()` after the map has been initialized:

```typescript
setupObjects(): void {
  const _objLayer = this.map.getObjectLayer("gameObjects");

  if (_objLayer != null) {
    const _objects = _objLayer.objects as any[];

    _objects.forEach((tile: Phaser.Tilemaps.Tile) => {
      // read the behaviour property as a JSON string
      const _objectValue = JSON.parse(tile.properties[0].value).type;

      switch (_objectValue) {
        case "bonus":
          // instantiate the gameObject at the tile position
          // this.addBonus(new BonusCoin({ scene: this, x: tile.x, y: tile.y, key: "bonus-coin" }));
          break;
        case "enemy":
          // instantiate the enemy
          break;
      }
    });
  }
}
```

In `create()`:

```typescript
create() {
  // ... map initialization ...
  this.setupObjects();
}
```

::info-box{type="new"}
In Phaser 4, `getObjectLayer()` may be deprecated in favor of `map.objects` (direct array of object layers). Check the updated documentation if you get `undefined` from `getObjectLayer()`.
::

---

## Complete create() schema

```typescript
create() {
  // 1. Create the tilemap
  this.map = this.make.tilemap({ key: "level-0" });

  // 2. Camera and physics bounds
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

  // 3. Tileset
  this.tileset = this.map.addTilesetImage("tilemap-extruded")!;

  // 4. Visual layer
  this.layer = this.map.createLayer("world", this.tileset, 0, 0)!.setDepth(9);

  // 5. Collision layer
  this.layer2 = this.map.createLayer("collision", this.tileset, 0, 0)!
    .setDepth(0).setAlpha(0);
  this.layer2.setCollisionByProperty({ collide: true });

  // 6. Player (must use physics.add.sprite to have a body)
  this._player = this.physics.add.sprite(100, 100, "player");
  this._player.body.setCollideWorldBounds(true);

  // 7. Camera follows the player
  this.cameras.main.startFollow(this._player, true, 0.1, 0.1);

  // 8. Player <-> map collider
  this.physics.add.collider(this._player, this.layer2);

  // 9. Object layer
  this.setupObjects();
}
```

::info-box{type="tip"}
**Official documentation:** [Tilemaps namespace](https://docs.phaser.io/api-documentation/namespace/tilemaps)

**Phaser Labs examples:** [labs.phaser.io → tilemap](https://labs.phaser.io/index.html?dir=tilemap/)
::

::PhaserLabsBox{url="https://labs.phaser.io/index.html?dir=tilemap/"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Tilemaps are the quality leap that transforms a prototype into a real level. As long as you draw the world with sprites manually positioned in code, you're working against yourself. With Tiled you can build the level visually and import it in three lines.

The workflow to memorize is: **Tiled exports JSON → Phaser loads JSON → separate layers for visuals and collisions**. Once you have this schema in your head, adding new levels becomes trivial.

The transparent collision layer is one of the most powerful patterns: the map the player sees is one thing, the map the physics "feels" is another. This separation gives you surgical control over where the character can walk.

**Pro tip**: custom tile properties (`exit`, `death`, `damage`) are the professional way to handle levels. Instead of hardcoding logic in the code, you put it in the map. A designer can change where the "exit door" is without touching the TypeScript. 🗺️
::
