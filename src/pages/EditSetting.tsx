import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import { MAX_NICKNAME_LENGTH } from '@/constants'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useRegisterNickname from '@/hooks/useRegisterNickname'
import { useNavigate } from 'react-router-dom'

export default function EditSetting() {
  const defaultNickname = '죠죠다'
  const { nickname, handleNicknameChange } = useRegisterNickname(defaultNickname)
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: 닉네임 서버로 전송
    // 성공 시, 스토리지에 닉네임 저장 & /setting으로 이동
    navigate('/setting')
  }

  return (
    <>
      <Header title="닉네임 변경" />
      <main className="content-padding flex grow flex-col">
        <form className="flex w-full grow flex-col justify-between" onSubmit={handleSubmit}>
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
          <SolidButton
            type="submit"
            variant="primary"
            size="large"
            disabled={nickname.trim() === '' || nickname === defaultNickname}
          >
            완료
          </SolidButton>
        </form>
      </main>
    </>
  )
}
