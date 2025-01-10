import { MessageIcon, ThumbUpIcon } from '@/assets'
import { WRITE_STEPS } from '@/constants/write'

interface WriteMessageHeaderProps {
  setNextStep: (nextStep: string) => void
}

export default function WriteMessageHeader({ setNextStep }: WriteMessageHeaderProps) {
  return (
    <section className="flex items-center gap-3">
      <button type="button">
        <ThumbUpIcon className="h-6 w-6 text-white" onClick={() => setNextStep(WRITE_STEPS[5])} />
      </button>
      <button>
        <MessageIcon className="h-6 w-6 text-white" onClick={() => setNextStep(WRITE_STEPS[6])} />
      </button>
    </section>
  )
}
