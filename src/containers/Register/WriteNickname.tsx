import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import { MAX_NICKNAME_LENGTH } from '@/constants'
import { useState } from 'react'

interface WriteNicknameProps {
  nextButtonOnClick: (value: string) => void
}

export default function WriteNickname({ nextButtonOnClick }: WriteNicknameProps) {
  const [nickname, setNickname] = useState('')

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = e.target.value
    if (currentValue.length > MAX_NICKNAME_LENGTH)
      currentValue = currentValue.slice(0, MAX_NICKNAME_LENGTH)
    setNickname(currentValue)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = true
    //const result = await postNickname(nickname.slice(0, 5))
    // TODO: 닉네임 등록 API 호출
    if (result) {
      //setSessionNickname(nickname.slice(0, 5))
      // TODO: 성공 시, 닉네임 등록
      nextButtonOnClick(nickname)
    } else {
      window.alert('닉네임 등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <main className="content-padding flex grow flex-col">
      <form className="flex h-full w-full grow flex-col justify-between" onSubmit={handleSubmit}>
        <section>
          <h1 className="headline-small mb-12 text-white">
            메시지 작성 전<br />
            닉네임을 입력해주세요
          </h1>
          <fieldset className="flex flex-col gap-1">
            <label className="title-small text-white">닉네임</label>
            <TextField
              value={nickname}
              maxLength={MAX_NICKNAME_LENGTH}
              placeholder="5자 이내의 닉네임을 입력해주세요."
              onChange={(e) => handleNicknameChange(e)}
            />
            <p className="label-medium self-end text-neutral-50">
              {nickname.length}/{MAX_NICKNAME_LENGTH}
            </p>
          </fieldset>
        </section>
        <SolidButton variant="primary" size="large" type="submit" disabled={nickname.trim() === ''}>
          다음
        </SolidButton>
      </form>
    </main>
  )
}
