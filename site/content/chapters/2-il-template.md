---
title: 'Il Template'
slug: '2-il-template'
chapter: 2
difficulty: beginner
readingTime: '~25 min'
---

## Il template di partenza

In questo capitolo esploreremo il **template** che utilizzeremo come base per sviluppare il nostro videogioco con Phaser 4. Il template è un progetto già configurato con tutti gli strumenti necessari: TypeScript, Webpack e la libreria PhaserJS.

Prima di procedere, assicurati di aver completato l'installazione di Node.js come descritto nel capitolo precedente.

::InfoBox{type="tip"}
Puoi scaricare il template dalla repository GitHub del corso: [github.com/sH4rk0/pgj](https://github.com/sH4rk0/pgj/tree/main/2026-2027/Template)
::

## JSON (JavaScript Object Notation)

Molti dei dati che andremo ad utilizzare saranno strutturati come **oggetti JSON**. È fondamentale comprendere questo formato prima di procedere.

JSON (JavaScript Object Notation) è un formato di testo leggero per lo scambio di dati. Viene utilizzato spesso per trasmettere dati in formato testuale da un server a un'applicazione web o viceversa.

Un file JSON consiste in una sequenza di coppie **chiave:valore**, separate dai due punti `:` e racchiuse tra parentesi graffe `{}`. Ogni coppia è separata dalla successiva dalla virgola `,`.

```json
{
  "name": "Francesco Raimondo",
  "yearBornDate": 1972,
  "city": "Salerno",
  "interests": ["making", "retrogaming", "3d printing"]
}
```

In questo esempio le chiavi sono `name`, `yearBornDate`, `city` e `interests`. I rispettivi valori sono `"Francesco Raimondo"`, `1972`, `"Salerno"` e l'array `["making", "retrogaming", "3d printing"]`.

::InfoBox{type="warning"}
Le chiavi non devono contenere spazi o caratteri speciali. Se la tua chiave è composta da più parole, utilizza la sintassi **camelCase**: la prima parola minuscola e le iniziali delle parole successive maiuscole. Esempio: `yearBornDate`.
::

I valori assegnati alle chiavi possono essere:
- **Stringhe**: `"testo"`
- **Numeri**: `42`, `3.14`
- **Booleani**: `true`, `false`
- **Array**: `[1, 2, 3]`
- **Altri oggetti JSON**: `{ "nested": "object" }`

Riferimenti utili:
- [json.org](https://www.json.org/json-it.html) — Specifica ufficiale
- [jsonlint.com](https://jsonlint.com/) — Tool online per validare JSON

## Il file package.json

Il file `package.json`, posizionato nella cartella principale del template, è un file di configurazione fondamentale per ogni progetto Node.js. Descrive le **dipendenze** del progetto e altre informazioni come il nome, la versione e i dati sull'autore.

```json
{
  "name": "phaser-project-template",
  "version": "4.0.0",
  "description": "Phaser 4.0.0 starter template with TypeScript and webpack.",
  "scripts": {
    "start": "webpack serve --open --config webpack/webpack.dev.js",
    "build": "rimraf public && webpack --config webpack/webpack.prod.js"
  }
}
```

Questo file viene utilizzato da npm quando eseguiamo il comando `npm install`.

## Comandi npm essenziali

Tre comandi npm saranno fondamentali per lo sviluppo del nostro gioco:

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa tutte le librerie necessarie nella cartella `node_modules` |
| `npm run start` | Avvia il server di sviluppo con hot-reload |
| `npm run build` | Crea il pacchetto finale ottimizzato per la produzione |

## Struttura del template

Una volta scompattato il template in una cartella del computer, aprendo la folder con VS Code troverai la seguente struttura:

```
template/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   ├── sounds/
│   │   └── map/
│   ├── pwa/
│   ├── scenes/
│   │   ├── Boot.ts
│   │   ├── Preloader.ts
│   │   ├── Intro.ts
│   │   ├── GamePlay.ts
│   │   ├── Hud.ts
│   │   └── GameOver.ts
│   ├── scss/
│   ├── favicon.ico
│   ├── GameData.ts
│   ├── index.html
│   ├── index.ts
│   └── style.ts
├── typings/
├── webpack/
├── package.json
└── tsconfig.json
```

### La cartella src

Questa è la cartella principale dove risiede tutto il codice sorgente:

#### assets/

Contiene tutte le risorse multimediali del gioco:

| Sottocartella | Contenuto |
|---------------|-----------|
| `fonts/` | Font bitmap personalizzati |
| `icons/` | Icone per dispositivi mobile (PWA) |
| `images/` | Tutte le immagini e sprite del gioco |
| `sounds/` | Musiche ed effetti sonori |
| `map/` | Mappe tilemap (se utilizzate) |

#### scenes/

In questa cartella troviamo le **scene** che compongono il nostro gioco. Ogni scena è un file TypeScript separato che "estende" la classe `Phaser.Scene`.

Il flusso delle scene è:

```
Boot → Preloader → Intro → GamePlay → GameOver
                    ↕
                   Hud (overlay parallelo)
```

- **Boot**: carica solo il logo iniziale
- **Preloader**: carica tutti gli assets e mostra la barra di caricamento
- **Intro**: schermata titolo/splash
- **GamePlay**: la logica principale del gioco
- **Hud**: scena overlay per elementi UI (punteggio, vite, ecc.)
- **GameOver**: schermata di fine partita

#### File principali

| File | Descrizione |
|------|-------------|
| `index.html` | La pagina HTML che ospita il gioco |
| `index.ts` | Configurazione iniziale di Phaser e registrazione delle scene |
| `GameData.ts` | Configurazione del gioco e registro degli assets |
| `style.ts` | Importa gli stili SCSS per Webpack |

### La cartella typings

Contiene il file `custom.ts` con le **interfacce TypeScript** che descrivono la struttura degli oggetti utilizzati nel progetto.

### La cartella webpack

Contiene i file di configurazione per Webpack:

- `webpack.common.js` — Configurazione condivisa
- `webpack.dev.js` — Configurazione per lo sviluppo
- `webpack.prod.js` — Configurazione per la build di produzione

## GameData.ts — Il registro degli assets

Il file `GameData.ts` è il **cuore della configurazione** del nostro gioco. Tutti gli assets vengono dichiarati qui e caricati automaticamente dal Preloader.

```typescript
export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: false
  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Caricamento...",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
  },

  spritesheets: [
    { name: "player", path: "assets/images/player.png", width: 82, height: 70, frames: 50 },
  ],

  images: [
    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "bg-1", path: "assets/images/bg/1.png" },
  ],

  sounds: [],
  fonts: [],
  webfonts: [{ key: 'Roboto' }, { key: 'Press+Start+2P' }],
};
```

::InfoBox{type="tip"}
Per aggiungere un nuovo asset al gioco, basta aggiungerlo nell'array corrispondente in `GameData.ts`. Il Preloader lo caricherà automaticamente!
::

## Installazione del template

### Passo 1: Aprire il terminale

Per eseguire i comandi npm, dobbiamo aprire il terminale integrato di VS Code. Clicca con il tasto destro sul file `package.json` e seleziona **"Open in Integrated Terminal"**.

![Aprire il terminale in VS Code](/images/chapters/2/open-terminal.png)

### Passo 2: npm install

Nel terminale, digita:

```bash
npm install
```

![Esecuzione npm install](/images/chapters/2/npm-install.png)

Questo comando leggerà il file `package.json` e scaricherà tutti i pacchetti necessari nella cartella `node_modules`.

::InfoBox{type="warning"}
Non spaventarti dalla dimensione della cartella `node_modules`! Contiene centinaia di pacchetti, ma nella maggior parte dei casi non dovrai mai accedervi direttamente.
::

![Installazione completata](/images/chapters/2/npm-install-finish.png)

### Passo 3: npm run start

Una volta completata l'installazione, avvia il server di sviluppo:

```bash
npm run start
```

![Esecuzione npm run start](/images/chapters/2/npm-run-start.png)

La prima esecuzione richiederà qualche secondo. Webpack compilerà il progetto e aprirà automaticamente una nuova finestra del browser all'indirizzo `http://localhost:9000/` con la pagina di benvenuto del template.

![Compilazione completata](/images/chapters/2/npm-run-start-finish.png)

::InfoBox{type="tip"}
Per **interrompere il server di sviluppo**, torna nel terminale e premi **Ctrl+C**. Questo fermerà Webpack e libererà la porta 9000.
::

![Pagina di benvenuto del template](/images/chapters/2/localhost-9000.png)

## La Console JavaScript

Per visualizzare messaggi di debug e output del gioco, dobbiamo accedere alla **Console JavaScript** del browser.

1. Premi `F12` (o `fn+F12` su alcuni laptop)
2. Oppure clicca con il tasto destro sulla pagina e seleziona **"Ispeziona"**
3. Seleziona il tab **"Console"**

![Console JavaScript del browser](/images/chapters/2/console-javascript.png)

La console permette di:
- Visualizzare messaggi di log con `console.log()`
- Vedere errori e warning
- Eseguire codice JavaScript direttamente

```typescript
// Nel tuo codice TypeScript
console.log("Hello World");
```

## Hot Reload

Una delle funzionalità più utili di Webpack è l'**Hot Reload**: ogni volta che salvi un file (Ctrl+S), la finestra del browser si aggiorna automaticamente mostrando le modifiche.

Questo accelera enormemente il ciclo di sviluppo, permettendoti di vedere immediatamente l'effetto delle tue modifiche senza dover riavviare manualmente il server.

## Creare la build di produzione

Quando il gioco è pronto per essere pubblicato, usa il comando:

```bash
npm run build
```

![Esecuzione npm run build](/images/chapters/2/npm-run-build.png)

Webpack compatterà tutti i file sorgente e creerà una cartella `public/` contenente i file ottimizzati per la pubblicazione online.

::InfoBox{type="tip"}
Per testare la build localmente, puoi usare l'estensione **Live Server** di VS Code. Clicca con il tasto destro su `public/index.html` e seleziona **"Open with Live Server"**.
::

![Aprire con Live Server](/images/chapters/2/open-live-server.png)

::InfoBox{type="warning"}
Se nella console javascript, dopo aver lanciato la build, vedi errori inaspettati, potrebbero dipendere dalla **cache del browser**. Esegui un **Hard Refresh** per ricaricare la pagina ignorando la cache: **Ctrl + Shift + R** (oppure **Cmd + Shift + R** su Mac).
::

## Riepilogo

In questo capitolo abbiamo:

- ✅ Compreso la struttura JSON
- ✅ Esplorato il file `package.json`
- ✅ Analizzato la struttura delle cartelle del template
- ✅ Scoperto il ruolo di `GameData.ts`
- ✅ Installato le dipendenze con `npm install`
- ✅ Avviato il server di sviluppo
- ✅ Imparato a creare la build di produzione

Nel prossimo capitolo inizieremo a esplorare le **basi di TypeScript**, il linguaggio che utilizzeremo per scrivere il codice del nostro gioco.

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Ok, ho sentito girare gli occhi quando hai visto quella struttura di cartelle. Lo so. Sembra tantissima roba.

Ma ti svelo un segreto: nel 90% dello sviluppo userai solo tre cose — `npm run start`, il file `GameData.ts` per aggiungere assets, e il metodo `create()` della scena `GamePlay`. Il resto è lì, ma puoi ignorarlo finché non ti serve.

L'unica cosa davvero fondamentale: **esegui sempre `npm install` la prima volta** che apri il progetto. Dimentichi quello e ti ritrovi a fissare errori misteriosi per mezz'ora.

Il server si avvia, il browser si apre, vedi la schermata del template — sei a posto. A presto! 🚀
::
