<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
  title: string
}>()

const selectedIndex = ref(0)

function selectImage(index: number): void {
  selectedIndex.value = index
}

const currentImage = ref(props.images[0])

function setImage(index: number): void {
  selectImage(index)
  currentImage.value = props.images[index]
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Main Image -->
    <div class="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
      <Transition name="fade" mode="out-in">
        <img
          :key="currentImage"
          :src="currentImage"
          :alt="title"
          class="h-full w-full object-cover"
        />
      </Transition>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="(img, index) in images"
        :key="img"
        :class="[
          'h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300',
          selectedIndex === index
            ? 'border-black dark:border-white ring-2 ring-black/20 dark:ring-white/20'
            : 'border-transparent opacity-60 hover:opacity-100',
        ]"
        @click="setImage(index)"
      >
        <img :src="img" :alt="`${title} thumbnail ${index + 1}`" class="h-full w-full object-cover" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
