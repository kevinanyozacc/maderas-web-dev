import create from 'zustand'

type Theme = 'light' | 'dark'

interface StoreTheme {
  theme: Theme
  isDark: boolean
  isLight: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useTheme = create<StoreTheme>((set, _get) => ({
  theme: 'light',
  isDark: true,
  isLight: false,
  setTheme: (theme: Theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
}))