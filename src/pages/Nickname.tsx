import { postNickname } from '@/apis/user'
import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { setSessionNickname } from '@/utils/nicknameUtils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 닉네임 페이지로 이동 시, 재등록 가능?
const MAX_NICKNAME_LENGTH = 5

export default function Nickname() {
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>, maxlength: number) => {
    let currentValue = e.target.value
    if (currentValue.length > maxlength) currentValue = currentValue.slice(0, maxlength)
    setNickname(currentValue)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: 닉네임 서버로 전송
    // 성공 시, 스토리지에 닉네임 저장 & /nickname-complete로 이동
    const result = await postNickname(nickname.slice(0, 5))
    if (result) {
      setSessionNickname(nickname.slice(0, 5))
      navigate('/nickname-complete')
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
              onChange={(e) => handleNicknameChange(e, 5)}
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
