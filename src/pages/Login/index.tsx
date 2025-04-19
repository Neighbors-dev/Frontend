import { KakaoIcon, LogoIcon, PencilIcon } from '@/assets/icons'
import SolidButton from '@/components/SolidButton'
import TextButton from '@/components/TextButton'
import { useEffect, useState } from 'react'
import { ENVELOPE_IMG } from '@/constants/image'
import NonLoginModal from './components/NonLoginModal'

const REDIRECT_URI = `${window.location.origin}${import.meta.env.VITE_KAKAO_REDIRECT_URI}`
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`

export default function Login() {
  const [isOpen, setIsOpen] = useState(false)

  const handleModalClose = () => {
    setIsOpen(false)
  }

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
    <>
      <NonLoginModal isOpen={isOpen} onClose={handleModalClose} />
      <main className="flex flex-col items-center justify-between w-full content-padding grow">
        <div className="fixed top-0 left-0 z-0 w-full bg-center bg-cover h-1/2 bg-star-top" />
        <div className="fixed bottom-0 left-0 z-0 w-full bg-center bg-cover h-1/2 bg-star-bottom" />
        <div>
          <div className="absolute left-1/2 top-[20%] z-10 -translate-x-1/2">
            <h1 className="flex flex-col items-center gap-[33px]">
              <LogoIcon className="w-auto h-8" />
              <div className="h-[102px] w-[102px]">
                <img
                  src={ENVELOPE_IMG}
                  alt="편지 아이콘"
                  className="object-contain w-full h-full"
                  loading="eager"
                />
              </div>
            </h1>
            <p className="mt-10 text-center text-white title-large-light">
              경찰관, 소방관 분들께
              <br />
              감사의 마음을 전하고
              <br />
              도시를 밝혀주세요
            </p>
          </div>
        </div>
        <section className="z-10 flex flex-col w-full gap-5">
          <SolidButton
            variant="primary"
            size="large"
            type="button"
            className="bg-[#FEE500]"
            onClick={() => {
              window.location.href = kakaoLoginUrl
            }}
          >
            <KakaoIcon className="w-5 h-5" />
            카카오로 시작하기
          </SolidButton>
          <TextButton
            variant="primary"
            size="medium"
            className="text-brand-yellow"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            비회원으로 작성하기
            <PencilIcon className="h-[18px] w-[18px]" />
          </TextButton>
        </section>
      </main>
    </>
  )
}
