import useAuthStore from '@/stores/authStore'
import { client, guestClient } from './client'

export const putNickname = async (nickname: string) => {
  try {
    const data = await client.put('/user/name', { nickname })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const postSignout = async (reason: string, opinion: string | null) => {
  try {
    await client.post('/user/signout', {
      reasonCategory: reason,
      opinionForService: opinion,
    })
    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

export const postLogout = async () => {
  const logout = useAuthStore.getState().logout

  try {
    await client.post('/user/logout')
    logout()
    return true
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
