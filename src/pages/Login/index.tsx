import { useEffect, useState } from 'react'
import NonLoginModal from './components/NonLoginModal'
import LoginHeader from './components/LoginHeader'
import LoginActions from './components/LoginActions'
import { KAKAO_LOGIN_URL } from '@/constants/login'

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty(
      '--body-bg-color',
      'linear-gradient(180deg, #191E33 24.5%, #303C70 100%)'
    )

    return () => {
      root.style.setProperty('--body-bg-color', 'var(--color-neutral-90)')
    }
  }, [])

  return (
    <>
      <NonLoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main className="main-container content-padding">
        <div className="fixed top-0 left-0 z-0 w-full bg-center bg-cover h-1/2 bg-star-top" />
        <div className="fixed bottom-0 left-0 z-0 w-full bg-center bg-cover h-1/2 bg-star-bottom" />
        <LoginHeader />
        <LoginActions
          onKakaoLoginClick={() => {
            window.location.href = KAKAO_LOGIN_URL
          }}
          onNonLoginClick={() => setIsOpen(true)}
        />
      </main>
    </>
  )
}
