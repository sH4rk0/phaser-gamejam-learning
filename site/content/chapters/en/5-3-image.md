---
title: 'Image'
slug: '5-3-image'
chapter: 5.3
difficulty: intermediate
readingTime: '~5 min'
---


```typescript
this._myImage = this.add.image(x, y, "my-image");
```

The third parameter is the **key** with which the image was loaded in the Preloader via `GameData.ts`:

```typescript
images: [
  {
    name: "my-image",
    path: "assets/images/my-image.png",
  }
]
```

::InfoBox{type="warning"}
The key used in the Preloader must match the one used in `this.add.image()`. By convention it is good practice to use the same name as the file.
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Fimages"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Image is the simplest gameObject of all — and that is a strength, not a limitation.

Background? Image. Logo overlay? Image. Collectible with no animations? Image. Half the objects in your games will be static images, and there is nothing wrong with that.

The only thing that trips everyone up at least once: **the key must be identical** to the one used in the Preloader. `"player"` and `"Player"` are two different keys. If the sprite doesn't appear, check that first. It saves you ten minutes of debugging. 🔍
::
