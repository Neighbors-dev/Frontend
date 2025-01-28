import SolidButton from '@/components/SolidButton'
import { Link } from 'react-router-dom'
import { ENVELOPE_IMG } from '@/constants/image'

export default function NoMessage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <section className="flex flex-col items-center gap-8">
        <img src={ENVELOPE_IMG} alt="편지 이미지" className="h-auto w-[102px]" />
        <p className="body-large text-center text-neutral-40">
          아직 작성한 메시지가 없어요
          <br />첫 메시지를 작성해볼까요?
        </p>
        <Link to="/write">
          <SolidButton variant="primary" size="large" className="w-48">
            메시지 작성하러 가기
          </SolidButton>
        </Link>
      </section>
    </div>
  )
}
