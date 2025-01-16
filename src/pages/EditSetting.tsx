import { putNickname } from '@/apis/user'
import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import { MAX_NICKNAME_LENGTH } from '@/constants'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useRegisterNickname from '@/hooks/useRegisterNickname'
import useAuthStore from '@/stores/authStore'
import { useNavigate } from 'react-router-dom'

export default function EditSetting() {
  const currentNickname = useAuthStore((state) => state.user)?.nickname || ''
  const { nickname, handleNicknameChange } = useRegisterNickname(currentNickname)
  const navigate = useNavigate()
  const updateNickname = useAuthStore((state) => state.updateNickname)
  useBodyBackgroundColor('neutral-90')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await putNickname(nickname)
    if (!result) return
    updateNickname(nickname)
    navigate('/setting')
  }

  return (
    <>
      <Header title="닉네임 변경" />
      <main className="content-padding flex grow flex-col">
        <form className="flex w-full grow flex-col justify-between gap-10" onSubmit={handleSubmit}>
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
            disabled={nickname.trim() === '' || nickname === currentNickname}
          >
            완료
          </SolidButton>
        </form>
      </main>
    </>
  )
}
