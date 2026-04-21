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

| Parametro | Tipo | Descrizione |
|---|---|---|
| `x` | `number` | Posizione orizzontale |
| `y` | `number` | Posizione verticale |
| `text` | `string` | Testo da visualizzare |
| `style` | `TextStyle` | Configurazione visiva (fontFamily, fontSize, color, …) |

Le proprietà di stile più usate sono `fontFamily`, `fontSize`, `backgroundColor` e `color`. Consulta la documentazione completa su [docs.phaser.io](https://docs.phaser.io/api-documentation/typedef/types-gameobjects-text).

### .setText(value)

Aggiorna il testo — indispensabile per punteggi e countdown:

```typescript
this._scoreText.setText("Punti: " + this._score);
```

### .setStroke(color, thickness)

Aggiunge un bordo al testo:

```typescript
this._helloWorld.setStroke("#ff0000", 5);
```

### .setShadow(x, y, color, blur)

Aggiunge un'ombra. `x` e `y` sono l'offset rispetto al testo, `blur` la diffusione:

```typescript
this._helloWorld.setShadow(2, 2, "#000000", 2);
```

### .setWordWrapWidth(width)

Limita la larghezza del testo in pixel, mandando a capo automaticamente le righe troppo lunghe:

```typescript
this._helloWorld.setWordWrapWidth(500);
```

::PhaserLabsBox{url="https://labs.phaser.io/?path=game+objects%2Ftext"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Il Text è il gameObject più umile del catalogo — e quello che userai più spesso di tutti.

Ogni punteggio, ogni countdown, ogni messaggio di "Game Over" passa da qui. E la cosa bella? È letteralmente tre righe: crei il testo, salvi il riferimento, chiami `setText()` quando il valore cambia.

**Tip pro**: tieni il testo lontano dalle schermate di gioco finché non sei sicuro della posizione. `setPosition()` a runtime costa zero e ti salva dal rimettere mano al `create()` ogni volta che sposti qualcosa.

`setWordWrapWidth` è quella funzione che ignori finché non hai una stringa lunga che esce dallo schermo. Poi la ami per sempre. 📝
::
