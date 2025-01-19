import useAuthStore from '@/stores/authStore'
import axios from 'axios'
import { getAccessToken } from './auth'

export const guestClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

client.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().getAccessToken()
  console.log(accessToken)
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

let retry = false

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.data.status === 'JWT_ERROR' && !retry) {
      retry = true

      try {
        await getAccessToken()
        const accessToken = useAuthStore.getState().accessToken

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return client(originalRequest)
      } catch {
        // 토큰 재발급 실패 시 로그아웃
        if (window.confirm('토큰 재발급에 실패했습니다. 다시 로그인하시겠습니까?')) {
          useAuthStore.getState().logout()
          window.location.href = '/login'
        }
      } finally {
        retry = false
      }
    }
    return Promise.reject(error)
  }
)
