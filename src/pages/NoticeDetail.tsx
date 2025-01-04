import { getNoticeById } from '@/apis/notice'
import { ArrowLeftIcon } from '@/assets'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function NoticeDetail() {
  const [notice, setNotice] = useState<NoticeDetailType>()
  const { id } = useParams()
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  useEffect(() => {
    const fetchNotice = async (id: string) => {
      const result = await getNoticeById(id)
      if (result) setNotice(result)
    }

    if (id) fetchNotice(id)
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
      <div className="mx-5 mb-5 mt-[68px] flex grow flex-col gap-4">
        <section>
          <h2 className="title-large mb-1 text-white">{notice?.title}</h2>
          <p className="label-medium text-neutral-50">{notice?.date}</p>
        </section>
        <hr className="border-neutral-80" />
        <p className="body-large whitespace-pre-wrap text-neutral-30">{notice?.content}</p>
      </div>
    </main>
  )
}
