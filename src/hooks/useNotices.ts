import { getNotices } from '@/apis/notice'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetNotices = (size: number) => {
  return useInfiniteQuery({
    queryKey: ['notices'],
    queryFn: ({ pageParam = 0 }) => getNotices(pageParam, size),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.noticeList.length < size) {
        return undefined // 더 이상 데이터가 없음
      }
      return allPages.length // 다음 페이지 번호
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5분
  })
}
