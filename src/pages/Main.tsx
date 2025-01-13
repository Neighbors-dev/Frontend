import { PencilIcon } from '@/assets'
import Loading from '@/components/Loading'
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
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import BackgroundImg from '@/assets/images/background.png'
import MessageModal from '@/containers/Main/MessageModal'

const MESSAGE_SIZE = 5

export default function Main() {
  const [showFade, setShowFade] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeMessage, setActiveMessage] = useState<MessageType | undefined>()
  const [ref, inView] = useInView()
  const navigate = useNavigate()
  useBodyBackgroundColor('#14192F')

  const { data: mainData } = useMainData()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetMessages(MESSAGE_SIZE)

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

  return (
    <>
      {activeMessage && (
        <MessageModal message={activeMessage} onClose={() => setActiveMessage(undefined)} />
      )}
      <TopButton />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <Header onClick={() => setShowSidebar(true)} />
      {/* <div>
        <div id="1" className="main-blur-item-1" />
        <div id="2" className="main-blur-item-2" />
        <div id="bg-1" className="main-background-1l" />
        <div
          id="3"
          className="absolute left-1/2 top-[638px] h-[23px] w-[93px] -translate-x-1/2 rounded-full bg-brand-yellow blur-[27px]"
        />
      </div> */}
      <main className="relative mt-12 w-full">
        <NoticeSection notices={mainData?.topNotices || []} />
        <h2 className="headline-small mx-5 mb-6 mt-6 text-white">
          지금까지 {Math.max(mainData?.writtenLetterNumber || 0, messages.length)}개의
          <br />
          메시지가 모였어요 💌
        </h2>
        <div className="relative mx-5 my-16">
          <img
            src={BackgroundImg}
            alt="배경 이미지"
            className="mx-auto h-auto w-full max-w-[498px]"
          />
          <div id="bg-2" className="main-background-2" />
        </div>
        <SolidButton
          variant="primary"
          size="large"
          className="mx-auto rounded-full"
          onClick={() => navigate('/write')}
        >
          메시지 작성하기 <PencilIcon className="h-5 w-5" />
        </SolidButton>
        <div
          className={twMerge(
            'max-w-600 fixed left-1/2 top-12 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32] to-[#171D32]/0 to-45% transition-opacity duration-100',
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
          {isFetching && <Loading />}
          {messages.length > 0 && hasNextPage && <div ref={ref} className="h-4" />}
        </section>
        <div className="max-w-600 fixed bottom-0 left-1/2 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32]/0 to-[#171D32] opacity-20" />
      </main>
    </>
  )
}
