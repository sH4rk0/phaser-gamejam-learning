---
title: 'Time and Timers'
slug: '6-3-time'
chapter: 6.3
difficulty: intermediate
readingTime: '~12 min'
---

## The Time class

The `Time` class allows us to access properties tied to the scene's internal clock. When an instance of `Phaser.Game` is created, the internal timer is automatically initialized and started.

### this.time.now

The `now` property returns the time elapsed in milliseconds since the game was initialized:

```typescript
update() {
  console.log(this.time.now); // e.g.: 3542.5
}
```

It is useful for calculating time deltas and synchronizing events to game time.

### TimerEvent

`this.time.addEvent()` allows executing code after a certain delay, or repeatedly at regular intervals. It works like a `setTimeout` / `setInterval`, but is synchronized with Phaser's game loop and automatically stops with the scene.

#### Single execution

```typescript
create() {
  this.time.addEvent({
    delay: 1000,
    callback: () => { console.log('executed after 1 second'); },
    callbackScope: this,
  });
}
```

#### Repeated execution

```typescript
create() {
  this.time.addEvent({
    delay: 1000,
    callback: () => { this.myFunction(); },
    callbackScope: this,
    repeat: 2,   // or: loop: true for infinite
  });
}

myFunction() {
  console.log('executed every second');
}
```

::info-box{type="warning"}
Do not use `repeat` and `loop: true` at the same time. Use `repeat` for a defined number of repetitions, or `loop: true` for infinite repetition.
::

#### TimerEvent parameters

| Property | Type | Description |
|---|---|---|
| `delay` | `number` | Time in ms before execution |
| `callback` | `Function` | Function to execute |
| `callbackScope` | `object` | `this` context of the callback (usually `this`) |
| `repeat` | `number` | Number of additional repetitions after the first |
| `loop` | `boolean` | If `true`, repeats indefinitely |
| `startAt` | `number` | Starts the timer as if `startAt` ms had already elapsed |
| `args` | `any[]` | Array of arguments passed to the callback |

#### Passing arguments to the callback

```typescript
private _myTimer: Phaser.Time.TimerEvent;

create() {
  this._myTimer = this.time.addEvent({
    delay: 1000,
    callback: (param1: number, param2: string) => {
      this.myFunction(param1, param2);
    },
    args: [42, 'hello'],
    callbackScope: this,
  });
}

myFunction(param1: number, param2: string) {
  console.log(param1, param2); // 42 "hello"
}
```

The `args` attribute accepts an array of parameters that are passed to the callback in the order specified.

#### Destroying the timer

When the timer is no longer needed, it is good practice to destroy it to free resources:

```typescript
if (this._myTimer != null) {
  this._myTimer.destroy();
}
```

::info-box{type="tip"}
Consult the official documentation: [Namespace Time](https://docs.phaser.io/api-documentation/namespace/time)
::

### Timeline

The `Timeline` is an **event sequencer**: it allows scheduling the execution of tweens, callbacks, and actions at specific points in the future, using a single coordinated object.

Unlike `addEvent`, the Timeline handles complex sequences of actions with precise timing. If the scene is paused, the Timeline automatically stops; if the scene is destroyed, the Timeline is destroyed with it.

#### Creating a Timeline

```typescript
private _myTimeline: Phaser.Time.Timeline;

create() {
  this._myTimeline = this.add.timeline([
    {
      // event 1: after 1 second, animate a sprite downward
      at: 1000,
      tween: {
        targets: this.add.sprite(400, 700, 'bomb'),
        y: 400,
        duration: 3000,
        ease: 'Power2',
      },
    },
    {
      // event 2: after 2 seconds, add a new sprite to the scene
      at: 2000,
      run: () => {
        this.add.sprite(400, 200, 'bomb').setScale(2);
      },
    },
  ]);

  // The Timeline starts on mouse click
  this.input.once('pointerdown', () => {
    this._myTimeline.play();
  });
}
```

#### Timeline event properties

| Property | Description |
|---|---|
| `at` | Time in ms from the Timeline start when the event fires |
| `tween` | Tween configuration to execute (same syntax as `tweens.add`) |
| `run` | Callback to execute at this point |
| `set` | Object with properties to apply to targets at this point |
| `event` | Name of an event to emit on the Timeline |

::info-box{type="tip"}
The `at` property is absolute from the start of `play()`, not relative to the previous event. To sequence events in succession, increment the values: 1000, 2000, 3500, etc.
::

#### Controlling the Timeline

```typescript
this._myTimeline.play();    // start
this._myTimeline.pause();   // pause
this._myTimeline.resume();  // resume
this._myTimeline.stop();    // stop and reset
this._myTimeline.destroy(); // destroy and free resources
```

::info-box{type="tip"}
Consult the official documentation: [Time.Timeline](https://docs.phaser.io/api-documentation/class/time-timeline)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=time"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Rule number one: **never use `setTimeout` in Phaser**. I know the temptation is there — you've used it forever, you know it, it works. But `setTimeout` doesn't know the game exists: it keeps running even when the scene is paused, when the window is in the background, when the tab is inactive.

`this.time.addEvent()` synchronizes with the game loop. It stops when the scene stops, destroys when the scene destroys. That's what you always want.

The **Timeline** is the secret for cutscenes and tutorials: "after 1 second the enemy appears, after 2 seconds the animation starts, after 3 seconds the text arrives". Everything sequenced in a single object, without nested callbacks one inside the other. As soon as your game has a story to tell, the Timeline becomes indispensable. ⏱️
::
