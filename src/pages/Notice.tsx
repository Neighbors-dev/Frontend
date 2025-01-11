import Header from '@/components/Header'
import Loading from '@/components/Loading'
import NoticeItem from '@/containers/Notice/NoticeItem'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useGetNotices } from '@/hooks/useNotices'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

const NOTICE_SIZE = 10

export default function Notice() {
  const mainRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView()
  useBodyBackgroundColor('neutral-90')

  const { data, fetchNextPage, hasNextPage, isFetching } = useGetNotices(NOTICE_SIZE)
  const notices = data?.pages.flatMap((page) => page?.noticeList ?? []) ?? []

  useEffect(() => {
    // 초기 로드 후 화면 높이 체크
    if (data && !isFetching && mainRef.current) {
      if (mainRef.current.scrollHeight <= window.innerHeight && hasNextPage) {
        fetchNextPage()
      }
    }
  }, [data, isFetching, hasNextPage, fetchNextPage])

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage])

  return (
    <>
      <Header className="bg-neutral-90" title="공지사항" />
      <main
        ref={mainRef}
        className={twMerge('flex grow flex-col gap-3 px-5 pb-5', 'justify-center')}
      >
        {notices.map((notice, index) => (
          <NoticeItem key={index} index={index} notice={notice} />
        ))}
        {isFetching && <Loading />}
        {notices.length > 0 && hasNextPage && <div ref={ref} className="h-4" />}
      </main>
    </>
  )
}
