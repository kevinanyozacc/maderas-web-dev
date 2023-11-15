import create from 'zustand'
import { User } from '../../interface'

interface AuthStore {
  user: User
  isAuth: boolean
  isLoading: boolean
  logoutAction: () => void
  loginAction: (user: User) => void
}

export const useAuth = create<AuthStore>((set) => ({
  isAuth: false,
  isLoading: false,
  user: { roles: null, username: '', userId: null, sedeId: null },
  loginAction: (user: User) => set({ isAuth: true, user }),
  logoutAction: () => {
    set({ isAuth: false, user: { roles: null, username: '', userId: null, sedeId: null } })
  }
}))
