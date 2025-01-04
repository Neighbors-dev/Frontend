import useAuthStore from '@/stores/authStore'
import axios from 'axios'

export const mockingClient = axios.create({
  baseURL: '',
})

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().getAccessToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

/* let retry = false

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !retry) {
      retry = true
      const refreshToken = useAuthStore.getState().getRefreshToken()

      try {
        const { data } = await client.post('/refresh', {
          refreshToken,
        });
        useAuthStore.getState().login({
          accessToken: {
            value: data.accessToken,
            expiresIn: data.expiresIn + Date.now(),
          },
          refreshToken: {
            value: data.refreshToken,
            expiresIn: data.refreshTokenExpiresIn + Date.now(),
          },
        });

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        // 토큰 재발급 실패 시 로그아웃
      } finally {
        retry = false;
      }
    }
  }
) */
