interface NewsCardProps {
  news: NewsType
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="rounded-[20px] bg-neutral-80 p-6">
      <p className="title-medium mb-3 text-white">{news.title}</p>
      <p className="body-medium text-neutral-20">{news.content}</p>
    </article>
  )
}
