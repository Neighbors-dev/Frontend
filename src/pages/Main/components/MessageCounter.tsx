interface MessageCounterProps {
  messageCount: number
}

const MessageCounter = ({ messageCount }: MessageCounterProps) => {
  return (
    <section className="mx-5 mt-6">
      <h2 className="mb-2 text-white headline-small">
        지금까지 {messageCount}개의
        <br />
        메시지가 모였어요 💌
      </h2>
      <p className="body-medium text-neutral-40">
        전체 메시지가 쌓일수록
        <br />
        도시에 불이 켜져요
      </p>
    </section>
  )
}

export default MessageCounter
