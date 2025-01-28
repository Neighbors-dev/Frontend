import MessageCard from '@/components/MessageCard'
import SolidButton from '@/components/SolidButton'
import TopButton from '@/components/TopButton'
import Header from '@/containers/Main/Header'
import NoticeSection from '@/containers/Main/NoticeSection'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useMainData } from '@/hooks/useMainData'
import { useGetMessages } from '@/hooks/useMessage'
import Sidebar from '@/layouts/Sidebar'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLocation, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import MessageModal from '@/components/MessageModal'
import { extractImgLink } from '@/utils/extractImgLink'
import { PencilIcon } from '@/assets/icons'

export default function Main() {
  const [showFade, setShowFade] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMessage, setActiveMessage] = useState<MessageType | undefined>()
  const [ref, inView] = useInView()
  const navigate = useNavigate()
  const location = useLocation()
  useBodyBackgroundColor('#14192F')

  const { data: mainData } = useMainData()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useGetMessages()

  const messages = data?.pages.flatMap((page) => page.openedLetters ?? []) ?? []

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const targetPosition = 430
      setShowFade(scrollPosition > targetPosition)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (location.state && location.state.from === 'write') {
      refetch()
    }
  }, [location])

  return (
    <>
      {activeMessage && (
        <MessageModal message={activeMessage} onClose={() => setActiveMessage(undefined)} />
      )}
      <TopButton />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <Header onClick={() => setShowSidebar(true)} />
      <div className="absolute left-1/2 top-[-39px] h-[350px] w-screen -translate-x-1/2 bg-star-top bg-cover bg-center" />
      <main className="relative mt-12 w-full">
        <NoticeSection notices={mainData?.topNotices || []} />
        <h2 className="headline-small mx-5 mb-6 mt-6 text-white">
          지금까지 {Math.max(mainData?.writtenLetterNumber || 0, messages.length)}개의
          <br />
          메시지가 모였어요 💌
        </h2>
        <div className="relative mx-5 my-16">
          <div className="overflow-hidden">
            <img
              src={extractImgLink(Math.max(mainData?.writtenLetterNumber || 0, messages.length))}
              alt="배경 이미지"
              className="relative left-1/2 h-auto w-full min-w-[360px] max-w-[560px] -translate-x-1/2"
            />
          </div>
          <div id="bg-2" className="main-background" />
        </div>
        <div className="relative">
          <SolidButton
            variant="primary"
            size="large"
            className="relative z-10 mx-auto rounded-full"
            onClick={() => navigate('/write')}
          >
            메시지 작성하기 <PencilIcon className="h-5 w-5" />
          </SolidButton>
          <div className="absolute bottom-[-9px] left-1/2 z-[-1] h-[23px] w-[93px] -translate-x-1/2 rounded-[50px] bg-brand-yellow blur-[27px]" />
        </div>
        <div
          className={twMerge(
            'fixed left-1/2 top-12 h-[83px] w-full -translate-x-1/2 bg-gradient-to-b from-[#171D32] to-[#171D32]/0 to-45% transition-opacity',
            showFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <section className="mx-5 my-7 flex flex-col items-center gap-5">
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              isShort
              onClick={() => setActiveMessage(message)}
            />
          ))}
          {messages.length > 0 && hasNextPage && <div ref={ref} className="h-4" />}
        </section>
        <div className="max-w-600 pointer-events-none fixed bottom-0 left-1/2 z-0 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32]/0 to-[#171D32] opacity-20" />
      </main>
    </>
  )
}
