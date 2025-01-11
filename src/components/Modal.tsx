import useModalStore from '@/stores/modalStore'
import OutlinedButton from './OutlinedButton'
import SolidButton from './SolidButton'
import { twMerge } from 'tailwind-merge'

export default function Modal() {
  const isOpen = useModalStore((state) => state.isOpen)
  const content = useModalStore((state) => state.content)
  const cancelText = useModalStore((state) => state.cancelText)
  const confirmText = useModalStore((state) => state.confirmText)
  const onCancel = useModalStore((state) => state.onCancel)
  const onConfirm = useModalStore((state) => state.onConfirm)

  return (
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center bg-neutral-90/70 p-5 transition-opacity duration-200',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <section className="w-full max-w-[335px] rounded-xl bg-neutral-80 p-6">
        <p className="title-medium mb-[26px] text-center text-white">{content}</p>
        <div className="flex w-full justify-center gap-3">
          <OutlinedButton
            size="large"
            className="flex-1 basis-1/2 border border-neutral-70"
            onClick={() => {
              if (onCancel) onCancel()
            }}
          >
            {cancelText}
          </OutlinedButton>
          <SolidButton
            variant="primary"
            size="large"
            className="flex-1 basis-1/2"
            onClick={() => {
              if (onConfirm) onConfirm()
            }}
          >
            {confirmText}
          </SolidButton>
        </div>
      </section>
    </div>
  )
}
