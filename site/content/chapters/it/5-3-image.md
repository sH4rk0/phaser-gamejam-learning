---
title: 'Image'
slug: '5-3-image'
chapter: 5.3
difficulty: intermediate
readingTime: '~5 min'
---


```typescript
this._myImage = this.add.image(x, y, "mia-immagine");
```

Il terzo parametro è la **chiave** (key) con cui l'immagine è stata caricata nel Preloader tramite `GameData.ts`:

```typescript
images: [
  {
    name: "mia-immagine",
    path: "assets/images/mia-immagine.png",
  }
]
```

::InfoBox{type="warning"}
La key usata nel Preloader deve coincidere con quella usata in `this.add.image()`. Per convenzione è buona prassi usare lo stesso nome del file.
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fimages"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Image è il gameObject più semplice in assoluto — e questo è un punto di forza, non un limite.

Sfondo? Image. Logo in sovrimpressione? Image. Oggetto da raccogliere che non ha animazioni? Image. La metà degli oggetti nei tuoi giochi saranno immagini statiche, e non c'è nulla di sbagliato in questo.

L'unica cosa che fa inciampare tutti almeno una volta: **la key deve essere identica** a quella usata nel Preloader. `"player"` e `"Player"` sono due key diverse. Se lo sprite non appare, controlla prima quello. Ti risparmia dieci minuti di debug. 🔍
::
