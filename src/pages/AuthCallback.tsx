import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const authorizationCode = searchParams.get('code')
    console.log(authorizationCode)

    if (authorizationCode) {
      // 백엔드로 인가 코드 전달
      // 성공 시, 메인 페이지 혹은 닉네임 페이지로 이동
    }
  }, [navigate])

  return <div>로그인 중...</div>
}
