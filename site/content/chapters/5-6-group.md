---
title: 'Group'
slug: '5-6-group'
chapter: 5.6
difficulty: intermediate
readingTime: '~10 min'
---


Il Group è un **contenitore logico** per gameObjects dello stesso tipo. Non ha una rappresentazione visiva propria: serve a gestire collezioni di oggetti (nemici, proiettili, monete) come un'unica entità, semplificando aggiornamenti, iterazioni e collisioni.

```typescript
private _enemies: Phaser.GameObjects.Group;

// nel create():
this._enemies = this.add.group({
  runChildUpdate: true,
  maxSize: 50,
});
```

| Opzione | Descrizione |
|---|---|
| `runChildUpdate` | Se `true`, chiama `update()` automaticamente su ogni elemento del gruppo ad ogni frame |
| `maxSize` | Limite massimo di elementi; `-1` = illimitato |
| `classType` | Classe usata da `.create()` per istanziare nuovi elementi |

### Aggiungere e creare elementi

Puoi aggiungere un gameObject già esistente oppure crearne uno nuovo direttamente tramite il gruppo:

```typescript
// aggiunge un oggetto già creato
const bomb = this.add.sprite(100, 100, "bomb");
this._enemies.add(bomb);

// crea e aggiunge in un solo passaggio
const enemy = this._enemies.create(200, 150, "enemy");
```

Con `.create()` il gameObject viene istanziato, aggiunto alla scena e al gruppo in un colpo solo.

### Iterare sugli elementi

```typescript
// esegui un'azione su tutti gli elementi
this._enemies.getChildren().forEach((child) => {
  const sprite = child as Phaser.GameObjects.Sprite;
  sprite.setVelocityX(-100);
});
```

### Metodi principali

| Metodo | Descrizione |
|---|---|
| `.add(child)` | Aggiunge un gameObject esistente al gruppo |
| `.create(x, y, key)` | Crea un nuovo gameObject e lo aggiunge al gruppo e alla scena |
| `.getChildren()` | Restituisce l'array di tutti gli elementi |
| `.getLength()` | Restituisce il numero di elementi presenti |
| `.getFirst(active)` | Restituisce il primo elemento (attivo o inattivo) |
| `.remove(child, removeFromScene, destroyChild)` | Rimuove un elemento dal gruppo |
| `.clear(removeFromScene, destroyChild)` | Rimuove tutti gli elementi |

`.remove()` e `.clear()` accettano due booleani: il primo rimuove anche l'oggetto dalla scena, il secondo chiama `.destroy()` sull'oggetto liberando la memoria.

### Object pooling

Un pattern comune con i Group è il **pool di oggetti**: invece di creare e distruggere continuamente gameObjects (operazione costosa), si riutilizzano quelli già esistenti disattivandoli quando non servono e riattivandoli quando servono di nuovo.

```typescript
// recupera un elemento inattivo dal pool
const bullet = this._bullets.getFirst(false) as Phaser.GameObjects.Sprite;
if (bullet) {
  bullet.setPosition(playerX, playerY);
  bullet.setActive(true).setVisible(true);
}
```

::InfoBox{type="tip"}
Il Group è fondamentale per le **collisioni** con Arcade Physics: `this.physics.add.collider(player, this._enemies)` gestisce in automatico le collisioni tra il player e tutti i nemici nel gruppo, senza cicli manuali.
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fgroup"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Il Group risolve il problema che hai già incontrato (o incontrerai tra dieci minuti): come gestisci venti nemici contemporaneamente senza venti variabili separate?

La risposta è un gruppo. Un riferimento, tutti gli elementi dentro. `getChildren().forEach()` per aggiornarli, `physics.add.collider()` per le collisioni — Phaser fa il loop per te.

L'**object pooling** sembra complicato finché non capisci l'intuizione: distruggere e ricreare oggetti costa. Disattivarli e riutilizzarli è gratis. Per proiettili e nemici che spariscono e riappaiono di continuo, il pool fa la differenza tra 60fps e 20fps. Vale la pena capirlo subito. 🎯
::
