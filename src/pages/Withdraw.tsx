import { postSignout } from '@/apis/user'
import Checkbox from '@/components/Checkbox'
import Dropdown from '@/components/Dropdown'
import Header from '@/components/Header'
import OutlinedButton from '@/components/OutlinedButton'
import SolidButton from '@/components/SolidButton'
import TextareaField from '@/components/TextareaField'
import { WITHDRAW_OPTIONS } from '@/constants'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useAuthStore from '@/stores/authStore'
import useModalStore from '@/stores/modalStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Withdraw() {
  const [selected, setSelected] = useState<string | undefined>()
  const [agree, setAgree] = useState(false)
  const [reason, setReason] = useState('')
  const logout = useAuthStore((state) => state.logout)
  const openModal = useModalStore((state) => state.openModal)
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value)
  }

  const handleSelected = (option: string) => {
    setSelected(option)
  }

  const handleWithdrawCheck = () => {
    openModal({
      content: '정말 탈퇴하시겠어요?',
      confirmText: '탈퇴',
      cancelText: '취소',
      onConfirm: async () => {
        const result = await postSignout(selected || '', reason.trim() || null)
        if (!result) return

        setTimeout(() => {
          handleWithdraw()
        }, 300)
      },
    })
  }

  const handleWithdraw = () => {
    openModal({
      content: '탈퇴되었습니다.',
      confirmText: '닫기',
      cancelText: null,
      onConfirm: () => {
        logout()
        navigate('/login')
      },
    })
  }

  return (
    <>
      <Header title="탈퇴하기" className="bg-neutral-90" prevPath="/setting" />
      <main className="content-padding flex grow flex-col justify-between gap-10">
        <section>
          <div className="text-white">
            <p className="label-large mb-1">탈퇴 후, 계정 복구는 불가능해요 🥺</p>
            <p className="label-large-prominent">떠나는 이유를 말씀해주세요</p>
          </div>
          <Dropdown
            options={WITHDRAW_OPTIONS}
            selected={selected}
            className="my-5 h-sm:my-2"
            handleSelected={handleSelected}
          />
          <TextareaField
            rows={8}
            value={reason}
            placeholder="더 나은 서비스를 위해 의견을 남겨주세요. (선택)"
            className="mb-4"
            onChange={handleReasonChange}
          />
          <label
            htmlFor="withdraw"
            className="label-medium flex cursor-pointer items-center gap-2 text-white"
          >
            <Checkbox id="withdraw" checked={agree} onChange={() => setAgree((prev) => !prev)} />
            <span>탈퇴하는 것에 동의합니다.</span>
          </label>
        </section>
        <section className="flex gap-[15px]">
          <OutlinedButton
            size="large"
            className="flex-1 basis-1/2 border-neutral-70 bg-transparent"
            onClick={() => navigate(-1)}
          >
            닫기
          </OutlinedButton>
          <SolidButton
            variant="primary"
            size="large"
            className="flex-1 basis-1/2 disabled:bg-neutral-70 disabled:text-neutral-80"
            disabled={!selected || !agree}
            onClick={handleWithdrawCheck}
          >
            회원 탈퇴
          </SolidButton>
        </section>
      </main>
    </>
  )
}
