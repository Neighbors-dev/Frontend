import SolidButton from '@/components/SolidButton'
import TextButton from '@/components/TextButton'
import useWriteBottomStore from '@/stores/writeBottomStore'
import { twMerge } from 'tailwind-merge'
import Envelope from '@/assets/images/envelope.png'
import Light from '@/assets/images/light.png'

import { BOTTOM_SHEET_CONTENT } from '@/constants/write'
import { CancelIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'

export default function WriteFinish() {
  const showWriteFinish = useWriteBottomStore((state) => state.showWriteFinish)
  const isShareVisible = useWriteBottomStore((state) => state.isShareVisible)
  const toggleWriteFinish = useWriteBottomStore((state) => state.toggleWriteFinish)
  const toggleShareVisible = useWriteBottomStore((state) => state.toggleShareVisible)
  const navigate = useNavigate()
  const { title, body, confirmText, cancelText } = isShareVisible
    ? BOTTOM_SHEET_CONTENT.share
    : BOTTOM_SHEET_CONTENT.push

  const handleAgreePush = () => {
    // TODO: 푸시 알림 선택 여부 저장
    toggleShareVisible()
  }

  const handleDisagreePush = () => {
    toggleShareVisible()
  }

  const handleAgreeShare = () => {
    toggleWriteFinish()
    navigate('/')
  }

  const handleDisagreeShare = () => {
    toggleWriteFinish()
    navigate('/')
  }

  return (
    <div
      className={twMerge(
        'absolute bottom-0 left-0 z-10 h-[440px] w-full overflow-hidden',
        !showWriteFinish && 'pointer-events-none'
      )}
    >
      <article
        className={twMerge(
          'relative flex h-full flex-col items-center gap-7 rounded-tl-[20px] rounded-tr-[20px] bg-neutral-80 px-8 py-10 transition-transform duration-300',
          showWriteFinish ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {isShareVisible && (
          <button type="button" className="absolute right-8 top-8" onClick={handleDisagreeShare}>
            <CancelIcon />
          </button>
        )}
        <img src={isShareVisible ? Light : Envelope} alt="아이콘" className="h-auto w-[102px]" />
        <section className="mt-1 h-[76px] text-center text-white">
          <p className="title-large mb-2">{title}</p>
          <p className="body-medium whitespace-pre-wrap text-center">{body}</p>
        </section>
        <section className="flex w-full flex-col gap-3">
          <SolidButton
            variant="primary"
            size="large"
            onClick={isShareVisible ? handleAgreeShare : handleAgreePush}
          >
            {confirmText}
          </SolidButton>
          {cancelText && (
            <TextButton
              variant="primary"
              size="medium"
              onClick={isShareVisible ? undefined : handleDisagreePush}
            >
              {cancelText}
            </TextButton>
          )}
        </section>
      </article>
    </div>
  )
}
