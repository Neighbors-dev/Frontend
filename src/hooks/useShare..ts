import { getSharing } from '@/apis/share'
import { useQuery } from '@tanstack/react-query'

export const useGetSharing = () => {
  return useQuery({
    queryKey: ['sharing'],
    queryFn: () => getSharing(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 60, // 1시간
  })
}
