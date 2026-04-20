<template>
  <div
    class="flex gap-3 p-4 rounded-lg my-4 border-l-4"
    :style="boxStyle"
  >
    <UIcon :name="current.icon" class="w-5 h-5 mt-0.5 shrink-0" :style="{ color: current.iconColor }" />
    <div class="text-sm leading-relaxed" style="color: var(--color-text);">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'tip' | 'warning' | 'new' | 'deprecated'
}>()

const config = {
  tip: {
    icon: 'i-heroicons-light-bulb',
    iconColor: '#00D4FF',
    borderColor: '#00D4FF',
    bg: 'rgba(0, 212, 255, 0.05)',
  },
  warning: {
    icon: 'i-heroicons-exclamation-triangle',
    iconColor: '#F59E0B',
    borderColor: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.05)',
  },
  new: {
    icon: 'i-heroicons-sparkles',
    iconColor: '#E840E0',
    borderColor: '#E840E0',
    bg: 'rgba(232, 64, 224, 0.05)',
  },
  deprecated: {
    icon: 'i-heroicons-x-circle',
    iconColor: '#6B7280',
    borderColor: '#6B7280',
    bg: 'rgba(107, 114, 128, 0.05)',
  },
}

const current = computed(() => config[props.type])

const boxStyle = computed(() => ({
  borderLeftColor: current.value.borderColor,
  backgroundColor: current.value.bg,
}))
</script>
