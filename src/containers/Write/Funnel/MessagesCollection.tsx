import MessageCard from '@/components/MessageCard'
import MessageModal from '@/components/MessageModal'
import { useGetMessages } from '@/hooks/useMessage'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function MessagesCollection() {
  const [activeMessage, setActiveMessage] = useState<MessageType | undefined>()
  const [ref, inView] = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMessages()

  const messages = data?.pages.flatMap((page) => page.openedLetters ?? []) ?? []

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      {activeMessage && (
        <MessageModal message={activeMessage} onClose={() => setActiveMessage(undefined)} />
      )}
      <div className="grow">
        <h2 className="body-large my-5 text-neutral-30">
          다른 사람들이 작성한 감사 메시지를
          <br />
          참고해 작성해보세요!
        </h2>
        <section className="flex flex-col gap-5">
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              isShort
              onClick={() => setActiveMessage(message)}
            />
          ))}
          {messages.length > 0 && hasNextPage && <div ref={ref} className="h-4" />}
        </section>
      </div>
    </>
  )
}
