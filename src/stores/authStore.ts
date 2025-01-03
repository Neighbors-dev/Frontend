import { create } from 'zustand'

interface AuthStore {
  isLogged: boolean
  accessToken: string
  //user: User
  setAccessToken: (accessToken: string) => void
  setRefreshToken: (refreshToken: string) => void
  //setUser: (user: User) => void
  login: () => void
  logout: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  isLogged: false,
  accessToken: '',
  //user: null,
  setAccessToken: (accessToken) => set({ isLogged: true, accessToken }),
  setRefreshToken: (refreshToken) => {
    // 쿠키에 리프레시 토큰 저장
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=60*60*24*7`
    
  },
  //setUser: (user) => set({ isLogged: true, user }),
  login: () => set({ isLogged: true }),
  logout: () => set({ isLogged: false, accessToken: '' }),
}))

export default useAuthStore
