<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/90" />
        
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          @click.stop="close"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6 text-white" />
        </button>
        
        <!-- Image -->
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="relative max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  imageSrc: string
  imageAlt: string
}>()

const emit = defineEmits<{
  close: []
}>()

function close() {
  emit('close')
}

// Close on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      close()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
