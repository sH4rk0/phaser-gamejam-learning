<template>
  <a
    :href="href"
    :target="isExternal ? '_blank' : target"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps({
  href: { type: String, default: '' },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined },
})

const isExternal = computed(
  () => props.href.startsWith('http://') || props.href.startsWith('https://')
)
</script>
