<script setup lang="ts">
defineProps<{
  show: boolean   //  Define a prop named 'show' of type boolean, which will be used to control the visibility of the modal. When 'show' is true, the modal will be displayed; when false, it will be hidden. This prop allows the parent component to manage the state of the modal's visibility and trigger it to open or close as needed.
}>()

defineEmits<{
  close: []   // Define an event named 'close' that can be emitted by the modal component. This event does not carry any payload (indicated by the empty array), and it will be emitted when the user clicks on the backdrop or the close button within the modal. The parent component can listen for this 'close' event to update its state and hide the modal accordingly, allowing for a seamless user experience when interacting with the modal.
}>()   
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="$emit('close')"
        />
        <div
          class="relative z-10 w-full max-w-lg rounded-2xl liquid-glass-strong p-6 shadow-2xl"
        >
          <button
            class="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-white"
            @click="$emit('close')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>
