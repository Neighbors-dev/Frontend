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
const REFRESH_TOKEN_KEY = 'TH-RT'
const MEMBER_INFO_KEY = 'TH-MI'
const GUEST_INFO_KEY = 'TH-GI'
const EXPIRE_OFFSET = 1000 * 60 * 1 // 1분

const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: !!cookies.get(MEMBER_INFO_KEY),
  user: cookies.get(MEMBER_INFO_KEY) || cookies.get(GUEST_INFO_KEY) || null,
  accessToken: null,
  memberLogin: (accessToken, refreshToken, user) => {
    // 닉네임 등록이 완료된 사용자 로그인
    console.log('memberLogin')
    const accessExpires = new Date(accessToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    const refreshExpires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({
      isLoggedIn: true,
      user,
      accessToken: { value: accessToken.value, expiresIn: accessExpires },
    })
    console.log(accessToken)

    // TODO: 리프레시 토큰에 특별 설정
    cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, { path: '/', expires: refreshExpires })
    cookies.set(MEMBER_INFO_KEY, user, { path: '/', expires: refreshExpires })
    cookies.remove(GUEST_INFO_KEY, { path: '/' })
  },
  nonMemberLogin: (user) => {
    // 닉네임 등록이 완료되지 않은 사용자 로그인
    console.log('nonMemberLogin')
    set({ isLoggedIn: true, user })
    cookies.set(MEMBER_INFO_KEY, user, { path: '/' })
    cookies.remove(GUEST_INFO_KEY, { path: '/' })
  },
  logout: () => {
    set({ isLoggedIn: false, user: null, accessToken: null })
    cookies.remove(REFRESH_TOKEN_KEY, { path: '/' })
    cookies.remove(MEMBER_INFO_KEY, { path: '/' })
  },
  registerNickname: (accessToken, refreshToken, user) => {
    console.log('registerNickname')
    const accessExpires = new Date(accessToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({ user, accessToken: { value: accessToken.value, expiresIn: accessExpires } })

    if (get().isLoggedIn) {
      const expires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)

      // TODO: 리프레시 토큰에 특별 설정
      cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, { path: '/', expires })
      cookies.set(MEMBER_INFO_KEY, user, { path: '/', expires })
    } else {
      cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, { path: '/' })
      cookies.set(GUEST_INFO_KEY, user, { path: '/' })
    }
  },
  getAccessToken: () => {
    const accessToken = get().accessToken
    console.log(accessToken, !accessToken)

    if (!accessToken) return null

    return accessToken.expiresIn.getTime() > Date.now() ? accessToken.value : null
  },
  getRefreshToken: () => cookies.get(REFRESH_TOKEN_KEY),
  updateToken: (accessToken, refreshToken) => {
    const accessExpires = new Date(accessToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    const refreshExpires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({ accessToken: { value: accessToken.value, expiresIn: accessExpires } })
    cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, { path: '/', expires: refreshExpires })

    if (get().isLoggedIn) {
      cookies.set(MEMBER_INFO_KEY, get().user, { path: '/', expires: refreshExpires })
    }
  },
  updateNickname: (nickname: string) => {
    if (get().isLoggedIn) {
      const expires = cookies.get(MEMBER_INFO_KEY)?.expires

      const user = { ...get().user, nickname }
      set({ user })
      cookies.set(MEMBER_INFO_KEY, user, { path: '/', expires })
    } else {
      const user = { ...get().user, nickname }
      set({ user })
      cookies.set(GUEST_INFO_KEY, user, { path: '/' })
    }
  },
}))

export default useAuthStore
