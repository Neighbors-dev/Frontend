import { getKakaoLogin } from '@/apis/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useKakaoAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleKakaoLogin = async (code: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await getKakaoLogin(code)

      if (!result) {
        throw new Error('로그인에 실패했습니다.')
      }

      if (result.isRegistered) {
        navigate('/', { replace: true })
      } else {
        navigate('/register', { replace: true })
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, handleKakaoLogin }
}
