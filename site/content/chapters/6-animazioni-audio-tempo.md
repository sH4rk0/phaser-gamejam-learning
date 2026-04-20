---
title: 'Animazioni, Tweens e Audio'
slug: '6-animazioni-audio-tempo'
chapter: 6
difficulty: intermediate
readingTime: '~35 min'
---

## Introduzione

In questo capitolo esploreremo tre classi fondamentali per dare vita ai nostri giochi: **Tween**, **Sound** e **Time**.

I **Tween** ci permettono di animare le proprietà dei gameObject nel tempo, i **Sound** gestiscono la riproduzione di musiche ed effetti sonori, e la classe **Time** offre strumenti per programmare azioni nel futuro attraverso timer ed eventi.

---

## La classe Tween

Il termine *tween* è legato al concetto di movimento e transizione. Ci permette di animare nel tempo qualsiasi proprietà numerica di un gameObject, come la posizione `x`/`y`, la trasparenza `alpha`, la scala `scale`, e molto altro.

### Funzioni di Easing

Le **funzioni di Easing** specificano la quantità di variazione di un parametro nel tempo. Gli oggetti nella vita reale non partono istantaneamente a una certa velocità, né si fermano bruscamente: le funzioni di easing replicano questo comportamento naturale.

![Funzioni di easing](/images/chapters/cap6/easing-functions.gif)

Phaser mette a disposizione decine di funzioni di easing predefinite: `Linear`, `Sine.easeIn`, `Sine.easeOut`, `Sine.easeInOut`, `Bounce.easeOut`, `Elastic.easeOut`, `Back.easeOut`, e molte altre. Puoi esplorarne la lista completa su [Phaser Labs](https://labs.phaser.io/view.html?src=src/tweens/easing/all%20easings.js).

### Creare un Tween

Si usa il metodo `this.tweens.add()` per aggiungere un nuovo tween alla scena. Il metodo accetta un oggetto di configurazione `TweenBuilderConfig`:

```typescript
this.tweens.add({
  targets: this._mySprite,
  duration: 1000,
  delay: 1000,
  repeat: 1,
  ease: 'Linear',
  y: 200,
  alpha: 0.5,
});
```

| Proprietà | Descrizione |
|---|---|
| `targets` | Il gameObject (o array di gameObjects) su cui applicare il tween |
| `duration` | Durata dell'animazione in millisecondi |
| `delay` | Ritardo prima dell'inizio in millisecondi |
| `repeat` | Numero di ripetizioni (`-1` = infinito) |
| `ease` | Funzione di easing da applicare |
| `yoyo` | Se `true`, l'animazione torna al valore iniziale |

Le proprietà aggiuntive (`y`, `alpha`, `x`, `scaleX`, ecc.) indicano il **valore finale** verso cui il tween animerà il gameObject.

### Gestione degli eventi

Il Tween espone eventi che permettono di intercettare i momenti chiave dell'animazione:

```typescript
this.tweens.add({
  targets: this._mySprite,
  x: 640,
  y: 100,
  alpha: 0.5,
  ease: 'Sine.easeInOut',
  duration: 2000,
  delay: 1000,
  yoyo: true,
  repeat: 2,
  onUpdate: (tween: Phaser.Tweens.Tween) => {
    console.log(tween.progress);
  },
  onYoyo: () => {
    this._helloWorld.setText('animation yoyo');
  },
  onComplete: () => {
    this._helloWorld.setText('animation complete');
  },
});
```

| Evento | Quando viene eseguito |
|---|---|
| `onUpdate` | Ad ogni frame durante l'animazione. Espone il `Tween` e il suo `progress` (0→1) |
| `onYoyo` | Quando il tween inverte la direzione (solo se `yoyo: true`) |
| `onComplete` | Quando l'animazione è completata |
| `onRepeat` | Ogni volta che l'animazione viene ripetuta |
| `onStart` | All'avvio dell'animazione |

Un caso d'uso comune di `onComplete` è distruggere un gameObject dopo che il suo `alpha` è stato portato a 0:

```typescript
this.tweens.add({
  targets: this._enemy,
  alpha: 0,
  duration: 500,
  onComplete: () => {
    this._enemy.destroy();
  },
});
```

### Controllare un Tween

Puoi assegnare il tween a una variabile per controllarlo in seguito:

```typescript
private _myTween: Phaser.Tweens.Tween;

create() {
  this._myTween = this.tweens.add({
    targets: this._mySprite,
    x: 400,
    duration: 2000,
    paused: true,  // non parte subito
  });
}

onButtonClick() {
  this._myTween.play();
  // oppure: this._myTween.pause(), this._myTween.stop()
}
```

::info-box{type="tip"}
Consulta la documentazione ufficiale per tutti i parametri disponibili: [Tweens.TweenBuilderConfig](https://docs.phaser.io/api-documentation/namespace/tweens)
::

---

## La classe Sound

La gestione dell'audio in Phaser 4 è semplice e segue lo stesso pattern delle altre risorse: si carica l'asset nel preloader tramite `GameData`, poi si istanzia e riproduce nella scena.

Phaser supporta due formati audio principali: **`.ogg`** (compresso, ottimo per browser moderni) e **`.m4a`** (compatibilità iOS/Safari). È buona pratica fornire entrambi i formati per massimizzare la compatibilità.

::info-box{type="tip"}
**Risorse utili per l'audio:**
- [freesound.org](https://freesound.org/) e [sounds-resource.com](https://www.sounds-resource.com/) — librerie di suoni gratuiti
- [convertio.co](https://convertio.co/it/wav-m4a/) — converter online tra formati audio
- [Audacity](https://www.audacityteam.org/) — editor audio open source e cross-platform
::

### Aggiungere musica di sottofondo

In `GameData.ts`, nell'array `sounds`, aggiungi l'asset della musica con un `name` univoco e i `paths` ai file audio:

```typescript
sounds: [
  {
    name: 'music0',
    paths: ['assets/sounds/music0.ogg', 'assets/sounds/music0.m4a'],
  },
],
```

Nella scena, dichiara una variabile privata di tipo `Phaser.Sound.BaseSound`:

```typescript
private _music: Phaser.Sound.BaseSound;
```

Nel metodo `create()`, crea l'istanza con `this.sound.add()` e avviala con `.play()`:

```typescript
create() {
  this._music = this.sound.add('music0', { loop: true, volume: 0.1 });
  this._music.play();
}
```

Il secondo parametro di `sound.add()` accetta un oggetto di configurazione `SoundConfig`:

| Proprietà | Tipo | Descrizione |
|---|---|---|
| `loop` | `boolean` | Se `true`, la musica si ripete automaticamente |
| `volume` | `number` | Volume da `0` (silenzio) a `1` (massimo) |
| `rate` | `number` | Velocità di riproduzione (1 = normale) |
| `detune` | `number` | Intonazione in centesimi |
| `seek` | `number` | Posizione iniziale in secondi |

### Fermare la musica al cambio scena

Quando si cambia scena, è importante fermare e distruggere la musica attiva per evitare sovrapposizioni:

```typescript
if (this._music.isPlaying) {
  this._music.stop();
  this._music.destroy();
}
this.scene.start('altraScena');
```

### AudioSprite (effetti sonori)

Un **AudioSprite** è un singolo file audio che contiene più effetti sonori concatenati, descritti da un file JSON con i tempi di inizio e fine di ciascun effetto. È la tecnica consigliata per gestire molti SFX in modo efficiente.

In `GameData.ts`, usa l'array `audio` per caricare lo sprite audio:

```typescript
audio: [
  {
    name: 'sfx',
    jsonpath: 'assets/sounds/sfx.json',
    paths: ['assets/sounds/sfx.ogg', 'assets/sounds/sfx.m4a'],
  },
],
```

Il file JSON ha questa struttura:

```json
{
  "resources": ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
  "spritemap": {
    "splash": {
      "start": 0,
      "end": 0.526,
      "loop": false
    },
    "nodamage": {
      "start": 0.546,
      "end": 0.731,
      "loop": false
    }
  }
}
```

Ogni effetto sonoro è definito dal suo `name`, i tempi di inizio (`start`) e fine (`end`) in secondi, e se deve essere ripetuto in loop.

Per riprodurre un effetto sonoro usa `playAudioSprite()`:

```typescript
this.sound.playAudioSprite('sfx', 'splash', { loop: false, volume: 0.1 });
```

- Primo parametro: il `name` dell'AudioSprite definito in `GameData`
- Secondo parametro: la chiave del singolo effetto nel JSON
- Terzo parametro: configurazione opzionale (`SoundConfig`)

::info-box{type="tip"}
Consulta la documentazione ufficiale: [Namespace Sound](https://docs.phaser.io/api-documentation/namespace/sound)
::

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
