import MyMessageCard from './MyMessageCard'

const TEMP = {
  to: '용산파출소 김대헌 경관님',
  from: 'sk',
  content:
    '안녕하세요 김대헌 경관님! 저번에 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!',
}

interface MessageListProps {
  messages: MessageType[]
}

export default function MyMessageList({ messages }: MessageListProps) {
  // TODO: 데이터 구조 확인 및 변경
  return (
    <>
      <h2 className="title-large my-4 text-white">
        <span className="text-brand-yellow">4</span>개의 메시지를 작성했어요
      </h2>
      <section className="flex flex-col gap-4">
        {messages.map((message) => (
          <MyMessageCard message={TEMP} isShort isOpened />
        ))}
      </section>
    </>
  )
}
