import { twMerge } from 'tailwind-merge'
import { ArrowLeftIcon } from '@/assets'

interface HeaderProps {
  className?: string
  title?: string
  onClick?: () => void
}

export default function Header({ className, title = '', onClick }: HeaderProps) {
  return (
    <header
      className={twMerge(
        'sticky inset-0 z-40 flex h-12 items-center justify-between bg-transparent px-5',
        className
      )}
    >
      <button type="button" onClick={onClick}>
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <h1>{title}</h1>
      <div className="h-6 w-6" />
    </header>
  )
}
