import { CancelIcon } from '@/assets'
import useWriteBottomStore from '@/stores/writeBottomStore'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import Light from '@/assets/images/light.png'
import SolidButton from '@/components/SolidButton'

export default function ShareLink() {
  const showShareLink = useWriteBottomStore((state) => state.showShareLink)
  const toggleShareLink = useWriteBottomStore((state) => state.toggleShareLink)
  const navigate = useNavigate()

  const handleAgreeShare = () => {
    // TODO: 공유 로직
    toggleShareLink()
    navigate('/')
  }

  const handleDisagreeShare = () => {
    toggleShareLink()
    navigate('/')
  }

  return (
    <div
      className={twMerge(
        'absolute bottom-0 left-0 z-10 h-[440px] w-full overflow-hidden',
        !showShareLink && 'pointer-events-none'
      )}
    >
      <article
        className={twMerge(
          'relative flex h-full flex-col items-center gap-7 rounded-tl-[20px] rounded-tr-[20px] bg-neutral-80 px-8 py-10 transition-transform duration-300',
          showShareLink ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <button type="button" className="absolute right-8 top-8" onClick={handleDisagreeShare}>
          <CancelIcon />
        </button>
        <img src={Light} alt="아이콘" className="h-auto w-[102px]" />
        <section className="mt-1 h-[76px] text-center text-white">
          <p className="title-large mb-2">친구들에게 공유하러 가요</p>
          <p className="body-medium whitespace-pre-wrap text-center">
            다른 친구들에게 공유해 거리를 환하게 밝혀주세요
          </p>
        </section>
        <section className="flex w-full flex-col gap-3">
          <SolidButton variant="primary" size="large" onClick={handleAgreeShare}>
            공유하기
          </SolidButton>
        </section>
      </article>
    </div>
  )
}
