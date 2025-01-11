import NewsCard from '@/components/NewsCard'

export default function NewsCollection() {
  return (
    <div className="grow">
      <h2 className="body-large my-5 text-neutral-30">
        다른 사람이 작성한 감사 메시지를
        <br />
        참고해 작성해보세요!
      </h2>
      <section className="flex flex-col gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <NewsCard key={index} />
        ))}
      </section>
    </div>
  )
}
