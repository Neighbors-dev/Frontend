import { getMessages, Message } from '@/apis/message'
import { getNotices } from '@/apis/notice'
import { HamburgerIcon, PencilIcon } from '@/assets'
import MessageCard from '@/components/MessageCard'
import SolidButton from '@/components/SolidButton'
import TopButton from '@/components/TopButton'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import Sidebar from '@/layouts/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Main() {
  const [showFade, setShowFade] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [notices, setNotices] = useState<string[]>([])
  const [showSidebar, setShowSidebar] = useState(false)
  const noticeRef = useRef<HTMLDivElement>(null)
  useBodyBackgroundColor('#14192F')

  const fetchNotices = async () => {
    const result = await getNotices()
    if (result) setNotices([...result.notices, result.notices[0]])
  }

  const fetchMessages = async () => {
    const result = await getMessages()
    if (result) setMessages(result.messages)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => prevIndex + 1)
    }, 3000)
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const targetPosition = 430
      setShowFade(scrollPosition > targetPosition)
    }

    window.addEventListener('scroll', handleScroll)
    fetchNotices()
    fetchMessages()

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
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
  }, [slideIndex])

  return (
    <>
      <TopButton />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <main className="mt-12 w-full">
        <header className="max-w-600 fixed left-1/2 top-0 z-40 mb-1 flex -translate-x-1/2 items-center justify-between bg-[#14192F] px-5 py-3">
          <h1 className="text-white">로고</h1>
          <button type="button" onClick={() => setShowSidebar(true)}>
            <HamburgerIcon className="h-6 w-6 text-white" />
          </button>
        </header>
        <section className="mx-5 mt-1 flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3">
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
                <p
                  key={index}
                  className="body-medium line-clamp-1 h-[22px] break-all text-white/60"
                >
                  {notice}
                </p>
              ))}
            </div>
          </div>
        </section>
        <h2 className="headline-small mx-5 mt-6 text-white">
          지금까지 {messages.length}개의
          <br />
          메시지가 모였어요 💌
        </h2>
        <div className="my-5 flex h-[300px] w-full items-center justify-center bg-brand-yellow py-10">
          배경 이미지 들어갈 예정
        </div>
        <SolidButton variant="primary" size="large" className="mx-auto rounded-full">
          메시지 작성하기 <PencilIcon className="h-5 w-5" />
        </SolidButton>
        <div
          className={twMerge(
            'max-w-600 fixed left-1/2 top-12 z-10 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32] to-[#171D32]/0 to-45% transition-opacity duration-100',
            showFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <section className="mx-5 my-7 flex flex-col gap-5">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              to={message.to}
              from={message.from}
              content={message.content}
            />
          ))}
        </section>
        <div className="max-w-600 fixed bottom-0 left-1/2 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32]/0 to-[#171D32] opacity-20" />
      </main>
    </>
  )
}
