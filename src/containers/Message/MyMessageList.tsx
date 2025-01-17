import MyMessageCard from './MyMessageCard'
interface MessageListProps {
  messages: MyMessageType[]
}

export default function MyMessageList({ messages }: MessageListProps) {
  // TODO: 데이터 구조 확인 및 변경
  return (
    <>
      <h2 className="title-large my-4 text-white">
        <span className="text-brand-yellow">{messages.length}</span>개의 메시지를 작성했어요
      </h2>
      <section className="flex flex-col gap-4">
        {messages.map((message) => (
          <MyMessageCard message={message} isShort />
        ))}
      </section>
    </>
  )
}
