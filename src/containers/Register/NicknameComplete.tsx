import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import LampImagePng from '@/assets/images/lamp.png'

interface NicknameCompleteProps {
  nickname: string
  prevButtonOnclick: () => void
  nextButtonOnClick: () => void
}

export default function NicknameComplete({
  nickname,
  prevButtonOnclick,
  nextButtonOnClick,
}: NicknameCompleteProps) {
  return (
    <>
      <Header onClick={prevButtonOnclick} />
      <main className="content-padding flex w-full grow flex-col items-center justify-between gap-10">
        <section className="w-full text-center">
          <h2 className="headline-small mb-4 text-white">반가워요, {nickname} 님!</h2>
          <h3 className="body-large text-neutral-30">메시지를 작성해 거리를 환하게 밝혀주세요</h3>
        </section>
        <img src={LampImagePng} alt="램프 이미지" />
        <SolidButton
          variant="primary"
          size="large"
          type="button"
          className="w-full"
          onClick={nextButtonOnClick}
        >
          메시지 작성하러 가기
        </SolidButton>
      </main>
    </>
  )
}
