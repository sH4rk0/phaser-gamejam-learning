---
title: 'Text'
slug: '5-2-text'
chapter: 5.2
difficulty: intermediate
readingTime: '~5 min'
---


```typescript
this._helloWorld = this.add.text(x, y, "Hello World!", { fontSize: "20px" });
```

| Parameter | Type | Description |
|---|---|---|
| `x` | `number` | Horizontal position |
| `y` | `number` | Vertical position |
| `text` | `string` | Text to display |
| `style` | `TextStyle` | Visual configuration (fontFamily, fontSize, color, …) |

The most commonly used style properties are `fontFamily`, `fontSize`, `backgroundColor`, and `color`. Consult the complete documentation at [docs.phaser.io](https://docs.phaser.io/api-documentation/typedef/types-gameobjects-text).

### .setText(value)

Updates the text — indispensable for scores and countdowns:

```typescript
this._scoreText.setText("Points: " + this._score);
```

### .setStroke(color, thickness)

Adds an outline to the text:

```typescript
this._helloWorld.setStroke("#ff0000", 5);
```

### .setShadow(x, y, color, blur)

Adds a shadow. `x` and `y` are the offset relative to the text, `blur` is the spread:

```typescript
this._helloWorld.setShadow(2, 2, "#000000", 2);
```

### .setWordWrapWidth(width)

Limits the text width in pixels, automatically wrapping lines that are too long:

```typescript
this._helloWorld.setWordWrapWidth(500);
```

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Ftext"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Text is the most humble gameObject in the catalog — and the one you'll use most of all.

Every score, every countdown, every "Game Over" message comes through here. And the great thing? It's literally three lines: create the text, save the reference, call `setText()` when the value changes.

**Pro tip**: keep text away from the game screen until you're sure of the position. `setPosition()` at runtime costs nothing and saves you from going back to `create()` every time you move something.

`setWordWrapWidth` is that function you ignore until you have a long string that goes off screen. Then you love it forever. 📝
::
