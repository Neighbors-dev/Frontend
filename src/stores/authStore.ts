import { Cookies } from 'react-cookie'
import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  nickname: string | null
  accessToken: { value: string; expiresIn: number } | null
  login: (accessToken: TokenType, refreshToken: TokenType, nickname: string | null) => void
}

const cookies = new Cookies()
const NICKNAME_KEY = 'TH-NN'
const REFRESH_TOKEN_KEY = 'TH-RT'
const EXPIRE_OFFSET = 1000 * 60 * 1 // 1분

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!cookies.get(REFRESH_TOKEN_KEY),
  nickname: cookies.get(NICKNAME_KEY) || null,
  accessToken: null,
  login: (accessToken, refreshToken, nickname) => {
    const expires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)

    set({ isLoggedIn: true, accessToken })
    // 리프레시 토큰에 특별 설정?

    cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, {
      path: '/',
      expires,
    })

    if (nickname)
      cookies.set(NICKNAME_KEY, nickname, {
        path: '/',
        expires,
      })
  },
}))

export default useAuthStore
