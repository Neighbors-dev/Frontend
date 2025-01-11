const TEMP = {
  title: '35년간 기부한 대구 성서 경찰서',
  content:
    ' 35년간 매달 기부와 선행을 이어온 대구 성서경찰서 윤흥용 수사지원팀장이 대구교육청으로부터 교육감 감사패를 받았다. 매달 월급에서 일정 부분을 환경이 어려운 학생을 위해 기부했다.',
}

export default function NewsCard() {
  return (
    <article className="rounded-[20px] bg-neutral-80 p-6">
      <p className="title-medium mb-3 text-white">{TEMP.title}</p>
      <p className="body-medium text-neutral-20">{TEMP.content}</p>
    </article>
  )
}
