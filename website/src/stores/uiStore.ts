import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isDarkMode = ref(false)

  function initialize(): void {
    const stored = localStorage.getItem('supplyhouse_darkmode')
    if (stored !== null) {
      isDarkMode.value = stored === 'true'
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function applyTheme(): void {
    const root = document.documentElement
    if (isDarkMode.value) {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }

  function toggleTheme(): void {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('supplyhouse_darkmode', String(isDarkMode.value))
    applyTheme()
  }

  watch(isDarkMode, () => {
    applyTheme()
  })

  return { isDarkMode, initialize, toggleTheme }
})
