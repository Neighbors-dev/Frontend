import { PencilIcon } from '@/assets/icons'
import SolidButton from '@/components/SolidButton'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface WriteMessageButtonProps {
  isVisible: boolean
  isFixed?: boolean
  buttonRef?: (node?: Element | null) => void
}

const WriteMessageButton = ({ isVisible, isFixed = false, buttonRef }: WriteMessageButtonProps) => {
  const className = isFixed
    ? twMerge(
        'fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 rounded-full py-4 transition-opacity duration-200',
        isVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
      )
    : 'relative z-10 py-4 mx-auto rounded-full'

  return (
    <div className="relative">
      <Link to="/write">
        <SolidButton ref={buttonRef} variant="primary" size="large" className={className}>
          메시지 작성하기 <PencilIcon className="w-5 h-5" />
        </SolidButton>
      </Link>
      {!isFixed && (
        <div className="absolute bottom-[-9px] left-1/2 z-[-1] h-[23px] w-[93px] -translate-x-1/2 rounded-[50px] bg-brand-yellow blur-[27px]" />
      )}
    </div>
  )
}

export default WriteMessageButton
