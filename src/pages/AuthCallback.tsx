import { postLogin } from '@/apis/login'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const authorizationCode = searchParams.get('code')

  useEffect(() => {
    const login = async (code: string) => {
      const result = await postLogin(code)
      if (result) {
        navigate('/', { replace: true })
      } else {
        window.alert('로그인에 실패했습니다.')
      }
    }

    if (authorizationCode) {
      login(authorizationCode)
    }
  }, [authorizationCode, navigate])

  return null
}
