import { GUEST_INFO_KEY, MEMBER_INFO_KEY, REFRESH_TOKEN_KEY } from '@/constants/key'
import { Cookies } from 'react-cookie'
import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  user: User | null
  accessToken: { value: string; expiresIn: Date } | null
  memberLogin: (accessToken: TokenType, refreshToken: TokenType, user: User) => void
  nonMemberLogin: (user: User) => void
  logout: () => void
  registerNickname: (accessToken: TokenType, refreshToken: TokenType, user: User) => void
  getAccessToken: () => string | null
  getRefreshToken: () => string | undefined
  updateToken: (accessToken: TokenType, refreshToken: TokenType) => void
  updateNickname: (nickname: string) => void
}

const cookies = new Cookies()
const EXPIRE_OFFSET = 1000 * 60 * 1 // 1분

const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: !!cookies.get(MEMBER_INFO_KEY),
  user: (cookies.get(MEMBER_INFO_KEY) || cookies.get(GUEST_INFO_KEY))?.value || null,
  accessToken: null,
  memberLogin: (accessToken, refreshToken, user) => {
    // 닉네임 등록이 완료된 사용자 로그인
    const accessExpires = new Date(accessToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    const refreshExpires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({
      isLoggedIn: true,
      user,
      accessToken: { value: accessToken.value, expiresIn: accessExpires },
    })

    // TODO: 리프레시 토큰에 특별 설정
    const refreshTokenValue = { value: refreshToken.value, expires: refreshExpires }
    const userValue = { value: user, expires: refreshExpires }
    cookies.set(REFRESH_TOKEN_KEY, refreshTokenValue, { path: '/', expires: refreshExpires })
    cookies.set(MEMBER_INFO_KEY, userValue, { path: '/', expires: refreshExpires })
    cookies.remove(GUEST_INFO_KEY, { path: '/' })
  },
  nonMemberLogin: (user) => {
    // 닉네임 등록이 완료되지 않은 사용자 로그인
    set({ isLoggedIn: true, user })
    const userValue = { value: user }
    cookies.set(MEMBER_INFO_KEY, userValue, { path: '/' })
    cookies.remove(GUEST_INFO_KEY, { path: '/' })
  },
  logout: () => {
    set({ isLoggedIn: false, user: null, accessToken: null })
    cookies.remove(REFRESH_TOKEN_KEY, { path: '/' })
    cookies.remove(MEMBER_INFO_KEY, { path: '/' })
  },
  registerNickname: (accessToken, refreshToken, user) => {
    const accessExpires = new Date(accessToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({ user, accessToken: { value: accessToken.value, expiresIn: accessExpires } })

    if (get().isLoggedIn) {
      const expires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)

      // TODO: 리프레시 토큰에 특별 설정
      const refreshTokenValue = { value: refreshToken.value, expires }
      const userValue = { value: user, expires }
      cookies.set(REFRESH_TOKEN_KEY, refreshTokenValue, { path: '/', expires })
      cookies.set(MEMBER_INFO_KEY, userValue, { path: '/', expires })
    } else {
      const refreshTokenValue = { value: refreshToken.value }
      const userValue = { value: user }
      cookies.set(REFRESH_TOKEN_KEY, refreshTokenValue, { path: '/' })
      cookies.set(GUEST_INFO_KEY, userValue, { path: '/' })
    }
  },
  getAccessToken: () => {
    const accessToken = get().accessToken

    if (!accessToken) return null

    return accessToken.expiresIn.getTime() > Date.now() ? accessToken.value : null
  },
  getRefreshToken: () => cookies.get(REFRESH_TOKEN_KEY).value,
  updateToken: (accessToken, refreshToken) => {
    const accessExpires = new Date(accessToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    const refreshExpires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({ accessToken: { value: accessToken.value, expiresIn: accessExpires } })

    const refreshTokenValue = { value: refreshToken.value, expires: refreshExpires }
    cookies.set(REFRESH_TOKEN_KEY, refreshTokenValue, { path: '/', expires: refreshExpires })

    if (get().isLoggedIn) {
      const userValue = { value: get().user, expires: refreshExpires }
      cookies.set(MEMBER_INFO_KEY, userValue, { path: '/', expires: refreshExpires })
    }
  },
  updateNickname: (nickname: string) => {
    if (get().isLoggedIn) {
      console.log(cookies.get(MEMBER_INFO_KEY).expires)
      const expires = new Date(cookies.get(MEMBER_INFO_KEY).expires)
      expires.setMinutes(expires.getMinutes() - expires.getTimezoneOffset())

      const user = { ...get().user, nickname }
      set({ user })

      const userValue = { value: user, expires }
      cookies.set(MEMBER_INFO_KEY, userValue, { path: '/', expires })
    } else {
      const user = { ...get().user, nickname }
      set({ user })

      const userValue = { value: user }
      cookies.set(GUEST_INFO_KEY, userValue, { path: '/' })
    }
  },
}))

export default useAuthStore
