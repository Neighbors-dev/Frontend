import { postNickname } from '@/apis/auth'
import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import { MAX_NICKNAME_LENGTH, MEMBER, NON_MEMBER } from '@/constants'
import useAuthStore from '@/stores/authStore'
import { useState } from 'react'

interface WriteNicknameProps {
  nextButtonOnClick: (value: string) => void
}

export default function WriteNickname({ nextButtonOnClick }: WriteNicknameProps) {
  const [nickname, setNickname] = useState('')
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = e.target.value
    if (currentValue.length > MAX_NICKNAME_LENGTH)
      currentValue = currentValue.slice(0, MAX_NICKNAME_LENGTH)
    setNickname(currentValue)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userInfo: User = { nickname: nickname.slice(0, 5) }

    if (isLoggedIn) {
      userInfo.role = user?.role || MEMBER
      userInfo.email = user?.email || ''
    } else {
      userInfo.role = NON_MEMBER
    }

    const result = await postNickname(userInfo)
    if (result) {
      nextButtonOnClick(nickname)
    } else {
      window.alert('닉네임 등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <main className="content-padding flex grow flex-col">
      <form
        className="flex h-full w-full grow flex-col justify-between gap-10"
        onSubmit={handleSubmit}
      >
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
              onChange={handleNicknameChange}
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
