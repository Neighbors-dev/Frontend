import Header from '@/components/Header'
import PrevButton from '@/components/PrevButton'
import SolidButton from '@/components/SolidButton'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { getSessionNickname } from '@/utils/nicknameUtils'
import { Navigate, useNavigate } from 'react-router-dom'

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
      <Header>
        <PrevButton onClick={() => navigate('/nickname')} />
      </Header>
      <div className="flex grow flex-col justify-between px-5 pb-[5%] pt-[7%]">
        <section className="w-full text-center">
          <h1 className="headline-small mb-4 text-white">반가워요, {nickname} 님!</h1>
          <h2 className="body-large text-neutral-30">메시지를 작성해 거리를 환하게 밝혀주세요</h2>
        </section>
        <div className="flex h-[280px] items-center justify-center bg-brand-yellow px-10">
          일러스트 들어갈 자리
        </div>
        <SolidButton
          variant="primary"
          size="large"
          type="button"
          className=""
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
