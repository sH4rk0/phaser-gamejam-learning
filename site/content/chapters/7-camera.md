---
title: 'Camera e Viewport'
slug: '7-camera'
chapter: 7
difficulty: intermediate
readingTime: '~30 min'
---

## Introduzione

La **Camera** è il modo in cui tutti i giochi vengono renderizzati in Phaser. Fornisce una vista sulla nostra area di gioco e ci permette di spostarci, zoomare e applicare effetti visivi come shake, flash e fade.

Una telecamera è composta da due elementi principali:

- Il **viewport**: la posizione fisica e la dimensione della finestra di visualizzazione all'interno del gioco
- I valori di **scorrimento** (scroll): la porzione del mondo di gioco che la camera sta mostrando

![Viewport e area di gioco](/images/chapters/cap7/viewport-camera.png)

Come mostrato nell'immagine, l'area all'interno del riquadro rosso rappresenta il **viewport** — ciò che il giocatore vede. L'area esterna al riquadro è il mondo di gioco non visibile in quel momento.

La camera principale (`main`) viene creata delle stesse dimensioni del gioco per impostazione predefinita. È possibile accedervi in questo modo:

```typescript
let mainCam: Phaser.Cameras.Scene2D.Camera = this.cameras.main;
```

---

## Muovere la camera con SmoothedKeyControl

`Phaser.Cameras.Controls.SmoothedKeyControl` è un controller che permette di muovere e zoomare la camera usando i tasti direzionali, con effetti di accelerazione e decelerazione fluidi.

### Definire le variabili

Prima del costruttore della scena dichiariamo le variabili necessarie:

```typescript
// Controller per il movimento fluido della camera
private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;

// Riferimento alla camera principale
private _mainCamera: Phaser.Cameras.Scene2D.Camera;

// Tasti cursore
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
```

### Inizializzare il controller nel create

```typescript
create() {
  // Aggiungiamo alcuni sprite alla scena
  this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'logo');
  this.add.sprite(100, 100, 'bomb');
  this.add.sprite(900, 500, 'bomb');

  // Estendiamo i bounds della camera al doppio delle dimensioni del gioco
  this.cameras.main.setBounds(
    0,                          // x
    0,                          // y
    this.game.canvas.width * 2, // larghezza
    this.game.canvas.height * 2 // altezza
  );

  // Inizializziamo le variabili
  this._mainCamera = this.cameras.main;
  this._cursors = this.input.keyboard!.createCursorKeys();

  // Configurazione del controller
  const controlConfig: Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig = {
    camera: this._mainCamera,
    left: this._cursors.left,
    right: this._cursors.right,
    up: this._cursors.up,
    down: this._cursors.down,
    zoomIn: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    zoomOut: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    zoomSpeed: 0.02,
    acceleration: 0.06,
    drag: 0.0005,
    maxSpeed: 1.0,
  };

  // Creiamo il controller
  this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}
```

| Proprietà | Descrizione |
|---|---|
| `camera` | La camera da controllare |
| `left/right/up/down` | Tasti per il movimento |
| `zoomIn` / `zoomOut` | Tasti per lo zoom (novità Phaser 4) |
| `zoomSpeed` | Velocità dello zoom per frame |
| `acceleration` | Accelerazione del movimento |
| `drag` | Decelerazione quando si rilascia il tasto |
| `maxSpeed` | Velocità massima del movimento |
| `minZoom` / `maxZoom` | Limiti dello zoom (default: 0.001 – 1000) |

::info-box{type="tip"}
In Phaser 4, `this.input.keyboard` può essere `null`. Usa il non-null assertion operator `!` quando accedi a `this.input.keyboard!.createCursorKeys()` in TypeScript.
::

### Aggiornare il controller nell'update

Il controller deve essere aggiornato ogni frame nel metodo `update`:

```typescript
update(time: number, delta: number): void {
  this._controls.update(delta);
}
```

---

## Seguire il player

La camera può seguire automaticamente la posizione di un gameObject, mantenendolo al centro del viewport. Questo è il comportamento tipico dei giochi platform o top-down.

### Configurazione

```typescript
private _mainCamera: Phaser.Cameras.Scene2D.Camera;
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
private _player: Phaser.GameObjects.Image;

create() {
  // Aggiungiamo elementi di sfondo
  this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'logo');
  this.add.sprite(200, 200, 'bomb');
  this.add.sprite(800, 400, 'bomb');

  // Creiamo il player
  this._player = this.add.image(
    this.game.canvas.width / 2,
    this.game.canvas.height / 2,
    'bomb'
  ).setScale(2);

  // Inizializziamo cursori e camera
  this._cursors = this.input.keyboard!.createCursorKeys();
  this._mainCamera = this.cameras.main;

  // Estendiamo i bounds
  this._mainCamera.setBounds(
    0, 0,
    this.game.canvas.width * 2,
    this.game.canvas.height * 2
  );

  // La camera seguirà automaticamente il player
  this._mainCamera.startFollow(this._player, true, 0.05, 0.05);
}
```

Il metodo `startFollow` accetta i seguenti parametri:

| Parametro | Tipo | Descrizione |
|---|---|---|
| `target` | `GameObject` | Il gameObject da seguire |
| `roundPixels` | `boolean` | Se `true`, arrotonda i pixel (evita aliasing). Raccomandato |
| `lerpX` | `number` | Interpolazione orizzontale (0 = istantaneo, 1 = nessuna inerzia) |
| `lerpY` | `number` | Interpolazione verticale |

I valori di lerp bassi (es. `0.05`) creano un effetto di **camera fluida** che segue il player con leggera inerzia, molto più piacevole visivamente.

### Muovere il player nell'update

```typescript
update(time: number, delta: number): void {
  if (this._cursors.left.isDown) {
    this._player.x -= 10;
  } else if (this._cursors.right.isDown) {
    this._player.x += 10;
  }

  if (this._cursors.up.isDown) {
    this._player.y -= 10;
  } else if (this._cursors.down.isDown) {
    this._player.y += 10;
  }
}
```

::info-box{type="warning"}
In questo esempio muoviamo il player direttamente sulla proprietà `x`/`y`. Quando useremo la fisica Arcade (capitolo 8), useremo invece le velocità del body fisico (`setVelocity`) — il principio di `startFollow` rimane lo stesso.
::

### Smettere di seguire

```typescript
this._mainCamera.stopFollow();
```

---

## Spostare la camera con pan()

Il metodo `pan()` sposta fluidamente la camera dalla sua posizione attuale alle coordinate di destinazione, applicando un'animazione con easing:

```typescript
this.cameras.main.pan(
  10,               // x di destinazione
  10,               // y di destinazione
  1000,             // durata in ms
  'Sine.easeInOut', // funzione di easing
  true,             // force: parte subito anche se un pan è in corso
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('pan completato');
    }
  }
);
```

### Zoom della camera con zoomTo()

Il metodo `zoomTo()` anima lo zoom della camera al valore indicato:

```typescript
this.cameras.main.zoomTo(
  2,                // valore di zoom finale (1 = normale, 2 = doppio)
  1000,             // durata in ms
  'Sine.easeInOut', // funzione di easing
  true,             // force
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('zoom completato');
    }
  }
);
```

---

## WorldView

La proprietà `worldView` della camera rappresenta l'area del mondo di gioco che la camera sta visualizzando in quel momento. È di tipo `Phaser.Geom.Rectangle` e si aggiorna automaticamente ogni frame.

### Ottenere il centro del viewport

```typescript
const centerX: number = this.cameras.main.worldView.centerX;
const centerY: number = this.cameras.main.worldView.centerY;
```

### Ottenere i bordi del viewport

```typescript
const top: number    = this.cameras.main.worldView.top;
const bottom: number = this.cameras.main.worldView.bottom;
const left: number   = this.cameras.main.worldView.left;
const right: number  = this.cameras.main.worldView.right;
```

Queste proprietà sono utili per **fare spawn** di nemici o oggetti ai bordi della vista corrente, oppure per fare uscire un elemento solo quando esce dallo schermo.

### Punto random nel viewport

```typescript
const rndPoint: Phaser.Geom.Point = this.cameras.main.worldView.getRandomPoint();
console.log(rndPoint.x, rndPoint.y);
```

Utile per far apparire bonus o nemici in una posizione casuale all'interno della vista corrente.

### Controllare se un oggetto è nel viewport

```typescript
if (!this.cameras.main.worldView.contains(this._enemy.x, this._enemy.y)) {
  this._enemy.destroy();
}
```

Chiama `destroy()` su oggetti che escono dal viewport per liberare risorse.

---

## Effetti speciali

La classe Camera include effetti visivi integrati: **flash**, **shake** e **fade**. Tutti accettano una callback opzionale per intercettare il progresso dell'effetto.

### Flash

Imposta immediatamente la camera al colore indicato e poi la fa svanire per la durata specificata. Utile per colpi, esplosioni o transizioni.

```typescript
this._mainCamera.flash(
  2000,           // durata in ms
  255, 0, 0,      // colore RGB (rosso)
  true,           // force: parte subito
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('flash completato');
    }
  }
);
```

| Parametro | Descrizione |
|---|---|
| `duration` | Durata in ms (default: 250) |
| `red, green, blue` | Colore RGB, valori 0–255 (default: 255, 255, 255 — bianco) |
| `force` | Se `true`, riparte anche se già in corso |
| `callback` | Funzione chiamata ogni frame con `(camera, progress)` |

### Shake

Scuote il viewport della camera con l'intensità indicata per la durata specificata. I gameObject non vengono mossi — è solo un effetto visivo.

```typescript
this._mainCamera.shake(
  1000,           // durata in ms
  0.05,           // intensità (usare valori bassi)
  true,           // force
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('shake completato');
    }
  }
);
```

::info-box{type="tip"}
Usa valori di intensità molto bassi: `0.01`–`0.05`. Valori alti rendono l'effetto fastidioso e non professionale.
::

### Fade

Sfuma la camera verso il colore indicato per la durata specificata. In Phaser 4 sono disponibili anche i metodi **`fadeIn()`** e **`fadeOut()`** come alias più espliciti.

```typescript
// Sfuma verso il nero (fade out)
this._mainCamera.fadeOut(
  2000,     // durata in ms
  0, 0, 0,  // colore (nero di default)
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      this.scene.start('GameOver');
    }
  }
);

// Sfuma dal nero al visibile (fade in)
this._mainCamera.fadeIn(
  1500,
  0, 0, 0,
  (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
    if (progress === 1) {
      console.log('scena visibile');
    }
  }
);
```

| Metodo | Descrizione |
|---|---|
| `fade()` | Metodo generico — sfuma verso il colore indicato |
| `fadeOut()` | Alias esplicito per fade verso il colore (Phaser 4) |
| `fadeIn()` | Sfuma dal colore verso il visibile (Phaser 4) |

Un caso d'uso classico è il **cambio di scena con dissolvenza**:

```typescript
this._mainCamera.fadeOut(500, 0, 0, 0, () => {
  this.scene.start('NextScene');
});
```

::info-box{type="tip"}
**Documentazione ufficiale:**
- [Camera](https://docs.phaser.io/api-documentation/class/cameras-scene2d-camera)
- [SmoothedKeyControl](https://docs.phaser.io/api-documentation/class/cameras-controls-smoothedkeycontrol)
- [Effects.Flash](https://docs.phaser.io/api-documentation/class/cameras-scene2d-effects-flash)
- [Effects.Shake](https://docs.phaser.io/api-documentation/class/cameras-scene2d-effects-shake)
- [Effects.Fade](https://docs.phaser.io/api-documentation/class/cameras-scene2d-effects-fade)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=camera"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

La camera è uno di quei sistemi che all'inizio sembra superfluo — "tanto il mio gioco si vede tutto sullo schermo" — e poi diventa indispensabile nel secondo esatto in cui provi `startFollow` sul tuo personaggio. Da quel momento non puoi più farne a meno.

Tre effetti che da soli elevano qualsiasi gioco di un livello: **flash** quando il giocatore subisce un danno, **shake** quando c'è un'esplosione, **fadeOut** per passare a una nuova scena. Sono cinque righe di codice ciascuno e fanno un effetto enorme.

**Tip pro**: `fadeOut` nella callback con `this.scene.start('NomeScena')` è il modo elegante di fare le transizioni. Niente tagli bruschi — i giocatori lo notano sempre.

`worldView` lo userai appena il tuo mondo diventa più grande dello schermo: spawn dei nemici ai bordi, distruzione degli oggetti usciti dalla vista. Roba che ottimizza davvero le performance. 🎬
::
