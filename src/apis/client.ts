import useAuthStore from '@/stores/authStore'
import axios from 'axios'
import { refreshAccessToken } from './auth'

export const mockingClient = axios.create({
  baseURL: '',
})

export const guestClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

client.interceptors.request.use((config) => {
  console.log('client.interceptors.request.use')
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
    if (error.response?.status === 401 && !retry) {
      retry = true

      try {
        refreshAccessToken()
        const accessToken = useAuthStore.getState().accessToken

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return client(originalRequest)
      } catch {
        // 토큰 재발급 실패 시 로그아웃
        if (window.confirm('토큰 재발급에 실패했습니다. 다시 로그인하시겠습니까?')) {
          useAuthStore.getState().logout()
          // TODO: 로그인 페이지 이동
        }
      } finally {
        retry = false
      }
    }
  }
)
