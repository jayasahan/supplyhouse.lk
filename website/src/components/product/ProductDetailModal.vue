<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cartStore'
import ProductGallery from '@/components/product/ProductGallery.vue'
import GlassButton from '@/components/ui/GlassButton.vue'
import Loader from '@/components/ui/Loader.vue'

const props = defineProps<{
  productId: number | null
  originRect: DOMRect | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { product, loading, error, fetchProductById } = useProducts()
const cartStore = useCartStore()

const visible = ref(false)
const animating = ref(false)
const modalEl = ref<HTMLElement | null>(null)

// Custom CSS properties for the expand-from-card origin
const originStyle = ref<Record<string, string>>({})

watch(
  () => props.productId,
  async (id) => {
    if (id !== null && id !== undefined) {
      // Calculate the origin transform for expand animation
      if (props.originRect) {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const cx = props.originRect.left + props.originRect.width / 2
        const cy = props.originRect.top + props.originRect.height / 2
        originStyle.value = {
          '--origin-x': `${cx}px`,
          '--origin-y': `${cy}px`,
          '--origin-w': `${props.originRect.width}px`,
          '--origin-h': `${props.originRect.height}px`,
          '--vw': `${vw}px`,
          '--vh': `${vh}px`,
        }
      }

      animating.value = true
      visible.value = true
      document.body.style.overflow = 'hidden'

      await fetchProductById(id)

      await nextTick()
      // Trigger enter animation after a frame
      requestAnimationFrame(() => {
        animating.value = false
      })
    } else {
      handleClose()
    }
  }
)

function handleClose(): void {
  animating.value = true
  setTimeout(() => {
    visible.value = false
    animating.value = false
    product.value = null
    document.body.style.overflow = ''
    emit('close')
  }, 400)
}

function handleAddToCart(): void {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}

function onBackdropClick(e: MouseEvent): void {
  if (e.target === modalEl.value) {
    handleClose()
  }
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') handleClose()
}

watch(visible, (v) => {
  if (v) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="modalEl"
      class="product-detail-modal-overlay"
      :class="{ 'is-closing': animating && !productId }"
      :style="originStyle"
      @click="onBackdropClick"
    >
      <!-- Backdrop -->
      <div class="product-detail-backdrop" :class="{ 'backdrop-visible': !animating || productId }" />

      <!-- Modal Panel -->
      <div
        ref="panelEl"
        class="product-detail-panel"
        :class="{
          'panel-enter': !animating && productId,
          'panel-exit': animating && !productId,
        }"
      >
        <!-- Close Button -->
        <button
          class="absolute right-4 top-4 z-20 rounded-full p-2 text-neutral-400 transition-all duration-300 hover:text-neutral-800 hover:bg-white/30 dark:hover:text-white dark:hover:bg-white/10"
          @click="handleClose"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-32">
          <Loader size="lg" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="flex flex-col items-center justify-center py-32">
          <p class="text-lg text-red-500">{{ error }}</p>
          <GlassButton class="mt-4" @click="handleClose">Close</GlassButton>
        </div>

        <!-- Product Content -->
        <div v-else-if="product" class="grid gap-8 lg:grid-cols-2 p-6 sm:p-8">
          <!-- Gallery -->
          <ProductGallery :images="product.images" :title="product.title" />

          <!-- Details -->
          <div class="flex flex-col gap-5">
            <!-- Category -->
            <span class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              {{ product.brand || product.category }}
            </span>

            <!-- Title -->
            <h1 class="text-2xl font-black text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl">
              {{ product.title }}
            </h1>

            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="flex">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="h-4 w-4"
                  :class="i <= Math.round(product.rating) ? 'text-neutral-800 dark:text-white' : 'text-neutral-200 dark:text-neutral-700'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-sm text-neutral-500">{{ product.rating.toFixed(1) }} rating</span>
              <span class="text-sm text-neutral-400">·</span>
              <span class="text-sm text-neutral-500">{{ product.stock }} in stock</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-3">
              <span class="text-3xl font-black text-neutral-900 dark:text-white">
                ${{ product.price.toFixed(2) }}
              </span>
              <span
                v-if="product.discountPercentage > 10"
                class="text-lg text-neutral-400 line-through"
              >
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
              <span
                v-if="product.discountPercentage > 10"
                class="rounded-full bg-black px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-black"
              >
                -{{ Math.round(product.discountPercentage) }}%
              </span>
            </div>

            <!-- Description -->
            <p class="leading-relaxed text-neutral-600 dark:text-neutral-400">
              {{ product.description }}
            </p>

            <!-- Tags -->
            <div v-if="product.tags?.length" class="flex flex-wrap gap-2">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="rounded-full border px-3 py-1 text-xs font-medium text-neutral-500 border-neutral-200 dark:border-white/10 dark:text-neutral-400"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Add to Cart -->
            <div class="mt-4 flex flex-col gap-3 sm:flex-row">
              <GlassButton size="lg" class="flex-1" @click="handleAddToCart">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ---- Overlay ---- */
.product-detail-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* ---- Backdrop with liquid blur ---- */
.product-detail-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

:where(.dark) .product-detail-backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.product-detail-backdrop.backdrop-visible {
  opacity: 1;
}

/* ---- Panel: Liquid Glass Card ---- */
.product-detail-panel {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 64rem;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 1.5rem;

  /* Liquid glass surface */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.38) 100%
  );
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.12),
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 2px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2);

  /* Initial state – collapsed at card origin */
  opacity: 0;
  transform: scale(0.45) translate(0, 0);
  transform-origin: var(--origin-x, 50%) var(--origin-y, 50%);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-radius 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

:where(.dark) .product-detail-panel {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.5),
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(255, 255, 255, 0.03);
}

/* Entered / expanded state */
.product-detail-panel.panel-enter {
  opacity: 1;
  transform: scale(1) translate(0, 0);
  border-radius: 1.5rem;
}

/* Exit state → shrink back */
.product-detail-panel.panel-exit {
  opacity: 0;
  transform: scale(0.45) translate(0, 0);
  transition:
    opacity 0.35s cubic-bezier(0.4, 0, 1, 1),
    transform 0.35s cubic-bezier(0.4, 0, 1, 1);
}

/* Panel scrollbar styling */
.product-detail-panel::-webkit-scrollbar {
  width: 6px;
}
.product-detail-panel::-webkit-scrollbar-track {
  background: transparent;
}
.product-detail-panel::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
:where(.dark) .product-detail-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}
</style>
