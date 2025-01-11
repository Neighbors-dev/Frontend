import { getMainData } from '@/apis/message'
import { useQuery } from '@tanstack/react-query'

export const useMainData = () => {
  return useQuery({
    queryKey: ['main-data'],
    queryFn: () => getMainData(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 60, // 1시간
  })
}
