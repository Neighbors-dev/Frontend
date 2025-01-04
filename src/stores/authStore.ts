import { Cookies } from 'react-cookie'
import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  accessToken: { value: string; expiresIn: number } | null
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
  login: (tokenData: LoginTokenType) => void
  logout: () => void
}

const cookies = new Cookies()
const REFRESH_TOKEN_KEY = 'TH-RT'

const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  //accessToken: null,
  // 액세스 토큰 재발급 API 전까지만 사용
  accessToken: sessionStorage.getItem('accessToken')
    ? JSON.parse(sessionStorage.getItem('accessToken')!)
    : null,
  getAccessToken: () => {
    const accessToken = get().accessToken
    if (!accessToken) return null

    if (Date.now() > accessToken.expiresIn) {
      get().logout()
      return null
    }

    return accessToken.value
  },
  getRefreshToken: () => {
    return cookies.get(REFRESH_TOKEN_KEY)
  },
  login: ({ accessToken, refreshToken }) => {
    console.log(accessToken, refreshToken, new Date(refreshToken.expiresIn))
    set({ isLoggedIn: true, accessToken })
    cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, {
      path: '/',
      expires: new Date(refreshToken.expiresIn),
    })
    // 액세스 토큰 재발급 API 전까지만 사용
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken.value))
  },
  logout: () => {
    set({ isLoggedIn: false, accessToken: null })
    cookies.remove(REFRESH_TOKEN_KEY)
    // 액세스 토큰 재발급 API 전까지만 사용
    sessionStorage.removeItem('accessToken')
  },
}))

export default useAuthStore
