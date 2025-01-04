import { twMerge } from 'tailwind-merge'
import { ArrowLeftIcon } from '@/assets'

interface HeaderProps {
  className?: string
  title?: string
  icons?: React.ReactNode
  onClick?: () => void
}

export default function Header({ className, title = '', icons, onClick }: HeaderProps) {
  return (
    <header
      className={twMerge(
        'sticky inset-0 z-40 flex h-12 items-center justify-between bg-red-500 bg-transparent px-5',
        className
      )}
    >
      <button type="button" onClick={onClick}>
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <h1>{title}</h1>
      {icons || <div className="h-6 w-6" />}
    </header>
  )
}
