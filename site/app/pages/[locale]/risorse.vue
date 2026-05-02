<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1
      class="text-3xl font-black mb-3"
      style="font-family: 'Orbitron', sans-serif; color: var(--color-text);"
    >
      {{ t.heading }}
    </h1>
    <p class="mb-12 text-base" style="color: var(--color-muted);">
      {{ t.description }}
    </p>

    <div class="space-y-10">
      <section v-for="category in t.categories" :key="category.title">
        <div class="flex items-center gap-3 mb-4">
          <UIcon :name="category.icon" class="w-5 h-5" style="color: var(--color-primary);" />
          <h2
            class="text-lg font-bold tracking-wide"
            style="font-family: 'Orbitron', sans-serif; color: var(--color-primary);"
          >
            {{ category.title }}
          </h2>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <a
            v-for="link in category.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]"
            style="background: rgba(255,255,255,0.04); border-color: rgba(0,212,255,0.15);"
            onmouseover="this.style.borderColor='rgba(0,212,255,0.45)'; this.style.background='rgba(0,212,255,0.06)'"
            onmouseout="this.style.borderColor='rgba(0,212,255,0.15)'; this.style.background='rgba(255,255,255,0.04)'"
          >
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 mt-0.5 shrink-0" style="color: var(--color-muted);" />
            <div class="min-w-0">
              <p class="font-semibold text-sm truncate" style="color: var(--color-text);">{{ link.label }}</p>
              <p class="text-xs truncate mt-0.5" style="color: var(--color-muted);">{{ link.url }}</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useLocale()

const links = {
  phaserUpdates: [
    { label: 'PhaserJs official site', url: 'https://phaser.io/' },
    { label: 'Official Phaser Discord', url: 'https://discord.com/invite/phaser' },
  ],
  templates: [
    { label: 'PGJ 2026-2027 course template', url: 'https://github.com/sH4rk0/pgj/tree/main/2026-2027' },
  ],
  docs: [
    { label: 'Official Phaser documentation', url: 'https://docs.phaser.io/phaser/getting-started/what-is-phaser' },
    { label: 'Phaser book on Gumroad', url: 'https://triqui.gumroad.com/l/qousk' },
    { label: 'Rex Rainbow Phaser Notes', url: 'https://rexrainbow.github.io/phaser3-rex-notes/docs/site/' },
  ],
  codeExamples: [
    { label: 'Phaser Labs', url: 'https://labs.phaser.io/' },
    { label: 'Phaser Explorer', url: 'https://explorer.phaser.io/' },
    { label: 'Emanuele Feronato — Phaser', url: 'https://www.emanueleferonato.com/category/phaser/' },
  ],
  games: [
    { label: 'Phaser Labs — Games', url: 'https://labs.phaser.io/index.html?dir=games/&q=' },
    { label: 'EF — Draw & Match Games in TypeScript', url: 'https://www.emanueleferonato.com/2023/08/25/pure-typescript-class-with-no-depencencies-to-handle-draw-and-match-games-in-just-a-few-lines-full-phaser-example/' },
    { label: 'EF — Mini Archer with Phaser & TypeScript', url: 'https://www.emanueleferonato.com/2023/06/01/build-a-html5-game-like-mini-archer-using-phaser-and-typescript-step-6-splitting-the-code-into-classes/' },
    { label: 'EF — Block It in TypeScript with Arcade Physics', url: 'https://www.emanueleferonato.com/2022/05/11/block-it-html5-game-ported-to-typescript-with-some-new-features-powered-by-phaser-and-arcade-physics/' },
  ],
  graphics: [
    { label: 'Spriters Resource', url: 'https://www.spriters-resource.com/' },
    { label: 'Sprite Database', url: 'https://spritedatabase.net/' },
    { label: 'itch.io — Free Game Assets', url: 'https://itch.io/game-assets/free' },
    { label: 'OpenGameArt', url: 'https://opengameart.org/' },
    { label: 'CraftPix — Freebies', url: 'https://craftpix.net/freebies/' },
    { label: 'Kenney Assets', url: 'https://www.kenney.nl/assets' },
    { label: 'GameArt2D — Freebies', url: 'https://www.gameart2d.com/freebies.html' },
    { label: 'Freepik — Game Assets', url: 'https://www.freepik.com/free-photos-vectors/game-asset' },
  ],
  audio: [
    { label: 'Sounds Resource', url: 'https://www.sounds-resource.com/' },
    { label: 'Freesound', url: 'https://freesound.org/' },
    { label: 'itch.io — Free Audio', url: 'https://itch.io/game-assets/free/tag-audio' },
    { label: 'OpenGameArt — Game Sounds Library', url: 'https://opengameart.org/content/library-of-game-sounds' },
    { label: 'Pixabay — Sound Effects', url: 'https://pixabay.com/sound-effects/search/game/' },
    { label: 'GameDevMarket — Audio', url: 'https://www.gamedevmarket.net/category/audio' },
    { label: 'Khinsider — Game Soundtracks', url: 'https://downloads.khinsider.com/game-soundtracks' },
    { label: 'Looperman', url: 'https://www.looperman.com/' },
  ],
  tools: [
    { label: 'Photopea — Online graphic editor', url: 'https://www.photopea.com/' },
    { label: 'Tiled — Map Editor', url: 'https://www.mapeditor.org/' },
    { label: 'Universal LPC Spritesheet Generator', url: 'https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light' },
    { label: 'Phaser 3 Particle Editor', url: 'https://koreezgames.github.io/phaser3-particle-editor/' },
    { label: 'Pathbuilder', url: 'https://samid737.github.io/pathbuilder/' },
    { label: 'Animator', url: 'https://is.si/animator/' },
  ],
}

const t = computed(() => locale.value === 'en' ? {
  heading: 'Useful Resources',
  description: 'A list of links to find useful information, examples, tools and assets for developing your game.',
  categories: [
    { title: 'Phaser Updates', icon: 'i-heroicons-megaphone', links: links.phaserUpdates },
    { title: 'Templates & Examples', icon: 'i-heroicons-code-bracket-square', links: links.templates },
    { title: 'Documentation', icon: 'i-heroicons-book-open', links: links.docs },
    { title: 'Code Examples', icon: 'i-heroicons-command-line', links: links.codeExamples },
    { title: 'Game Examples', icon: 'i-heroicons-puzzle-piece', links: links.games },
    { title: 'Graphics', icon: 'i-heroicons-photo', links: links.graphics },
    { title: 'Audio', icon: 'i-heroicons-musical-note', links: links.audio },
    { title: 'Tools', icon: 'i-heroicons-wrench-screwdriver', links: links.tools },
  ],
} : {
  heading: 'Risorse Utili',
  description: 'Un elenco di link dove reperire informazioni utili, esempi, tools e risorse per lo sviluppo del vostro gioco.',
  categories: [
    { title: 'Aggiornamenti di Phaser', icon: 'i-heroicons-megaphone', links: links.phaserUpdates },
    { title: 'Template ed Esempi', icon: 'i-heroicons-code-bracket-square', links: links.templates },
    { title: 'Documentazione', icon: 'i-heroicons-book-open', links: links.docs },
    { title: 'Esempi di Codice', icon: 'i-heroicons-command-line', links: links.codeExamples },
    { title: 'Esempi di Giochi', icon: 'i-heroicons-puzzle-piece', links: links.games },
    { title: 'Grafica', icon: 'i-heroicons-photo', links: links.graphics },
    { title: 'Audio', icon: 'i-heroicons-musical-note', links: links.audio },
    { title: 'Tools', icon: 'i-heroicons-wrench-screwdriver', links: links.tools },
  ],
})

useSeoMeta({
  title: () => locale.value === 'en'
    ? 'Useful Resources — Phaser 4 Game Dev'
    : 'Risorse Utili — Phaser 4 Game Dev',
  description: () => locale.value === 'en'
    ? 'Documentation, examples, graphics, audio and tools for game development with Phaser and TypeScript.'
    : 'Documentazione, esempi, grafica, audio e tools per lo sviluppo di giochi con Phaser e TypeScript.',
})
</script>
