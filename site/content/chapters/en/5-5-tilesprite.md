---
title: 'TileSprite'
slug: '5-5-tilesprite'
chapter: 5.5
difficulty: intermediate
readingTime: '~8 min'
---


The TileSprite is a sprite with a **repeated texture**. Perfect for creating infinite backgrounds and the parallax effect.

```typescript
this._tile1 = this.add.tileSprite(x, y, width, height, "bg1");
```

### Parallax effect

The parallax effect simulates depth by scrolling multiple background layers at different speeds. The more "distant" a layer is, the more slowly it moves.

Each layer is a separate tileable texture. In the example below: clouds (distant background), mountains (middle ground), and trees (foreground).

![Layer 1 — clouds (distant background, slow movement)](/images/chapters/cap5/tilesprite-texture.png)

![Layer 2 — mountains (middle background)](/images/chapters/cap5/tilesprite-parallax.png)

![Layer 3 — trees (foreground, fast movement)](/images/chapters/cap5/tilesprite-layers.png)

Declare the variables before the constructor:

```typescript
private _tile1: Phaser.GameObjects.TileSprite;
private _tile2: Phaser.GameObjects.TileSprite;
private _tile3: Phaser.GameObjects.TileSprite;
```

Initialize them in `create()`:

```typescript
this._tile1 = this.add.tileSprite(0, 0, 1024, 450, "bg1").setOrigin(0);
this._tile2 = this.add.tileSprite(0, 0, 1024, 450, "bg2").setOrigin(0);
this._tile3 = this.add.tileSprite(0, 50, 1024, 450, "bg3").setOrigin(0);
```

In `update()`, move them at progressively increasing speeds:

```typescript
update(time: number, delta: number): void {
  this._tile1.tilePositionX += 0.2; // distant background — slow
  this._tile2.tilePositionX += 0.4; // middle background
  this._tile3.tilePositionX += 0.6; // near background — fast
}
```

::InfoBox{type="tip"}
The texture of a TileSprite must be designed so that it can repeat without visible seams on the left and right edges (tileable texture).
::

### Additional properties

**`tileRotation`** — rotates the repeated texture (in radians). New in Phaser 4.

```typescript
this._tile1.tileRotation = Math.PI / 4; // 45 degrees
```

Combined with `tilePositionX`/`tilePositionY` in `update()`, it allows backgrounds with textures that scroll diagonally or rotate.

::info-box{type="new"}
In Phaser 4, TileSprite supports frames within atlases and spritesheets — in v3 it could only repeat the whole texture. It also supports compressed textures and non-power-of-2 dimensions.
::

::info-box{type="warning"}
In Phaser 4, **cropping** the texture on TileSprite has been removed. If you were using `setCrop()` on a TileSprite, you need to find an alternative (e.g. mask or RenderTexture).
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Ftile+sprite"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Parallax is one of those visual tricks that transforms a flat background into a three-dimensional space — and in Phaser it is implemented in five lines.

The principle is very simple: distant things move slowly, nearby things move fast. The human brain automatically interprets this difference in speed as depth. You are tricking the player's eyes, and they will thank you for it.

**Practical tip**: always start with 0.2 / 0.4 / 0.6 as speed values. If it seems too slow, double everything. If it seems like a blender, halve it. Don't look for the perfect formula — trust your eye. 🌄
::
