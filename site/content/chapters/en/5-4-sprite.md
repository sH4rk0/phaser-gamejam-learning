---
title: 'Sprite'
slug: '5-4-sprite'
chapter: 5.4
difficulty: intermediate
readingTime: '~10 min'
---


The sprite works like the image but supports **animations**. It requires a **spritesheet**: a single image that contains all the animation frames side by side.

```typescript
this._mySprite = this.add.sprite(x, y, "player");
```

In `GameData.ts` the spritesheet is declared by specifying the dimensions of each individual frame:

```typescript
spritesheets: [
  {
    name: "player",
    path: "assets/images/player.png",
    width: 50,
    height: 70,
    frames: 8
  }
]
```

![Spritesheet example: all frames side by side in a single image](/images/chapters/cap5/spritesheet.png)

### Creating an animation

```typescript
const _animation: Phaser.Types.Animations.Animation = {
  key: "player-running",
  frames: this.anims.generateFrameNumbers("player", { frames: [0,1,2,3,4,5,6,7] }),
  frameRate: 10,
  yoyo: false,
  repeat: -1
};

this.anims.create(_animation);

// play with string key
this._mySprite.play("player-running");

// or with config object (Phaser 4) — overrides frameRate on the fly
this._mySprite.play({ key: "player-running", frameRate: 24 });
```

| Attribute | Description |
|---|---|
| `key` | Unique animation name |
| `frames` | Array of frame indices to use |
| `frameRate` | Speed (frames per second) |
| `yoyo` | If `true`, the sequence is also played in reverse |
| `repeat` | Number of repetitions; `-1` = infinite |

### Managing multiple animations

To manage multiple animations for the same sprite, declare an array of configurations before the constructor and create them in a loop in `create()`:

```typescript
private _animations: Array<{
  key: string;
  frames: number[];
  frameRate: number;
  yoyo: boolean;
  repeat: number;
}> = [
  { key: "player-running", frames: [0,1,2,3,4,5,6,7], frameRate: 10, yoyo: false, repeat: -1 },
  { key: "player-idle",    frames: [8,9,10,11],        frameRate: 15, yoyo: false, repeat: -1 },
];
```

```typescript
create() {
  this._animations.forEach(element => {
    const anim: Phaser.Types.Animations.Animation = {
      key: element.key,
      frames: this.anims.generateFrameNumbers("player", { frames: element.frames }),
      frameRate: element.frameRate,
      yoyo: element.yoyo,
      repeat: element.repeat,
    };
    this.anims.create(anim);
  });
}
```

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fsprites"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

The Sprite is the moment the game starts to feel alive. An image walks, runs, jumps — and you wrote the code that makes it do that.

The part that confuses most people at first: the relationship between **spritesheet**, **frames**, and **animations**. The spritesheet is the strip of drawings, the frames are the column numbers, the animation is the sequence you decide. Once this scheme clicks in your head, everything else falls into place.

`repeat: -1` is your best friend for the main character — the animation never stops until you tell it to. `frameRate: 10` is a good starting point for anything. Then you adjust it by eye. 🎬
::
