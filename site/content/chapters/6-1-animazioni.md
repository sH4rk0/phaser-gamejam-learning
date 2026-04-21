---
title: 'Animazioni con Tween'
slug: '6-1-animazioni'
chapter: 6.1
difficulty: intermediate
readingTime: '~12 min'
---

## La classe Tween

Il termine *tween* è legato al concetto di movimento e transizione. Ci permette di animare nel tempo qualsiasi proprietà numerica di un gameObject, come la posizione `x`/`y`, la trasparenza `alpha`, la scala `scale`, e molto altro.

### Funzioni di Easing

Le **funzioni di Easing** specificano la quantità di variazione di un parametro nel tempo. Gli oggetti nella vita reale non partono istantaneamente a una certa velocità, né si fermano bruscamente: le funzioni di easing replicano questo comportamento naturale.

![Funzioni di easing](/images/chapters/cap6/easing-functions.gif)

Phaser mette a disposizione decine di funzioni di easing predefinite: `Linear`, `Sine.easeIn`, `Sine.easeOut`, `Sine.easeInOut`, `Bounce.easeOut`, `Elastic.easeOut`, `Back.easeOut`, e molte altre. Puoi esplorarne la lista completa su [Phaser Labs](https://labs.phaser.io/view.html?src=src/tweens/easing/all%20easings.js).

### Creare un Tween

Si usa il metodo `this.tweens.add()` per aggiungere un nuovo tween alla scena. Il metodo accetta un oggetto di configurazione `TweenBuilderConfig`:

```typescript
this.tweens.add({
  targets: this._mySprite,
  duration: 1000,
  delay: 1000,
  repeat: 1,
  ease: 'Linear',
  y: 200,
  alpha: 0.5,
});
```

| Proprietà | Descrizione |
|---|---|
| `targets` | Il gameObject (o array di gameObjects) su cui applicare il tween |
| `duration` | Durata dell'animazione in millisecondi |
| `delay` | Ritardo prima dell'inizio in millisecondi |
| `repeat` | Numero di ripetizioni (`-1` = infinito) |
| `ease` | Funzione di easing da applicare |
| `yoyo` | Se `true`, l'animazione torna al valore iniziale |

Le proprietà aggiuntive (`y`, `alpha`, `x`, `scaleX`, ecc.) indicano il **valore finale** verso cui il tween animerà il gameObject.

### Gestione degli eventi

Il Tween espone eventi che permettono di intercettare i momenti chiave dell'animazione:

```typescript
this.tweens.add({
  targets: this._mySprite,
  x: 640,
  y: 100,
  alpha: 0.5,
  ease: 'Sine.easeInOut',
  duration: 2000,
  delay: 1000,
  yoyo: true,
  repeat: 2,
  onUpdate: (tween: Phaser.Tweens.Tween) => {
    console.log(tween.progress);
  },
  onYoyo: () => {
    this._helloWorld.setText('animation yoyo');
  },
  onComplete: () => {
    this._helloWorld.setText('animation complete');
  },
});
```

| Evento | Quando viene eseguito |
|---|---|
| `onUpdate` | Ad ogni frame durante l'animazione. Espone il `Tween` e il suo `progress` (0→1) |
| `onYoyo` | Quando il tween inverte la direzione (solo se `yoyo: true`) |
| `onComplete` | Quando l'animazione è completata |
| `onRepeat` | Ogni volta che l'animazione viene ripetuta |
| `onStart` | All'avvio dell'animazione |

Un caso d'uso comune di `onComplete` è distruggere un gameObject dopo che il suo `alpha` è stato portato a 0:

```typescript
this.tweens.add({
  targets: this._enemy,
  alpha: 0,
  duration: 500,
  onComplete: () => {
    this._enemy.destroy();
  },
});
```

### Controllare un Tween

Puoi assegnare il tween a una variabile per controllarlo in seguito:

```typescript
private _myTween: Phaser.Tweens.Tween;

create() {
  this._myTween = this.tweens.add({
    targets: this._mySprite,
    x: 400,
    duration: 2000,
    paused: true,  // non parte subito
  });
}

onButtonClick() {
  this._myTween.play();
  // oppure: this._myTween.pause(), this._myTween.stop()
}
```

::info-box{type="tip"}
Consulta la documentazione ufficiale per tutti i parametri disponibili: [Tweens.TweenBuilderConfig](https://docs.phaser.io/api-documentation/namespace/tweens)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=tweens"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

I Tween sono la differenza tra un gioco che "funziona" e un gioco che "sembra vivo".

Quella piccola animazione quando il personaggio raccoglie una moneta? Tween. Il menu che appare con una transizione morbida? Tween. Il boss che scala a zero quando muore? Tween con `onComplete` che chiama `destroy()`. Tutto passa da qui.

**Tip pratico**: inizia con `ease: 'Back.Out'` su praticamente tutto. Fa sembrare qualsiasi animazione più professionale senza nessuno sforzo. Lo uso anch'io ancora oggi.

`onComplete` è il tuo migliore amico per concatenare azioni: l'animazione finisce → parte la scena successiva, o appare il nemico, o si sblocca il livello. Una volta che capisci questo pattern, inizia il divertimento vero. 😄
::
