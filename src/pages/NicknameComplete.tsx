import { ArrowLeftIcon } from '@/assets'
import SolidButton from '@/components/SolidButton'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function NicknameComplete() {
  // TODO: key값 변경 필요
  const nickname = sessionStorage.getItem('neighbor-NN')
  const navigate = useNavigate()

  useEffect(() => {
    return () => sessionStorage.removeItem('neighbor-NN')
  }, [])

  if (!nickname) return <Navigate to="/nickname" replace />

  return (
    <div className="full-height flex flex-col bg-neutral-90">
      <header className="max-w-600 px-5 py-3">
        <button type="button" onClick={() => navigate('/nickname')}>
          <ArrowLeftIcon className="text-white" />
        </button>
      </header>
      <main className="max-w-600 grow px-5 pb-[5%] pt-[7%]">
        <div className="flex h-full w-full flex-col justify-between">
          <section className="w-full text-center">
            <h1 className="headline-small mb-4 text-white">반가워요, {nickname} 님!</h1>
            <h2 className="body-large text-neutral-30">메시지를 작성해 거리를 환하게 밝혀주세요</h2>
          </section>
          <div className="flex items-center justify-center bg-brand-yellow p-10">
            일러스트 들어갈 자리
          </div>
          <SolidButton
            variant="primary"
            size="large"
            type="button"
            className=""
            onClick={() => {
              // TODO: 메시지 작성 페이지로 이동
            }}
          >
            메시지 작성하러 가기
          </SolidButton>
        </div>
      </main>
    </div>
  )
}
