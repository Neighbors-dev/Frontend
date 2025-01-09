import { Cookies } from 'react-cookie'
import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  user: User | null
  accessToken: { value: string; expiresIn: number } | null
  memberLogin: (accessToken: TokenType, refreshToken: TokenType, user: User) => void
  nonMemberLogin: (user: User) => void
  //nonMemberLogin: () => void
  //getRefreshToken: () => string | undefined
}

const cookies = new Cookies()
const REFRESH_TOKEN_KEY = 'TH-RT'
const MEMBER_INFO_KEY = 'TH-MI'
const GUEST_INFO_KEY = 'TH-GI'
//const NICKNAME_KEY = 'TH-NN'
const EXPIRE_OFFSET = 1000 * 60 * 1 // 1분

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!cookies.get(MEMBER_INFO_KEY),
  user: cookies.get(MEMBER_INFO_KEY) || cookies.get(GUEST_INFO_KEY) || null,
  accessToken: null,
  memberLogin: (accessToken, refreshToken, user) => {
    // 닉네임 등록이 완료된 사용자 로그인
    console.log('memberLogin')
    const expires = new Date(refreshToken.expiresIn + Date.now() - EXPIRE_OFFSET)
    set({ isLoggedIn: true, user, accessToken })

    // TODO: 리프레시 토큰에 특별 설정
    cookies.set(REFRESH_TOKEN_KEY, refreshToken.value, {
      path: '/',
      expires,
    })

    cookies.set(MEMBER_INFO_KEY, user, {
      path: '/',
      expires,
    })
  },
  nonMemberLogin: (user) => {
    // 닉네임 등록이 완료되지 않은 사용자 로그인
    console.log('nonMemberLogin')
    set({ isLoggedIn: true, user })
    cookies.set(MEMBER_INFO_KEY, user, {
      path: '/',
    })
  },
  /*getRefreshToken: () => cookies.get(REFRESH_TOKEN_KEY), */
}))

export default useAuthStore
