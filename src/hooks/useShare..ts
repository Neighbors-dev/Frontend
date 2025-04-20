import { getSharing } from '@/apis/share'
import { CACHE_TIME, STALE_TIME } from '@/constants/cache'
import { useQuery } from '@tanstack/react-query'

export const useGetSharing = () => {
  return useQuery({
    queryKey: ['sharing'],
    queryFn: () => getSharing(),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}
