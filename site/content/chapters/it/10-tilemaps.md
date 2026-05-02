---
title: 'Tilemaps'
slug: '10-tilemaps'
chapter: 10
difficulty: intermediate
readingTime: '~40 min'
---

## Introduzione

Una **tilemap** è una struttura dati che consente di creare e manipolare mappe composte da piccole immagini di forma regolare chiamate **tile**. Queste mappe possono essere usate per creare livelli 2D, applicare la fisica, rilevare collisioni e controllare le posizioni degli sprite.

![Concetto di tilemap: tile singola e tileset completo](/images/ch10/tile-concept.png)

Terminologia:
- **Tile** — singola immagine quadrata che compone la mappa
- **Tileset** — l'insieme di tutte le tile disponibili, raccolte in un'unica immagine PNG
- **Layer** — livello della mappa; una mappa può avere più layer sovrapposti (visuale, collisioni, oggetti)

![Esempio di tileset: le tile raggruppate in un'unica immagine PNG](/images/ch10/tileset-example.png)

**Tiled** è lo strumento consigliato per creare le mappe. È open source e gratuito.

---

## Tile-extruder — eliminare il bleeding

Quando le tile sono esattamente di 32×32 px, Phaser può generare piccoli spazi visibili tra le tile adiacenti (bleeding). La libreria `tile-extruder` risolve questo problema aggiungendo a ogni tile un bordo di un pixel che replica i pixel del perimetro.

![Effetto bleeding (sinistra) vs tileset estruso senza artefatti (destra)](/images/ch10/tile-bleeding.png)

Esempio: 4 tile da 32×32 → PNG da 128×32 px → PNG estrusa da 136×34 px (ogni tile aggiunge 2px).

![Schema del margine aggiunto da tile-extruder a ogni tile](/images/ch10/tile-extruder-margin.png)

**Installazione:**

```bash
npm install --global tile-extruder
```

**Utilizzo:**

```bash
tile-extruder -w 32 -h 32 -i tilemap-example.png -o tilemap-extruded.png
```

| Parametro | Significato |
|---|---|
| `-w` | Larghezza della tile in px |
| `-h` | Altezza della tile in px |
| `-i` | File PNG di input |
| `-o` | File PNG di output |

![Output del comando tile-extruder nel terminale](/images/ch10/tiled-extruder-cli.jpg)

L'immagine estrusa `tilemap-extruded.png` è quella da importare in Tiled e in Phaser.

---

## Creare la mappa con Tiled

### Nuova mappa

Apri Tiled. Vedrai la schermata iniziale dell'applicazione.

![Schermata iniziale di Tiled](/images/ch10/tiled-new-project.jpg)

Clicca su **Nuova Mappa**. Si apre questa finestra di dialogo:

![Finestra "Nuova Mappa" di Tiled](/images/ch10/tiled-new-map-dialog.jpg)

Imposta le dimensioni delle tile a **32×32** per far coincidere con il tileset. Clicca OK e ti troverai in questa visualizzazione:

![Vista mappa vuota dopo la creazione](/images/ch10/tiled-map-view.jpg)

Vai su **File → Salva Come**:

![Menu File → Salva Come in Tiled](/images/ch10/tiled-save-as.jpg)

Salva la mappa come `level-0.json` (formato: JSON map files `*.tmj *.json`):

![Finestra Salva Come con nome level-0.json](/images/ch10/tiled-save-json.jpg)

### Importare il tileset

Clicca su **Nuovo Tileset**:

![Pulsante Nuovo Tileset nel pannello Tilesets](/images/ch10/tiled-new-tileset.png)

Sfoglia e seleziona `tilemap-extruded.png` → spunta **Incorpora nella mappa** → imposta:
- **Margine**: 1 px
- **Spaziatura**: 2 px

![Impostazioni margine e spaziatura nel dialog del tileset](/images/ch10/tiled-tileset-settings.jpg)

Questi valori corrispondono al bordo aggiunto da tile-extruder. Clicca OK.

![Tileset caricato e visibile nel pannello Tilesets](/images/ch10/tiled-tileset-loaded.jpg)

### Layer world (visuale)

Rinomina il layer di default in `world`. Seleziona una tile e usa lo **strumento riempimento** per coprire l'area:

![Strumento riempimento applicato alla mappa](/images/ch10/tiled-fill-tool.png)

Oppure usa lo **strumento pennello** per disegnare manualmente perimetri e strutture:

![Strumento pennello per disegnare la mappa tile per tile](/images/ch10/tiled-brush-tool.png)

### Layer collision (collisioni)

Clic destro nell'area dei layer → **Nuovo livello Tile** → nome: `collision`:

![Creazione del nuovo layer collision in Tiled](/images/ch10/tiled-collision-layer.jpg)

Ora hai due layer. Le icone occhio e lucchetto servono per nascondere/visualizzare e abilitare/disabilitare l'editing sui singoli livelli:

![Pannello layer con icone occhio e lucchetto](/images/ch10/tiled-layers-panel.png)

Disegna su questo layer le stesse zone che devono collidere con il personaggio.

### Impostare la proprietà collision sulle tile

1. Clicca l'icona **Modifica Tileset**:

![Pulsante Modifica Tileset nel pannello](/images/ch10/tiled-edit-tileset-btn.png)

2. Seleziona la tile da usare per le collisioni e aggiungi una **proprietà personalizzata**:

![Dialog per aggiungere proprietà personalizzata alla tile](/images/ch10/tiled-add-property.png)

3. Imposta tipo `bool` e nome `collision`:

![Impostazione del nome "collision" per la proprietà](/images/ch10/tiled-property-name.jpg)

4. Inserisci il valore `true` e salva con `CTRL+S`:

![Valore "true" impostato sulla proprietà collision](/images/ch10/tiled-property-value.png)

Questa proprietà verrà letta da Phaser per attivare la collisione fisica.

---

## Importare la tilemap in Phaser

### GameData.ts

```typescript
tilemaps: [
  {
    key: "level-0",
    path: "assets/map/level-0.json",
  },
],
```

Per il tileset, aggiungilo come spritesheet con margine e spaziatura:

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
Il `name` del tileset nel codice deve corrispondere esattamente al nome che hai assegnato in Tiled quando hai importato il tileset.
::

### Variabili nella scena

```typescript
private map: Phaser.Tilemaps.Tilemap;
private tileset: Phaser.Tilemaps.Tileset;
private layer: Phaser.Tilemaps.TilemapLayer;    // layer visuale
private layer2: Phaser.Tilemaps.TilemapLayer;   // layer collisioni
```

### Inizializzazione nel create()

**1. Crea la tilemap dalla chiave:**

```typescript
this.map = this.make.tilemap({ key: "level-0" });
```

**2. Adatta i bounds della camera e del mondo fisico alle dimensioni della mappa:**

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

**3. Aggiungi il tileset alla mappa:**

```typescript
this.tileset = this.map.addTilesetImage("tilemap-extruded")!;
```

::info-box{type="new"}
In Phaser 4, `addTilesetImage()` può restituire `null`. Usa il non-null assertion operator `!` se sei sicuro che il tileset esista, oppure aggiungi un check esplicito.
::

**4. Crea i layer:**

```typescript
// Layer visuale (depth alta = in primo piano)
this.layer = this.map.createLayer("world", this.tileset, 0, 0)!
  .setDepth(9)
  .setAlpha(1);

// Layer collisioni (può essere trasparente in produzione)
this.layer2 = this.map.createLayer("collision", this.tileset, 0, 0)!
  .setDepth(0)
  .setAlpha(0); // imposta a 1 durante il debug
```

**5. Attiva le collisioni sul layer:**

```typescript
this.layer2.setCollisionByProperty({ collide: true });
```

**6. Crea il collider tra il player e il layer:**

```typescript
this.physics.add.collider(
  this._player,
  this.layer2,
  (_player: any, _tile: any) => {
    // verifica proprietà personalizzate della tile
    if (_tile.properties.exit === true) {
      console.log("livello completato");
    }
    if (_tile.properties.death === true) {
      // decrementa vita o game over
    }
  },
  undefined,
  this
);
```

La callback del collider riceve il gameObject e la tile che hanno interagito. Puoi aggiungere a ogni tile qualsiasi proprietà personalizzata in Tiled — `exit`, `death`, `damage`, `speed` — e leggerle qui per gestire comportamenti specifici.

::info-box{type="tip"}
Durante lo sviluppo imposta `setAlpha(1)` sul layer collisioni per vedere visivamente dove sono le tile attive. In produzione metti `setAlpha(0)` per nasconderle.
::

---

## Proprietà personalizzate avanzate — exit e death

Puoi aggiungere ulteriori proprietà personalizzate alle tile per gestire comportamenti speciali. Ad esempio, una tile di uscita dal livello.

Nel **Modifica Tileset**, seleziona la tile con la freccia in alto e aggiungi due proprietà personalizzate:

![Tile di uscita con proprietà collide=true e exit=true](/images/ch10/tiled-exit-properties.png)

Nel layer `world`, inserisci la tile che indica visivamente l'uscita:

![Tile uscita posizionata nel layer world](/images/ch10/tiled-exit-world.jpg)

Nel layer `collision`, posiziona la stessa tile (o una trasparente) con le proprietà `collide=true` e `exit=true`:

![Tile collisione con exit=true nel layer collision](/images/ch10/tiled-exit-collision.jpg)

Quando il player collide con questa tile, la callback del collider rileva la proprietà `exit=true`:

![Codice della callback che controlla la proprietà exit](/images/ch10/tiled-exit-callback.jpg)

---

## Layer oggetti — posizionare gameObject sulla mappa

Un **Object Layer** in Tiled è un tipo speciale di layer che memorizza segnaposto sulla mappa. Serve a definire dove appariranno i gameObject dinamici (nemici, bonus, spawn point, checkpoint).

### Configurare il layer in Tiled

Clic destro nell'area layer → **Nuovo → Livello Oggetto** → nome: `gameObjects`:

![Creazione del Livello Oggetto in Tiled](/images/ch10/tiled-object-layer.jpg)

Seleziona la tile da usare come segnaposto e aggiungi una proprietà personalizzata di tipo `string` chiamata `behaviour`:

![Proprietà behaviour di tipo string aggiunta alla tile](/images/ch10/tiled-behaviour-property.png)

Inserisci come valore un oggetto JSON e posiziona le tile sulla mappa:

![Valore JSON per behaviour e tile posizionate sulla mappa](/images/ch10/tiled-behaviour-json.png)

```json
{"type":"bonus","score":50}
```

::info-box{type="warning"}
Se il valore della proprietà appare opaco in Tiled, significa che non è attivo. Clicca sul campo e aggiungi uno spazio alla fine della stringa per attivarlo, poi salva.
::

![Proprietà opaca (non attiva) — aggiungere uno spazio per attivarla](/images/ch10/tiled-opacity-fix.jpg)

Salva `level-0.json`.

### Recuperare gli oggetti in Phaser

Crea un metodo dedicato nella scena, da richiamare nel `create()` dopo aver inizializzato la mappa:

```typescript
setupObjects(): void {
  const _objLayer = this.map.getObjectLayer("gameObjects");

  if (_objLayer != null) {
    const _objects = _objLayer.objects as any[];

    _objects.forEach((tile: Phaser.Tilemaps.Tile) => {
      // leggi la proprietà behaviour come stringa JSON
      const _objectValue = JSON.parse(tile.properties[0].value).type;

      switch (_objectValue) {
        case "bonus":
          // istanzia il gameObject nella posizione della tile
          // this.addBonus(new BonusCoin({ scene: this, x: tile.x, y: tile.y, key: "bonus-coin" }));
          break;
        case "enemy":
          // istanzia il nemico
          break;
      }
    });
  }
}
```

Nel `create()`:

```typescript
create() {
  // ... inizializzazione mappa ...
  this.setupObjects();
}
```

::info-box{type="new"}
In Phaser 4, `getObjectLayer()` potrebbe essere deprecato in favore di `map.objects` (array diretto dei layer oggetto). Verifica nella documentazione aggiornata se ottieni `undefined` da `getObjectLayer()`.
::

---

## Schema completo del create()

```typescript
create() {
  // 1. Crea la tilemap
  this.map = this.make.tilemap({ key: "level-0" });

  // 2. Bounds camera e physics
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

  // 3. Tileset
  this.tileset = this.map.addTilesetImage("tilemap-extruded")!;

  // 4. Layer visuale
  this.layer = this.map.createLayer("world", this.tileset, 0, 0)!.setDepth(9);

  // 5. Layer collisioni
  this.layer2 = this.map.createLayer("collision", this.tileset, 0, 0)!
    .setDepth(0).setAlpha(0);
  this.layer2.setCollisionByProperty({ collide: true });

  // 6. Player (deve usare physics.add.sprite per avere il body)
  this._player = this.physics.add.sprite(100, 100, "player");
  this._player.body.setCollideWorldBounds(true);

  // 7. Camera segue il player
  this.cameras.main.startFollow(this._player, true, 0.1, 0.1);

  // 8. Collider player <-> mappa
  this.physics.add.collider(this._player, this.layer2);

  // 9. Object layer
  this.setupObjects();
}
```

::info-box{type="tip"}
**Documentazione ufficiale:** [Tilemaps namespace](https://docs.phaser.io/api-documentation/namespace/tilemaps)

**Esempi Phaser Labs:** [labs.phaser.io → tilemap](https://labs.phaser.io/index.html?dir=tilemap/)
::

::PhaserLabsBox{url="https://labs.phaser.io/index.html?dir=tilemap/"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Le tilemap sono il salto di qualità che trasforma un prototipo in un livello vero. Finché disegni il mondo con sprite posizionati a mano nel codice, stai lavorando contro te stesso. Con Tiled puoi costruire il livello visivamente e importarlo in tre righe.

Il workflow da memorizzare è: **Tiled esporta JSON → Phaser carica JSON → layer separati per visuale e collisioni**. Una volta che hai questo schema in testa, aggiungere nuovi livelli diventa banale.

Il layer collision trasparente è uno dei pattern più potenti: la mappa che vede il giocatore è una cosa, la mappa che "sente" la fisica è un'altra. Questa separazione ti dà controllo chirurgico su dove il personaggio può camminare.

**Tip pro**: le proprietà personalizzate delle tile (`exit`, `death`, `damage`) sono il modo professionale per gestire i livelli. Invece di hardcodare la logica nel codice, la metti nella mappa. Il designer può cambiare dove si trova la "porta di uscita" senza toccare il TypeScript. 🗺️
::
