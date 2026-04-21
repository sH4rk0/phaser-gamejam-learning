---
title: 'Audio'
slug: '6-2-audio'
chapter: 6.2
difficulty: intermediate
readingTime: '~12 min'
---

## La classe Sound

La gestione dell'audio in Phaser 4 è semplice e segue lo stesso pattern delle altre risorse: si carica l'asset nel preloader tramite `GameData`, poi si istanzia e riproduce nella scena.

Phaser supporta due formati audio principali: **`.ogg`** (compresso, ottimo per browser moderni) e **`.m4a`** (compatibilità iOS/Safari). È buona pratica fornire entrambi i formati per massimizzare la compatibilità.

::info-box{type="tip"}
**Risorse utili per l'audio:**
- [freesound.org](https://freesound.org/) e [sounds-resource.com](https://www.sounds-resource.com/) — librerie di suoni gratuiti
- [convertio.co](https://convertio.co/it/wav-m4a/) — converter online tra formati audio
- [Audacity](https://www.audacityteam.org/) — editor audio open source e cross-platform
::

### Aggiungere musica di sottofondo

In `GameData.ts`, nell'array `sounds`, aggiungi l'asset della musica con un `name` univoco e i `paths` ai file audio:

```typescript
sounds: [
  {
    name: 'music0',
    paths: ['assets/sounds/music0.ogg', 'assets/sounds/music0.m4a'],
  },
],
```

Nella scena, dichiara una variabile privata di tipo `Phaser.Sound.BaseSound`:

```typescript
private _music: Phaser.Sound.BaseSound;
```

Nel metodo `create()`, crea l'istanza con `this.sound.add()` e avviala con `.play()`:

```typescript
create() {
  this._music = this.sound.add('music0', { loop: true, volume: 0.1 });
  this._music.play();
}
```

Il secondo parametro di `sound.add()` accetta un oggetto di configurazione `SoundConfig`:

| Proprietà | Tipo | Descrizione |
|---|---|---|
| `loop` | `boolean` | Se `true`, la musica si ripete automaticamente |
| `volume` | `number` | Volume da `0` (silenzio) a `1` (massimo) |
| `rate` | `number` | Velocità di riproduzione (1 = normale) |
| `detune` | `number` | Intonazione in centesimi |
| `seek` | `number` | Posizione iniziale in secondi |

### Fermare la musica al cambio scena

Quando si cambia scena, è importante fermare e distruggere la musica attiva per evitare sovrapposizioni:

```typescript
if (this._music.isPlaying) {
  this._music.stop();
  this._music.destroy();
}
this.scene.start('altraScena');
```

### AudioSprite (effetti sonori)

Un **AudioSprite** è un singolo file audio che contiene più effetti sonori concatenati, descritti da un file JSON con i tempi di inizio e fine di ciascun effetto. È la tecnica consigliata per gestire molti SFX in modo efficiente.

In `GameData.ts`, usa l'array `audio` per caricare lo sprite audio:

```typescript
audio: [
  {
    name: 'sfx',
    jsonpath: 'assets/sounds/sfx.json',
    paths: ['assets/sounds/sfx.ogg', 'assets/sounds/sfx.m4a'],
  },
],
```

Il file JSON ha questa struttura:

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

Ogni effetto sonoro è definito dal suo `name`, i tempi di inizio (`start`) e fine (`end`) in secondi, e se deve essere ripetuto in loop.

Per riprodurre un effetto sonoro usa `playAudioSprite()`:

```typescript
this.sound.playAudioSprite('sfx', 'splash', { loop: false, volume: 0.1 });
```

- Primo parametro: il `name` dell'AudioSprite definito in `GameData`
- Secondo parametro: la chiave del singolo effetto nel JSON
- Terzo parametro: configurazione opzionale (`SoundConfig`)

::info-box{type="tip"}
Consulta la documentazione ufficiale: [Namespace Sound](https://docs.phaser.io/api-documentation/namespace/sound)
::

::PhaserLabsBox{url="https://labs.phaser.io/?path=audio"}
::

::InfoBox{type="tutor" avatar="/images/francesco-raimondo.jpg"}

L'audio è quella cosa che tutti aggiungono per ultima e che trasforma completamente la percezione del gioco. Un gioco senza suoni sembra un prototipo. Lo stesso gioco con tre effetti sonori sembra finito.

**Cosa ricordare assolutamente**: ferma e distruggi sempre la musica prima di cambiare scena. Se non lo fai, la musica continua a suonare in background e si sovrappone alla nuova — uno dei bug più fastidiosi da debuggare perché non vedi nulla nel codice che sembri sbagliato.

L'**AudioSprite** è la soluzione professionale per gli SFX: un file solo, zero richieste HTTP aggiuntive, ogni effetto accessibile per nome. Sembra più complessa all'inizio, ma quando hai venti effetti sonori capisci perché è la strada giusta. 🔊
::
