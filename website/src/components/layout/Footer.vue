<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="relative overflow-hidden border-t border-neutral-200/60 dark:border-white/10 bg-neutral-50 dark:bg-neutral-950 transition-colors">
    <!-- Subtle decorative gradient -->
    <div class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-3xl dark:from-indigo-500/[0.03] dark:via-purple-500/[0.03] dark:to-pink-500/[0.03]"></div>

    <div class="relative mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <h3 class="text-2xl font-black tracking-tight text-black dark:text-white">
            SUPPLY<span class="text-neutral-400 dark:text-neutral-500">HOUSE</span>
          </h3>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Your one-stop department store — quality products across every category, curated and delivered to your door with care.
          </p>
          <!-- Social row -->
          <div class="mt-5 flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition-all hover:bg-black hover:text-white dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white dark:hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition-all hover:bg-black hover:text-white dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white dark:hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="mailto:supplyhouse.lk@gmail.com" aria-label="Email"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition-all hover:bg-black hover:text-white dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white dark:hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
            Navigate
          </h4>
          <nav class="mt-4 flex flex-col gap-2.5">
            <RouterLink to="/" class="group flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <span class="h-px w-0 bg-current transition-all group-hover:w-3"></span>
              Browse All
            </RouterLink>
            <RouterLink to="/login" class="group flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <span class="h-px w-0 bg-current transition-all group-hover:w-3"></span>
              Account
            </RouterLink>
            <RouterLink to="/cart" class="group flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <span class="h-px w-0 bg-current transition-all group-hover:w-3"></span>
              Cart
            </RouterLink>
            <RouterLink to="/admin" class="group flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <span class="h-px w-0 bg-current transition-all group-hover:w-3"></span>
              Dashboard
            </RouterLink>
          </nav>
        </div>

        <!-- About -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
            About
          </h4>
          <div class="mt-4 flex flex-col gap-2.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span>SupplyHouse is a modern e-commerce storefront built as a university project for <strong class="font-medium text-neutral-700 dark:text-neutral-300">CS3404 — GUI Programming</strong>.</span>
            <span>Crafted with Vue 3, TypeScript &amp; Tailwind CSS. Product data served by the DummyJSON API.</span>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
            Get in Touch
          </h4>
          <div class="mt-4 flex flex-col gap-3">
            <a href="mailto:supplyhouse.lk@gmail.com"
              class="group flex items-start gap-2.5 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="mt-0.5 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              supplyhouse.lk@gmail.com
            </a>
            <span class="flex items-start gap-2.5 text-sm text-neutral-500 dark:text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="mt-0.5 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Colombo, Sri Lanka
            </span>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="mt-12 flex flex-col items-center gap-3 border-t border-neutral-200/60 pt-6 dark:border-white/10 sm:flex-row sm:justify-between">
        <p class="text-xs text-neutral-400 dark:text-neutral-500">
          &copy; {{ new Date().getFullYear() }} SUPPLYHOUSE. All rights reserved.
        </p>
        <p class="text-xs text-neutral-400 dark:text-neutral-500">
          Built with <span class="font-medium text-neutral-500 dark:text-neutral-400">Vue 3</span> &middot; <span class="font-medium text-neutral-500 dark:text-neutral-400">TypeScript</span> &middot; <span class="font-medium text-neutral-500 dark:text-neutral-400">Tailwind CSS</span>
        </p>
      </div>
    </div>
  </footer>
</template>
