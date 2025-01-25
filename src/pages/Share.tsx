import Sharing from '@/containers/Share/Sharing'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useGetSharing } from '@/hooks/useShare.'

export default function Share() {
  const { data } = useGetSharing()
  useBodyBackgroundColor('#14192F')

  return (
    <>
      {data && data.numberOfWriter > 0 && (
        <Sharing numberOfWriter={data.numberOfWriter} nameOfWriters={data.nameOfWriters} />
      )}
    </>
  )
}
