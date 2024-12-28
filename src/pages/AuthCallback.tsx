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
        if (result.isRegistered) navigate('/')
        else navigate('/nickname')
      } else {
        window.alert('로그인에 실패했습니다.')
      }
    }

    if (authorizationCode) {
      // 백엔드로 인가 코드 전달
      // 성공 시, 메인 페이지 혹은 닉네임 페이지로 이동
      login(authorizationCode)
    }
  }, [authorizationCode, navigate])

  return null
}
