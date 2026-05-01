<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found-page">
    <!-- Animated background orbs -->
    <div class="glass-orb orb-1"></div>
    <div class="glass-orb orb-2"></div>
    <div class="glass-orb orb-3"></div>

    <div class="not-found-content">
      <!-- Liquid Glass 404 -->
      <div class="liquid-glass-404">
        <span class="digit" data-digit="4">4</span>
        <span class="digit zero" data-digit="0">0</span>
        <span class="digit" data-digit="4">4</span>
      </div>

      <!-- Subtext -->
      <h2 class="not-found-title">Page Not Found</h2>
      <p class="not-found-desc">
        Oops — the page you're looking for has drifted into the void.
      </p>

      <!-- CTA Button -->
      <RouterLink to="/" class="cta-button liquid-glass liquid-glass-hover">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        See Available Products
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4rem);
  overflow: hidden;
  padding: 2rem;
}

/* Floating orbs */
.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%);
  top: -100px;
  left: -100px;
  animation: float-orb 8s ease-in-out infinite;
}
.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%);
  bottom: -80px;
  right: -80px;
  animation: float-orb 10s ease-in-out infinite reverse;
}
.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.25), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-orb 12s ease-in-out infinite 2s;
}

@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
}

.not-found-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ---- Liquid Glass 404 Digits ---- */
.liquid-glass-404 {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.digit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 150px;
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  border-radius: 28px;
  color: rgba(0, 0, 0, 0.7);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.18) 100%
  );
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -2px 4px rgba(255, 255, 255, 0.1);
  animation: digit-float 4s ease-in-out infinite;
  user-select: none;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.digit:hover {
  transform: translateY(-8px) scale(1.05);
}

.digit.zero {
  animation-delay: 0.4s;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.3) 0%,
    rgba(236, 72, 153, 0.15) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );
}

:where(.dark) .digit {
  color: rgba(255, 255, 255, 0.85);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(255, 255, 255, 0.02);
}

:where(.dark) .digit.zero {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(236, 72, 153, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

@keyframes digit-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Text */
.not-found-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #171717;
  margin: 0;
}
:where(.dark) .not-found-title {
  color: #ffffff;
}

.not-found-desc {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #737373;
  max-width: 340px;
}
:where(.dark) .not-found-desc {
  color: #a3a3a3;
}

/* CTA Button */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 0.85rem 1.75rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #171717;
  text-decoration: none;
  cursor: pointer;
}
:where(.dark) .cta-button {
  color: #f5f5f5;
}

/* Responsive */
@media (max-width: 480px) {
  .digit {
    width: 80px;
    height: 105px;
    font-size: 4rem;
    border-radius: 20px;
  }
  .liquid-glass-404 {
    gap: 0.65rem;
  }
}
</style>
