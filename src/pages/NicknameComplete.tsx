import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { getSessionNickname } from '@/utils/nicknameUtils'
import { Navigate, useNavigate } from 'react-router-dom'
import LampImage from '@/assets/images/lamp.png'

export default function NicknameComplete() {
  const nickname = getSessionNickname()
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  /* useEffect(() => {
    return () => removeSessionNickname()
  }, []) */

  if (!nickname) return <Navigate to="/nickname" replace />

  return (
    <main className="flex w-full flex-col">
      <Header onClick={() => navigate(-1)} />
      <div className="content-padding flex grow flex-col items-center justify-between">
        <section className="w-full text-center">
          <h2 className="headline-small mb-4 text-white">반가워요, {nickname} 님!</h2>
          <h3 className="body-large text-neutral-30">메시지를 작성해 거리를 환하게 밝혀주세요</h3>
        </section>
        <img src={LampImage} alt="램프 이미지" className="h-auto w-[177px]" />
        <SolidButton
          variant="primary"
          size="large"
          type="button"
          className="w-full"
          onClick={() => {
            // TODO: 메시지 작성 페이지로 이동
            navigate('/')
          }}
        >
          메시지 작성하러 가기
        </SolidButton>
      </div>
    </main>
  )
}
