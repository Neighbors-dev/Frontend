import { postLogout } from '@/apis/user'
import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useAuthStore from '@/stores/authStore'
import useModalStore from '@/stores/modalStore'
import { useNavigate } from 'react-router-dom'

export default function Setting() {
  const nickname = useAuthStore((state) => state.user)?.nickname
  const openModal = useModalStore((state) => state.openModal)
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  const handleLogout = () => {
    openModal({
      content: '로그아웃 하시겠어요?',
      confirmText: '로그아웃',
      cancelText: '취소',
      onConfirm: async () => {
        await postLogout()
        navigate('/login')
      },
    })
  }

  return (
    <>
      <Header title="계정 설정" prevPath="/" />
      <main className="content-padding flex grow flex-col gap-5">
        <section className="flex items-center justify-between">
          <h2 className="headline-small text-white">{nickname} 님</h2>
          <SolidButton
            variant="secondary"
            size="large"
            className="px-3 py-2"
            onClick={() => navigate('edit')}
          >
            변경
          </SolidButton>
        </section>
        <hr className="border-neutral-80" />
        <ul className="title-large text-white">
          <li className="py-3" onClick={() => navigate('/terms')}>
            <button type="button" className="w-full text-left">
              약관 및 정책
            </button>
          </li>
          <li className="py-3">
            <button type="button" className="w-full text-left" onClick={handleLogout}>
              로그아웃
            </button>
          </li>
          <li className="py-3">
            <button
              type="button"
              className="w-full text-left"
              onClick={() => navigate('/withdraw')}
            >
              탈퇴하기
            </button>
          </li>
        </ul>
      </main>
    </>
  )
}
