import { twMerge } from 'tailwind-merge'
import { ArrowLeftIcon } from '@/assets/icons'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  className?: string
  title?: string
  icons?: React.ReactNode
  onClick?: () => void
}

export default function Header({ className, title = '', icons, onClick }: HeaderProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(-1)
  }

  return (
    <header
      className={twMerge(
        'sticky top-0 z-40 flex h-12 items-center justify-between bg-transparent px-5',
        className
      )}
    >
      <button type="button" onClick={onClick || handleClick}>
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <h1 className="title-medium text-white">{title}</h1>
      {icons || <div className="h-6 w-6" />}
    </header>
  )
}
