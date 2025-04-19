import PageLoading from '@/components/PageLoading'
import SolidButton from '@/components/SolidButton'
import { useKakaoAuth } from '@/hooks/useKakaoAuth'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const authorizationCode = searchParams.get('code')
  const { isLoading, error, handleKakaoLogin } = useKakaoAuth()

  useEffect(() => {
    if (authorizationCode) {
      handleKakaoLogin(authorizationCode)
    }
  }, [authorizationCode])

  if (error) {
    return (
      <main className="main-container content-padding">
        <p className="mb-4 text-red-500">{error}</p>
        <Link to="/">
          <SolidButton variant="primary" size="medium" className="rounded-full">
            로그인 페이지로 돌아가기
          </SolidButton>
        </Link>
      </main>
    )
  }

  if (isLoading) {
    return <PageLoading />
  }
}
