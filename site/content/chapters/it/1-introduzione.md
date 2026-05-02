---
title: 'Introduzione alle Tecnologie'
slug: '1-introduzione'
chapter: 1
difficulty: beginner
readingTime: '~20 min'
---

## Le tecnologie alla base del progetto

In questo primo capitolo daremo un rapido sguardo alle tecnologie che ci aiuteranno nel realizzare il nostro primo videogame con **Phaser 4**.

Vedremo come TypeScript ci aiuterà nello scrivere codice più comprensibile, analizzeremo nel dettaglio la struttura del progetto template che useremo come base per le nostre implementazioni e impareremo alcuni comandi che ci permettono di far partire il template.

È importante conoscere, anche se non in maniera approfondita, le tecnologie che sono alla base dello sviluppo del nostro progetto.

## Node.js

Node.js è uno dei framework JavaScript più rivoluzionari dell'ultimo decennio, in quanto permette di utilizzare **V8**, l'interprete JavaScript di Google Chrome. Questo consente agli sviluppatori di realizzare web application con JavaScript non più solo lato client, ma anche sfruttandolo come linguaggio di programmazione lato server.

Prerequisito del corso è l'installazione di Node.js sul proprio computer.

::InfoBox{type="tip"}
Una utile guida per l'installazione di Node.js: [kinsta.com/it/blog/come-installare-node-js](https://kinsta.com/it/blog/come-installare-node-js/). Scarica Node.js da [nodejs.org](https://nodejs.org/).
::

Per verificare l'installazione, apri un terminale e digita:

```bash
node --version   # deve mostrare v20.x.x o superiore
npm --version    # incluso con Node.js
```

> "Node.js ci fornisce l'infrastruttura di base sulla quale sviluppare il nostro gioco."

## NPM (Node Package Manager)

**npm** è il gestore di pacchetti ufficiale che viene installato con la piattaforma Node.js. Gli sviluppatori open source di ogni continente usano npm per condividere e prendere in prestito pacchetti, e molte organizzazioni usano npm anche per gestire lo sviluppo privato.

```bash
# Comandi principali
npm install          # installa le dipendenze elencate nel package.json
npm run start        # avvia il server di sviluppo
npm run build        # crea il bundle di produzione
```

> "npm ci fornisce tutte le librerie che ci aiuteranno nello sviluppo."

Riferimento ufficiale: [npmjs.com](https://www.npmjs.com/)

## Webpack

**Webpack** viene definito dai suoi stessi sviluppatori come uno *static module bundler* per applicazioni JavaScript. Il suo scopo è quello di creare un pacchetto di assets utilizzabile direttamente nel browser a partire da un insieme di file sorgenti strutturati su diversi file e con schemi di dipendenze complessi.

I nostri giochi sono composti da decine di file TypeScript, immagini, audio e configurazioni. Webpack prende tutti questi file sorgente e li combina in un pacchetto ottimizzato che il browser può caricare efficacemente.

> "Webpack ci aiuta nello sviluppo e ci permette di creare il nostro pacchetto finale."

Riferimento ufficiale: [webpack.js.org](https://webpack.js.org/)

## TypeScript

**TypeScript** è un linguaggio di programmazione open source sviluppato da **Microsoft**. Più nello specifico, TypeScript è un **superset** di JavaScript, che aggiunge tipi, classi, interfacce e moduli opzionali al JavaScript tradizionale. Si tratta sostanzialmente di una estensione di JavaScript.

Perché usarlo con Phaser 4?

- **Autocompletamento intelligente**: il tuo editor suggerisce automaticamente i metodi disponibili sull'oggetto giusto
- **Errori a compile time**: scopri i bug prima ancora di avviare il gioco
- **Codice più leggibile**: i tipi documentano le intenzioni del codice, rendendo i progetti più facili da mantenere

```typescript
// JavaScript: non è chiaro cosa siano x, y e vita
function spawnNemico(x, y, vita) {
  // ...
}

// TypeScript: tutto è esplicito e verificato
function spawnNemico(x: number, y: number, vita: number): void {
  // ...
}

// TypeScript cattura errori come questo prima dell'esecuzione
spawnNemico(100, 200, 'molto')  // ❌ Errore: 'molto' non è un number
spawnNemico(100, 200, 100)      // ✅ Corretto
```

> "TypeScript è il nostro linguaggio di programmazione."

Riferimento ufficiale: [typescriptlang.org](https://www.typescriptlang.org/)

## Firebase

**Firebase** è una piattaforma serverless per lo sviluppo di applicazioni mobili e web. Open source ma supportata da Google, Firebase sfrutta l'infrastruttura di Google e il suo cloud per fornire una serie di strumenti per scrivere, analizzare e mantenere applicazioni cross-platform.

Nei giochi browser, Firebase è particolarmente utile per:

| Servizio | Utilizzo nei giochi |
|---|---|
| **Cloud Firestore** | Leaderboard in tempo reale, salvataggi cloud |
| **Authentication** | Login anonimo, con Google o email |
| **Storage** | Upload di screenshot o file di gioco |
| **Hosting** | Deploy del gioco su CDN globale con SSL |

```bash
# Installa Firebase nel progetto
npm install firebase
```

::InfoBox{type="tip"}
Firebase non è obbligatorio per iniziare a sviluppare con Phaser 4. Puoi tranquillamente costruire giochi completi senza backend. Aggiungi Firebase solo quando hai bisogno di funzionalità online.
::

Riferimento ufficiale: [firebase.google.com](https://firebase.google.com/)

## PhaserJS

**Phaser** è un framework open source veloce, gratuito e divertente per la creazione di browser game basati su Canvas e WebGL. I giochi possono essere compilati su iOS, Android e app native utilizzando strumenti di terze parti. Puoi utilizzare JavaScript o TypeScript per lo sviluppo.

> "PhaserJS è la libreria per lo sviluppo di videogame che utilizzeremo per realizzare il nostro gioco."

Phaser 4 rappresenta una **riscrittura significativa** rispetto a Phaser 3. Le principali novità:

- **Renderer WebGL unificato**: Phaser 4 usa WebGL come renderer principale, con performance nettamente superiori
- **TypeScript-first**: il codice sorgente di Phaser 4 è scritto interamente in TypeScript
- **API semplificata**: molti concetti ridisegnati e semplificati rispetto alla v3
- **Bundle più piccolo**: architettura modulare, importi solo ciò che usi

::InfoBox{type="warning"}
Phaser 4 **non è retrocompatibile** con Phaser 3. Se hai esperienza con Phaser 3, molte API sono cambiate. Questo corso insegna Phaser 4 from scratch — non assumiamo conoscenza pregressa di Phaser 3.
::

```bash
# Installa Phaser 4 nel tuo progetto
npm install phaser
```

Risorse ufficiali:

- Website: [phaser.io](https://phaser.io)
- Documentazione: [docs.phaser.io](https://docs.phaser.io/)
- Esempi: [labs.phaser.io](https://labs.phaser.io/)

## Visual Studio Code

**Visual Studio Code** è un editor di codice sorgente leggero ma potente che viene eseguito sul desktop ed è disponibile per Windows, macOS e Linux. È dotato di supporto integrato per JavaScript, TypeScript e Node.js e ha un ricco ecosistema di estensioni per altri linguaggi e runtime (come C++, C#, Java, Python, PHP, Go, .NET).

Dimenticavo: è sviluppato in TypeScript!

> "VS Code è il nostro editor di codice."

Estensioni consigliate per lo sviluppo Phaser 4 + TypeScript:

| Estensione | Funzione |
|---|---|
| **ESLint** | Analisi statica del codice TypeScript |
| **Prettier** | Formattazione automatica del codice |
| **Error Lens** | Visualizza errori TypeScript direttamente inline |
| **vscode-icons** | Icone intuitive per i tipi di file |
| **GitLens** | Strumenti Git avanzati integrati |

```bash
# Apri VS Code nella cartella del progetto
code .
```

::InfoBox{type="tip"}
Abilita "Format on Save" in VS Code (impostazione `editor.formatOnSave: true`) per avere il codice sempre formattato automaticamente quando salvi un file.
::

Riferimento ufficiale: [code.visualstudio.com](https://code.visualstudio.com/)

---


::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Ok, lo so — hai appena letto di Node.js, npm, Webpack, TypeScript, Firebase e Phaser 4 tutto d'un fiato. Sembra tanto, vero?

Respira. Non devi diventare esperto di nessuna di queste tecnologie adesso.

Pensa a questo capitolo come alla presentazione dei protagonisti del film: li hai visti in faccia, sai i loro nomi, e ora puoi andare avanti. Durante il corso li incontrerai uno alla volta, nel contesto giusto, e tutto comincerà ad avere senso.

L'unica cosa che ti chiedo per ora: **assicurati di avere Node.js installato**. Il resto viene da sé. Ci vediamo al prossimo capitolo! 🚀
::
