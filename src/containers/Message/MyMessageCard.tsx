import { twMerge } from 'tailwind-merge'

interface MyMessageCardProps {
  message: MessageType
  isShort: boolean
  isOpened?: boolean
  onClick?: () => void
}

export default function MyMessageCard({
  message,
  isShort,
  isOpened = false,
  onClick,
}: MyMessageCardProps) {
  return (
    <article
      className={twMerge(
        'flex max-h-[324px] w-full flex-col gap-4 rounded-[20px] bg-message-gradient p-6',
        onClick && 'cursor-pointer',
        !isShort && 'grow'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="relative z-0 w-fit">
          <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
          <p className="title-small text-neutral-80">To. {message.to}</p>
        </h3>
        {isOpened && (
          <div className="label-medium-prominent h-fit rounded-md bg-success-10 px-2 py-1 text-success-40">
            열람 완료
          </div>
        )}
      </div>
      <p
        className={twMerge(
          'body-large grow overflow-auto whitespace-pre-wrap text-neutral-80',
          isShort && 'line-clamp-3'
        )}
      >
        {message.content}
      </p>
      <div className="title-small flex items-center gap-1.5 text-neutral-50">
        <span>2024.12.31</span>
        <hr className="h-3.5 w-[1px] border-none bg-neutral-30" />
        <span>{isOpened ? '공개' : '비공개'}</span>
      </div>
    </article>
  )
}
