import { getNotices } from '@/apis/notice'
import { ArrowLeftIcon } from '@/assets'
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
    <main className="flex w-full flex-col">
      <header className="max-w-600 fixed flex items-center justify-between bg-neutral-90 px-5 py-3">
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          <ArrowLeftIcon className="h-6 w-6 text-white" />
        </button>
        <p className="title-medium text-white">공지사항</p>
        <div className="h-6 w-6" />
      </header>
      <div className="mx-5 mb-5 mt-12 flex grow flex-col gap-3">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </div>
    </main>
  )
}
