---
title: 'GameObjects'
slug: '5-gameobjects'
chapter: 5
difficulty: intermediate
readingTime: '~35 min'
---

## Cosa sono i GameObjects

In Phaser, i **gameObjects** sono tutti quegli elementi che utilizziamo per visualizzare oggetti all'interno della nostra scena. Tutti derivano dalla classe base `Phaser.GameObjects` e la estendono con implementazioni proprie.

In questo capitolo esamineremo i seguenti gameObjects:

| GameObject | Scopo |
|---|---|
| `text` | Visualizzare testo a schermo |
| `image` | Visualizzare immagini statiche |
| `sprite` | Visualizzare immagini animate |
| `tileSprite` | Creare sfondi ripetuti e parallasse |
| `group` | Raggruppare e gestire gameObjects simili |
| `container` | Contenere gameObjects in un contesto visuale comune |

Tutti fanno parte della **GameObjectsFactory**. Alcuni (come `container` e `group`) non hanno un output visivo diretto ma servono a organizzare gli altri.

### Creare un'istanza

Per aggiungere un gameObject alla scena si usa `this.add` seguito dal tipo:

```typescript
create() {
  this.add.text(0, 0, "Hello World", { fontSize: "20px" });
}
```

`this` rappresenta la scena corrente, `add` è il metodo che accede alla GameObjectFactory. È possibile assegnare l'istanza a una variabile privata per riutilizzarla:

```typescript
create() {
  this._helloWorld = this.add.text(0, 0, "Hello World", { fontSize: "20px" });
  this._helloWorld.setPosition(10, 10);
}
```

## Proprietà comuni

Questi metodi sono disponibili su tutti i gameObjects.

### .setPosition(x, y)

Setta la posizione x e y del gameObject nel mondo di gioco.

```typescript
this._myObject.setPosition(400, 300);
```

### .setDepth(value)

Controlla lo **z-index** del gameObject. Per default, l'ordine di visualizzazione dipende dalla sequenza di creazione nel codice: il secondo oggetto creato si sovrappone al primo.

```typescript
create() {
  this._image1 = this.add.image(850, 200, "immagine1"); // sotto
  this._image2 = this.add.image(855, 200, "immagine2"); // sopra
}
```

Con `setDepth` possiamo invertire l'ordine senza cambiare la sequenza di inizializzazione:

```typescript
create() {
  this._image1 = this.add.image(850, 200, "immagine1").setDepth(1); // sopra
  this._image2 = this.add.image(855, 200, "immagine2");             // sotto
}
```

::InfoBox{type="tip"}
Il valore depth di default è `0`. Un valore più alto porta l'oggetto in primo piano.
::

### .setAbove(gameObject) / .setBelow(gameObject)

Alternativa a `setDepth`: posiziona il gameObject immediatamente sopra o sotto un altro gameObject specifico.

```typescript
this._image1.setAbove(this._image2); // image1 davanti a image2
```

### .setToTop() / .setToBack()

Novità di Phaser 4: porta il gameObject in cima o in fondo alla display list, senza dover conoscere i depth degli altri oggetti.

```typescript
this._overlay.setToTop();  // in primo piano assoluto
this._background.setToBack(); // in fondo assoluto
```

### .setAlpha(alpha)

Controlla l'**opacità**. Valori tra `0` (trasparente) e `1` (opaco).

```typescript
this._myObject.setAlpha(0.5); // semi-trasparente
```

### .setAngle(degrees) / .setRotation(radians)

Ruota il gameObject. `setAngle` accetta gradi, `setRotation` radianti.

```typescript
this._myObject.setAngle(45);           // 45 gradi
this._myObject.setRotation(Math.PI);   // 180 gradi in radianti
```

### .setTint / .setTintFill / .clearTint

`setTint` applica una **tinta additiva**: moltiplica il colore di ogni pixel della texture per il valore passato. Accetta un singolo colore esadecimale.

```typescript
this._sprite.setTint(0xff6600);
```

![Esempio setTint: tinta additiva applicata a tre robot](/images/chapters/cap5/setTint.png)

`setTintFill` **sostituisce** i colori dei pixel invece di moltiplicarli — utile per effetti come il "flash bianco" quando un personaggio viene colpito.

```typescript
this._sprite.setTintFill(0xffffff); // personaggio tutto bianco
```

![Esempio setTintFill: sostituzione completa dei colori](/images/chapters/cap5/setTintFill.png)

`clearTint` rimuove qualsiasi tinta applicata:

```typescript
this._sprite.clearTint();
```

Per colorare i **singoli angoli** del gameObject usa le proprietà dirette:

```typescript
this._sprite.tintTopLeft    = 0xff0000;
this._sprite.tintTopRight   = 0x00ff00;
this._sprite.tintBottomLeft = 0x0000ff;
this._sprite.tintBottomRight = 0xffffff;
```

La proprietà `tintFill` (boolean) permette di alternare tra le due modalità senza chiamare metodi:

```typescript
this._sprite.tintFill = true;  // modalità fill (sostituisce i colori)
this._sprite.tintFill = false; // modalità additiva (default)
```

### .setFlip(x, y)

Capovolge il gameObject orizzontalmente e/o verticalmente. Sono disponibili anche `.setFlipX()` e `.setFlipY()`.

```typescript
this._myObject.setFlipX(true);  // specchio orizzontale
this._myObject.setFlip(true, false);
```

::InfoBox{type="warning"}
Il flip è puramente visivo: non modifica i valori di posizione né il corpo fisico (physics body).
::

### .setScrollFactor(x, y)

Controlla quanto il gameObject si muove rispetto alla camera. Utile per elementi UI o sfondi.

| Valore | Comportamento |
|---|---|
| `1` | Si muove in sincronia con la camera (default) |
| `0` | Rimane fisso sullo schermo (ideale per HUD) |
| `0.5` | Si muove a metà velocità rispetto alla camera (parallasse) |

```typescript
this._scoreText.setScrollFactor(0); // il punteggio resta fisso
```

### .setScale(x, y)

Ridimensiona il gameObject. Se si passa un solo valore, viene applicato uniformemente.

```typescript
this._myObject.setScale(2);      // doppia dimensione
this._myObject.setScale(2, 0.5); // larga e piatta
```

### .setOrigin(x, y)

Setta il **punto di ancoraggio** del gameObject. I valori sono compresi tra `0` e `1`, dove `0.5, 0.5` è il centro.

```typescript
this._myObject.setOrigin(0, 0);     // angolo top-left
this._myObject.setOrigin(0.5, 0.5); // centro (default)
this._myObject.setOrigin(1, 1);     // angolo bottom-right
```

![Diagramma dei punti di origine (0,0 → 1,1)](/images/chapters/cap5/setOrigin.png)

### .setInteractive()

Abilita il gameObject alla ricezione di eventi di input (click, touch, hover).

```typescript
this._button.setInteractive();
```

### .on(event, callback, context)

Aggiunge un **listener** di eventi sul gameObject. I metodi `setInteractive()` e `on()` si concatenano spesso con `setScale()`:

```typescript
this._helloWorld
  .setScale(2)
  .setInteractive()
  .on("pointerdown", () => { /* esegui al click */ }, this)
  .on("pointerover", () => { /* esegui all'hover */ }, this)
  .on("pointerout",  () => { /* esegui all'uscita */ }, this);
```

| Evento | Quando si attiva |
|---|---|
| `pointerdown` | Click del mouse / tap su mobile |
| `pointerup` | Rilascio del mouse / rilascio del dito |
| `pointerover` | Il cursore entra nel gameObject |
| `pointerout` | Il cursore esce dal gameObject |

### .destroy()

Rimuove il gameObject dalla scena e dalla memoria. Da usare quando un oggetto non sarà più necessario (proiettile uscito dallo schermo, nemico eliminato).

```typescript
this._bullet.destroy();
```

::InfoBox{type="tip"}
Per la lista completa dei gameObjects disponibili: [docs.phaser.io/api-documentation/class/gameobjects](https://docs.phaser.io/api-documentation/class/gameobjects)
::

## Text

```typescript
this._helloWorld = this.add.text(x, y, "Hello World!", { fontSize: "20px" });
```

| Parametro | Tipo | Descrizione |
|---|---|---|
| `x` | `number` | Posizione orizzontale |
| `y` | `number` | Posizione verticale |
| `text` | `string` | Testo da visualizzare |
| `style` | `TextStyle` | Configurazione visiva (fontFamily, fontSize, color, …) |

Le proprietà di stile più usate sono `fontFamily`, `fontSize`, `backgroundColor` e `color`. Consulta la documentazione completa su [docs.phaser.io](https://docs.phaser.io/api-documentation/typedef/types-gameobjects-text).

### .setText(value)

Aggiorna il testo — indispensabile per punteggi e countdown:

```typescript
this._scoreText.setText("Punti: " + this._score);
```

### .setStroke(color, thickness)

Aggiunge un bordo al testo:

```typescript
this._helloWorld.setStroke("#ff0000", 5);
```

### .setShadow(x, y, color, blur)

Aggiunge un'ombra. `x` e `y` sono l'offset rispetto al testo, `blur` la diffusione:

```typescript
this._helloWorld.setShadow(2, 2, "#000000", 2);
```

### .setWordWrapWidth(width)

Limita la larghezza del testo in pixel, mandando a capo automaticamente le righe troppo lunghe:

```typescript
this._helloWorld.setWordWrapWidth(500);
```

## Image

```typescript
this._myImage = this.add.image(x, y, "mia-immagine");
```

Il terzo parametro è la **chiave** (key) con cui l'immagine è stata caricata nel Preloader tramite `GameData.ts`:

```typescript
images: [
  {
    name: "mia-immagine",
    path: "assets/images/mia-immagine.png",
  }
]
```

::InfoBox{type="warning"}
La key usata nel Preloader deve coincidere con quella usata in `this.add.image()`. Per convenzione è buona prassi usare lo stesso nome del file.
::

## Sprite

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

## TileSprite

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

## Group

Il Group è un **contenitore logico** per gameObjects dello stesso tipo. Non ha una rappresentazione visiva propria: serve a gestire collezioni di oggetti (nemici, proiettili, monete) come un'unica entità, semplificando aggiornamenti, iterazioni e collisioni.

```typescript
private _enemies: Phaser.GameObjects.Group;

// nel create():
this._enemies = this.add.group({
  runChildUpdate: true,
  maxSize: 50,
});
```

| Opzione | Descrizione |
|---|---|
| `runChildUpdate` | Se `true`, chiama `update()` automaticamente su ogni elemento del gruppo ad ogni frame |
| `maxSize` | Limite massimo di elementi; `-1` = illimitato |
| `classType` | Classe usata da `.create()` per istanziare nuovi elementi |

### Aggiungere e creare elementi

Puoi aggiungere un gameObject già esistente oppure crearne uno nuovo direttamente tramite il gruppo:

```typescript
// aggiunge un oggetto già creato
const bomb = this.add.sprite(100, 100, "bomb");
this._enemies.add(bomb);

// crea e aggiunge in un solo passaggio
const enemy = this._enemies.create(200, 150, "enemy");
```

Con `.create()` il gameObject viene istanziato, aggiunto alla scena e al gruppo in un colpo solo.

### Iterare sugli elementi

```typescript
// esegui un'azione su tutti gli elementi
this._enemies.getChildren().forEach((child) => {
  const sprite = child as Phaser.GameObjects.Sprite;
  sprite.setVelocityX(-100);
});
```

### Metodi principali

| Metodo | Descrizione |
|---|---|
| `.add(child)` | Aggiunge un gameObject esistente al gruppo |
| `.create(x, y, key)` | Crea un nuovo gameObject e lo aggiunge al gruppo e alla scena |
| `.getChildren()` | Restituisce l'array di tutti gli elementi |
| `.getLength()` | Restituisce il numero di elementi presenti |
| `.getFirst(active)` | Restituisce il primo elemento (attivo o inattivo) |
| `.remove(child, removeFromScene, destroyChild)` | Rimuove un elemento dal gruppo |
| `.clear(removeFromScene, destroyChild)` | Rimuove tutti gli elementi |

`.remove()` e `.clear()` accettano due booleani: il primo rimuove anche l'oggetto dalla scena, il secondo chiama `.destroy()` sull'oggetto liberando la memoria.

### Object pooling

Un pattern comune con i Group è il **pool di oggetti**: invece di creare e distruggere continuamente gameObjects (operazione costosa), si riutilizzano quelli già esistenti disattivandoli quando non servono e riattivandoli quando servono di nuovo.

```typescript
// recupera un elemento inattivo dal pool
const bullet = this._bullets.getFirst(false) as Phaser.GameObjects.Sprite;
if (bullet) {
  bullet.setPosition(playerX, playerY);
  bullet.setActive(true).setVisible(true);
}
```

::InfoBox{type="tip"}
Il Group è fondamentale per le **collisioni** con Arcade Physics: `this.physics.add.collider(player, this._enemies)` gestisce in automatico le collisioni tra il player e tutti i nemici nel gruppo, senza cicli manuali.
::

## Container

Il Container è un gameObject che può **contenere altri gameObjects** come figli. A differenza del Group (che è puramente logico), il Container esiste nella display list e partecipa al rendering: posizione, scala, rotazione e alpha applicati al container si propagano automaticamente a tutti i suoi figli.

```typescript
private _popup: Phaser.GameObjects.Container;

// nel create():
const bg    = this.add.rectangle(0, 0, 400, 200, 0x222244);
const title = this.add.text(-180, -70, "Game Over", { fontSize: "28px" });
const btn   = this.add.text(-40, 50, "Riprova", { fontSize: "20px" });

this._popup = this.add.container(512, 300, [bg, title, btn]);
```

Il terzo parametro di `this.add.container(x, y, children)` accetta direttamente l'array dei figli.

### Coordinate relative

Le posizioni dei figli sono **relative all'origine del container**, non alla scena. Se il container è a `(512, 300)` e un figlio ha posizione `(0, 0)`, il figlio apparirà esattamente al centro del container.

```typescript
// sposta tutto il popup di 100px a destra — i figli seguono
this._popup.setPosition(612, 300);
```

### Aggiungere e rimuovere figli

```typescript
this._popup.add(newElement);           // aggiunge un figlio
this._popup.remove(btn);               // rimuove senza distruggere
this._popup.remove(btn, true);         // rimuove e distrugge
this._popup.getAll();                  // restituisce tutti i figli
this._popup.getByName("title-text");   // cerca un figlio per nome
```

Per trovare un figlio per nome, il gameObject deve avere la proprietà `name` impostata:

```typescript
title.name = "title-text";
```

### Esempio completo: popup con tween

```typescript
// nascondi il popup all'avvio
this._popup.setAlpha(0).setScale(0.8);

// mostralo al click del pulsante
this._openButton.setInteractive().on("pointerdown", () => {
  this.tweens.add({
    targets: this._popup,
    alpha: 1,
    scale: 1,
    duration: 250,
    ease: "Back.Out",
  });
}, this);

// nascondilo alla chiusura
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
I figli di un Container **non possono avere un physics body** Arcade. Se hai bisogno di fisica sugli oggetti, usa un Group invece di un Container.
::

### Group vs Container — quando usare quale

| | Group | Container |
|---|---|---|
| Rappresentazione visiva | No | Sì |
| Coordinate dei figli | Indipendenti | Relative al container |
| Trasformazioni ereditate | No | Sì (posizione, scala, alpha, rotazione) |
| Compatibile con Arcade Physics | Sì | No |
| Uso tipico | Nemici, proiettili, collezionabili | UI, popup, HUD, gruppi visivi |

::InfoBox{type="new"}
Nel prossimo capitolo vedremo i **Tweens** e l'**audio**: strumenti fondamentali per animare i gameObjects nel tempo e aggiungere effetti sonori al gioco.
::

## Riepilogo

In questo capitolo abbiamo:

- ✅ Compreso il concetto di gameObjects e la GameObjectsFactory
- ✅ Utilizzato le proprietà comuni (position, depth, alpha, scale, origin, tint, flip, setToTop/setToBack)
- ✅ Reso i gameObjects interattivi con `setInteractive()` e `.on()`
- ✅ Creato testi, immagini e sprite con le loro proprietà specifiche
- ✅ Realizzato uno sfondo con effetto parallasse tramite TileSprite
- ✅ Organizzato gameObjects con Group e Container
