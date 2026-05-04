import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isDarkMode = ref(false)

  function initialize(): void {   // Function to initialize the UI store by checking for a stored dark mode preference in localStorage and applying the appropriate theme
    const stored = localStorage.getItem('supplyhouse_darkmode')
    if (stored !== null) {
      isDarkMode.value = stored === 'true'
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function applyTheme(): void {  // Function to apply the selected theme by adding or removing the 'dark' class on the root HTML element and setting the color scheme accordingly
    const root = document.documentElement
    if (isDarkMode.value) {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }

  function toggleTheme(): void {  // Function to toggle between dark and light themes by updating the isDarkMode ref, storing the preference in localStorage, and applying the new theme
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('supplyhouse_darkmode', String(isDarkMode.value))
    applyTheme()
  }

  watch(isDarkMode, () => {
    applyTheme()
  })

  return { isDarkMode, initialize, toggleTheme }
})
