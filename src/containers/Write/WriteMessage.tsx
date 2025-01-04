import SolidButton from '@/components/SolidButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MessageMessageProps {
  isTarget: boolean
}

export default function WriteMessage({ isTarget }: MessageMessageProps) {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

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
        >
          어떻게 작성해야 하나요?
        </button>
        <section className="flex flex-col gap-4 rounded-[20px] bg-message-gradient p-6">
          <h2 className="relative z-0 w-fit">
            <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
            {/* TODO: 대상 선택 여부에 따라 다르게 보여지도록 */}
            <p className="title-small text-neutral-80">To. 모든 경찰관, 소방관 분들</p>
          </h2>
          <textarea
            placeholder="내용을 입력해주세요."
            className="body-large h-[204px] resize-none bg-transparent text-neutral-80 placeholder:text-neutral-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* TODO: 닉네임 받아서 넣기 */}
          <p className="title-small text-neutral-50">From. 닉네임</p>
        </section>
      </section>
      <SolidButton
        variant="primary"
        size="large"
        onClick={() => {
          // TODO: 메시지 작성 API 호출
          // TODO: 성공 시 메시지 목록으로 이동
          navigate('/')
        }}
      >
        {isTarget ? '다음' : '작성 완료'}
      </SolidButton>
    </div>
  )
}
