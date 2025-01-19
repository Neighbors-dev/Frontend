import { HamburgerIcon, LogoIcon } from '@/assets'

interface HeaderProps {
  onClick: () => void
}

export default function Header({ onClick }: HeaderProps) {
  return (
    <div className="fixed left-0 top-0 z-40 mb-1 w-full bg-[#14192F]">
      <header className="max-w-600 flex items-center justify-between px-5 py-3">
        <h1 className="">
          <LogoIcon className="h-4 w-auto" />
        </h1>
        <button type="button" onClick={onClick}>
          <HamburgerIcon className="h-6 w-6 text-white" />
        </button>
      </header>
    </div>
  )
}
