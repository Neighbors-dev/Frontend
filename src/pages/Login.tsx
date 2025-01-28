import { KakaoIcon, LogoIcon, PencilIcon } from '@/assets/icons'
import SolidButton from '@/components/SolidButton'
import TextButton from '@/components/TextButton'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENVELOPE_IMG } from '@/constants/image'

const REDIRECT_URI = `${window.location.origin}${import.meta.env.VITE_KAKAO_REDIRECT_URI}`
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`

export default function Login() {
  const navigate = useNavigate()

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
          <img src={ENVELOPE_IMG} alt="편지 아이콘" className="h-auto w-[102px]" />
        </h1>
      </div>
      <section className="z-10 flex w-full flex-col gap-5">
        <SolidButton
          variant="primary"
          size="large"
          type="button"
          className="bg-[#FEE500]"
          onClick={() => {
            window.location.href = kakaoLoginUrl
          }}
        >
          <KakaoIcon />
          카카오로 시작하기
        </SolidButton>
        <TextButton
          variant="primary"
          size="medium"
          className="text-brand-yellow"
          onClick={() => {
            navigate('/register')
          }}
        >
          비회원으로 작성하기
          <PencilIcon className="h-[18px] w-[18px]" />
        </TextButton>
      </section>
    </main>
  )
}
