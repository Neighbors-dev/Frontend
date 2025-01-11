import Header from '@/components/Header'
import Loading from '@/components/Loading'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useGetNoticeById } from '@/hooks/useNotices'
import { Navigate, useParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export default function NoticeDetail() {
  const { id } = useParams()
  useBodyBackgroundColor('neutral-90')

  const { data: notice, isFetching, isError } = useGetNoticeById(id || '')

  if (!id || isError) return <Navigate to="/notice" replace />

  return (
    <>
      <Header className="bg-neutral-90" title="공지사항" />
      <main
        className={twMerge(
          'flex w-full flex-col gap-4 px-5 py-5',
          isFetching && 'grow justify-center'
        )}
      >
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <section>
              <h2 className="title-large mb-1 text-white">{notice?.title}</h2>
              <p className="label-medium text-neutral-50">{notice?.createdAT}</p>
            </section>
            <hr className="border-neutral-80" />
            <p className="body-large whitespace-pre-wrap text-neutral-30">{notice?.content}</p>
          </>
        )}
      </main>
    </>
  )
}
