import axios from 'axios'

export const mockingClient = axios.create({
  baseURL: '',
})

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

/* client.interceptors.request.use((config) => {
  // TODO: 토큰 관리 방법 재설정
  //const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}) */

/* client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // 리프레시 토큰으로 토큰 재발급
    }
    return Promise.reject(error)
  }
) */
