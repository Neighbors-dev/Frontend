import SolidButton from '@/components/SolidButton'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { Link } from 'react-router-dom'

export default function Error() {
  useBodyBackgroundColor('neutral-90')
  return (
    <main className="flex grow flex-col items-center justify-center gap-4">
      <h1 className="title-large text-brand-yellow">에러가 발생했어요</h1>
      <p className="body-medium mb-5 text-center text-neutral-10">
        현재 페이지에서 에러가 발생했어요.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <Link to="/">
        <SolidButton variant="primary" size="medium" className="rounded-full">
          홈으로 돌아가기
        </SolidButton>
      </Link>
    </main>
  )
}
