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

const MESSAGE_SIZE = 5

export default function Main() {
  const [showFade, setShowFade] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
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
      <TopButton />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <Header onClick={() => setShowSidebar(true)} />
      <main className="mt-12 w-full">
        <NoticeSection notices={mainData?.topNotices || []} />
        <h2 className="headline-small mx-5 mt-6 text-white">
          지금까지 {Math.max(mainData?.writtenLetterNumber || 0, messages.length)}개의
          <br />
          메시지가 모였어요 💌
        </h2>
        <div className="my-5 flex h-[300px] w-full items-center justify-center bg-brand-yellow py-10">
          배경 이미지 들어갈 예정
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
            <MessageCard key={index} message={message} />
          ))}
          {isFetching && <Loading />}
          {messages.length > 0 && hasNextPage && <div ref={ref} className="h-4" />}
        </section>
        <div className="max-w-600 fixed bottom-0 left-1/2 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32]/0 to-[#171D32] opacity-20" />
      </main>
    </>
  )
}
