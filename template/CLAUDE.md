# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server with hot reload (webpack-dev-server)
npm run build      # production build → dist/
npm run serve      # serve dist/ locally
npm run format     # check formatting (prettier)
npm run format:write  # auto-fix formatting
```

Build output goes to `public/` (not `dist/`). The webpack config outputs to `../public` relative to `webpack/`.

## Architecture

This is a **Phaser 4 + TypeScript + webpack** game template.

### Scene flow
Scenes are registered in `src/index.ts` in this order:

```
Boot → Preloader → Intro → GamePlay → GameOver
                ↕
               Hud  (overlay scene, runs in parallel with GamePlay)
```

- **Boot**: loads the logo image only, then immediately starts Preloader
- **Preloader**: loads all assets declared in `GameData`, shows loading bar, then starts Intro
- **Intro**: splash/title screen
- **GamePlay**: main game logic
- **Hud**: parallel scene overlaid on GamePlay for UI elements
- **GameOver**: end screen

### GameData — central asset registry
[src/GameData.ts](src/GameData.ts) is the single source of truth for all game configuration and assets. All asset loading in `Preloader` reads from this object. To add any asset, add an entry here rather than loading it directly in a scene.

Key sections: `globals` (canvas size, debug flag), `preloader` (loading screen config), `spritesheets`, `images`, `sounds`, `audios` (audio sprites), `fonts`, `webfonts`, `bitmapfonts`, `atlas`, `tilemaps`.

### Type definitions
Global interfaces (asset types, `gameData`, `genericConfig`) live in [typings/custom.ts](typings/custom.ts) and are globally available — no import needed.

### Webpack
- `webpack/webpack.common.js` — shared config; entry points are `src/index.ts` and `src/style.ts`
- `webpack/webpack.dev.js` — dev server config (not committed, uses common as base)
- `webpack/webpack.prod.js` — production build with obfuscation

Assets under `src/assets/` are copied verbatim to `public/assets/` by CopyWebpackPlugin. PWA manifest and favicon are also copied from `src/pwa/` and `src/favicon.ico`.
