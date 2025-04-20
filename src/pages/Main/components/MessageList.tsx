import MessageCard from '@/components/MessageCard'

interface MessageListProps {
  messages: MessageType[]
  hasNextPage: boolean
  observerRef: (node?: Element | null) => void
  setActiveMessage: (message: MessageType) => void
}

export default function MessageList({
  messages,
  hasNextPage,
  observerRef,
  setActiveMessage,
}: MessageListProps) {
  return (
    <section className="flex flex-col items-center gap-5 mx-5 my-7">
      {messages.map((message, index) => (
        <MessageCard
          key={`${index}-${message.to}-${message.from}`}
          message={message}
          isShort
          onClick={() => setActiveMessage(message)}
        />
      ))}
      {messages.length > 0 && hasNextPage && <div ref={observerRef} className="h-4" />}
    </section>
  )
}
