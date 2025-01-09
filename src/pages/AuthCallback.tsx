import { postLogin } from '@/apis/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const authorizationCode = searchParams.get('code')

  useEffect(() => {
    const login = async (code: string) => {
      const result = await postLogin(code)

      if (!result) {
        window.alert('로그인에 실패했습니다.')
        return
      }

      if (result.isRegistered) navigate('/', { replace: true })
      else navigate('/register', { replace: true })
    }

    if (authorizationCode) {
      login(authorizationCode)
    }
  }, [authorizationCode, navigate])

  return null
}
