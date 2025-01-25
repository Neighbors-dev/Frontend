import { ArrowUpIcon } from '@/assets/icons'

export default function TopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-600 pointer-events-none fixed bottom-4 z-50 overflow-visible pb-8">
      <button
        type="button"
        className="pointer-events-auto z-50 float-end mr-5 rounded-full border border-neutral-20 bg-white p-[10px] shadow-[0_15px_20px_0] shadow-black/15"
        onClick={handleClick}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
