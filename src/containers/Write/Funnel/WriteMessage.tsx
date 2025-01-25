import { postMessage } from '@/apis/message'
import Checkbox from '@/components/Checkbox'
import SolidButton from '@/components/SolidButton'
import { MESSAGE_MAX_LENGTH } from '@/constants/write'
import useAuthStore from '@/stores/authStore'
import useWriteBottomStore from '@/stores/writeBottomStore'
import useWriteMessageStore from '@/stores/writeMessageStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WriteMessage() {
  const [isChecked, setIsChecked] = useState(false)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const nickname = useAuthStore((state) => state.user)?.nickname
  const content = useWriteMessageStore((state) => state.message)
  const showCollectionIntro = useWriteBottomStore((state) => state.showCollectionIntro)
  const showCheckAlarm = useWriteBottomStore((state) => state.showCheckAlarm)
  const showShareLink = useWriteBottomStore((state) => state.showShareLink)
  const setContent = useWriteMessageStore((state) => state.setMessage)
  const navigate = useNavigate()
  const setIsPrivate = useWriteMessageStore((state) => state.setIsPrivate)
  const toggleCollectionIntro = useWriteBottomStore((state) => state.toggleCollectionIntro)
  const setMessage = useWriteMessageStore((state) => state.setMessage)
  const generateTargetString = useWriteMessageStore((state) => state.generateTargetString)
  const generateMessage = useWriteMessageStore((state) => state.generateMessage)
  const toggleCheckAlarm = useWriteBottomStore((state) => state.toggleCheckAlarm)
  const targetString = generateTargetString()

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let currentValue = e.target.value
    if (currentValue.length > MESSAGE_MAX_LENGTH)
      currentValue = currentValue.slice(0, MESSAGE_MAX_LENGTH)
    setContent(currentValue)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(content)
    setIsPrivate(isChecked)
    if (isLoggedIn) {
      toggleCheckAlarm()
    } else {
      const message = generateMessage()
      const result = await postMessage(message)

      if (result) {
        navigate('/', { state: { from: 'write' } })
      }
    }
  }

  return (
    <form className="flex grow flex-col justify-between gap-10" onSubmit={handleSubmit}>
      <section className="flex grow flex-col">
        <h2 className="headline-small mb-2 text-white">
          감사의 메시지를
          <br />
          작성해 주세요
        </h2>
        <button
          type="button"
          className="label-medium mb-7 text-left text-neutral-40 underline underline-offset-2"
          onClick={toggleCollectionIntro}
        >
          어떻게 작성해야 하나요?
        </button>
        <div className="flex grow flex-col">
          <section className="flex max-h-[324px] grow flex-col gap-4 rounded-[20px] bg-message-gradient p-6">
            <h2 className="relative z-0 w-fit">
              <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
              {/* TODO: 대상 선택 여부에 따라 다르게 보여지도록 */}
              <p className="title-small text-neutral-80">To. {targetString}</p>
            </h2>
            <textarea
              placeholder="내용을 입력해주세요."
              className="body-large grow resize-none bg-transparent text-neutral-80 placeholder:text-neutral-50"
              value={content}
              disabled={showCollectionIntro || showCheckAlarm || showShareLink}
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
          <label
            htmlFor="isPrivate"
            className="label-medium mt-4 flex cursor-pointer items-center gap-2 text-white"
          >
            <Checkbox
              id="isPrivate"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
            <span>비공개로 작성하기</span>
          </label>
        </div>
      </section>
      <SolidButton variant="primary" size="large" type="submit" disabled={content.trim() === ''}>
        작성 완료
      </SolidButton>
    </form>
  )
}
