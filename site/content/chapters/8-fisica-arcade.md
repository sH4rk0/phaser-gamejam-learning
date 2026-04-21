---
title: 'La Fisica Arcade'
slug: '8-fisica-arcade'
chapter: 8
difficulty: intermediate
readingTime: '~35 min'
---

## Introduzione

Phaser usa un motore di fisica proprietario chiamato **Arcade Physics**, progettato per essere semplice e performante. Include gestione delle collisioni, gravità e dinamica dei gameObject.

Quando si attiva la fisica su un gameObject, viene resa disponibile la proprietà `body` che dà accesso a tutti i metodi specifici: velocità, accelerazione, gravità e molto altro.

### Rigid Body vs Soft Body

| Tipo | Comportamento |
|---|---|
| **Rigid Body** | Le distanze tra i punti dell'oggetto rimangono costanti — non si deforma durante le interazioni fisiche |
| **Soft Body** | Si deforma in risposta a forze esterne (tessuti, gomma, fluidi) |

Arcade Physics usa **rigid body**: ottimo per giochi arcade e platform, non adatto per simulazioni fisiche realistiche.

### Abilitare la fisica su un gameObject

**Metodo 1** — abilitare la fisica su uno sprite già esistente:

```typescript
let _sprite = this.add.sprite(100, 100, "miosprite");
this.physics.world.enableBody(_sprite);

let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
_body.setGravityY(100);
```

**Metodo 2** — creare lo sprite direttamente tramite la classe physics (consigliato):

```typescript
let _sprite: Phaser.Physics.Arcade.Image = this.physics.add.sprite(200, 200, "miosprite");
_sprite.setGravityY(200);
```

Con il secondo metodo il body è subito disponibile e i metodi della fisica possono essere concatenati direttamente sull'oggetto.

::info-box{type="tip"}
È possibile specificare il tipo di body: **dynamic** (ha velocità e accelerazione) o **static** (rimane fisso, ideale per piattaforme e muri). `Phaser.Physics.Arcade.DYNAMIC_BODY` / `Phaser.Physics.Arcade.STATIC_BODY`.
::

---

## Proprietà del Body

### blocked

Indica se il gameObject è in collisione con una **Tile** (elemento di mappa).

```typescript
if (_sprite1.body.blocked.down) {
  // il gameObject è appoggiato su una tile
}
```

Proprietà disponibili: `up`, `down`, `left`, `right`, `none`.

Metodi equivalenti: `.onCeiling()`, `.onFloor()`, `.onWall()` — restituiscono `true` se il gameObject collide rispettivamente con tetto, pavimento o muri.

### touching

Indica se il gameObject è in collisione con **altri gameObject**.

```typescript
if (_sprite1.body.touching.down) {
  // il gameObject tocca qualcosa sotto di sé
}
```

Proprietà disponibili: `up`, `down`, `left`, `right`, `none`.

### top, bottom, left, right

Restituiscono i valori di x o y dei bordi del body. Utili per calcoli di posizione precisi.

```typescript
const footY = _sprite.body.bottom;
const headY = _sprite.body.top;
```

---

## Metodi del Body — Shape

Il body per default ha le stesse dimensioni del frame dello sprite. È possibile ridefinirlo.

::info-box{type="warning"}
Il body nella fisica arcade **non ruota** con la rotazione del gameObject. Questo permette calcoli di collisione più veloci.
::

### .setSize(width, height, center?)

Ridefinisce le dimensioni dell'hitbox. Se chiamato senza parametri, ripristina le dimensioni originali. Il parametro `center` (default `true`) centra il body nello sprite.

```typescript
_sprite1.body.setSize(20, 20);          // centrato
_sprite2.body.setSize(20, 20, false);   // parte da (0, 0) dello sprite
```

### .setOffset(x, y)

Applica un offset alla posizione del body rispetto allo sprite.

```typescript
_sprite.body.setOffset(5, 10);
```

### .setCircle(radius, offsetX?, offsetY?)

Ridefinisce il body come cerchio. Utile per proiettili e oggetti rotondi.

```typescript
_sprite1.body.setCircle(16, 0, 8);
_sprite2.body.setCircle(12, 2, 14);
```

::info-box{type="tip"}
Esempi interattivi → [body controls](https://labs.phaser.io/view.html?src=src/physics/arcade/body%20controls.js) — documentazione → [Physics.Arcade.Body](https://docs.phaser.io/api-documentation/class/physics-arcade-body)
::

---

## Metodi del Body — Movimento

### Accelerazione

```typescript
_sprite.body.setAcceleration(100, 100);    // x e y
_sprite.body.setAccelerationX(100);        // solo x
_sprite.body.setAccelerationY(100);        // solo y
```

### Velocità

```typescript
_sprite.body.setVelocity(200, 0);          // x e y
_sprite.body.setVelocityX(200);            // solo x
_sprite.body.setVelocityY(-300);           // solo y (negativo = su)
```

### Velocità massima

Limita la velocità massima che il body può raggiungere (utile con accelerazione o gravità).

```typescript
_sprite.body.setMaxVelocity(400, 600);
_sprite.body.setMaxVelocityX(400);
_sprite.body.setMaxVelocityY(600);
```

---

## Metodi del Body — Gravità

### .setAllowGravity(value)

Abilita o disabilita la gravità globale su questo specifico body.

```typescript
_sprite.body.setAllowGravity(false); // il gameObject non è influenzato dalla gravità
```

### .setGravity(x, y)

Applica una gravità locale al gameObject, che si somma a quella globale della scena.

```typescript
_sprite.body.setGravity(0, 600); // cade velocemente verso il basso
_sprite.body.setGravityX(200);
_sprite.body.setGravityY(600);
```

---

## Metodi del Body — Comportamento

### .setImmovable(value)

Se `true`, il gameObject non risente delle forze fisiche derivanti dalle collisioni con altri gameObject. Rimane fermo indipendentemente dagli impatti. Ideale per piattaforme mobili.

```typescript
_platform.body.setImmovable(true);
```

### .setDirectControl(value)

Se `true`, il body calcola la sua velocità in base alla variazione di posizione a ogni frame. Da usare quando si sposta il gameObject tramite un **Tween** o un percorso (`Path`), in modo che le collisioni vengano calcolate correttamente.

```typescript
_sprite.body.setDirectControl(true);
```

### .setBounce(x, y)

Definisce il livello di rimbalzo. `0` = nessun rimbalzo, `1` = rimbalzo massimo (elastico perfetto).

```typescript
_sprite.body.setBounce(0.5, 0.5);
_sprite.body.setBounceX(0.8);
_sprite.body.setBounceY(0.3);
```

### .setFriction(x, y)

Definisce l'attrito quando collide con altri gameObject. `0` = nessun attrito, `1` = massimo attrito.

```typescript
_sprite.body.setFriction(0.5, 0.5);
```

### .setCollideWorldBounds(value, bounceX?, bounceY?, onWorldBounds?)

Definisce se il gameObject deve rimbalzare sui bordi del mondo di gioco (definiti da `setBounds()`).

```typescript
_sprite.body.setCollideWorldBounds(true);
```

Versione avanzata con evento `worldbounds`:

```typescript
let _sprite = this.physics.add.sprite(200, 200, "miosprite").setScale(2);
_sprite.body.setGravityY(200).setCollideWorldBounds(true, 1, 1, true);

this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
  let _gameObject = <Phaser.GameObjects.Sprite>body.gameObject;
  _gameObject.setAlpha(Phaser.Math.RND.realInRange(0, 1));
});
```

Quando un gameObject con `onWorldBounds: true` urta i bordi, viene emesso l'evento `worldbounds` con il riferimento al body. Dal body si accede al gameObject tramite cast e si gestisce il comportamento desiderato.

---

## Metodi della classe Physics

Accessibili tramite `this.physics`, permettono di spostare i gameObject, calcolare distanze e gestire le collisioni.

### .accelerateTo()

Imposta l'accelerazione del gameObject in modo che si muova verso le coordinate indicate alla velocità specificata (pixel/s²).

```typescript
let _sprite2 = this.physics.add.sprite(400, 200, "miosprite");
this.physics.accelerateTo(_sprite1, 400, 400, 200);
```

::info-box{type="warning"}
Il gameObject **non segue il bersaglio** se questo cambia posizione. Per inseguimento continuo, chiama il metodo nell'`update()`. Il gameObject **non si ferma** una volta arrivato a destinazione.
::

### .accelerateToObject()

Come `accelerateTo`, ma la destinazione è un altro gameObject (non coordinate fisse).

```typescript
this.physics.accelerateToObject(_sprite1, _sprite2, 400);
```

### .moveTo()

Sposta il gameObject verso le coordinate indicate a **velocità costante**. Se si specifica `maxTime`, la velocità viene regolata per arrivare a destinazione in quel tempo (±50ms di approssimazione).

```typescript
this.physics.moveTo(_sprite1, 400, 400, 400, 2000);
```

### .moveToObject()

Come `moveTo`, ma la destinazione è un gameObject.

```typescript
this.physics.moveToObject(_sprite1, _sprite2, 400, 1000);
```

### .closest() / .furthest()

Restituisce il body più vicino (o più lontano) rispetto a un gameObject sorgente, cercando all'interno di un array di gameObjects.

```typescript
let _closest = this.physics.closest(_sprite1, this._enemyGroup.getChildren());
let _furthest = this.physics.furthest(_sprite1, this._enemyGroup.getChildren());

// dal body si accede alla posizione
console.log(_closest.x, _closest.y);
```

Per avere il valore aggiornato, chiama `.closest()` / `.furthest()` nell'`update()`.

### .velocityFromAngle()

Dati l'angolo in **gradi** e la velocità, calcola il vettore velocità e lo applica al body.

```typescript
this.physics.velocityFromAngle(45, 300, _sprite.body.velocity);
```

### .velocityFromRotation()

Come `velocityFromAngle`, ma l'angolo è in **radianti**.

```typescript
this.physics.velocityFromRotation(Math.PI / 4, 300, _sprite.body.velocity);
```

---

## Collisioni tra gameObject

### collider vs overlap

| Metodo | Comportamento |
|---|---|
| `collider` | Collisione fisica: gli oggetti rimbalzano l'uno sull'altro modificando velocità e direzione |
| `overlap` | Rileva la sovrapposizione senza interazione fisica — esegue la callback ma non altera il movimento |

### .collider()

```typescript
let _sprite1 = this.physics.add.sprite(200, 200, "miosprite")
  .setCollideWorldBounds(true).setBounce(1, 1).setVelocity(200, 200);
let _sprite2 = this.physics.add.sprite(400, 150, "miosprite")
  .setCollideWorldBounds(true).setBounce(1, 1).setVelocity(200, 200);

this.physics.add.collider(_sprite1, _sprite2, this.onCollide, null, this);
```

La callback `onCollide` riceve i due gameObject che hanno colliso. Per accedere ai loro metodi è necessario fare il cast al tipo corretto:

```typescript
onCollide(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
  const _sprite1 = <Phaser.GameObjects.Sprite>object1;
  const _sprite2 = <Phaser.GameObjects.Sprite>object2;
  _sprite1.setTint(Math.random() * 0xffffff);
  _sprite2.setTint(Math.random() * 0xffffff);
}
```

Il nome del metodo callback è arbitrario. Usa nomi parlanti: `onPlayerVsEnemyCollide`, `onBulletHitsEnemy`.

Il secondo parametro di `collider` può essere anche un **Group**: Phaser gestisce automaticamente le collisioni tra il gameObject e tutti gli elementi del gruppo, senza cicli manuali.

```typescript
this.physics.add.collider(this._player, this._enemyGroup, this.onPlayerVsEnemy, null, this);
```

### .overlap()

Sintassi identica a `collider`, ma i gameObject che si sovrappongono **non modificano velocità e direzione**. Usato tipicamente per power-up, zone trigger, raccolta di oggetti.

```typescript
create() {
  this.physics.add.overlap(_sprite1, _sprite2, this.onOverlap, null, this);
}

onOverlap(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
  // gestisci la sovrapposizione
}
```

::info-box{type="tip"}
**Documentazione ufficiale:**
- [ArcadePhysics](https://docs.phaser.io/api-documentation/class/physics-arcade-arcadephysics)
- [Physics.Arcade.Body](https://docs.phaser.io/api-documentation/class/physics-arcade-body)

::

::PhaserLabsBox{url="https://labs.phaser.io/?path=physics%2Farcade"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

La fisica arcade è il momento in cui i tuoi gameObject smettono di essere immagini e iniziano a essere oggetti nel mondo. Quella sensazione quando aggiungi `setGravityY` e il personaggio comincia a cadere — è uno dei momenti più soddisfacenti dello sviluppo di giochi.

Il concetto chiave da portarsi a casa: **il body è separato dallo sprite**. Puoi ridimensionarlo, renderlo circolare, dargli un offset. Questa flessibilità è ciò che ti permette di avere una hitbox precisa anche su sprite con molto spazio vuoto intorno.

`collider` per le cose che devono rimbalzare fisicamente (muri, piattaforme, nemici che si scontrano). `overlap` per le cose che devono "rilevare" senza interazione (monete da raccogliere, zone trigger, checkpoint).

**Tip pro**: `setCollideWorldBounds(true)` è la prima cosa che aggiungi a qualsiasi sprite mobile. Senza, il personaggio cade nell'oblio e non capisci perché non si vede più. 🎮
::
