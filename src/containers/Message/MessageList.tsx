import MyMessageCard from './MyMessageCard'

const TEMP = {
  to: '용산파출소 김대헌 경관님',
  from: 'sk',
  content:
    '안녕하세요 김대헌 경관님! 저번에 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!',
}

export default function MessageList() {
  return (
    <>
      <h2 className="title-large my-4 text-white">
        <span className="text-brand-yellow">4</span>개의 메시지를 작성했어요
      </h2>
      <section className="flex flex-col gap-4">
        <MyMessageCard message={TEMP} isShort isOpened />
        <MyMessageCard message={TEMP} isShort />
        <MyMessageCard message={TEMP} isShort />
        <MyMessageCard message={TEMP} isShort />
        <MyMessageCard message={TEMP} isShort isOpened />
        <MyMessageCard message={TEMP} isShort isOpened />
      </section>
    </>
  )
}
