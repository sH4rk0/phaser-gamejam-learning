<template>
  <!-- WhatsApp-style bubble for tutor type -->
  <div
    v-if="props.type === 'tutor'"
    class="rounded-xl my-6 px-4 py-5"
    style="background: #EFEAE2;"
  >
    <div class="flex items-start gap-3">
      <img
        v-if="props.avatar"
        :src="props.avatar"
        class="w-11 h-11 rounded-full object-cover shrink-0"
        style="margin-top: -10px;"
      />
      <div class="relative flex-1 min-w-0">
        <!-- bubble tail -->
        <div
          class="absolute -left-2 top-3 w-0 h-0"
          style="border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-right: 10px solid #FFFFFF;"
        />
        <!-- bubble body -->
        <div
          class="rounded-lg rounded-tl-none px-4 py-3"
          style="background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.15);"
        >
          <div style="font-size: 0.8rem; font-weight: 600; color: #00A884; margin-bottom: 6px;">
            Francesco
          </div>
          <div class="tutor-bubble text-sm leading-relaxed">
            <slot />
          </div>
          <div class="flex items-center justify-end gap-1 mt-1">
            <span style="font-size: 0.65rem; color: #667781;">15:42</span>
            <svg width="16" height="11" viewBox="0 0 16 11" style="color: #53BDEB;">
              <path d="M11.071.653a.5.5 0 0 0-.707.707l.707-.707zM5 6.5l-.354.354a.5.5 0 0 0 .707 0L5 6.5zm-3.646-2.146a.5.5 0 1 0-.707.707l.707-.707zm9.324-3.347-5.678 5.639.707.708 5.678-5.64-.707-.707zM5.354 6.854l-4-4-.707.707 4 4 .707-.707z" fill="currentColor"/>
              <path d="M15.071.653a.5.5 0 0 0-.707.707l.707-.707zm-5 5.847-.354.354a.5.5 0 0 0 .707 0L10.071 6.5zm-1.646-1.146a.5.5 0 1 0-.707.707l.707-.707zm6.646-4.347-5.678 5.639.707.708 5.678-5.64-.707-.707zM10.425 6.854l-2-2-.707.707 2 2 .707-.707z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Default layout for all other types -->
  <div
    v-else
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
  type: 'tip' | 'warning' | 'new' | 'deprecated' | 'tutor'
  avatar?: string
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
  tutor: {
    icon: 'i-heroicons-user-circle',
    iconColor: '#6C3FE8',
    borderColor: '#6C3FE8',
    bg: 'rgba(108, 63, 232, 0.07)',
  },
}

const current = computed(() => config[props.type])

const boxStyle = computed(() => ({
  borderLeftColor: current.value.borderColor,
  backgroundColor: current.value.bg,
}))
</script>
