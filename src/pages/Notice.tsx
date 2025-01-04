import { getNotices } from '@/apis/notice'
import Header from '@/components/Header'
import NoticeItem from '@/containers/Notice/NoticeItem'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Notice() {
  const [notices, setNotices] = useState<NoticeType[]>([])
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  useEffect(() => {
    const fetchNotices = async () => {
      const result = await getNotices()
      if (result) setNotices(result.notices)
    }

    fetchNotices()
  }, [])

  return (
    <>
      <Header className="bg-neutral-90" onClick={() => navigate(-1)} title="공지사항" />
      <main className="full-height flex flex-col gap-3 px-5 pb-5">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </main>
    </>
  )
}
