import { ArrowLeftIcon } from '@/assets'

interface PrevButtonProps {
  onClick: () => void
}

export default function PrevButton({ onClick }: PrevButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <ArrowLeftIcon className="h-6 w-6 text-white" />
    </button>
  )
}
