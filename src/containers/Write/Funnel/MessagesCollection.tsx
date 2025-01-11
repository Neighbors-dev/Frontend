import MessageCard from '@/components/MessageCard'

const TEMP = {
  to: '용산파출소 김대헌 경과님',
  from: '죠죠다',
  content:
    '안녕하세요 김대헌 경관님! 저번에 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!',
}

export default function MessagesCollection() {
  return (
    <div className="grow">
      <h2 className="body-large my-5 text-neutral-30">
        다른 사람이 작성한 감사 메시지를
        <br />
        참고해 작성해보세요!
      </h2>
      <section className="flex flex-col gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <MessageCard key={index} message={TEMP} />
        ))}
      </section>
    </div>
  )
}
