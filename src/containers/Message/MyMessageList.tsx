import { useNavigate } from 'react-router-dom'
import MyMessageCard from './MyMessageCard'
interface MessageListProps {
  messages: MyMessageType[]
}

export default function MyMessageList({ messages }: MessageListProps) {
  const navigate = useNavigate()

  return (
    <>
      <h2 className="title-large my-4 text-white">
        <span className="text-brand-yellow">{messages.length}</span>개의 메시지를 작성했어요
      </h2>
      <section className="flex flex-col gap-4">
        {messages.map((message) => (
          <MyMessageCard
            key={message.letterId}
            message={message}
            isShort
            onClick={() => {
              if (message.letterId) navigate(`${message.letterId}`)
            }}
          />
        ))}
      </section>
    </>
  )
}
