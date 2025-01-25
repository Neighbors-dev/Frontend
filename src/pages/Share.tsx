import Onboarding from '@/containers/Share/Onboarding'
import Sharing from '@/containers/Share/Sharing'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useGetSharing } from '@/hooks/useShare.'

export default function Share() {
  const { data } = useGetSharing()
  useBodyBackgroundColor('#14192F')

  if (!data) return null

  if (data.numberOfWriter > 0) {
    return <Sharing numberOfWriter={data.numberOfWriter} nameOfWriters={data.nameOfWriters} />
  }

  return <Onboarding />
}
