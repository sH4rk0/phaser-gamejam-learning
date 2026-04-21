<template>
  <div class="phaser-labs-box rounded-xl my-8" style="background: linear-gradient(135deg, #0D1B2A 0%, #1A1040 50%, #0D1B2A 100%); border: 1px solid rgba(0, 212, 255, 0.25); box-shadow: 0 0 30px rgba(0, 212, 255, 0.08), 0 4px 24px rgba(0, 0, 0, 0.4);">
    <div class="flex items-center gap-8 p-6">

      <!-- Folder image -->
      <div class="shrink-0" style="filter: drop-shadow(0 0 14px rgba(0, 212, 255, 0.45));">
        <img
          :src="'/images/phaser-labs-folder.png'"
          alt="Phaser Labs"
          style="width: 90px; height: 90px; object-fit: contain; display: block;"
        />
      </div>

      <!-- Text + CTA -->
      <div class="flex-1 min-w-0" style="padding-left: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; color: #00D4FF; text-transform: uppercase;">Phaser Labs</span>
          <span style="font-size: 0.65rem; background: rgba(0,212,255,0.15); color: #00D4FF; border: 1px solid rgba(0,212,255,0.3); border-radius: 4px; padding: 1px 6px; font-weight: 600;">LIVE</span>
        </div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #F0F0FF; line-height: 1.3; margin-bottom: 6px;">
          Prova tutto dal vivo — centinaia di esempi interattivi
        </div>
        <div style="font-size: 0.82rem; color: #8888AA; line-height: 1.5; margin-bottom: 14px;">
          Phaser Labs raccoglie esempi funzionanti per ogni argomento del corso. Copia, modifica, sperimenta — direttamente nel browser.
        </div>
        <a
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          class="labs-cta-btn"
          style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(90deg, #00D4FF, #6C3FE8); color: #fff; font-size: 0.85rem; font-weight: 600; text-decoration: none; border-radius: 8px; padding: 8px 16px; box-shadow: 0 2px 12px rgba(0,212,255,0.3); line-height: 1; white-space: nowrap;"
        >
          Apri gli esempi
          <svg style="display: inline; vertical-align: middle; flex-shrink: 0;" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 6.5H11.5M11.5 6.5L7.5 2.5M11.5 6.5L7.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<style scoped>
.labs-cta-btn:hover {
  opacity: 0.85;
}
</style>
