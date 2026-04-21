---
title: 'Container'
slug: '5-7-container'
chapter: 5.7
difficulty: intermediate
readingTime: '~12 min'
---


Il Container è un gameObject che può **contenere altri gameObjects** come figli. A differenza del Group (che è puramente logico), il Container esiste nella display list e partecipa al rendering: posizione, scala, rotazione e alpha applicati al container si propagano automaticamente a tutti i suoi figli.

```typescript
private _popup: Phaser.GameObjects.Container;

// nel create():
const bg    = this.add.rectangle(0, 0, 400, 200, 0x222244);
const title = this.add.text(-180, -70, "Game Over", { fontSize: "28px" });
const btn   = this.add.text(-40, 50, "Riprova", { fontSize: "20px" });

this._popup = this.add.container(512, 300, [bg, title, btn]);
```

Il terzo parametro di `this.add.container(x, y, children)` accetta direttamente l'array dei figli.

### Coordinate relative

Le posizioni dei figli sono **relative all'origine del container**, non alla scena. Se il container è a `(512, 300)` e un figlio ha posizione `(0, 0)`, il figlio apparirà esattamente al centro del container.

```typescript
// sposta tutto il popup di 100px a destra — i figli seguono
this._popup.setPosition(612, 300);
```

### Aggiungere e rimuovere figli

```typescript
this._popup.add(newElement);           // aggiunge un figlio
this._popup.remove(btn);               // rimuove senza distruggere
this._popup.remove(btn, true);         // rimuove e distrugge
this._popup.getAll();                  // restituisce tutti i figli
this._popup.getByName("title-text");   // cerca un figlio per nome
```

Per trovare un figlio per nome, il gameObject deve avere la proprietà `name` impostata:

```typescript
title.name = "title-text";
```

### Esempio completo: popup con tween

```typescript
// nascondi il popup all'avvio
this._popup.setAlpha(0).setScale(0.8);

// mostralo al click del pulsante
this._openButton.setInteractive().on("pointerdown", () => {
  this.tweens.add({
    targets: this._popup,
    alpha: 1,
    scale: 1,
    duration: 250,
    ease: "Back.Out",
  });
}, this);

// nascondilo alla chiusura
btn.setInteractive().on("pointerdown", () => {
  this.tweens.add({
    targets: this._popup,
    alpha: 0,
    scale: 0.8,
    duration: 200,
  });
}, this);
```

::InfoBox{type="warning"}
I figli di un Container **non possono avere un physics body** Arcade. Se hai bisogno di fisica sugli oggetti, usa un Group invece di un Container.
::

### Group vs Container — quando usare quale

| | Group | Container |
|---|---|---|
| Rappresentazione visiva | No | Sì |
| Coordinate dei figli | Indipendenti | Relative al container |
| Trasformazioni ereditate | No | Sì (posizione, scala, alpha, rotazione) |
| Compatibile con Arcade Physics | Sì | No |
| Uso tipico | Nemici, proiettili, collezionabili | UI, popup, HUD, gruppi visivi |

::InfoBox{type="new"}
Nel prossimo capitolo vedremo i **Tweens** e l'**audio**: strumenti fondamentali per animare i gameObjects nel tempo e aggiungere effetti sonori al gioco.
::

## Riepilogo

In questo gruppo di capitoli abbiamo:

- ✅ Compreso il concetto di gameObjects e la GameObjectsFactory
- ✅ Utilizzato le proprietà comuni (position, depth, alpha, scale, origin, tint, flip, setToTop/setToBack)
- ✅ Reso i gameObjects interattivi con `setInteractive()` e `.on()`
- ✅ Creato testi, immagini e sprite con le loro proprietà specifiche
- ✅ Realizzato uno sfondo con effetto parallasse tramite TileSprite
- ✅ Organizzato gameObjects con Group e Container

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fcontainer"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

La regola che ti salva dalla confusione: **Container per l'UI, Group per la fisica**.

Popup, HUD, pannelli, barre di vita composte da più pezzi — tutto questo è Container. Sposti il container di 10 pixel e tutti i figli seguono. È il comportamento che ti aspetti da un elemento visuale composto.

Nemici, proiettili, monete da raccogliere — tutto quello che deve collidere con qualcosa è Group. I figli di un Container non possono avere un physics body, quindi non cercare di usarlo per gli oggetti di gioco.

Il pattern popup con `alpha: 0` + tween a `alpha: 1` con `ease: 'Back.Out'` che ho mostrato nell'esempio? Usalo sempre. Costa zero e fa sembrare il gioco professionale. 🖼️
::
