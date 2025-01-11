import { getNoticeById, getNotices } from '@/apis/notice'
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
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 60, // 1시간
  })
}

export const useGetNoticeById = (id: string) => {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: () => getNoticeById(id),
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 2, // 2시간
  })
}
