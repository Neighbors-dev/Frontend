import useAuthStore from '@/stores/authStore'
import { client } from './client'

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
        data: { isMember, authTokens, email, role, nickname },
      },
    } = await client.get(api, {
      params: {
        code,
      },
    })

    const userInfo = {
      email,
      role,
      nickname,
    }

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
      nonMemberLogin(userInfo)
    }

    return { isRegistered: isMember }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}
