---
title: 'Audio'
slug: '6-2-audio'
chapter: 6.2
difficulty: intermediate
readingTime: '~12 min'
---

## The Sound class

Audio management in Phaser 4 is straightforward and follows the same pattern as other resources: the asset is loaded in the preloader via `GameData`, then instantiated and played in the scene.

Phaser supports two main audio formats: **`.ogg`** (compressed, excellent for modern browsers) and **`.m4a`** (iOS/Safari compatibility). It is good practice to provide both formats to maximize compatibility.

::info-box{type="tip"}
**Useful audio resources:**
- [freesound.org](https://freesound.org/) and [sounds-resource.com](https://www.sounds-resource.com/) — free sound libraries
- [convertio.co](https://convertio.co/it/wav-m4a/) — online converter between audio formats
- [Audacity](https://www.audacityteam.org/) — open source cross-platform audio editor
::

### Adding background music

In `GameData.ts`, in the `sounds` array, add the music asset with a unique `name` and the `paths` to the audio files:

```typescript
sounds: [
  {
    name: 'music0',
    paths: ['assets/sounds/music0.ogg', 'assets/sounds/music0.m4a'],
  },
],
```

In the scene, declare a private variable of type `Phaser.Sound.BaseSound`:

```typescript
private _music: Phaser.Sound.BaseSound;
```

In the `create()` method, create the instance with `this.sound.add()` and start it with `.play()`:

```typescript
create() {
  this._music = this.sound.add('music0', { loop: true, volume: 0.1 });
  this._music.play();
}
```

The second parameter of `sound.add()` accepts a `SoundConfig` configuration object:

| Property | Type | Description |
|---|---|---|
| `loop` | `boolean` | If `true`, the music repeats automatically |
| `volume` | `number` | Volume from `0` (silence) to `1` (maximum) |
| `rate` | `number` | Playback speed (1 = normal) |
| `detune` | `number` | Pitch in cents |
| `seek` | `number` | Starting position in seconds |

### Stopping music on scene change

When changing scenes, it is important to stop and destroy the active music to avoid overlapping:

```typescript
if (this._music.isPlaying) {
  this._music.stop();
  this._music.destroy();
}
this.scene.start('otherScene');
```

### AudioSprite (sound effects)

An **AudioSprite** is a single audio file that contains multiple sound effects concatenated together, described by a JSON file with the start and end times of each effect. It is the recommended technique for managing many SFX efficiently.

In `GameData.ts`, use the `audio` array to load the audio sprite:

```typescript
audio: [
  {
    name: 'sfx',
    jsonpath: 'assets/sounds/sfx.json',
    paths: ['assets/sounds/sfx.ogg', 'assets/sounds/sfx.m4a'],
  },
],
```

The JSON file has this structure:

```json
{
  "resources": ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
  "spritemap": {
    "splash": {
      "start": 0,
      "end": 0.526,
      "loop": false
    },
    "nodamage": {
      "start": 0.546,
      "end": 0.731,
      "loop": false
    }
  }
}
```

Each sound effect is defined by its `name`, start (`start`) and end (`end`) times in seconds, and whether it should loop.

To play a sound effect, use `playAudioSprite()`:

```typescript
this.sound.playAudioSprite('sfx', 'splash', { loop: false, volume: 0.1 });
```

- First parameter: the `name` of the AudioSprite defined in `GameData`
- Second parameter: the key of the individual effect in the JSON
- Third parameter: optional configuration (`SoundConfig`)

::info-box{type="tip"}
Consult the official documentation: [Namespace Sound](https://docs.phaser.io/api-documentation/namespace/sound)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=audio"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

Audio is that thing everyone adds last and which completely transforms the perception of the game. A game without sounds feels like a prototype. That same game with three sound effects feels finished.

**What you absolutely must remember**: always stop and destroy the music before changing scenes. If you don't, the music continues playing in the background and overlaps with the new one — one of the most annoying bugs to debug because you don't see anything in the code that looks wrong.

The **AudioSprite** is the professional solution for SFX: one file only, zero additional HTTP requests, each effect accessible by name. It seems more complex at first, but when you have twenty sound effects you understand why it's the right approach. 🔊
::
