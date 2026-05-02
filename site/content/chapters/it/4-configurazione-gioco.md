---
title: 'Configuriamo il Nostro Gioco'
slug: '4-configurazione-gioco'
chapter: 4
difficulty: intermediate
readingTime: '~30 min'
---

## Configurazione iniziale

Nel file `index.ts` si trova l'inizializzazione del nostro game. Nella prima parte del file procediamo all'importazione (`import`) di Phaser, delle scene e di `GameData`.

```typescript
// importiamo la libreria phaser
import "phaser";

// importiamo le nostre scene
import Boot from "./scenes/Boot";
import Hud from "./scenes/Hud";
import Preloader from "./scenes/Preloader";
import GamePlay from "./scenes/GamePlay";
import GameOver from "./scenes/GameOver";
import Intro from "./scenes/Intro";

// importiamo GameData che contiene i valori globali del gioco
import { GameData } from "./GameData";
```

L'evento `load` viene lanciato dal browser quando l'intera pagina è stata caricata, comprese tutte le risorse dipendenti (fogli di stile, script, immagini). Quando questo evento è completato, viene eseguito il codice incluso nella arrow function `() => { /* il nostro codice */ }`.

In questa funzione dichiariamo il codice di configurazione del nostro gioco. Nella costante `config`, di tipo `Phaser.Types.Core.GameConfig`, inseriamo un oggetto con tutti gli attributi necessari a Phaser per configurare il game.

```typescript
window.addEventListener("load", () => {

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },
    scene: [Boot, Hud, Preloader, Intro, GamePlay, GameOver],
    physics: {
      default: "arcade",
      arcade: { debug: GameData.globals.debug },
    },
    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  const game = new Phaser.Game(config);
});
```

::InfoBox{type="tip"}
Puoi consultare la descrizione di ogni singolo parametro del `GameConfig` nella documentazione ufficiale: [photonstorm.github.io/phaser3-docs](https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig). Trovi anche esempi pratici su [labs.phaser.io](https://labs.phaser.io/index.html?dir=game%20config/&q=).
::

## Il nostro gioco è diviso in Scene

Le scene ci permettono di dividere il nostro gioco in **contenitori logici separati**, rendendo il codice più semplice e manutenibile. Ogni scena è un file TypeScript dove viene definita una classe che estende la classe base `Phaser.Scene`.

Nel nostro template abbiamo definito **6 scene di base**:

| Scena | Funzione |
|---|---|
| `Boot.ts` | Prima scena inizializzata da Phaser. Carica configurazioni e risorse minime per la scena successiva. |
| `Preloader.ts` | Carica tutti gli assets del gioco definiti in `GameData.ts`. Al termine chiede di cliccare per passare a `Intro.ts`. |
| `Intro.ts` | Schermata titolo: descrizione del gioco, istruzioni, classifica e pulsante play. |
| `GamePlay.ts` | Contiene la logica principale del gioco: protagonista, nemici e tutti gli elementi interattivi. |
| `Hud.ts` | Heads-up display: mostra score, vite, timer e altri elementi UI in overlay rispetto alla scena di gameplay. |
| `GameOver.ts` | Scena finale attivata quando il giocatore esaurisce le vite o il tempo. Permette di salvare il punteggio e ripetere la partita. |

### I metodi di una scena

Ogni scena espone alcuni metodi fondamentali che Phaser invoca in sequenza:

| Metodo | Quando viene chiamato |
|---|---|
| `constructor()` | Al momento della creazione; chiama `super()` del costruttore padre. |
| `init()` | Una sola volta all'avvio; usato per inizializzare parametri della scena. |
| `preload()` | Prima di `create()`; carica gli asset necessari alla scena. |
| `create()` | Dopo `preload()`; inizializza variabili ed esegue le operazioni di setup iniziali. |
| `update()` | 60 volte al secondo; contiene la logica di gioco. |

### Esempio: la scena Boot.ts

```typescript
import { GameData } from "../GameData";

export default class Boot extends Phaser.Scene {

  constructor() {
    super({ key: "Boot" });
  }

  init() { }

  preload() {
    this.cameras.main.setBackgroundColor(GameData.globals.bgColor);
    this.load.image("logo", "assets/images/phaser.png");
  }

  create() {
    this.scene.stop("Boot");
    this.scene.start("Preloader");
  }
}
```

::InfoBox{type="warning"}
Il nome della classe (`Boot`) deve essere identico sia nella dichiarazione `class Boot extends Phaser.Scene` che nella chiave passata a `super({ key: "Boot" })`.
::

Prima del costruttore è possibile dichiarare le variabili private che utilizzeremo nella scena:

```typescript
export default class Boot extends Phaser.Scene {
  private _helloWorld: Phaser.GameObjects.Text;
  private _counter: number;

  constructor() {
    super({ key: "Boot" });
  }

  create() {
    this._counter = 0;
    this._helloWorld = this.add.text(0, 0, "Hello World");
  }
}
```

Le variabili dichiarate `private` saranno visibili solo all'interno della scena corrente.

### Far partire una nuova scena

Per avviare una nuova scena si usa:

```typescript
this.scene.start("nomeDellaScena");
```

La scena `Boot` è la prima caricata automaticamente da Phaser. Il suo metodo `preload()` carica le risorse necessarie alla scena successiva, dopodiché `create()` la avvia:

```typescript
this.scene.start("Preloader");
```

A sua volta `Preloader`, completato il suo ciclo, attende un click dell'utente prima di passare a `Intro`:

```typescript
this.input.once("pointerdown", () => {
  this.tweens.add({
    targets: [this._image, this._loading],
    alpha: 0,
    duration: 500,
    onComplete: () => {
      this.scene.start("Intro");
    },
  });
});
```

## Comunicazione tra scene

Alcune volte è necessario passare dati da una scena all'altra. Phaser offre tre approcci principali.

### Registry

Il primo metodo usa la classe `registry` con i metodi `set()` e `get()` — funziona come uno storage condiviso tra tutte le scene.

```typescript
// salviamo un valore
this.registry.set("level", 0);

// recuperiamo il valore in qualsiasi scena
let _currentLevel: number = this.registry.get("level");
```

### Dati nello start della scena

Il secondo metodo consiste nel passare i dati al momento dell'inizializzazione della nuova scena:

```typescript
// nella scena Intro, avviamo GamePlay passando il livello
this.scene.start("GamePlay", { level: levelValue });
```

Nella scena di destinazione, il metodo `init()` riceve i dati:

```typescript
init(data: { level: number }) {
  if (data.level != null) {
    this._level = data.level;
  } else {
    this._level = 0;
  }
}
```

### Emettere eventi tra scene parallele

Le scene `GamePlay` e `Hud` vengono eseguite **nello stesso momento**. Per farle comunicare si usano gli eventi. Dalla scena `Intro`, ad esempio, si avviano entrambe:

```typescript
this.scene.stop("Intro");
this.scene.start("GamePlay", { level: 0 });
this.scene.start("Hud");
this.scene.bringToTop("Hud");
```

Nella scena `GamePlay`, quando un nemico viene colpito, emettiamo un evento verso `Hud`:

```typescript
hitEnemy(weapon: any, enemy: any) {
  // emettiamo l'evento con il punteggio come parametro
  this.events.emit("update-score", [100]);
}
```

Nella scena `Hud`, all'interno del metodo `create()`, mettiamo in ascolto l'evento:

```typescript
// recuperiamo l'istanza della scena GamePlay
this._gamePlay = <GamePlay>this.scene.get("GamePlay");

// rimuoviamo e ricreiamo il listener per evitare duplicati
this._gamePlay.events.off("update-score", this.updateScore, this);
this._gamePlay.events.on("update-score", this.updateScore, this);
```

::InfoBox{type="tip"}
È buona pratica rimuovere sempre un listener prima di ricrearlo (`.off()` seguito da `.on()`) per evitare che un evento venga ricevuto ed eseguito più volte.
::

Infine, il metodo `updateScore()` nella scena `Hud` gestisce l'aggiornamento del punteggio:

```typescript
private updateScore(parameters: Array<any>): void {
  this._score += parameters[0];
  this._scoreText.setText(this._score + "");
  // salviamo lo score nel registry per la scena GameOver
  this.registry.set("score", this._score);
}
```

::InfoBox{type="new"}
Il sistema a scene di Phaser è uno dei suoi punti di forza: ogni scena è isolata e riutilizzabile, ma può comunicare con le altre tramite registry, dati di start o eventi.
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Eccoci. Il capitolo delle scene. Sei sopravvissuto anche a questo.

La verità è che il flusso è sempre lo stesso: Boot → Preloader → Intro → GamePlay → GameOver. **Tu lavorerai quasi sempre su `GamePlay.ts`** e ogni tanto toccherai `Hud.ts` per aggiornare punteggio e vite. Le altre scene le toccherai raramente.

I metodi `constructor`, `preload`, `create` e `update` sono il ritmo del tuo gioco — impararli a memoria ti cambia la vita. Il `registry` è il modo più semplice per passare dati tra scene; usalo senza sensi di colpa.

La comunicazione con gli eventi (`emit` / `on`) sembra magia la prima volta. Poi diventa il tuo strumento preferito. Fidati. 🎮
::
