import useAuthStore from '@/stores/authStore'
import { client } from './client'

export const postLogin = async (code: string) => {
  const login = useAuthStore.getState().login
  let api

  if (process.env.NODE_ENV === 'development') {
    api = '/oauth/kakao/callback2'
  } else {
    api = '/oauth/kakao/callback'
  }

  try {
    const {
      data: {
        data: { isMember, userInfo, authTokens },
      },
    } = await client.get(api, {
      params: {
        code,
      },
    })

    const accessToken = {
      value: authTokens.accessToken,
      expiresIn: authTokens.expiresIn,
    }

    const refreshToken = {
      value: authTokens.refreshToken,
      expiresIn: authTokens.refreshTokenExpiresIn,
    }

    login(accessToken, refreshToken, isMember ? userInfo.nickname : null)

    return { isRegistered: isMember ? !!userInfo.nickname : false }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}
