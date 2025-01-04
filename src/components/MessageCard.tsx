interface MessageCardProps {
  to: { office: string; name: string }
  from: string
  content: string
}

export default function MessageCard({ to, from, content }: MessageCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-[20px] bg-message-gradient p-6">
      <h3 className="relative z-0 w-fit">
        <div className="absolute bottom-[1px] z-[-10] h-[11px] w-full bg-brand-yellow/60" />
        <p className="title-small text-neutral-80">
          To. {to.office} {to.name}
        </p>
      </h3>
      <p className="body-large line-clamp-3 whitespace-pre-wrap text-neutral-80">{content}</p>
      <p className="title-small text-neutral-50">From. {from}</p>
    </article>
  )
}
