import { ArrowUpIcon } from '@/assets'

export default function TopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className="fixed bottom-16 right-5 z-30 rounded-full border border-neutral-20 bg-white p-[10px] shadow-[0_15px_20px_0] shadow-black/15"
      onClick={handleClick}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  )
}
