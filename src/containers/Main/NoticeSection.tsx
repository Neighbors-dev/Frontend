import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface NoticeSectionProps {
  notices: NoticeType[]
}

export default function NoticeSection({ notices }: NoticeSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const noticeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // notices가 1개보다 많을 때만
    if (notices.length > 1) {
      const interval = setInterval(() => {
        setSlideIndex((prevIndex) => prevIndex + 1)
      }, 3000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [notices.length])

  useEffect(() => {
    // notices가 1개보다 많을 때만
    if (notices.length > 1) {
      const handleMoveToFirstSlide = () => {
        setTimeout(() => {
          if (noticeRef.current) {
            setIsTransitioning(false)
          }
          setSlideIndex(0)
          setTimeout(() => {
            if (noticeRef.current) {
              setIsTransitioning(true)
            }
          }, 100)
        }, 500)
      }

      if (slideIndex === notices.length) {
        handleMoveToFirstSlide()
      }
    }
  }, [slideIndex, notices.length])

  return (
    <Link to="/notice">
      <section className="relative z-10 mx-5 mt-1 flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3">
        <h2 className="title-small shrink-0 text-white">공지</h2>
        <div className="h-[22px] w-full overflow-hidden">
          <div
            ref={noticeRef}
            className={twMerge(isTransitioning && 'ease transition-transform duration-500')}
            style={{
              transform: `translateY(-${slideIndex * 22}px)`,
            }}
          >
            {notices.map((notice, index) => (
              <p key={index} className="body-medium line-clamp-1 h-[22px] break-all text-white/60">
                {notice.title}
              </p>
            ))}
          </div>
        </div>
      </section>
    </Link>
  )
}
