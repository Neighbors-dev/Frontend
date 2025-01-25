import { SHARE_CODE_KEY } from '@/constants/key'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EnvelopeImg from '@/assets/images/envelope.png'
import { LogoIcon } from '@/assets/icons'

export default function ShareCode() {
  const cookies = new Cookies()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get('code')
    cookies.set(SHARE_CODE_KEY, code, { path: '/' })
    navigate('/', { replace: true })
  }, [searchParams])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--body-bg-color',
      'linear-gradient(180deg, #191E33 24.5%, #303C70 100%)'
    )

    return () => {
      document.documentElement.style.setProperty('--body-bg-color', 'var(--color-neutral-90)')
    }
  }, [])

  return (
    <main className="content-padding flex w-full grow flex-col items-center justify-between">
      <div className="fixed left-0 top-0 z-0 h-1/2 w-full bg-star-top bg-cover bg-center" />
      <div className="fixed bottom-0 left-0 z-0 h-1/2 w-full bg-star-bottom bg-cover bg-center" />
      <div>
        <h1 className="absolute left-1/2 top-1/4 z-10 flex -translate-x-1/2 flex-col items-center gap-[33px] text-white">
          <LogoIcon className="h-8 w-auto" />
          <img src={EnvelopeImg} alt="편지 아이콘" className="h-auto w-[102px]" />
        </h1>
      </div>
    </main>
  )
}
