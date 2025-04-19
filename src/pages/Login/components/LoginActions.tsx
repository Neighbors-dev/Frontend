import { KakaoIcon, PencilIcon } from '@/assets/icons'
import SolidButton from '@/components/SolidButton'
import TextButton from '@/components/TextButton'

interface LoginActionsProps {
  onKakaoLoginClick: () => void
  onNonLoginClick: () => void
}

export default function LoginActions({ onKakaoLoginClick, onNonLoginClick }: LoginActionsProps) {
  return (
    <section className="z-10 flex flex-col w-full gap-5 mt-auto">
      <SolidButton
        variant="primary"
        size="large"
        type="button"
        className="bg-[#FEE500]"
        onClick={onKakaoLoginClick}
      >
        <KakaoIcon className="w-5 h-5" />
        카카오로 시작하기
      </SolidButton>
      <TextButton
        variant="primary"
        size="medium"
        className="text-brand-yellow"
        onClick={onNonLoginClick}
      >
        비회원으로 작성하기
        <PencilIcon className="h-[18px] w-[18px]" />
      </TextButton>
    </section>
  )
}
