import MessageCard from '@/components/MessageCard'
import SolidButton from '@/components/SolidButton'
import TopButton from './components/TopButton'
import Header from './components/Header'
import NoticeSection from './components/NoticeSection'
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
  const [buttonRef, isButtonVisible] = useInView({
    rootMargin: '-40px 0px 100%',
    threshold: 0,
  })
  const navigate = useNavigate()
  const location = useLocation()
  useBodyBackgroundColor('#14192F')

  const { data: mainData, refetch: mainDataRefetch } = useMainData()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: messagesRefetch,
  } = useGetMessages()

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
      mainDataRefetch()
      messagesRefetch()
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
      <main className="relative w-full mt-12">
        <NoticeSection notices={mainData?.topNotices || []} />
        <section className="mx-5 mt-6">
          <h2 className="mb-2 text-white headline-small">
            지금까지 {Math.max(mainData?.writtenLetterNumber || 0, messages.length)}개의
            <br />
            메시지가 모였어요 💌
          </h2>
          <p className="body-medium text-neutral-40">
            전체 메시지가 쌓일수록
            <br />
            도시에 불이 켜져요
          </p>
        </section>
        <div className="relative mx-5 mt-10 mb-16">
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
            ref={buttonRef}
            variant="primary"
            size="large"
            className="relative z-10 py-4 mx-auto rounded-full"
            onClick={() => navigate('/write')}
          >
            메시지 작성하기 <PencilIcon className="w-5 h-5" />
          </SolidButton>
          <div className="absolute bottom-[-9px] left-1/2 z-[-1] h-[23px] w-[93px] -translate-x-1/2 rounded-[50px] bg-brand-yellow blur-[27px]" />
        </div>
        <div
          className={twMerge(
            'fixed left-1/2 top-12 h-[83px] w-full -translate-x-1/2 bg-gradient-to-b from-[#171D32] to-[#171D32]/0 to-45% transition-opacity',
            showFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <SolidButton
          variant="primary"
          size="large"
          className={twMerge(
            'fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 rounded-full py-4 transition-opacity duration-200',
            isButtonVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
          )}
          onClick={() => navigate('/write')}
        >
          메시지 작성하기 <PencilIcon className="w-5 h-5" />
        </SolidButton>
        <section className="flex flex-col items-center gap-5 mx-5 my-7">
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
