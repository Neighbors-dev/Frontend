import { twMerge } from 'tailwind-merge'

interface MessageCardProps {
  message: MessageType
  isShort: boolean
  onClick?: () => void
}

export default function MessageCard({ message, isShort, onClick }: MessageCardProps) {
  return (
    <article
      className={twMerge(
        'flex w-full flex-col gap-4 rounded-[20px] bg-message-gradient p-6',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <h3 className="relative z-0 w-fit">
        <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
        <p className="title-small text-neutral-80">To. {message.to}</p>
      </h3>
      <p
        className={twMerge(
          'body-large whitespace-pre-wrap text-neutral-80',
          isShort && 'line-clamp-3'
        )}
      >
        {message.content}
        {message.content}
        {message.content}
      </p>
      <p className="title-small text-neutral-50">From. {message.from}</p>
    </article>
  )
}
