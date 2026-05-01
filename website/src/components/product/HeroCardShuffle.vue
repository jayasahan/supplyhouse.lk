<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/product'
import { productApi } from '@/api/productApi'

const router = useRouter()
const products = ref<Product[]>([])
const activeIndex = ref(0)
const isAnimating = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const VISIBLE_CARDS = 5
const AUTO_INTERVAL = 3000

onMounted(async () => {
  const response = await productApi.getProducts(12)
  products.value = response.products
  startAutoShuffle()
})

onUnmounted(() => {
  stopAutoShuffle()
})

function startAutoShuffle(): void {
  stopAutoShuffle()
  intervalId = setInterval(() => {
    shuffleNext()
  }, AUTO_INTERVAL)
}

function stopAutoShuffle(): void {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function shuffleNext(): void {
  if (isAnimating.value || products.value.length === 0) return
  isAnimating.value = true
  activeIndex.value = (activeIndex.value + 1) % products.value.length
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}

function goToProduct(id: number): void {
  router.push(`/product/${id}`)
}

/** Visible cards: 5 cards centered around activeIndex */
const visibleCards = computed(() => {
  if (products.value.length === 0) return []
  const total = products.value.length
  const cards: { product: Product; offset: number }[] = []
  const half = Math.floor(VISIBLE_CARDS / 2)
  for (let i = -half; i <= half; i++) {
    const idx = ((activeIndex.value + i) % total + total) % total
    const p = products.value[idx]
    if (p) {
      cards.push({ product: p, offset: i })
    }
  }
  return cards
})

/** Card style for fan/wheel arrangement */
function cardStyle(offset: number): Record<string, string> {
  const rotation = offset * 6
  const translateX = offset * 38
  const translateY = Math.abs(offset) * 8
  const scale = offset === 0 ? 1.25 : 1 - Math.abs(offset) * 0.06
  const zIndex = VISIBLE_CARDS - Math.abs(offset)
  const opacity = offset === 0 ? 1 : 1 - Math.abs(offset) * 0.15

  return {
    transform: `translateX(${translateX}%) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
    zIndex: String(zIndex),
    opacity: String(opacity),
  }
}

function renderStars(rating: number): string {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}
</script>

<template>
  <div
    class="hero-shuffle-container"
    @mouseenter="stopAutoShuffle"
    @mouseleave="startAutoShuffle"
  >
    <div class="hero-shuffle-wheel">
      <TransitionGroup name="card-shuffle">
        <button
          v-for="{ product, offset } in visibleCards"
          :key="product.id"
          class="hero-shuffle-card liquid-glass-strong"
          :style="cardStyle(offset)"
          :class="{ 'hero-shuffle-card--active': offset === 0 }"
          @click="goToProduct(product.id)"
        >
          <!-- Image -->
          <div class="hero-shuffle-card__img">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              loading="lazy"
            />
          </div>

          <!-- Info -->
          <div class="hero-shuffle-card__info">
            <h3 class="hero-shuffle-card__title">
              {{ product.title }}
            </h3>
            <div class="hero-shuffle-card__details">
              <div class="hero-shuffle-card__stars">
                <span class="hero-shuffle-card__star-icons">{{ renderStars(product.rating) }}</span>
                <span class="hero-shuffle-card__rating">{{ product.rating.toFixed(1) }}</span>
              </div>
              <div class="hero-shuffle-card__price">
                ${{ product.price.toFixed(2) }}
              </div>
            </div>
          </div>
        </button>
      </TransitionGroup>
    </div>

    <!-- Dot indicators -->
    <div class="hero-shuffle-dots">
      <button
        v-for="(p, i) in products"
        :key="p.id"
        class="hero-shuffle-dot"
        :class="{ 'hero-shuffle-dot--active': i === activeIndex }"
        @click="activeIndex = i"
        :aria-label="`Go to product ${i + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.hero-shuffle-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

.hero-shuffle-wheel {
  position: relative;
  width: 380px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

/* Responsive sizing */
@media (min-width: 640px) {
  .hero-shuffle-wheel {
    width: 480px;
    height: 420px;
  }
}
@media (min-width: 1024px) {
  .hero-shuffle-wheel {
    width: 560px;
    height: 460px;
  }
}

.hero-shuffle-card {
  position: absolute;
  width: 200px;
  height: 300px;
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center;
  will-change: transform, opacity;
  outline: none;
}

@media (min-width: 640px) {
  .hero-shuffle-card {
    width: 220px;
    height: 330px;
  }
}
@media (min-width: 1024px) {
  .hero-shuffle-card {
    width: 240px;
    height: 360px;
  }
}

.hero-shuffle-card:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.5);
  outline-offset: 2px;
}

.hero-shuffle-card--active {
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px) saturate(1.6);
  -webkit-backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.35);
}

:where(.dark) .hero-shuffle-card--active {
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Image: non-active cards fill ~90% height, active card shrinks image to reveal details */
.hero-shuffle-card__img {
  width: 100%;
  overflow: hidden;
  background: #f5f5f5;
  /* flex-grow fills most of the card on non-active */
  flex: 1 1 0%;
  min-height: 0;
  transition: flex 0.6s cubic-bezier(0.34, 1, 0.64, 1);
}

.hero-shuffle-card--active .hero-shuffle-card__img {
  flex: 0 0 auto;
  aspect-ratio: 1 / 1;
}

:where(.dark) .hero-shuffle-card__img {
  background: #262626;
}

.hero-shuffle-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hero-shuffle-card--active:hover .hero-shuffle-card__img img {
  transform: scale(1.08);
}

/* Non-active card is a flex column so image fills most of the space */
.hero-shuffle-card {
  display: flex;
  flex-direction: column;
}

/* Info section */
.hero-shuffle-card__info {
  padding: 0.35rem 0.6rem 0.45rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex-shrink: 0;
}

.hero-shuffle-card__title {
  font-size: 0.65rem;
  font-weight: 700;
  color: #171717;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  transition: font-size 0.5s ease;
}

.hero-shuffle-card--active .hero-shuffle-card__title {
  font-size: 0.9rem;
}

.hero-shuffle-card--active .hero-shuffle-card__info {
  padding: 0.4rem 0.85rem 0.3rem;
  gap: 0.15rem;
}

:where(.dark) .hero-shuffle-card__title {
  color: #ffffff;
}

/* Details (rating + price): hidden on non-active, revealed on active */
.hero-shuffle-card__details {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.5s cubic-bezier(0.34, 1, 0.64, 1),
              opacity 0.4s ease;
}

.hero-shuffle-card--active .hero-shuffle-card__details {
  grid-template-rows: 1fr;
  opacity: 1;
}

.hero-shuffle-card__details > * {
  overflow: hidden;
}

.hero-shuffle-card__stars {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding-top: 0.15rem;
}

.hero-shuffle-card__star-icons {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #171717;
}

:where(.dark) .hero-shuffle-card__star-icons {
  color: #fbbf24;
}

.hero-shuffle-card__rating {
  font-size: 0.65rem;
  color: #a3a3a3;
  font-weight: 600;
}

.hero-shuffle-card__price {
  font-size: 1rem;
  font-weight: 900;
  color: #171717;
  margin-top: 0.1rem;
}

:where(.dark) .hero-shuffle-card__price {
  color: #ffffff;
}

/* Dot navigation */
.hero-shuffle-dots {
  display: flex;
  gap: 0.35rem;
  margin-top: 1.5rem;
}

.hero-shuffle-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #d4d4d4;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.hero-shuffle-dot--active {
  background: #171717;
  width: 24px;
  border-radius: 4px;
}

:where(.dark) .hero-shuffle-dot {
  background: #525252;
}

:where(.dark) .hero-shuffle-dot--active {
  background: #ffffff;
}

/* TransitionGroup animations */
.card-shuffle-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card-shuffle-leave-active {
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
  z-index: 0 !important;
  pointer-events: none;
}

.card-shuffle-enter-from {
  opacity: 0;
  transform: translateX(80%) rotate(12deg) scale(0.7);
}

.card-shuffle-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.8);
}

.card-shuffle-move {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
