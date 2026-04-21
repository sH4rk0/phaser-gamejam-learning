---
title: 'TileSprite'
slug: '5-5-tilesprite'
chapter: 5.5
difficulty: intermediate
readingTime: '~8 min'
---


La TileSprite è uno sprite con una **texture ripetuta**. Perfetta per creare sfondi infiniti e l'effetto parallasse.

```typescript
this._tile1 = this.add.tileSprite(x, y, width, height, "bg1");
```

### Effetto parallasse

L'effetto parallasse simula la profondità facendo scorrere più livelli di sfondo a velocità diverse. Più un livello è "lontano", più si muove lentamente.

Ogni livello è una texture tileable separata. Nell'esempio qui sotto: nuvole (sfondo lontano), montagne (intermedio) e alberi (in primo piano).

![Layer 1 — nuvole (sfondo lontano, movimento lento)](/images/chapters/cap5/tilesprite-texture.png)

![Layer 2 — montagne (sfondo intermedio)](/images/chapters/cap5/tilesprite-parallax.png)

![Layer 3 — alberi (primo piano, movimento veloce)](/images/chapters/cap5/tilesprite-layers.png)

Dichiara le variabili prima del costruttore:

```typescript
private _tile1: Phaser.GameObjects.TileSprite;
private _tile2: Phaser.GameObjects.TileSprite;
private _tile3: Phaser.GameObjects.TileSprite;
```

Inizializzale nel `create()`:

```typescript
this._tile1 = this.add.tileSprite(0, 0, 1024, 450, "bg1").setOrigin(0);
this._tile2 = this.add.tileSprite(0, 0, 1024, 450, "bg2").setOrigin(0);
this._tile3 = this.add.tileSprite(0, 50, 1024, 450, "bg3").setOrigin(0);
```

Nell'`update()` muovile a velocità progressivamente crescenti:

```typescript
update(time: number, delta: number): void {
  this._tile1.tilePositionX += 0.2; // sfondo lontano — lento
  this._tile2.tilePositionX += 0.4; // sfondo intermedio
  this._tile3.tilePositionX += 0.6; // sfondo vicino — veloce
}
```

::InfoBox{type="tip"}
La texture di una TileSprite deve essere progettata in modo da potersi ripetere senza interruzioni visibili sul bordo sinistro e destro (texture tileable).
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Ftile+sprite"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

La parallasse è uno di quei trucchi visivi che trasformano uno sfondo piatto in uno spazio tridimensionale — e in Phaser si implementa in cinque righe.

Il principio è semplicissimo: le cose lontane si muovono lento, le cose vicine si muovono veloce. Il cervello umano interpreta automaticamente questa differenza di velocità come profondità. Stai ingannando gli occhi del giocatore, e lui ti ringrazierà per questo.

**Tip pratico**: inizia sempre con 0.2 / 0.4 / 0.6 come valori di velocità. Se sembra troppo lento, raddoppia tutto. Se sembra un frullatore, dimezza. Non cercare la formula perfetta — fidati dell'occhio. 🌄
::
