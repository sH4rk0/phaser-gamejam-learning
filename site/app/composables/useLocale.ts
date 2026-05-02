import { getSectionPath } from '~/data/chapters'

export type Locale = 'it' | 'en'

export function useLocale() {
  const route = useRoute()
  const locale = computed((): Locale => {
    const l = route.params.locale as string
    return l === 'en' ? 'en' : 'it'
  })
  const sectionPath = computed(() => getSectionPath(locale.value))
  return { locale, sectionPath }
}
