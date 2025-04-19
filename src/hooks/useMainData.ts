import { getMainData } from '@/apis/message'
import { CACHE_TIME, STALE_TIME } from '@/constants/cache'
import { useQuery } from '@tanstack/react-query'

export const useMainData = () => {
  return useQuery({
    queryKey: ['main-data'],
    queryFn: () => getMainData(),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}
