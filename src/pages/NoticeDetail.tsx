import { getNoticeById } from '@/apis/notice'
import Header from '@/components/Header'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export default function NoticeDetail() {
  const [notice, setNotice] = useState<NoticeType>()
  const [error, setError] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  useEffect(() => {
    const fetchNotice = async (id: string) => {
      const result = await getNoticeById(id)
      if (result) {
        setNotice(result)
      } else {
        setError(true)
      }
    }

    if (id) fetchNotice(id)
  }, [])

  if (!id || error) return <Navigate to="/notice" replace />

  return (
    <>
      <Header className="bg-neutral-90" onClick={() => navigate(-1)} title="공지사항" />
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
