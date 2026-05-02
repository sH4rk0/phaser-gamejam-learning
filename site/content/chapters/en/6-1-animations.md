---
title: 'Tween Animations'
slug: '6-1-animations'
chapter: 6.1
difficulty: intermediate
readingTime: '~12 min'
---

## The Tween class

The term *tween* is tied to the concept of movement and transition. It allows us to animate any numeric property of a gameObject over time, such as the position `x`/`y`, transparency `alpha`, scale `scale`, and much more.

### Easing Functions

**Easing functions** specify the amount of change of a parameter over time. Objects in real life do not instantly start at a certain speed, nor do they stop abruptly: easing functions replicate this natural behavior.

![Easing functions](/images/chapters/cap6/easing-functions.gif)

Phaser provides dozens of predefined easing functions: `Linear`, `Sine.easeIn`, `Sine.easeOut`, `Sine.easeInOut`, `Bounce.easeOut`, `Elastic.easeOut`, `Back.easeOut`, and many others. You can explore the complete list at [Phaser Labs](https://labs.phaser.io/view.html?src=src/tweens/easing/all%20easings.js).

### Creating a Tween

The `this.tweens.add()` method is used to add a new tween to the scene. The method accepts a `TweenBuilderConfig` configuration object:

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

| Property | Description |
|---|---|
| `targets` | The gameObject (or array of gameObjects) on which to apply the tween |
| `duration` | Animation duration in milliseconds |
| `delay` | Delay before starting in milliseconds |
| `repeat` | Number of repetitions (`-1` = infinite) |
| `ease` | Easing function to apply |
| `yoyo` | If `true`, the animation returns to the initial value |

Additional properties (`y`, `alpha`, `x`, `scaleX`, etc.) indicate the **final value** toward which the tween will animate the gameObject.

### Event handling

The Tween exposes events that allow intercepting key moments of the animation:

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

| Event | When it executes |
|---|---|
| `onUpdate` | Every frame during the animation. Exposes the `Tween` and its `progress` (0→1) |
| `onYoyo` | When the tween reverses direction (only if `yoyo: true`) |
| `onComplete` | When the animation is completed |
| `onRepeat` | Each time the animation repeats |
| `onStart` | At the start of the animation |

A common use case for `onComplete` is destroying a gameObject after its `alpha` has been brought to 0:

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

### Controlling a Tween

You can assign the tween to a variable to control it later:

```typescript
private _myTween: Phaser.Tweens.Tween;

create() {
  this._myTween = this.tweens.add({
    targets: this._mySprite,
    x: 400,
    duration: 2000,
    paused: true,  // does not start immediately
  });
}

onButtonClick() {
  this._myTween.play();
  // or: this._myTween.pause(), this._myTween.stop()
}
```

::info-box{type="tip"}
Consult the official documentation for all available parameters: [Tweens.TweenBuilderConfig](https://docs.phaser.io/api-documentation/namespace/tweens)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=tweens"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Tweens are the difference between a game that "works" and a game that "feels alive".

That small animation when the character collects a coin? Tween. The menu that appears with a smooth transition? Tween. The boss that scales to zero when it dies? Tween with `onComplete` calling `destroy()`. Everything goes through here.

**Practical tip**: start with `ease: 'Back.Out'` on practically everything. It makes any animation look more professional without any effort. I still use it today.

`onComplete` is your best friend for chaining actions: the animation finishes → the next scene starts, or an enemy appears, or a level unlocks. Once you understand this pattern, the real fun begins. 😄
::
