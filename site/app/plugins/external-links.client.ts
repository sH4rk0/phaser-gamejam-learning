export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const processLinks = () => {
      const links = document.querySelectorAll('.chapter-content a')
      links.forEach((link) => {
        const href = link.getAttribute('href')
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          link.setAttribute('target', '_blank')
          link.setAttribute('rel', 'noopener noreferrer')
        }
      })
    }

    // Process on initial load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', processLinks)
    } else {
      processLinks()
    }

    // Watch for route changes
    const nuxtApp = useNuxtApp()
    nuxtApp.hook('page:finish', () => {
      setTimeout(processLinks, 100)
    })
  }
})
