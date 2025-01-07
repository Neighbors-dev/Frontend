import { getNoticeById } from '@/apis/notice'
import Header from '@/components/Header'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function NoticeDetail() {
  const [notice, setNotice] = useState<NoticeType>()
  const { id } = useParams()
  useBodyBackgroundColor('neutral-90')

  useEffect(() => {
    const fetchNotice = async (id: string) => {
      const result = await getNoticeById(id)
      if (result) setNotice(result)
    }

    if (id) fetchNotice(id)
  }, [])

  return (
    <>
      <Header className="bg-neutral-90" title="공지사항" />
      <main className="flex w-full flex-col gap-4 px-5 py-5">
        <section>
          <h2 className="title-large mb-1 text-white">{notice?.title}</h2>
          <p className="label-medium text-neutral-50">{notice?.createdAT}</p>
        </section>
        <hr className="border-neutral-80" />
        <p className="body-large whitespace-pre-wrap text-neutral-30">{notice?.content}</p>
      </main>
    </>
  )
}
