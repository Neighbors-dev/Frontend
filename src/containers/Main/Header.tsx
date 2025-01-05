import { HamburgerIcon } from '@/assets'

interface HeaderProps {
  onClick: () => void
}

export default function Header({ onClick }: HeaderProps) {
  return (
    <header className="max-w-600 fixed left-1/2 top-0 z-40 mb-1 flex -translate-x-1/2 items-center justify-between bg-[#14192F] px-5 py-3">
      <h1 className="text-white">로고</h1>
      <button type="button" onClick={onClick}>
        <HamburgerIcon className="h-6 w-6 text-white" />
      </button>
    </header>
  )
}
