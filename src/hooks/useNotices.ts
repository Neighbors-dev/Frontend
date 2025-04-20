import { getNoticeById, getNotices } from '@/apis/notice'
import { CACHE_TIME, STALE_TIME } from '@/constants/cache'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

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
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}

export const useGetNoticeById = (id: string) => {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: () => getNoticeById(id),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME * 2,
  })
}
