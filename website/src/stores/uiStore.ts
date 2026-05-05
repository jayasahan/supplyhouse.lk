import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUiStore = defineStore('ui', () => {         // Define a Pinia store named 'ui' to manage the user interface state, specifically for handling dark mode preferences
  const isDarkMode = ref(false) 

  function initialize(): void {   // Function to initialize the UI store by checking for a stored dark mode preference in localStorage and applying the appropriate theme
    const stored = localStorage.getItem('supplyhouse_darkmode')
    if (stored !== null) {
      isDarkMode.value = stored === 'true'       // If a stored preference is found in localStorage, set the isDarkMode ref to true or false based on the stored value (which is a string), ensuring that the user's preference is respected across sessions
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches   // If no stored preference is found, check the user's system preference for dark mode using the matchMedia API and set the isDarkMode ref accordingly, providing a sensible default based on the user's environment
    }
    applyTheme()   // Apply the theme based on the initialized isDarkMode value to ensure that the UI reflects the correct theme when the application loads
  }

  function applyTheme(): void {  // Function to apply the selected theme by adding or removing the 'dark' class on the root HTML element and setting the color scheme accordingly
    const root = document.documentElement
    if (isDarkMode.value) {
      root.classList.add('dark')   // If dark mode is enabled, add the 'dark' class to the root
      root.style.colorScheme = 'dark'   //  Set the color scheme to 'dark' to ensure that built-in browser elements (like scrollbars and form controls) also adapt to the dark theme, providing a consistent user experience
    } else {
      root.classList.remove('dark')   // If dark mode is disabled, remove the 'dark' class from the root
      root.style.colorScheme = 'light'   // Set the color scheme to 'light' to ensure that built-in browser elements adapt to the light theme, maintaining visual consistency across the application when dark mode is turned off
    }
  }

  function toggleTheme(): void {  // Function to toggle between dark and light themes by updating the isDarkMode ref, storing the preference in localStorage, and applying the new theme
    isDarkMode.value = !isDarkMode.value   // Toggle the value of isDarkMode to switch between true and false, allowing the user to switch themes
    localStorage.setItem('supplyhouse_darkmode', String(isDarkMode.value))  // Store the updated dark mode preference in localStorage as a string to ensure that the user's choice is saved across sessions, allowing them to maintain their preferred theme even after closing and reopening the browser
    applyTheme()  // Apply the new theme immediately after toggling to ensure that the UI updates to reflect the user's choice without delay, providing a responsive and seamless experience when switching themes
  }

  watch(isDarkMode, () => {
    applyTheme()                  // Watch for changes to the isDarkMode ref and apply the theme whenever it changes, ensuring that the UI updates immediately when the theme is toggled
  })

  return { isDarkMode, initialize, toggleTheme }  // Return the isDarkMode ref, initialize function, and toggleTheme function to be used in components that import this store
})
