<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <Transition name="scroll-btn">
    <button
      v-show="visible"
      @click="scrollToTop"
      aria-label="Scroll to top"
      class="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full
             liquid-glass text-neutral-700 shadow-lg transition-all duration-300
             hover:scale-110 hover:shadow-xl active:scale-95
             dark:text-white cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-btn-enter-active,
.scroll-btn-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.scroll-btn-enter-from,
.scroll-btn-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
