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
        data: { authTokens },
      },
    } = await client.get(api, {
      params: {
        code,
      },
    })

    const token: LoginTokenType = {
      accessToken: {
        value: authTokens.accessToken,
        expiresIn: authTokens.expiresIn + Date.now(),
      },
      refreshToken: {
        value: authTokens.refreshToken,
        expiresIn: authTokens.refreshTokenExpiresIn + Date.now(),
      },
    }
    login(token)

    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}
