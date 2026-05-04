---
title: 'Particle System'
slug: '12-particles'
chapter: 12
difficulty: intermediate
readingTime: '~30 min'
---

## Introduzione

Il **particle system** di Phaser 4 è uno degli strumenti più potenti per aggiungere effetti visivi dinamici ai tuoi giochi: esplosioni, fuoco, fumo, scintille, magie, pioggia, stelle. L'oggetto principale è il `ParticleEmitter`, un GameObject che genera e gestisce autonomamente centinaia di particelle per frame.

In Phaser 4, il particle system è stato completamente riscritto rispetto a Phaser 3. L'emitter è ora un **GameObject a tutti gli effetti**, che supporta depth, alpha, tint, e può essere aggiunto direttamente alla scena come qualsiasi altro oggetto.

---

## Creare un ParticleEmitter

Il metodo più diretto è `this.add.particles()`:

```typescript
const emitter = this.add.particles(x, y, 'chiave-texture', config);
```

| Parametro | Tipo | Descrizione |
|---|---|---|
| `x` | `number` | Posizione orizzontale dell'emitter |
| `y` | `number` | Posizione verticale dell'emitter |
| `texture` | `string` | Chiave della texture caricata in preload |
| `config` | `ParticleEmitterConfig` | Oggetto con tutte le impostazioni delle particelle |

Esempio minimale — emitter che genera particelle in flusso continuo:

```typescript
const emitter = this.add.particles(400, 300, 'star', {
  speed: 100,
  lifespan: 1000,
  quantity: 5,
});
```

---

## Modalità di emissione

Un emitter può lavorare in due modalità distinte.

### Flow (flusso continuo)

La modalità di default. L'emitter genera `quantity` particelle ogni `frequency` millisecondi finché non viene fermato. Parte automaticamente alla creazione.

```typescript
const emitter = this.add.particles(400, 300, 'spark', {
  speed: { min: 50, max: 200 },
  lifespan: 800,
  quantity: 3,
  frequency: 100,   // emette ogni 100ms
});
```

### Explode (burst)

Emette un numero fisso di particelle in un singolo momento, poi si ferma. Utile per esplosioni, impatti, effetti on-demand.

```typescript
const emitter = this.add.particles(0, 0, 'spark', {
  speed: { min: 100, max: 300 },
  lifespan: 600,
  quantity: 30,
  emitting: false,   // non parte automaticamente
});

// esplosione in un punto specifico
emitter.explode(30, x, y);
```

`explode(count, x, y)` è il metodo da usare per burst: emette `count` particelle nella posizione `(x, y)` ignorando la posizione corrente dell'emitter.

---

## Proprietà principali della config

### Velocità e direzione

```typescript
{
  speed: 200,                     // velocità fissa in px/sec
  speed: { min: 50, max: 300 },   // velocità casuale nel range
  speedX: 100,                    // solo asse orizzontale
  speedY: -200,                   // solo asse verticale (negativo = su)
  angle: { min: 0, max: 360 },    // direzione di emissione in gradi
}
```

### Durata di vita

```typescript
{
  lifespan: 1000,                      // 1 secondo fisso
  lifespan: { min: 500, max: 1500 },   // durata casuale
}
```

### Scala

```typescript
{
  scale: 0.5,                            // scala fissa
  scale: { start: 1, end: 0 },          // si rimpicciolisce fino a scomparire
  scaleX: { start: 1, end: 2 },         // solo asse X
}
```

### Trasparenza

```typescript
{
  alpha: 0.8,                           // fisso
  alpha: { start: 1, end: 0 },          // dissolvenza graduale
}
```

### Gravità e accelerazione

```typescript
{
  gravityY: 300,    // gravità verso il basso (px/sec²)
  gravityX: -50,    // spinta orizzontale costante
}
```

### Tint e colore

```typescript
{
  tint: 0xff4400,                        // tinta arancione fissa
  tint: [ 0xff0000, 0xffff00, 0x00ff00 ],// colore scelto casualmente
  color: [ 0xffffff, 0xff4400, 0x000000 ], // interpolazione colore nel tempo
}
```

::info-box{type="warning"}
`color` e `tint` sono mutuamente esclusivi. Se usi `color`, il valore di `tint` viene ignorato. `color` interpola i valori nell'array durante il ciclo di vita della particella.
::

### Quantità e frequenza

```typescript
{
  quantity: 5,        // particelle per ciclo
  frequency: 50,      // millisecondi tra un ciclo e l'altro (più basso = più denso)
  maxParticles: 100,  // limite totale di istanze create
  maxAliveParticles: 50,  // limite di particelle vive contemporaneamente
}
```

### Rimbalzo e bounds

```typescript
{
  bounds: { x: 0, y: 0, w: 800, h: 600 },  // bounding box entro cui le particelle rimangono
  bounce: 0.5,  // coefficiente di rimbalzo sui bordi (0 = stop, 1 = elastico)
}
```

---

## Valori dinamici — il sistema EmitterOp

La maggior parte delle proprietà accetta valori in più formati. Questo è il sistema `EmitterOp`, il cuore della flessibilità del particle system.

| Formato | Esempio | Comportamento |
|---|---|---|
| Statico | `speed: 100` | Valore fisso per tutte le particelle |
| Array | `speed: [50, 100, 200]` | Scelta casuale dall'array |
| Min/Max | `speed: { min: 50, max: 200 }` | Valore casuale nel range |
| Start/End | `scale: { start: 1, end: 0 }` | Interpolazione lineare durante la vita |
| Callback | `x: (p, k, t, v) => v + 10` | Funzione eseguita ad ogni update |

Esempio avanzato — particella che cambia scala e alpha durante la vita:

```typescript
const emitter = this.add.particles(400, 300, 'circle', {
  speed: { min: 80, max: 200 },
  angle: { min: 0, max: 360 },
  lifespan: 1200,
  scale: { start: 0.8, end: 0 },
  alpha: { start: 1, end: 0 },
  gravityY: 150,
  quantity: 2,
  frequency: 30,
});
```

---

## Emettere al click / pointer

Pattern comune: emettere particelle dove l'utente clicca o trascina il mouse.

```typescript
create() {
  const emitter = this.add.particles(0, 0, 'spark', {
    speed: { min: 50, max: 150 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.5, end: 0 },
    alpha: { start: 1, end: 0 },
    lifespan: 600,
    quantity: 15,
    emitting: false,   // non parte automaticamente
  });

  this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    emitter.explode(15, pointer.x, pointer.y);
  });
}
```

Per un effetto continuo mentre il mouse è premuto:

```typescript
this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
  if (pointer.isDown) {
    emitter.explode(5, pointer.x, pointer.y);
  }
});
```

---

## Follow — agganciare l'emitter a un GameObject

L'emitter può seguire automaticamente la posizione di un altro GameObject tramite `setFollow()`:

```typescript
const player = this.physics.add.sprite(400, 300, 'player');

const trail = this.add.particles(0, 0, 'smoke', {
  speed: { min: 10, max: 40 },
  scale: { start: 0.3, end: 0.8 },
  alpha: { start: 0.6, end: 0 },
  lifespan: 800,
  quantity: 1,
  frequency: 30,
});

trail.setFollow(player);
```

Con offset opzionale (es. per lo scarico di un razzo):

```typescript
trail.setFollow(player, 0, 20); // offset 20px verso il basso
```

---

## EmitZone — zone di emissione

Per default le particelle partono dal punto `(x, y)` dell'emitter. Con `emitZone` puoi definire un'area o una forma da cui partono.

### Zone rettangolare

```typescript
const emitter = this.add.particles(0, 0, 'rain', {
  lifespan: 1500,
  speedY: { min: 200, max: 400 },
  scale: { min: 0.1, max: 0.3 },
  quantity: 5,
  frequency: 50,
  emitZone: {
    type: 'random',
    source: new Phaser.Geom.Rectangle(0, 0, 800, 10), // striscia in cima
  },
});
```

### Zone circolare

```typescript
emitZone: {
  type: 'random',
  source: new Phaser.Geom.Circle(0, 0, 100), // cerchio di raggio 100
}
```

### Zone sul perimetro

```typescript
emitZone: {
  type: 'edge',   // le particelle partono dal bordo, non dall'interno
  source: new Phaser.Geom.Ellipse(0, 0, 200, 100),
  quantity: 30,
}
```

| `type` | Comportamento |
|---|---|
| `'random'` | Posizione casuale dentro la forma |
| `'edge'` | Posizione sul perimetro della forma |

---

## DeathZone — zone di morte

Le particelle vengono distrutte quando entrano (o escono) da una zona definita.

```typescript
const emitter = this.add.particles(400, 500, 'bubble', {
  speed: { min: 50, max: 100 },
  angle: { min: 250, max: 290 },
  lifespan: 3000,
  quantity: 1,
  frequency: 200,
  deathZone: {
    type: 'onEnter',   // muore quando entra nella zona
    source: new Phaser.Geom.Rectangle(0, 0, 800, 50), // striscia in cima
  },
});
```

| `type` | Comportamento |
|---|---|
| `'onEnter'` | La particella muore appena entra nella zona |
| `'onLeave'` | La particella muore appena esce dalla zona |

---

## Controllare l'emitter

```typescript
emitter.start();    // avvia il flusso
emitter.stop();     // ferma l'emissione (le particelle esistenti continuano la loro vita)
emitter.pause();    // mette in pausa (il mondo si congela)
emitter.resume();   // riprende dalla pausa

// flusso con durata limitata (3 secondi poi stop automatico)
emitter.flow(100, 3000);

// stop dopo N particelle emesse
const emitter = this.add.particles(400, 300, 'star', {
  speed: 100,
  lifespan: 800,
  stopAfter: 50,   // si ferma dopo aver emesso 50 particelle
});
```

---

## Callback su emit e death

```typescript
const emitter = this.add.particles(400, 300, 'spark', {
  speed: 150,
  lifespan: 600,
  quantity: 2,

  emitCallback: (particle: Phaser.GameObjects.Particles.Particle) => {
    // eseguita ogni volta che una particella nasce
    particle.setTint(Phaser.Math.Between(0xff0000, 0xffff00));
  },

  deathCallback: (particle: Phaser.GameObjects.Particles.Particle) => {
    // eseguita ogni volta che una particella muore
    console.log('particle dead at', particle.x, particle.y);
  },
});
```

---

## Esempi pratici

### Esplosione al collider

Pattern tipico: l'emitter è pronto ma silenzioso. Al momento dell'impatto scatta il burst.

```typescript
private _explosion: Phaser.GameObjects.Particles.ParticleEmitter;

create() {
  this._explosion = this.add.particles(0, 0, 'spark', {
    speed: { min: 100, max: 400 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.6, end: 0 },
    alpha: { start: 1, end: 0 },
    gravityY: 200,
    lifespan: { min: 300, max: 700 },
    emitting: false,
  });

  this.physics.add.overlap(this._bullet, this._enemy, (bullet, enemy) => {
    this._explosion.explode(20, enemy.x, enemy.y);
    enemy.destroy();
    bullet.destroy();
  });
}
```

### Effetto fuoco

```typescript
const fire = this.add.particles(400, 500, 'particle', {
  speed: { min: 20, max: 60 },
  angle: { min: 260, max: 280 },   // verso l'alto con leggera variazione
  scale: { start: 0.4, end: 0 },
  alpha: { start: 0.8, end: 0 },
  color: [ 0xffff00, 0xff6600, 0xff0000, 0x330000 ],
  lifespan: { min: 400, max: 900 },
  quantity: 3,
  frequency: 20,
});
```

### Pioggia

```typescript
const rain = this.add.particles(0, -10, 'raindrop', {
  speedY: { min: 400, max: 700 },
  speedX: { min: -20, max: 20 },
  scale: { min: 0.1, max: 0.3 },
  alpha: 0.6,
  lifespan: 1500,
  quantity: 8,
  frequency: 30,
  emitZone: {
    type: 'random',
    source: new Phaser.Geom.Rectangle(0, 0, 800, 1),
  },
});
```

---

## Depth e ordine di rendering

`ParticleEmitter` è un GameObject. Puoi controllarne la profondità rispetto agli altri oggetti:

```typescript
const emitter = this.add.particles(400, 300, 'spark', { ... });
emitter.setDepth(10);   // sopra agli sprite con depth < 10
```

---

## Schema completo — emitter con tutto

```typescript
create() {
  // texture caricata in preload come immagine o frame di atlante
  const emitter = this.add.particles(400, 300, 'star', {
    // posizione e moto
    speed: { min: 50, max: 250 },
    angle: { min: 0, max: 360 },
    gravityY: 200,

    // aspetto
    scale: { start: 1, end: 0 },
    alpha: { start: 1, end: 0 },
    tint: [ 0xffffff, 0x00d4ff, 0x6c3fe8 ],

    // ciclo di vita
    lifespan: { min: 500, max: 1200 },

    // flusso
    quantity: 4,
    frequency: 50,

    // limiti
    maxAliveParticles: 200,

    // depth
    depth: 5,
  });

  // ferma dopo 3 secondi
  this.time.delayedCall(3000, () => emitter.stop());
}
```

::info-box{type="tip"}
**Documentazione ufficiale:** [ParticleEmitter API](https://docs.phaser.io/api-documentation/class/gameobjects-particles-particleemitter)

**Esempi Phaser Labs:** [labs.phaser.io — particle emitter](https://labs.phaser.io/?path=game+objects%2Fparticle+emitter)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fparticle+emitter"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Il particle system è dove il gioco smette di sembrare un prototipo e inizia ad avere personalità. Un'esplosione da 20 particelle dura 600ms e pesa quasi niente sul framerate — ma cambia completamente la percezione del feedback.

Il pattern da memorizzare è: **crei l'emitter con `emitting: false` all'inizio del create(), poi chiami `explode()` nel momento esatto**. Non creare emitter dentro i collider o negli event handler — li creeresti ogni frame.

`EmitterOp` è il vero potere del sistema. Quando scrivi `scale: { start: 1, end: 0 }`, ogni particella percorre autonomamente quella curva durante la sua vita. Combina scala, alpha e colore in interpolazione e ottieni effetti professionali con cinque righe.

Per il fuoco: angolo stretto verso l'alto (260-280°), colore interpolato giallo→arancio→rosso→nero, scale che cresce e poi scompare. Per le stelle: angolo 0-360°, gravità positiva, lifespan corto. Il particle system non è magia — è configurazione. 🔥
::
