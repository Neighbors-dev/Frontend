import { getMessages } from '@/apis/message'
import { getMyMessages } from '@/apis/notice'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const MESSAGE_SIZE = 5

export const useGetMessages = () => {
  return useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: ({ pageParam = 0 }) => getMessages(pageParam, MESSAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.openedLetters.length < MESSAGE_SIZE) {
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
  return useQuery({
    queryKey: ['my-messages'],
    queryFn: () => getMyMessages(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 60, // 1시간
  })
}
