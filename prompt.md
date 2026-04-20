# PROMPT — Sito Web di Apprendimento: "Phaser 4 Game Dev"

## Panoramica del Progetto

Realizza un sito web statico per l'apprendimento di **Phaser.js v4.0** (l'ultima versione major del framework per la creazione di videogiochi browser-based). Il sito è strutturato come un corso a capitoli progressivi, con esempi di codice interattivi, esercizi pratici e questionari di autovalutazione alla fine di ogni capitolo. Il contenuto è in **lingua italiana**.

Il sito è composto esclusivamente da **pagine statiche** (no database, no autenticazione). Il progresso nei quiz può essere salvato in `localStorage` lato client.

---

## Stack Tecnologico

| Layer | Tecnologia | Versione |
|---|---|---|
| Framework Frontend | Nuxt | **4.4.2** |
| UI Library | Nuxt UI | **4.6.2** |
| Linguaggio | TypeScript | latest compatibile |
| Styling | Tailwind CSS (incluso in Nuxt UI) | v4 |
| Rendering | Static Site Generation (SSG) | — |
| Package Manager | pnpm | latest |

### Configurazione Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/ui', '@nuxt/content'],
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
})
```

### Dipendenze aggiuntive

- `@nuxt/content` v3 — per gestire i contenuti dei capitoli in Markdown
- `@vueuse/core` — per localStorage (salvataggio progresso quiz)
- `shiki` — syntax highlighting del codice nei capitoli

---

## Design e Layout

### Identità Visiva

- **Logo**: Utilizza il file `phaser4-logo.webp` fornito (lettering "phaser4" in stile 3D con colori ciano/azzurro per il testo e viola/fucsia per il "4")
- **Palette colori primaria**:
  - Cyan/Azzurro vibrante: `#00D4FF` (colore principale del logo "phaser")
  - Viola/Indaco: `#6C3FE8` (accento)
  - Fucsia/Magenta: `#E840E0` (accento secondario, dal "4" del logo)
  - Background scuro: `#0A0A1A` (quasi nero, sfondo principale)
  - Surface cards: `#111128` (card/panel background)
  - Testo primario: `#F0F0FF`
  - Testo secondario: `#8888AA`

- **Tipografia**:
  - Titoli: font `"Orbitron"` o `"Exo 2"` (Google Fonts) — stile tecnico/gaming
  - Corpo testo: `"Inter"` o `"DM Sans"` — leggibile e moderno
  - Codice: `"JetBrains Mono"` o `"Fira Code"` — con ligature

- **Atmosfera**: Dark theme di default (opzionalmente togglabile), effetti neon/glow sottili, particelle o gradient animati nell'hero section, stile "game dev dashboard"

### Layout Generale

```
┌──────────────────────────────────────────────────────┐
│  NAVBAR  [Logo] [Capitoli ▼] [Cerca] [Tema]          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  SIDEBAR (desktop)    │    MAIN CONTENT              │
│  ├── Capitolo 1       │    ┌─────────────────────┐   │
│  ├── Capitolo 2       │    │ Breadcrumb           │   │
│  │   ├── Sezione 2.1  │    │ Titolo Capitolo      │   │
│  │   └── Sezione 2.2  │    │ Stima tempo lettura  │   │
│  ├── ...              │    │ ─────────────────    │   │
│  └── Capitolo 11      │    │ Contenuto            │   │
│                       │    │ Esempi codice        │   │
│  PROGRESSO            │    │ Box "Nota Bene"      │   │
│  ████░░░░ 42%         │    │ ─────────────────    │   │
│                       │    │ QUIZ (fine cap.)     │   │
│                       │    └─────────────────────┘   │
│                       │                              │
│                       │  NAVIGAZIONE PREV/NEXT        │
├──────────────────────────────────────────────────────┤
│  FOOTER                                              │
└──────────────────────────────────────────────────────┘
```

### Componenti UI Principali (Nuxt UI v4.6.2)

Usa i seguenti componenti nativi di Nuxt UI:

- `UNavigationMenu` — navbar principale e menu capitoli
- `UAccordion` — sidebar mobile o sezioni collassabili
- `UCard` — card capitoli, card quiz, card note
- `UBadge` — etichette difficoltà (Beginner / Intermediate / Advanced)
- `UProgress` — barra progresso corso
- `UButton` — CTA e navigazione
- `UTabs` — separare teoria / codice / output in alcune sezioni
- `UModal` — risultati quiz a fine capitolo
- `UAlert` — box "Nota Bene", "Attenzione", "Suggerimento"
- `UTooltip` — definizioni inline su termini tecnici
- `UCommandPalette` — barra di ricerca globale
- `UDivider` — separatori sezioni
- `USkeleton` — loading states

---

## Struttura delle Route

```
pages/
├── index.vue                      # Homepage / Landing
├── capitoli/
│   ├── index.vue                  # Indice di tutti i capitoli
│   ├── 1-introduzione.vue
│   ├── 2-setup-ambiente.vue
│   ├── 3-typescript-basi.vue
│   ├── 4-concetti-core-phaser4.vue
│   ├── 5-scene-e-game-loop.vue
│   ├── 6-game-objects.vue
│   ├── 7-fisica-e-collisioni.vue
│   ├── 8-animazioni-tweens-audio.vue
│   ├── 9-camera-e-viewport.vue
│   ├── 10-tilemaps.vue
│   ├── 11-input.vue
│   └── 12-deploy-e-ottimizzazione.vue
└── risorse/
    ├── index.vue                  # Link utili, cheatsheet
    └── glossario.vue              # Glossario termini
```

---

## Struttura dei Capitoli

> ⚠️ **IMPORTANTE — Aggiornamento da Phaser 3 a Phaser 4**: Il materiale originale fa riferimento a Phaser 3.x. Tutti i capitoli devono rispecchiare le API, la struttura e le novità di **Phaser 4.0**. Le principali differenze da tenere in considerazione sono:
> - Phaser 4 usa un sistema di **Scene** completamente riscritto con approccio più modulare
> - Il **Game Loop** è stato ottimizzato e utilizza `requestAnimationFrame` con delta-time normalizzato
> - I **GameObjects** sono stati refactored: rimozione di alcuni oggetti deprecati, nuovi primitivi
> - Il sistema di **Physics** Arcade è stato migliorato con una migliore API per i corpi fisici
> - Phaser 4 ha eliminato la dipendenza da Webpack in favore di **Vite** come build tool consigliato
> - Le **Tilemaps** ora supportano nativamente formati aggiuntivi (LDtk, oltre a Tiled)
> - L'inizializzazione del gioco avviene tramite `new Phaser.Game(config)` con struttura config rinnovata
> - Supporto nativo a **ESM** (ES Modules) senza necessità di bundler
> - **TypeScript** tipizzazioni migliorate e distribuite con il package

---

### Capitolo 1 — Introduzione a Phaser 4

**Obiettivi**: Capire cos'è Phaser 4, il suo ecosistema, le differenze con la v3 e le tecnologie coinvolte.

**Sezioni**:
1. Cos'è Phaser.js e la sua storia
2. Novità di Phaser 4 rispetto a Phaser 3 (breaking changes, miglioramenti)
3. Tecnologie correlate: Node.js, npm/pnpm, TypeScript, Vite
4. Visual Studio Code e le estensioni consigliate
5. Il browser come ambiente di esecuzione: Canvas vs WebGL
6. Risorse ufficiali: documentazione, esempi, community

**Box speciali**:
- 🆕 "Novità in Phaser 4" — confronto API v3 vs v4
- ⚠️ "Attenzione" — breaking changes rispetto a Phaser 3

**Quiz** (5 domande):
1. Quale tecnologia di rendering utilizza Phaser 4? [WebGL / Canvas / Entrambe / OpenGL]
2. Quale build tool è consigliato da Phaser 4 in sostituzione di Webpack? [Vite / Rollup / Parcel / Esbuild]
3. In che linguaggio è scritto Phaser 4? [TypeScript / JavaScript / Rust / C++]
4. Cosa significa SSG nel contesto dei framework frontend? [...]
5. Quale metodo si usa per avviare un gioco Phaser 4? [`new Phaser.Game()` / `Phaser.init()` / `Phaser.start()` / `Phaser.launch()`]

---

### Capitolo 2 — Setup dell'Ambiente di Sviluppo

**Obiettivi**: Installare e configurare l'ambiente di sviluppo con Vite + TypeScript + Phaser 4.

**Sezioni**:
1. Installazione di Node.js e pnpm
2. Creare un progetto con Vite e template TypeScript
3. Installare Phaser 4 (`pnpm add phaser@4`)
4. Struttura del progetto: cartelle `src/`, `assets/`, `scenes/`
5. Il file `vite.config.ts` e configurazione base
6. Il file `tsconfig.json` per Phaser 4
7. Comandi essenziali: `pnpm dev`, `pnpm build`, `pnpm preview`
8. Caricare e testare un gioco "Hello Phaser 4"

**Blocchi di codice** (con syntax highlighting):
```ts
// Esempio: main.ts — Inizializzazione minima di un gioco Phaser 4
import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1a1a2e',
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

new Phaser.Game(config);
```

**Quiz** (5 domande):
1. Quale comando installa Phaser 4 con pnpm? [...]
2. Quale file contiene la configurazione di TypeScript? [...]
3. Qual è il comando per avviare il server di sviluppo con Vite? [...]
4. Il tipo `Phaser.Types.Core.GameConfig` serve a... [...]
5. Dove devono essere posizionati gli asset (immagini, audio) nel progetto? [...]

---

### Capitolo 3 — Basi di TypeScript

**Obiettivi**: Padroneggiare i fondamentali di TypeScript necessari per lavorare con Phaser 4.

**Sezioni**:
1. TypeScript vs JavaScript: perché usarlo
2. Tipi primitivi: `number`, `string`, `boolean`, `null`, `undefined`
3. Tipi avanzati: `any`, `unknown`, `union types`, `type aliases`
4. Dichiarare variabili: `const`, `let` (best practice)
5. Operatori (aritmetici, comparazione, logici, assegnazione)
6. Costrutti condizionali: `if/else`, `switch`
7. Array e iterazione (`forEach`, `map`, `filter`)
8. Funzioni e arrow functions
9. Enumerati (`enum`)
10. Interfacce (`interface`) e Type (`type`)
11. Classi, costruttore, ereditarietà (`extends`)
12. Modificatori di accesso: `public`, `private`, `protected`, `readonly`
13. Generics di base
14. Optional chaining `?.` e nullish coalescing `??`

**Quiz** (6 domande):
1. Quale keyword si usa per dichiarare una costante in TypeScript? [...]
2. Qual è la differenza tra `==` e `===`? [...]
3. Come si dichiara un array di numeri in TypeScript? [...]
4. Cosa restituisce una funzione con tipo `void`? [...]
5. Quale modificatore rende una proprietà accessibile solo dall'interno della classe? [...]
6. Cosa fa l'operatore `?.` (optional chaining)? [...]

---

### Capitolo 4 — Concetti Core di Phaser 4

**Obiettivi**: Comprendere l'architettura fondamentale di Phaser 4: Game, Scene, GameLoop e Registry.

**Sezioni**:
1. La classe `Phaser.Game` e l'oggetto di configurazione
2. Il concetto di **Scena** in Phaser 4: ciclo di vita completo
   - `init()` — inizializzazione con dati
   - `preload()` — caricamento asset
   - `create()` — creazione oggetti
   - `update(time, delta)` — game loop
   - `shutdown()` / `destroy()` — pulizia
3. Gestione delle scene: `SceneManager`
   - `this.scene.start('NomeScena', data)`
   - `this.scene.launch('NomeScena')` — scene parallele
   - `this.scene.pause()` / `this.scene.resume()`
   - `this.scene.stop()`
4. Passare dati tra scene (`init(data)`)
5. Il **Registry** globale (`this.registry.set/get`)
6. Il sistema di eventi (`this.events.emit/on/once/off`)
7. Struttura consigliata: `BootScene`, `PreloadScene`, `MenuScene`, `GameScene`, `UIScene`

**Blocchi di codice**:
```ts
// Esempio: MainScene.ts
import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('player', 'assets/images/player.png');
  }

  create(): void {
    this.add.image(400, 300, 'player');
    
    // Emetti evento custom
    this.events.emit('sceneReady', { scene: 'MainScene' });
  }

  update(time: number, delta: number): void {
    // Game loop - delta in millisecondi
  }
}
```

**Quiz** (5 domande):
1. In quale metodo della scena si caricano gli asset? [...]
2. Come si avvia una nuova scena in Phaser 4? [...]
3. Cosa contiene il `Registry` di Phaser? [...]
4. A cosa serve il parametro `delta` nel metodo `update()`? [...]
5. Quale metodo viene chiamato quando una scena viene distrutta? [...]

---

### Capitolo 5 — Scene e Game Loop

**Obiettivi**: Approfondire la gestione delle scene, il game loop e l'architettura multi-scena.

**Sezioni**:
1. Il Game Loop: come funziona internamente (fixed timestep vs variable)
2. Delta time e frame-rate indipendenza
3. Scene in parallelo: UI sovrapposta al gameplay
4. Comunicazione tra scene tramite eventi e registry
5. Plugin di scena custom
6. Gestire stati complessi: State Machine pattern
7. Debugging con la modalità `debug: true`

**Quiz** (4 domande):
1. Perché è importante usare il `delta` per i movimenti? [...]
2. Come si avvia una scena in parallelo senza fermare quella corrente? [...]
3. Qual è il pattern consigliato per gestire gli stati del gioco? [...]
4. Come si comunica tra due scene attive contemporaneamente? [...]

---

### Capitolo 6 — GameObjects

**Obiettivi**: Conoscere e utilizzare tutti i GameObjects principali di Phaser 4.

**Sezioni**:
1. Proprietà comuni a tutti i GameObjects
   - `setPosition(x, y)`, `setScale(x, y)`, `setAngle(deg)`, `setAlpha(a)`
   - `setOrigin(x, y)`, `setDepth(value)`, `setVisible(bool)`
   - `setInteractive()` e gestione eventi input
   - `setTint()`, `clearTint()`
   - `setFlipX(bool)`, `setFlipY(bool)`
   - `destroy()`
2. **Image** — oggetto statico
3. **Sprite** — oggetto con animazioni
4. **Text** e **BitmapText** — testo nel gioco
   - Stili, stroke, shadow, word-wrap
5. **Graphics** — disegnare forme primitive
6. **RenderTexture** — texture dinamica
7. **TileSprite** — texture ripetuta con scrolling
8. **Container** — raggruppare GameObjects
9. **Group** e **StaticGroup** — gestione pool di oggetti
10. **Particles** — sistema particelle di Phaser 4 (nuovo ParticleEmitter)
11. **Video** — riproduzione video inline
12. **Layer** — nuovo in Phaser 4 per raggruppamento con depth

**Blocchi di codice**:
```ts
// Sprite con animazione
const player = this.add.sprite(100, 200, 'player');

this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 12,
  repeat: -1
});

player.play('walk');

// Container
const container = this.add.container(400, 300);
const bg = this.add.image(0, 0, 'panel');
const label = this.add.text(0, -50, 'Score: 0', { fontSize: '24px' });
container.add([bg, label]);
```

**Quiz** (6 domande):
1. Quale GameObject si usa per visualizzare un'immagine statica? [...]
2. Come si riproduce un'animazione su uno Sprite? [...]
3. Cosa fa il metodo `setOrigin(0.5, 0.5)`? [...]
4. Quale oggetto permette di raggruppare più GameObjects mantenendo le trasformazioni relative? [...]
5. Come si rimuove un GameObject dalla scena? [...]
6. Cos'è un `Group` in Phaser 4 e quando si usa? [...]

---

### Capitolo 7 — Fisica e Collisioni (Arcade Physics)

**Obiettivi**: Implementare fisica realistica con il motore Arcade Physics di Phaser 4.

**Sezioni**:
1. Abilitare Arcade Physics nella configurazione
2. Corpo fisico (`Body`): proprietà principali
   - `velocity`, `acceleration`, `gravity`
   - `bounce`, `friction`, `drag`
   - `allowGravity`, `immovable`
3. Metodi del Body
   - `setSize(w, h, center)`, `setOffset(x, y)`, `setCircle(r)`
   - `setVelocity(x, y)`, `setMaxVelocity(x, y)`
   - `setAcceleration(x, y)`, `setGravity(x, y)`
   - `setBounce(x, y)`, `setCollideWorldBounds(bool)`
4. Rilevamento stato del body: `blocked`, `touching`
5. **Collider** e **Overlap**
   - `this.physics.add.collider(a, b, callback)`
   - `this.physics.add.overlap(a, b, callback)`
6. Metodi di utilità Physics
   - `moveTo()`, `moveToObject()`
   - `accelerateTo()`, `velocityFromAngle()`
   - `closest()`, `furthest()`
7. Static Bodies vs Dynamic Bodies
8. Debugging visivo dei corpi fisici

**Blocchi di codice**:
```ts
// Aggiungere fisica ad un oggetto
const player = this.physics.add.sprite(100, 450, 'player');
player.setBounce(0.2);
player.setCollideWorldBounds(true);

// Piattaforme statiche
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').refreshBody();

// Collider
this.physics.add.collider(player, platforms);

// Overlap con callback
this.physics.add.overlap(player, coins, collectCoin, undefined, this);

function collectCoin(player: Phaser.Physics.Arcade.Sprite, coin: Phaser.Physics.Arcade.Sprite) {
  coin.destroy();
}
```

**Quiz** (5 domande):
1. Qual è la differenza tra `collider` e `overlap`? [...]
2. Come si impedisce a un oggetto di uscire dai limiti del mondo fisico? [...]
3. Cosa fa `setImmovable(true)`? [...]
4. Come si applica la gravità solo in verticale a un oggetto? [...]
5. Cosa restituisce `body.blocked.down`? [...]

---

### Capitolo 8 — Animazioni, Tweens e Audio

**Obiettivi**: Animare gli oggetti nel tempo e gestire l'audio nel gioco.

**Sezioni**:
1. **AnimationManager**: creare e gestire animazioni frame-by-frame
   - `this.anims.create({ key, frames, frameRate, repeat })`
   - `sprite.play()`, `sprite.anims.stop()`, `sprite.anims.currentAnim`
   - Callback eventi: `animationcomplete`, `animationstart`
2. **Tweens**: animazioni procedurali fluide
   - `this.tweens.add({ targets, props, duration, ease, onComplete })`
   - Easing functions (Linear, Sine, Bounce, Elastic, Back...)
   - Tweens in catena: `chain()`
   - `this.tweens.timeline()` — sequenze complesse
3. **Timeline** di Phaser 4 — nuova API per orchestrare eventi nel tempo
4. **SoundManager**: gestire audio
   - `this.load.audio('key', 'path')` nel preload
   - `this.sound.add('key')`, `.play()`, `.stop()`, `.pause()`
   - Proprietà: `volume`, `loop`, `rate`, `detune`
   - Audio context e gestione autoplay policy del browser
5. **Timer Events**
   - `this.time.addEvent({ delay, callback, loop })`
   - `this.time.delayedCall(delay, callback)`

**Blocchi di codice**:
```ts
// Tween esempio
this.tweens.add({
  targets: mySprite,
  x: 700,
  y: 300,
  alpha: 0.5,
  duration: 1500,
  ease: 'Sine.easeInOut',
  yoyo: true,
  repeat: -1,
});

// Timeline
const timeline = this.tweens.timeline({
  tweens: [
    { targets: obj, x: 200, duration: 500 },
    { targets: obj, y: 400, duration: 300, delay: 100 },
    { targets: obj, alpha: 0, duration: 200 },
  ]
});
```

**Quiz** (5 domande):
1. Come si crea un'animazione da un spritesheet? [...]
2. Cosa fa l'opzione `yoyo: true` in un Tween? [...]
3. Come si riproduce un suono in loop? [...]
4. Cosa fa `this.time.delayedCall(2000, fn)`? [...]
5. Come si gestisce l'autoplay policy dei browser per l'audio? [...]

---

### Capitolo 9 — Camera e Viewport

**Obiettivi**: Gestire la camera di Phaser 4 per creare mondi più grandi dello schermo.

**Sezioni**:
1. La Camera principale: `this.cameras.main`
2. Seguire il player: `camera.startFollow(target, roundPixels, lerpX, lerpY)`
3. Limiti del mondo: `this.physics.world.setBounds()` + `camera.setBounds()`
4. Zoom: `camera.setZoom(value)` e animazione zoom
5. Offset e pan: `camera.pan(x, y, duration, ease)`
6. Effetti speciali camera:
   - `camera.flash(duration, r, g, b)`
   - `camera.shake(duration, intensity)`
   - `camera.fade(duration, r, g, b)`
   - `camera.rotateTo(radians, shortestPath)`
7. Multiple camere: `this.cameras.add()`
8. Oggetti fissi alla camera: `setScrollFactor(0)` per la UI
9. Deadzone: `camera.setDeadzone(width, height)`

**Quiz** (4 domande):
1. Come si fa sì che la camera segua il personaggio? [...]
2. Cosa fa `setScrollFactor(0)` su un GameObject? [...]
3. Come si limita l'area visibile della camera ai bordi della mappa? [...]
4. Quale effetto usa `camera.shake()`? [...]

---

### Capitolo 10 — Tilemaps

**Obiettivi**: Creare livelli di gioco con mappe a tile utilizzando Tiled e il nuovo supporto LDtk di Phaser 4.

**Sezioni**:
1. Introduzione alle Tilemaps: cos'è una tile e una mappa
2. Tool consigliati: **Tiled** (classico) e **LDtk** (nuovo, supportato nativamente in Phaser 4)
3. Creare una mappa con Tiled
   - Inserire il Tileset
   - Layer di rendering (foreground, background)
   - Layer di collisione
   - Settare proprietà di collisione sulle tile
   - Object Layer per posizionare entità
4. Importare la mappa Tiled in Phaser 4
   ```ts
   this.load.tilemapTiledJSON('map', 'assets/maps/level1.json');
   this.load.image('tiles', 'assets/images/tileset.png');
   ```
5. Creare la mappa in scena:
   ```ts
   const map = this.make.tilemap({ key: 'map' });
   const tileset = map.addTilesetImage('TilesetName', 'tiles');
   const groundLayer = map.createLayer('Ground', tileset, 0, 0);
   groundLayer.setCollisionByProperty({ collides: true });
   this.physics.add.collider(player, groundLayer);
   ```
6. **Novità Phaser 4**: supporto nativo a **LDtk**
   - Caricare ed usare mappe LDtk
   - Vantaggi di LDtk rispetto a Tiled
7. Tile extruder: prevenire il bleeding dei tile
8. Recuperare object layer per posizionare nemici, bonus, spawn point
9. Tilemap con più layer sovrapposti (parallax)

**Quiz** (5 domande):
1. Quale metodo carica una mappa Tiled in Phaser 4? [...]
2. Come si abilitano le collisioni su un tile layer? [...]
3. Cos'è LDtk e come differisce da Tiled? [...]
4. A cosa serve il tool "Tile Extruder"? [...]
5. Come si recuperano gli oggetti dall'Object Layer di Tiled? [...]

---

### Capitolo 11 — Input

**Obiettivi**: Gestire input da tastiera, mouse/touch e gamepad.

**Sezioni**:
1. **Keyboard Input**
   - Cursori predefiniti: `this.input.keyboard.createCursorKeys()`
   - Tasti custom: `this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)`
   - Metodi: `isDown`, `isUp`, `JustDown`, `JustUp`
2. **Mouse e Touch**
   - `this.input.activePointer`
   - Click su GameObjects: `gameObject.setInteractive()` + `on('pointerdown', ...)`
   - Drag & Drop
3. **Virtual Joystick** (plugin community)
4. **Gamepad Support** — Phaser 4 input unificato
5. Pattern consigliato: classe `InputController` separata
6. Gestione mobile: touch multi-dito
7. Input combinati (mobile + desktop con stessa logica)

**Blocchi di codice**:
```ts
// InputController.ts
export class InputController {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumpKey: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.jumpKey = scene.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  get left(): boolean { return this.cursors.left.isDown; }
  get right(): boolean { return this.cursors.right.isDown; }
  get jump(): boolean {
    return Phaser.Input.Keyboard.JustDown(this.jumpKey);
  }
}
```

**Quiz** (5 domande):
1. Come si crea il set di cursori predefiniti in Phaser 4? [...]
2. Cosa fa `Phaser.Input.Keyboard.JustDown(key)`? [...]
3. Come si rende un GameObject cliccabile? [...]
4. Dove si gestisce in genere la logica di input nel pattern MVC? [...]
5. Come si gestisce uniformemente l'input su mobile e desktop? [...]

---

### Capitolo 12 — Deploy e Ottimizzazione

**Obiettivi**: Preparare e pubblicare il gioco online, ottimizzare le performance.

**Sezioni**:
1. **Build di produzione**: `pnpm build` con Vite
   - Tree shaking e minificazione
   - Analisi del bundle: `vite-bundle-analyzer`
2. **Asset optimization**:
   - Texture atlas (sprite sheet vs atlas JSON con TexturePacker)
   - Formati immagine: WebP vs PNG
   - Audio: formati e fallback (ogg + mp3)
3. **Performance tips**:
   - Object pooling con `Group`
   - Evitare garbage collection nel game loop
   - `setActive(false)` invece di `destroy()` per il pooling
4. **Deploy su piattaforme statiche**:
   - GitHub Pages
   - Netlify / Vercel
   - itch.io (hosting giochi)
5. **PWA**: rendere il gioco installabile su mobile
6. Responsive e adattamento a schermi diversi: `scale.mode`
   - `Phaser.Scale.FIT`, `RESIZE`, `ENVELOP`

**Quiz** (4 domande):
1. Cos'è un Texture Atlas e quali vantaggi offre? [...]
2. Come si implementa l'Object Pooling in Phaser 4? [...]
3. Quale modalità di scaling si usa per adattarsi a qualsiasi schermo mantenendo le proporzioni? [...]
4. Quali formati audio garantiscono compatibilità cross-browser? [...]

---

## Componenti Vue da Realizzare

### `components/chapter/ChapterHeader.vue`
- Titolo del capitolo, numero, badge difficoltà, stima tempo lettura
- Breadcrumb navigazione

### `components/chapter/CodeBlock.vue`
- Syntax highlighting con Shiki
- Pulsante "Copia codice"
- Label linguaggio (TypeScript, JSON, Bash...)
- Opzione "Esegui" per snippets semplici (opzionale)

### `components/chapter/InfoBox.vue`
- Tipologie: `tip`, `warning`, `new` (novità Phaser 4), `deprecated`
- Icone e colori distinti per tipo

### `components/chapter/Quiz.vue`
- Domande a risposta multipla
- Feedback immediato (corretto/errato)
- Punteggio finale con percentuale
- Modal risultato con `UModal`
- Salvataggio progresso in `localStorage`
- Animazione confetti per punteggio perfetto

### `components/chapter/ChapterNav.vue`
- Pulsanti "Capitolo Precedente" / "Capitolo Successivo"
- Preview titolo capitolo adiacente

### `components/sidebar/CourseSidebar.vue`
- Lista capitoli con completamento (✓ completato, → in corso, ○ non iniziato)
- Barra progresso globale
- Toggle collaps mobile (drawer)

### `components/layout/CourseNavbar.vue`
- Logo Phaser 4
- Menu capitoli dropdown con anteprima
- Barra di ricerca rapida (`UCommandPalette`)
- Toggle tema dark/light

### `pages/index.vue` — Homepage Hero
- Hero section con logo Phaser 4 grande e animazione entry
- Sottotitolo del corso
- Card riassuntive dei capitoli (12 card in grid)
- Sezione "Cosa imparerai" (list con icone)
- Sezione "Tecnologie" (badge tech stack)
- CTA "Inizia il Corso" → `/capitoli/1-introduzione`

---

## Composables

### `composables/useChapterProgress.ts`
```ts
// Gestisce il progresso dei capitoli in localStorage
export const useChapterProgress = () => {
  const progress = useLocalStorage<Record<string, boolean>>('phaser4-progress', {})
  
  const markCompleted = (chapterKey: string) => {
    progress.value[chapterKey] = true
  }
  
  const isCompleted = (chapterKey: string): boolean => {
    return progress.value[chapterKey] ?? false
  }
  
  const completedCount = computed(() =>
    Object.values(progress.value).filter(Boolean).length
  )
  
  const totalChapters = 12
  
  const progressPercentage = computed(() =>
    Math.round((completedCount.value / totalChapters) * 100)
  )
  
  return { markCompleted, isCompleted, completedCount, progressPercentage, totalChapters }
}
```

### `composables/useQuizState.ts`
```ts
// Gestisce lo stato e il risultato dei quiz
export const useQuizState = (chapterId: string) => {
  const quizResults = useLocalStorage<Record<string, number>>('phaser4-quiz', {})
  
  const saveResult = (score: number) => {
    quizResults.value[chapterId] = score
  }
  
  const bestScore = computed(() => quizResults.value[chapterId] ?? null)
  
  return { saveResult, bestScore }
}
```

---

## Dati Statici (senza DB)

### `data/chapters.ts`
```ts
export interface Chapter {
  id: number
  key: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readingTime: number // minuti
  topics: string[]
}

export const chapters: Chapter[] = [
  {
    id: 1,
    key: '1-introduzione',
    title: 'Introduzione a Phaser 4',
    description: 'Scopri cos\'è Phaser 4, le sue novità rispetto alla v3 e le tecnologie coinvolte.',
    difficulty: 'beginner',
    readingTime: 15,
    topics: ['Phaser 4', 'WebGL', 'Canvas', 'Vite', 'TypeScript'],
  },
  // ... tutti i 12 capitoli
]
```

### `data/quiz/chapter-X.ts`
```ts
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}
```

---

## SEO e Metadati

Usa `useSeoMeta()` in ogni pagina:

```ts
useSeoMeta({
  title: 'Phaser 4 Game Dev — Corso Italiano',
  ogTitle: 'Impara Phaser 4 con TypeScript',
  description: 'Corso completo in italiano per imparare a sviluppare videogiochi con Phaser.js v4.0 e TypeScript.',
  ogImage: '/images/og-image.png',
})
```

---

## Animazioni e Microinterazioni

- **Entry animation** homepage: logo Phaser 4 entra con fade+scale, poi le card capitoli appaiono in sequenza (staggered)
- **Hover cards**: leggero lift (`translateY(-4px)`) + glow sul bordo cyan
- **Progress bar**: animazione smooth su completamento capitolo
- **Quiz feedback**: shake rosso su risposta errata, pulse verde su corretta
- **Transizioni pagina**: fade cross-dissolve tra capitoli (Nuxt transitions)
- **Sidebar**: highlight smooth del capitolo attivo con bordo sinistro colorato

---

## Note Finali

- Tutto il contenuto è in **lingua italiana**
- Il sito deve essere **accessibile** (ARIA labels, contrasto colori adeguato, navigazione da tastiera)
- Ottimizzare per **Core Web Vitals**: LCP, CLS, FID
- Prevedere **sitemap.xml** e **robots.txt** per SEO
- Il logo `phaser4-logo.webp` va ottimizzato con `<NuxtImg>` per lazy loading
- Usare `useColorMode()` di Nuxt UI per il toggle dark/light
- La sidebar deve trasformarsi in un **Drawer** su mobile
- Tutti i blocchi di codice TypeScript devono essere **copiabili** con un click
- Ogni capitolo mostra una stima del **tempo di lettura** basata sul numero di parole

---

*Prompt generato per: Phaser 4 Game Dev Learning Site — Nuxt 4.4.2 + Nuxt UI 4.6.2 — Static — ITA*
