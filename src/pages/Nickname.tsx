import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import { useState } from 'react'

// 닉네임 페이지로 이동 시, 재등록 가능?

export default function Nickname() {
  const [nickname, setNickname] = useState('')

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>, maxlength: number) => {
    let currentValue = e.target.value
    if (currentValue.length > maxlength) currentValue = currentValue.slice(0, maxlength)
    setNickname(currentValue)
  }

  const handleSubmit = () => {
    // TODO: 닉네임 서버로 전송
    // 성공 시, 스토리지에 닉네임 저장 & /nickname-complete로 이동
  }

  return (
    <div className="full-height bg-neutral-90">
      <main className="max-w-600 h-full px-5 pb-[5%] pt-[7%]">
        <form className="flex h-full w-full flex-col justify-between" onSubmit={handleSubmit}>
          <section>
            <h1 className="headline-small mb-12 text-white">
              메시지 작성 전<br />
              닉네임을 입력해주세요
            </h1>
            <TextField
              label="닉네임"
              value={nickname}
              maxLength={5}
              placeholder="5자 이내의 닉네임을 입력해주세요."
              onChange={(e) => handleNicknameChange(e, 5)}
            />
          </section>
          <SolidButton
            variant="primary"
            size="large"
            type="submit"
            disabled={nickname.trim() === ''}
            className="disabled:text-neutral-90"
          >
            다음
          </SolidButton>
        </form>
      </main>
    </div>
  )
}
