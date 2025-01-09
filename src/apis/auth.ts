import useAuthStore from '@/stores/authStore'
import { guestClient } from './client'

export const postLogin = async (code: string) => {
  const memberLogin = useAuthStore.getState().memberLogin
  const nonMemberLogin = useAuthStore.getState().nonMemberLogin

  let api

  if (process.env.NODE_ENV === 'development') {
    api = '/oauth/kakao/callback2'
  } else {
    api = '/oauth/kakao/callback'
  }

  try {
    const {
      data: {
        data: { isMember, authTokens, email, userInfo },
      },
    } = await guestClient.get(api, {
      params: {
        code,
      },
    })

    if (isMember) {
      const accessToken = {
        value: authTokens.accessToken,
        expiresIn: authTokens.expiresIn,
      }

      const refreshToken = {
        value: authTokens.refreshToken,
        expiresIn: authTokens.refreshTokenExpiresIn,
      }

      memberLogin(accessToken, refreshToken, userInfo)
    } else {
      nonMemberLogin({ email })
    }

    return { isRegistered: isMember }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

export const postNickname = async (userInfo: User) => {
  const registerNickname = useAuthStore.getState().registerNickname

  try {
    const {
      data: {
        data: { authTokens },
      },
    } = await guestClient.post('/user/auth', userInfo)

    const accessToken = {
      value: authTokens.accessToken,
      expiresIn: authTokens.expiresIn,
    }

    const refreshToken = {
      value: authTokens.refreshToken,
      expiresIn: authTokens.refreshTokenExpiresIn,
    }

    registerNickname(accessToken, refreshToken, userInfo)

    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

/* export const refreshAccessToken = async (refreshToken: string) => {
  // TODO: 데이터 구조 확인
  try {
    const {
      data: { data },
    } = await client.get('/auth/refreshToken', {
      params: {
        refreshToken,
      },
    })

    console.log(data)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
} */
