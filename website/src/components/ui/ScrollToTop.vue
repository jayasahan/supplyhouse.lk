<script setup lang="ts"> 
import { ref, onMounted, onUnmounted } from 'vue'  // Import necessary functions from Vue for reactive state and lifecycle hooks

const visible = ref(false)  // Create a reactive reference named 'visible' initialized to false, which will be used to control the visibility of the scroll-to-top button based on the user's scroll position on the page.

function handleScroll() {    // Define a function named 'handleScroll' that will be called whenever the user scrolls the page. This function checks the vertical scroll position (window.scrollY) and sets the 'visible' reference to true if the scroll position is greater than 300 pixels, and false otherwise. This means that the scroll-to-top button will only become visible when the user has scrolled down more than 300 pixels from the top of the page.
  visible.value = window.scrollY > 300
}

function scrollToTop() {    // Define a function named 'scrollToTop' that will be called when the user clicks the scroll-to-top button. This function uses the window.scrollTo method to smoothly scroll the page back to the top (top: 0) with a smooth scrolling behavior (behavior: 'smooth').
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))   // Use the onMounted lifecycle hook to add an event listener for the 'scroll' event on the window object when the component is mounted. The 'handleScroll' function will be called whenever the user scrolls, and the { passive: true } option is used to improve scrolling performance by indicating that the event listener will not call preventDefault().
onUnmounted(() => window.removeEventListener('scroll', handleScroll))    // Use the onUnmounted lifecycle hook to remove the 'scroll' event listener from the window object when the component is unmounted, preventing potential memory leaks and ensuring that the event listener does not continue to run after the component is destroyed.
</script>

<template>
  <Transition name="scroll-btn">   // Use a Vue Transition component to wrap the scroll-to-top button, applying the 'scroll-btn' transition classes defined in the scoped styles below. This will create a smooth fade and slide effect when the button appears and disappears based on the user's scroll position.
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


// Scoped styles for the scroll-to-top button, defining the transition effects for when the button enters and leaves the DOM. The button will fade in and slide up when it appears, and fade out and slide down when it disappears, creating a smooth and visually appealing effect for the user.
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
