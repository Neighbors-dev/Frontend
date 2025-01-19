import Loading from '@/components/Loading'
import NewsCard from '@/components/NewsCard'
import { useGetNews } from '@/hooks/useNews'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function NewsCollection() {
  const [ref, inView] = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetNews()

  const news = data?.pages.flatMap((page) => page.newsInfos ?? []) ?? []

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="grow">
      <h2 className="body-large my-5 text-neutral-30">
        다른 사람이 작성한 감사 메시지를
        <br />
        참고해 작성해보세요!
      </h2>
      <section className="flex flex-col gap-5">
        {news.map((item) => (
          <NewsCard key={item.newsId} news={item} />
        ))}
        {isFetching && <Loading />}
        {news.length > 0 && hasNextPage && <div ref={ref} className="h-4" />}
      </section>
    </div>
  )
}
