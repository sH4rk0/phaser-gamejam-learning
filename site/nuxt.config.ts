// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/ui', '@nuxt/content'],
  css: ['~/assets/css/app.css'],
  ssr: true,
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false,
    },
  },
  icon: {
    clientBundle: {
      icons: [
        'heroicons:book-open',
        'heroicons:clock',
        'heroicons:trophy',
        'heroicons:currency-dollar',
        'heroicons:lock-closed',
        'heroicons:document-magnifying-glass',
        'heroicons:check-circle',
        'heroicons:chevron-left',
        'heroicons:chevron-right',
        'simple-icons:linkedin',
        'simple-icons:facebook',
      ],
    },
  },
  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },
})
