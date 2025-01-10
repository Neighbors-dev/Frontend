import SolidButton from '@/components/SolidButton'
import { MESSAGE_MAX_LENGTH } from '@/constants/write'
import useAuthStore from '@/stores/authStore'
import useWriteBottomStore from '@/stores/writeBottomStore'
import useWriteMessageStore from '@/stores/writeMessageStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WriteMessage() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const nickname = useAuthStore((state) => state.user)?.nickname
  const toggleCollectionIntro = useWriteBottomStore((state) => state.toggleCollectionIntro)
  const setMessage = useWriteMessageStore((state) => state.setMessage)
  const generateTargetString = useWriteMessageStore((state) => state.generateTargetString)
  const targetString = generateTargetString()

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let currentValue = e.target.value
    if (currentValue.length > MESSAGE_MAX_LENGTH)
      currentValue = currentValue.slice(0, MESSAGE_MAX_LENGTH)
    setContent(currentValue)
  }

  const handleSubmit = () => {
    setMessage(content)
    // TODO: 메시지 작성 API 호출
    // TODO: 성공 시 메시지 목록으로 이동
    navigate('/')
  }

  return (
    <div className="flex grow flex-col justify-between">
      <section>
        <h2 className="headline-small mb-2 text-white">
          감사의 메시지를
          <br />
          작성해 주세요
        </h2>
        <button
          type="button"
          className="label-medium mb-7 text-neutral-40 underline underline-offset-2"
          onClick={toggleCollectionIntro}
        >
          어떻게 작성해야 하나요?
        </button>
        <section className="flex flex-col gap-4 rounded-[20px] bg-message-gradient p-6">
          <h2 className="relative z-0 w-fit">
            <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
            {/* TODO: 대상 선택 여부에 따라 다르게 보여지도록 */}
            <p className="title-small text-neutral-80">To. {targetString}</p>
          </h2>
          <textarea
            placeholder="내용을 입력해주세요."
            className="body-large h-[204px] resize-none bg-transparent text-neutral-80 placeholder:text-neutral-50"
            value={content}
            onChange={handleMessageChange}
          />
          {/* TODO: 닉네임 받아서 넣기 */}
          <div className="flex justify-between text-neutral-50">
            <p className="title-small">From. {nickname}</p>
            <p className="label-medium">
              {content.length}/{MESSAGE_MAX_LENGTH}
            </p>
          </div>
        </section>
      </section>
      <SolidButton
        variant="primary"
        size="large"
        disabled={content.trim() === ''}
        onClick={handleSubmit}
      >
        작성 완료
      </SolidButton>
    </div>
  )
}
