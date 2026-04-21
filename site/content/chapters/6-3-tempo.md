---
title: 'Tempo e Timer'
slug: '6-3-tempo'
chapter: 6.3
difficulty: intermediate
readingTime: '~12 min'
---

## La classe Time

La classe `Time` ci permette di accedere alle proprietà legate all'orologio interno della scena. Quando viene creata un'istanza di `Phaser.Game`, il timer interno viene automaticamente inizializzato e avviato.

### this.time.now

La proprietà `now` restituisce il tempo trascorso in millisecondi dall'inizializzazione del gioco:

```typescript
update() {
  console.log(this.time.now); // es: 3542.5
}
```

È utile per calcolare delta temporali e sincronizzare eventi al tempo di gioco.

### TimerEvent

`this.time.addEvent()` permette di eseguire del codice dopo un certo ritardo, o ripetutamente a intervalli regolari. Funziona come un `setTimeout` / `setInterval`, ma è sincronizzato con il ciclo di gioco di Phaser e si ferma automaticamente con la scena.

#### Esecuzione singola

```typescript
create() {
  this.time.addEvent({
    delay: 1000,
    callback: () => { console.log('eseguito dopo 1 secondo'); },
    callbackScope: this,
  });
}
```

#### Esecuzione ripetuta

```typescript
create() {
  this.time.addEvent({
    delay: 1000,
    callback: () => { this.myFunction(); },
    callbackScope: this,
    repeat: 2,   // oppure: loop: true per infinito
  });
}

myFunction() {
  console.log('eseguito ogni secondo');
}
```

::info-box{type="warning"}
Non usare `repeat` e `loop: true` contemporaneamente. Usa `repeat` per un numero definito di ripetizioni, o `loop: true` per una ripetizione infinita.
::

#### Parametri del TimerEvent

| Proprietà | Tipo | Descrizione |
|---|---|---|
| `delay` | `number` | Tempo in ms prima dell'esecuzione |
| `callback` | `Function` | Funzione da eseguire |
| `callbackScope` | `object` | Contesto `this` della callback (di solito `this`) |
| `repeat` | `number` | Numero di ripetizioni aggiuntive dopo la prima |
| `loop` | `boolean` | Se `true`, si ripete indefinitamente |
| `startAt` | `number` | Fa partire il timer come se `startAt` ms fossero già trascorsi |
| `args` | `any[]` | Array di argomenti passati alla callback |

#### Passare argomenti alla callback

```typescript
private _myTimer: Phaser.Time.TimerEvent;

create() {
  this._myTimer = this.time.addEvent({
    delay: 1000,
    callback: (param1: number, param2: string) => {
      this.myFunction(param1, param2);
    },
    args: [42, 'ciao'],
    callbackScope: this,
  });
}

myFunction(param1: number, param2: string) {
  console.log(param1, param2); // 42 "ciao"
}
```

L'attributo `args` accetta un array di parametri che vengono passati alla callback nell'ordine indicato.

#### Distruggere il timer

Quando il timer non è più necessario, è buona pratica distruggerlo per liberare risorse:

```typescript
if (this._myTimer != null) {
  this._myTimer.destroy();
}
```

::info-box{type="tip"}
Consulta la documentazione ufficiale: [Namespace Time](https://docs.phaser.io/api-documentation/namespace/time)
::

### Timeline

La `Timeline` è un **sequenziatore di eventi**: permette di programmare l'esecuzione di tween, callback e azioni in momenti specifici del futuro, usando un unico oggetto coordinato.

A differenza di `addEvent`, la Timeline gestisce sequenze complesse di azioni con timing preciso. Se la scena viene messa in pausa, la Timeline si ferma automaticamente; se la scena viene distrutta, la Timeline viene distrutta con lei.

#### Creare una Timeline

```typescript
private _myTimeline: Phaser.Time.Timeline;

create() {
  this._myTimeline = this.add.timeline([
    {
      // evento 1: dopo 1 secondo, anima uno sprite verso il basso
      at: 1000,
      tween: {
        targets: this.add.sprite(400, 700, 'bomb'),
        y: 400,
        duration: 3000,
        ease: 'Power2',
      },
    },
    {
      // evento 2: dopo 2 secondi, aggiunge un nuovo sprite alla scena
      at: 2000,
      run: () => {
        this.add.sprite(400, 200, 'bomb').setScale(2);
      },
    },
  ]);

  // La Timeline parte al click del mouse
  this.input.once('pointerdown', () => {
    this._myTimeline.play();
  });
}
```

#### Proprietà di un evento Timeline

| Proprietà | Descrizione |
|---|---|
| `at` | Momento in ms dall'inizio della Timeline in cui l'evento si attiva |
| `tween` | Configurazione di un Tween da eseguire (stessa sintassi di `tweens.add`) |
| `run` | Callback da eseguire in questo momento |
| `set` | Oggetto con proprietà da applicare ai target in questo momento |
| `event` | Nome di un evento da emettere sulla Timeline |

::info-box{type="tip"}
La proprietà `at` è assoluta dall'inizio del `play()`, non relativa all'evento precedente. Per sequenziare eventi in successione, incrementa i valori: 1000, 2000, 3500, ecc.
::

#### Controllare la Timeline

```typescript
this._myTimeline.play();    // avvia
this._myTimeline.pause();   // mette in pausa
this._myTimeline.resume();  // riprende
this._myTimeline.stop();    // ferma e resetta
this._myTimeline.destroy(); // distrugge e libera risorse
```

::info-box{type="tip"}
Consulta la documentazione ufficiale: [Time.Timeline](https://docs.phaser.io/api-documentation/class/time-timeline)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=time"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Regola numero uno: **mai usare `setTimeout` in Phaser**. So che la tentazione c'è — lo usi da sempre, lo conosci, funziona. Ma `setTimeout` non sa che il gioco esiste: continua a girare anche quando la scena è in pausa, quando la finestra è in background, quando il tab è inattivo.

`this.time.addEvent()` si sincronizza con il game loop. Si ferma quando la scena si ferma, si distrugge quando la scena si distrugge. È quello che vuoi sempre.

La **Timeline** è il segreto per le cutscene e i tutorial: "dopo 1 secondo appare il nemico, dopo 2 secondi parte l'animazione, dopo 3 secondi arriva il testo". Tutto sequenziato in un unico oggetto, senza callback annidate una dentro l'altra. Appena il tuo gioco ha una storia da raccontare, la Timeline diventa indispensabile. ⏱️
::
