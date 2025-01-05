interface MessageCardProps {
  message: MessageType
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <article className="flex w-full flex-col gap-4 rounded-[20px] bg-message-gradient p-6">
      <h3 className="relative z-0 w-fit">
        <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
        <p className="title-small text-neutral-80">To. {message.to}</p>
      </h3>
      <p className="body-large line-clamp-3 whitespace-pre-wrap text-neutral-80">
        {message.content}
      </p>
      <p className="title-small text-neutral-50">From. {message.from}</p>
    </article>
  )
}
