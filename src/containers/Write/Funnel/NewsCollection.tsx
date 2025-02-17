import NewsCard from '@/components/NewsCard'
import { useGetNews } from '@/hooks/useNews'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function NewsCollection() {
  const [ref, inView] = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNews()

  const news = data?.pages.flatMap((page) => page.newsInfos ?? []) ?? []

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="grow">
      <h2 className="body-large my-5 text-neutral-30">
        경찰·소방관님의 이야기를 읽고,
        <br />
        감사의 마음을 전해보세요.
      </h2>
      <section className="flex flex-col gap-5">
        {news.map((item) => (
          <NewsCard key={item.newsId} news={item} />
        ))}
        <div ref={ref} className="h-4" />
      </section>
    </div>
  )
}
