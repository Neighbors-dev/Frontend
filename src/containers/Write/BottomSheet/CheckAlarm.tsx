import useWriteBottomStore from '@/stores/writeBottomStore'
import { twMerge } from 'tailwind-merge'
import SolidButton from '@/components/SolidButton'
import useWriteMessageStore from '@/stores/writeMessageStore'
import TextButton from '@/components/TextButton'
import { useQueryClient } from '@tanstack/react-query'
import { postMessage } from '@/apis/message'
import { ENVELOPE_IMG } from '@/constants/image'

export default function CheckAlarm() {
  const queryClient = useQueryClient()
  const showCheckAlarm = useWriteBottomStore((state) => state.showCheckAlarm)
  const toggleCheckAlarm = useWriteBottomStore((state) => state.toggleCheckAlarm)
  const setIsAlarm = useWriteMessageStore((state) => state.setIsAlarm)
  const generateMessage = useWriteMessageStore((state) => state.generateMessage)
  const toggleShareLink = useWriteBottomStore((state) => state.toggleShareLink)

  const handleAgreePush = () => {
    setIsAlarm(true)
    handleSubmitMessage()
  }

  const handleDisagreePush = () => {
    setIsAlarm(false)
    handleSubmitMessage()
  }

  const handleSubmitMessage = async () => {
    toggleCheckAlarm()
    const message = generateMessage()
    const result = await postMessage(message)

    if (result) {
      await queryClient.invalidateQueries({ queryKey: ['messages'] })
      toggleShareLink()
    }
  }

  return (
    <div
      className={twMerge(
        'absolute bottom-0 left-0 z-10 h-[440px] w-full overflow-hidden',
        !showCheckAlarm && 'pointer-events-none'
      )}
    >
      <article
        className={twMerge(
          'relative flex h-full flex-col items-center gap-7 rounded-tl-[20px] rounded-tr-[20px] bg-neutral-80 px-8 py-10 transition-transform duration-300',
          showCheckAlarm ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <img src={ENVELOPE_IMG} alt="아이콘" className="h-auto w-[102px]" />
        <section className="mt-1 h-[76px] text-center text-white">
          <p className="title-large mb-2">메시지가 열람되면 알려드려요!</p>
          <p className="body-medium whitespace-pre-wrap text-center">
            경찰관, 소방관 분들이 메시지를 열람하면
            <br />
            푸시 알림이 갈 예정이에요
          </p>
        </section>
        <section className="flex w-full flex-col gap-3">
          <SolidButton variant="primary" size="large" onClick={handleAgreePush}>
            알림 받을래요
          </SolidButton>
          <TextButton variant="primary" size="medium" onClick={handleDisagreePush}>
            알림 받지 않을래요
          </TextButton>
        </section>
      </article>
    </div>
  )
}
