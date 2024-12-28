import { useNavigate } from 'react-router-dom'
import { KakaoIcon, PencilIcon } from '@/assets'
import SolidButton from '@/components/SolidButton'
import TextButton from '@/components/TextButton'

const REDIRECT_URI = `${window.location.origin}${import.meta.env.VITE_KAKAO_REDIRECT_URI}`
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="full-height bg-neutral-90">
      <main className="max-w-600 flex h-full flex-col items-center justify-between px-5 pb-[5%] pt-[7%]">
        {/* TODO: 로고 이미지 넣기 */}
        <h1 className="headline-medium text-white">로고</h1>
        <section className="flex w-full flex-col gap-5">
          <SolidButton
            variant="primary"
            size="large"
            type="button"
            className="bg-[#FEE500]"
            onClick={() => navigate(kakaoLoginUrl)}
          >
            <KakaoIcon />
            카카오로 시작하기
          </SolidButton>
          <TextButton
            variant="primary"
            size="medium"
            type="button"
            className="text-brand-yellow"
            onClick={() => {
              // TODO: 작성하기 페이지로 이동
            }}
          >
            비회원으로 작성하기
            <PencilIcon className="h-[18px] w-[18px]" />
          </TextButton>
        </section>
      </main>
    </div>
  )
}
