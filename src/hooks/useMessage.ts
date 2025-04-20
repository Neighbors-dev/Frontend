import { getMessages, getMyMessageDetail, getMyMessages } from '@/apis/message'
import { CACHE_TIME, STALE_TIME } from '@/constants/cache'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const MESSAGE_SIZE = 10

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
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}

export const useGetMyMessages = () => {
  return useQuery({
    queryKey: ['my-messages'],
    queryFn: () => getMyMessages(),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}

export const useGetMyMessageDetail = (id: string) => {
  return useQuery({
    queryKey: ['my-message-detail', id],
    queryFn: () => getMyMessageDetail(id),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    retry: 0,
  })
}
