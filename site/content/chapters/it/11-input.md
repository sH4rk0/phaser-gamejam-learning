---
title: 'Input Handling'
slug: '11-input'
chapter: 11
difficulty: intermediate
readingTime: '~25 min'
---

## Keyboard

Phaser ci permette in maniera molto agevole di gestire l'input da tastiera attraverso la classe `Phaser.Input.Keyboard`.

---

## Cursors

Come visto in alcuni esempi precedenti, è possibile gestire il movimento di un personaggio attraverso una classe specifica per i tasti cursore.

Prima definiamo una variabile che ospiterà l'istanza dei tasti cursore:

```typescript
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
```

Nel metodo `create()` utilizziamo `createCursorKeys()` per creare l'istanza:

```typescript
this._cursors = this.input.keyboard!.createCursorKeys();
```

`_cursors` fornisce riferimenti alle 4 direzioni (`up`, `down`, `left`, `right`) e ai tasti `space` e `shift`.

Nel metodo `update()` controlliamo la proprietà `isDown` per verificare se un tasto è premuto:

```typescript
if (this._cursors.left.isDown) {
  // sposta il personaggio a sinistra
}

if (this._cursors.right.isDown) {
  // sposta il personaggio a destra
}

if (this._cursors.up.isDown) {
  // salta
}
```

::info-box{type="tip"}
`isDown` è `true` per tutta la durata della pressione del tasto — utile per il movimento continuo del personaggio.
::

---

## Custom Keys

È possibile gestire l'input con tasti personalizzati diversi dalle frecce direzionali. Definiamo le variabili per ogni tasto:

```typescript
private _w: Phaser.Input.Keyboard.Key;
private _a: Phaser.Input.Keyboard.Key;
private _s: Phaser.Input.Keyboard.Key;
private _d: Phaser.Input.Keyboard.Key;
private _space: Phaser.Input.Keyboard.Key;
```

Nel metodo `create()` utilizziamo `addKey()` per creare un riferimento a ciascun tasto:

```typescript
this._w = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
this._a = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
this._s = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
this._d = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
this._space = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
```

Nel metodo `update()` controlliamo lo stato del tasto esattamente come per i cursors:

```typescript
if (this._d.isDown) {
  // sposta il personaggio a destra
}
```

### isDown vs JustDown

| Metodo | Comportamento | Uso tipico |
|--------|--------------|------------|
| `isDown` | `true` per tutta la durata della pressione | Movimento del personaggio |
| `JustDown()` | `true` solo al primo frame della pressione | Sparo, salto, interazione |

Quando vogliamo rilevare una **singola pressione** (ad esempio per sparare un proiettile), `isDown` non è efficace perché esegue il codice continuamente. In questi casi usiamo il metodo statico `Phaser.Input.Keyboard.JustDown()`:

```typescript
// spara un solo proiettile per pressione del tasto
if (Phaser.Input.Keyboard.JustDown(this._space)) {
  this.spara();
}
```

`JustDown()` rileva la "singola" pressione: il codice viene eseguito **una sola volta** per ogni pressione del tasto.

::info-box{type="tip"}
Esiste anche `Phaser.Input.Keyboard.JustUp()` che rileva il rilascio del tasto — utile per caricare colpi o controlli a pressione prolungata.
::

---

## Un Virtual Joystick

Quando sviluppiamo giochi per dispositivi touch (smartphone e tablet) serve un'alternativa all'input da tastiera. Una soluzione è utilizzare la libreria esterna **nipplejs** che crea un vero e proprio joystick virtuale.

### Installazione

Aggiungere la dipendenza nel file `package.json`:

```json
"dependencies": {
  "nipplejs": "^0.10.1",
  "phaser": "^4.0.0"
}
```

Eseguire nel terminale:

```bash
npm update
```

### Importazione

Importare la libreria nella classe del player:

```typescript
import nipplejs from 'nipplejs';
```

### Implementazione

Nel metodo di inizializzazione del player inseriamo il codice per gestire il movimento tramite virtual joystick:

```typescript
// creiamo un'istanza del joystick
const joystickManager: nipplejs.JoystickManager = nipplejs.create({
  color: 'red'
});

// evento di inizio movimento
joystickManager.on('start', () => {
  // il joystick è stato toccato
});

// evento di movimento
joystickManager.on('move', (data: nipplejs.EventData, output: nipplejs.JoystickOutputData) => {
  // force: intensità dello spostamento (0-1)
  const force: number = Math.min(output.force, 1);

  // angle: angolo in radianti
  const angle: number = output.angle.radian;

  // calcola la velocità in base alla forza e alla velocità massima del player
  const speed: number = this._acceleration * force;

  // imposta la velocità usando la trigonometria
  this.setVelocity(
    speed * Math.cos(angle),
    speed * Math.sin(angle) * -1
  );
});

// evento di fine movimento
joystickManager.on('end', () => {
  // il joystick è stato rilasciato — ferma il personaggio
  this.setVelocity(0, 0);
});
```

::info-box{type="tip"}
Il virtual joystick funziona tramite eventi (`start`, `move`, `end`) — non è necessario controllarne lo stato nell'`update()` come si fa con i tasti della tastiera.
::

::info-box{type="new"}
I parametri `output.force` e `output.angle.radian` permettono di implementare un movimento analogico: più si sposta il joystick dal centro, maggiore sarà la velocità del personaggio.
::

---

## Confronto tra i metodi di input

| Metodo | Dispositivo | Quando usarlo |
|--------|-------------|---------------|
| `CursorKeys` | Tastiera | Prototipazione rapida, movimento 4 direzioni |
| `Custom Keys (WASD)` | Tastiera | Layout alternativo, più tasti contemporanei |
| `Virtual Joystick` | Touch | Mobile e tablet |

---

## Risorse

- [Documentazione Keyboard — Phaser](https://docs.phaser.io/api-documentation/namespace/input-keyboard)
- [Esempi input/keyboard — Phaser Labs](https://labs.phaser.io/index.html?dir=input/keyboard/)
- [Esempio CursorKeys](https://labs.phaser.io/edit.html?src=src/input/keyboard/cursor%20keys.js)
- [Esempio JustDown](https://labs.phaser.io/edit.html?src=src/input/keyboard/just%20down.js)
- [Libreria nipplejs](https://yoannmoi.net/nipplejs/)
