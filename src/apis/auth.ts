import useAuthStore from '@/stores/authStore'
import { client, guestClient } from './client'

export const getKakaoLogin = async (code: string) => {
  const { memberLogin, nonMemberLogin } = useAuthStore.getState()

  const api =
    process.env.NODE_ENV === 'development' ? '/oauth/kakao/callback2' : '/oauth/kakao/callback'

  try {
    const {
      data: {
        data: { isMember, authTokens, email, userInfo },
      },
    } = await guestClient.get(api, { params: { code } })

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
    const errorMessage =
      error instanceof Error ? error.message : '카카오 로그인 중 오류가 발생했습니다.'
    throw new Error(errorMessage)
  }
}

export const getAccessToken = async () => {
  const updateToken = useAuthStore.getState().updateToken
  const refreshToken = useAuthStore.getState().getRefreshToken()
  // TODO: 데이터 구조 확인
  try {
    if (!refreshToken) {
      throw new Error('Refresh token is not found')
    }

    const {
      data: {
        data: { authTokens },
      },
    } = await client.get('/auth/refreshToken', {
      params: {
        refreshToken,
      },
    })

    const at = {
      value: authTokens.accessToken,
      expiresIn: authTokens.expiresIn,
    }

    const rt = {
      value: authTokens.refreshToken,
      expiresIn: authTokens.refreshTokenExpiresIn,
    }

    updateToken(at, rt)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw new Error('토큰 재발급 실패')
  }
}
