interface MessageProps {
  to: string
  from: string
  content: string
}

export default function Message({ to, from, content }: MessageProps) {
  return (
    <article className="bg-message-gradient flex flex-col gap-4 rounded-[20px] p-6">
      <h3 className="relative z-0 w-fit">
        <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
        <p className="title-small text-neutral-80">To. {to}</p>
      </h3>
      <p className="body-large whitespace-pre-wrap text-neutral-80">{content}</p>
      <p className="title-small text-neutral-50">From. {from}</p>
    </article>
  )
}
