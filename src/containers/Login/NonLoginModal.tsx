import OutlinedButton from '@/components/OutlinedButton'
import SolidButton from '@/components/SolidButton'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface NonLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NonLoginModal({ isOpen, onClose }: NonLoginModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={twMerge(
        'fixed inset-0 z-[60] flex items-center justify-center bg-neutral-90/70 p-5 transition-opacity duration-200',
        isOpen && isAnimating ? 'opacity-100' : 'opacity-0'
      )}
      role="dialog"
      aria-modal="true"
    >
      <section className="w-full max-w-[335px] rounded-xl bg-neutral-80 p-6">
        <p className="title-medium mb-1 text-center text-white">비회원으로 작성하시겠어요?</p>
        <p className="body-medium mb-5 text-center text-white">
          비회원으로 작성 시, 내가 작성한 메시지 확인 및<br />
          수정 등 서비스 이용에 제한이 있을 수 있어요.
        </p>
        <div className="flex w-full flex-col gap-3">
          <SolidButton
            variant="primary"
            size="large"
            className="flex-1 basis-1/2"
            onClick={() => {
              navigate('/register')
              onClose()
            }}
          >
            비회원으로 작성하기
          </SolidButton>
          <OutlinedButton
            size="large"
            className="flex-1 basis-1/2 border border-neutral-70"
            onClick={() => {
              onClose()
            }}
          >
            닫기
          </OutlinedButton>
        </div>
      </section>
    </div>
  )
}
