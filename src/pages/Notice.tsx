import { getNotices } from '@/apis/notice'
import Header from '@/components/Header'
import NoticeItem from '@/containers/Notice/NoticeItem'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

const NOTICE_SIZE = 10

export default function Notice() {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [notices, setNotices] = useState<NoticeType[]>([])
  const [initialFetch, setInitialFetch] = useState(false)
  const navigate = useNavigate()
  const [ref, inView] = useInView()
  const mainRef = useRef<HTMLElement>(null)
  useBodyBackgroundColor('neutral-90')

  const fetchNotices = async () => {
    setLoading(true)
    try {
      const result = await getNotices(page, NOTICE_SIZE)
      if (result) {
        if (result.noticeList.length < NOTICE_SIZE) {
          setHasMore(false)
        }
        setNotices((prev) => [...prev, ...result.noticeList])
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchFirstNotices = async () => {
      await fetchNotices()
      setPage(1)
      setInitialFetch(true)
    }

    fetchFirstNotices()
  }, [])

  useEffect(() => {
    const loadMoreNotices = () => {
      if (loading || !hasMore || page === 0 || !initialFetch) return
      if (inView) {
        setPage((prevPage) => prevPage + 1)
        fetchNotices()
        return
      }

      // 컨텐츠가 화면 높이보다 작은 경우 추가 데이터 로드 (1번)
      if (mainRef.current) {
        if (mainRef.current.scrollHeight <= window.innerHeight) {
          setPage((prevPage) => prevPage + 1)
          fetchNotices()
        }
      }
    }

    loadMoreNotices()
  }, [inView, initialFetch])

  return (
    <>
      <Header className="bg-neutral-90" onClick={() => navigate(-1)} title="공지사항" />
      <main ref={mainRef} className="flex grow flex-col gap-3 px-5 pb-5">
        {notices.map((notice) => (
          <NoticeItem key={notice.noticeId} notice={notice} />
        ))}
        {loading && (
          <div className="flex justify-center p-4">
            <div className="loader" />
          </div>
        )}
        {notices.length > 0 && hasMore && <div ref={ref} className="h-4" />}
      </main>
    </>
  )
}
