import { getNews } from '@/apis/news'
import { CACHE_TIME, STALE_TIME } from '@/constants/cache'
import { useInfiniteQuery } from '@tanstack/react-query'

const NEWS_SIZE = 10

export const useGetNews = () => {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({ pageParam = 0 }) => getNews(pageParam, NEWS_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.newsInfos.length < NEWS_SIZE) {
        return undefined
      }
      return allPages.length
    },
    initialPageParam: 0,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}
