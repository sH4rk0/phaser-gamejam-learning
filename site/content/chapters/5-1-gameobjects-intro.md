---
title: 'Introduzione ai GameObjects'
slug: '5-1-gameobjects-intro'
chapter: 5.1
difficulty: intermediate
readingTime: '~20 min'
---

## Cosa sono i GameObjects

In Phaser, i **gameObjects** sono tutti quegli elementi che utilizziamo per visualizzare oggetti all'interno della nostra scena. Tutti derivano dalla classe base `Phaser.GameObjects` e la estendono con implementazioni proprie.

Nei capitoli seguenti esamineremo i seguenti gameObjects:

| GameObject | Scopo |
|---|---|
| `text` | Visualizzare testo a schermo |
| `image` | Visualizzare immagini statiche |
| `sprite` | Visualizzare immagini animate |
| `tileSprite` | Creare sfondi ripetuti e parallasse |
| `group` | Raggruppare e gestire gameObjects simili |
| `container` | Contenere gameObjects in un contesto visuale comune |

Tutti fanno parte della **GameObjectsFactory**. Alcuni (come `container` e `group`) non hanno un output visivo diretto ma servono a organizzare gli altri.

### Creare un'istanza

Per aggiungere un gameObject alla scena si usa `this.add` seguito dal tipo:

```typescript
create() {
  this.add.text(0, 0, "Hello World", { fontSize: "20px" });
}
```

`this` rappresenta la scena corrente, `add` è il metodo che accede alla GameObjectFactory. È possibile assegnare l'istanza a una variabile privata per riutilizzarla:

```typescript
create() {
  this._helloWorld = this.add.text(0, 0, "Hello World", { fontSize: "20px" });
  this._helloWorld.setPosition(10, 10);
}
```

## Proprietà comuni

Questi metodi sono disponibili su tutti i gameObjects.

### .setPosition(x, y)

Setta la posizione x e y del gameObject nel mondo di gioco.

```typescript
this._myObject.setPosition(400, 300);
```

### .setDepth(value)

Controlla lo **z-index** del gameObject. Per default, l'ordine di visualizzazione dipende dalla sequenza di creazione nel codice: il secondo oggetto creato si sovrappone al primo.

```typescript
create() {
  this._image1 = this.add.image(850, 200, "immagine1"); // sotto
  this._image2 = this.add.image(855, 200, "immagine2"); // sopra
}
```

Con `setDepth` possiamo invertire l'ordine senza cambiare la sequenza di inizializzazione:

```typescript
create() {
  this._image1 = this.add.image(850, 200, "immagine1").setDepth(1); // sopra
  this._image2 = this.add.image(855, 200, "immagine2");             // sotto
}
```

::InfoBox{type="tip"}
Il valore depth di default è `0`. Un valore più alto porta l'oggetto in primo piano.
::

### .setAbove(gameObject) / .setBelow(gameObject)

Alternativa a `setDepth`: posiziona il gameObject immediatamente sopra o sotto un altro gameObject specifico.

```typescript
this._image1.setAbove(this._image2); // image1 davanti a image2
```

### .setToTop() / .setToBack()

Novità di Phaser 4: porta il gameObject in cima o in fondo alla display list, senza dover conoscere i depth degli altri oggetti.

```typescript
this._overlay.setToTop();  // in primo piano assoluto
this._background.setToBack(); // in fondo assoluto
```

### .setAlpha(alpha)

Controlla l'**opacità**. Valori tra `0` (trasparente) e `1` (opaco).

```typescript
this._myObject.setAlpha(0.5); // semi-trasparente
```

### .setAngle(degrees) / .setRotation(radians)

Ruota il gameObject. `setAngle` accetta gradi, `setRotation` radianti.

```typescript
this._myObject.setAngle(45);           // 45 gradi
this._myObject.setRotation(Math.PI);   // 180 gradi in radianti
```

### .setTint / .setTintFill / .clearTint

`setTint` applica una **tinta additiva**: moltiplica il colore di ogni pixel della texture per il valore passato. Accetta un singolo colore esadecimale.

```typescript
this._sprite.setTint(0xff6600);
```

![Esempio setTint: tinta additiva applicata a tre robot](/images/chapters/cap5/setTint.png)

`setTintFill` **sostituisce** i colori dei pixel invece di moltiplicarli — utile per effetti come il "flash bianco" quando un personaggio viene colpito.

```typescript
this._sprite.setTintFill(0xffffff); // personaggio tutto bianco
```

![Esempio setTintFill: sostituzione completa dei colori](/images/chapters/cap5/setTintFill.png)

`clearTint` rimuove qualsiasi tinta applicata:

```typescript
this._sprite.clearTint();
```

Per colorare i **singoli angoli** del gameObject usa le proprietà dirette:

```typescript
this._sprite.tintTopLeft    = 0xff0000;
this._sprite.tintTopRight   = 0x00ff00;
this._sprite.tintBottomLeft = 0x0000ff;
this._sprite.tintBottomRight = 0xffffff;
```

La proprietà `tintFill` (boolean) permette di alternare tra le due modalità senza chiamare metodi:

```typescript
this._sprite.tintFill = true;  // modalità fill (sostituisce i colori)
this._sprite.tintFill = false; // modalità additiva (default)
```

### .setFlip(x, y)

Capovolge il gameObject orizzontalmente e/o verticalmente. Sono disponibili anche `.setFlipX()` e `.setFlipY()`.

```typescript
this._myObject.setFlipX(true);  // specchio orizzontale
this._myObject.setFlip(true, false);
```

::InfoBox{type="warning"}
Il flip è puramente visivo: non modifica i valori di posizione né il corpo fisico (physics body).
::

### .setScrollFactor(x, y)

Controlla quanto il gameObject si muove rispetto alla camera. Utile per elementi UI o sfondi.

| Valore | Comportamento |
|---|---|
| `1` | Si muove in sincronia con la camera (default) |
| `0` | Rimane fisso sullo schermo (ideale per HUD) |
| `0.5` | Si muove a metà velocità rispetto alla camera (parallasse) |

```typescript
this._scoreText.setScrollFactor(0); // il punteggio resta fisso
```

### .setScale(x, y)

Ridimensiona il gameObject. Se si passa un solo valore, viene applicato uniformemente.

```typescript
this._myObject.setScale(2);      // doppia dimensione
this._myObject.setScale(2, 0.5); // larga e piatta
```

### .setOrigin(x, y)

Setta il **punto di ancoraggio** del gameObject. I valori sono compresi tra `0` e `1`, dove `0.5, 0.5` è il centro.

```typescript
this._myObject.setOrigin(0, 0);     // angolo top-left
this._myObject.setOrigin(0.5, 0.5); // centro (default)
this._myObject.setOrigin(1, 1);     // angolo bottom-right
```

![Diagramma dei punti di origine (0,0 → 1,1)](/images/chapters/cap5/setOrigin.png)

### .setInteractive()

Abilita il gameObject alla ricezione di eventi di input (click, touch, hover).

```typescript
this._button.setInteractive();
```

### .on(event, callback, context)

Aggiunge un **listener** di eventi sul gameObject. I metodi `setInteractive()` e `on()` si concatenano spesso con `setScale()`:

```typescript
this._helloWorld
  .setScale(2)
  .setInteractive()
  .on("pointerdown", () => { /* esegui al click */ }, this)
  .on("pointerover", () => { /* esegui all'hover */ }, this)
  .on("pointerout",  () => { /* esegui all'uscita */ }, this);
```

| Evento | Quando si attiva |
|---|---|
| `pointerdown` | Click del mouse / tap su mobile |
| `pointerup` | Rilascio del mouse / rilascio del dito |
| `pointerover` | Il cursore entra nel gameObject |
| `pointerout` | Il cursore esce dal gameObject |

### .destroy()

Rimuove il gameObject dalla scena e dalla memoria. Da usare quando un oggetto non sarà più necessario (proiettile uscito dallo schermo, nemico eliminato).

```typescript
this._bullet.destroy();
```

::InfoBox{type="tip"}
Per la lista completa dei gameObjects disponibili: [docs.phaser.io/api-documentation/class/gameobjects](https://docs.phaser.io/api-documentation/class/gameobjects)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Lo so già: non hai memorizzato tutti questi metodi. E va benissimo così.

Quello che devi portarti a casa è una manciata di metodi che userai nel 90% dei casi: `setPosition`, `setAlpha`, `setScale` e `setOrigin`. Con quelli metti qualsiasi cosa dove vuoi, la dimensioni e la rendi trasparente.

`setInteractive()` + `.on('pointerdown', ...)` è il combo magico per rendere qualcosa cliccabile — pulsanti, oggetti da raccogliere, nemici da colpire.

`setDepth` quando qualcosa appare dietro quando dovrebbe stare davanti. `destroy()` quando qualcosa deve sparire per sempre.

Il resto? Lo copi dalla documentazione ogni volta che ti serve. **Google e la doc di Phaser sono strumenti del mestiere**, non segni di debolezza. 🔍
::
