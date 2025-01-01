import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

export default function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={twMerge(
        'sticky inset-0 z-40 flex h-12 items-center justify-between bg-transparent px-5',
        className
      )}
    >
      {children}
    </header>
  )
}
