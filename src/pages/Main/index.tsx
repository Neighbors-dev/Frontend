import TopButton from './components/TopButton'
import Header from './components/Header'
import NoticeSection from './components/NoticeSection'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useMainData } from '@/hooks/useMainData'
import { useGetMessages } from '@/hooks/useMessage'
import Sidebar from '@/layouts/Sidebar'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import MessageModal from '@/components/MessageModal'
import { extractImgLink } from '@/utils/extractImgLink'
import MessageList from './components/MessageList'
import WriteMessageButton from './components/WriteMessageButton'
import { useScrollFade } from '@/hooks/useScrollFade'

export default function MainPage() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMessage, setActiveMessage] = useState<MessageType | undefined>()
  const [ref, inView] = useInView()
  const [buttonRef, isButtonVisible] = useInView({
    rootMargin: '-50px 0px 100%',
    threshold: 0,
  })
  const { state } = useLocation()
  const showFade = useScrollFade()
  useBodyBackgroundColor('#14192F')

  const { data: mainData, refetch: mainDataRefetch } = useMainData()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: messagesRefetch,
  } = useGetMessages()

  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.openedLetters ?? []) ?? [],
    [data?.pages]
  )

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (state?.from === 'write') {
      mainDataRefetch()
      messagesRefetch()
    }
  }, [state?.from])

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
        <WriteMessageButton isVisible={!isButtonVisible} buttonRef={buttonRef} />
        <WriteMessageButton isVisible={isButtonVisible} isFixed />
        <div
          className={twMerge(
            'fixed left-1/2 top-12 h-[83px] w-full -translate-x-1/2 bg-gradient-to-b from-[#171D32] to-[#171D32]/0 to-45% transition-opacity',
            showFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <MessageList
          messages={messages}
          hasNextPage={hasNextPage}
          observerRef={ref}
          setActiveMessage={setActiveMessage}
        />
        <div className="max-w-600 pointer-events-none fixed bottom-0 left-1/2 z-0 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32]/0 to-[#171D32] opacity-20" />
      </main>
    </>
  )
}
