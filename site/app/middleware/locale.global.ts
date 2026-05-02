export default defineNuxtRouteMiddleware((to) => {
  const locale = to.params.locale
  if (locale && !['it', 'en'].includes(locale as string)) {
    return navigateTo('/it')
  }
})
