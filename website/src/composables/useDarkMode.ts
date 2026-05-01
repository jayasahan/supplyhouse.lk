import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

export function useDarkMode() {
  const uiStore = useUiStore()
  const { isDarkMode } = storeToRefs(uiStore)

  function toggleTheme(): void {
    uiStore.toggleTheme()
  }

  return {
    isDarkMode,
    toggleTheme,
  }
}
