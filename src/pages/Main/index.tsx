import TopButton from './components/TopButton'
import Header from './components/Header'
import NoticeSection from './components/NoticeSection'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useMainData } from '@/hooks/useMainData'
import { useGetMessages } from '@/hooks/useMessage'
import Sidebar from '@/layouts/Sidebar'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import MessageModal from '@/components/MessageModal'
import MessageList from './components/MessageList'
import WriteMessageButton from './components/WriteMessageButton'
import { useScrollFade } from '@/hooks/useScrollFade'
import CityBackground from './components/CityBackground'
import MessageCounter from './components/MessageCounter'
import SolidButton from '@/components/SolidButton'

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

  const { data: mainData, refetch: mainDataRefetch, isError: isMainDataError } = useMainData()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: messagesRefetch,
    isError: isMessagesError,
  } = useGetMessages()

  const messages = useMemo(
    () => data?.pages.flatMap((page) => page.openedLetters ?? []) ?? [],
    [data?.pages]
  )

  const messageCount = useMemo(
    () => Math.max(mainData?.writtenLetterNumber || 0, messages.length),
    [mainData?.writtenLetterNumber, messages.length]
  )

  const handleSidebarToggle = useCallback(() => {
    setShowSidebar(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveMessage(undefined)
  }, [])

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

  if (isMainDataError || isMessagesError) {
    return (
      <main className="main-container content-padding">
        <div className="flex grow flex-col items-center justify-center p-4 text-white">
          <p className="title-medium mb-5">데이터를 불러오는데 실패했습니다.</p>
          <SolidButton
            variant="primary"
            size="medium"
            className="rounded-full"
            onClick={() => {
              mainDataRefetch()
              messagesRefetch()
            }}
          >
            다시 시도하기
          </SolidButton>
        </div>
      </main>
    )
  }

  return (
    <>
      {activeMessage && <MessageModal message={activeMessage} onClose={handleCloseModal} />}
      <TopButton />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <Header onClick={handleSidebarToggle} />
      <div className="absolute left-1/2 top-[-39px] h-[350px] w-screen -translate-x-1/2 bg-star-top bg-cover bg-center" />
      <main className="relative mt-12 w-full">
        <NoticeSection notices={mainData?.topNotices || []} />
        <MessageCounter messageCount={messageCount} />
        <CityBackground messageCount={messageCount} />
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
