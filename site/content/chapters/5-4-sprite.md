---
title: 'Sprite'
slug: '5-4-sprite'
chapter: 5.4
difficulty: intermediate
readingTime: '~10 min'
---


Lo sprite funziona come l'image ma supporta le **animazioni**. Necessita di uno **spritesheet**: un'unica immagine che contiene tutti i frame dell'animazione affiancati.

```typescript
this._mySprite = this.add.sprite(x, y, "player");
```

In `GameData.ts` lo spritesheet si dichiara indicando le dimensioni di ogni singolo frame:

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

![Esempio di spritesheet: tutti i frame affiancati in un'unica immagine](/images/chapters/cap5/spritesheet.png)

### Creare un'animazione

```typescript
const _animation: Phaser.Types.Animations.Animation = {
  key: "player-running",
  frames: this.anims.generateFrameNumbers("player", { frames: [0,1,2,3,4,5,6,7] }),
  frameRate: 10,
  yoyo: false,
  repeat: -1
};

this.anims.create(_animation);

// play con chiave stringa
this._mySprite.play("player-running");

// oppure con oggetto config (Phaser 4) — sovrascrive frameRate al volo
this._mySprite.play({ key: "player-running", frameRate: 24 });
```

| Attributo | Descrizione |
|---|---|
| `key` | Nome univoco dell'animazione |
| `frames` | Array degli indici di frame da usare |
| `frameRate` | Velocità (frame al secondo) |
| `yoyo` | Se `true`, la sequenza viene riprodotta anche al contrario |
| `repeat` | Numero di ripetizioni; `-1` = infinito |

### Gestire più animazioni

Per gestire più animazioni dello stesso sprite, dichiara un array di configurazioni prima del costruttore e creale in un ciclo nel `create()`:

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

Lo Sprite è il momento in cui il gioco inizia a sembrare vivo. Un'immagine cammina, corre, salta — e tu hai scritto il codice che lo fa fare.

Il punto che confonde di più all'inizio: il rapporto tra **spritesheet**, **frames** e **animazioni**. Lo spritesheet è la striscia di disegni, i frames sono i numeri delle colonne, l'animazione è la sequenza che decidi tu. Una volta che questo schema ti entra in testa, tutto il resto viene da solo.

`repeat: -1` è il tuo migliore amico per il personaggio principale — l'animazione non si ferma mai finché non glielo dici tu. `frameRate: 10` è un buon punto di partenza per qualsiasi cosa. Poi lo aggiusti a occhio. 🎬
::
