import { getMessages } from '@/apis/message'
import { getMyMessages } from '@/apis/notice'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useGetMessages = (size: number) => {
  return useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: ({ pageParam = 0 }) => getMessages(pageParam, size),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.openedLetters.length < size) {
        return undefined
      }
      return allPages.length
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 60, // 1시간
  })
}

export const useGetMyMessages = () => {
  // TODO: 메시지 등록 후 캐시 초기화
  // queryClient.resetQueries(queryKey, { exact: true });
  return useQuery({
    queryKey: ['my-messages'],
    queryFn: () => getMyMessages(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 60, // 1시간
  })
}
