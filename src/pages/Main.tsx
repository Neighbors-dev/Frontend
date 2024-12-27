import { HamburgerIcon, PencilIcon } from '@/assets'
import Message from '@/components/Message'
import SolidButton from '@/components/SolidButton'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const NOTICES = ['공지글입니다~!!', '두 번째 공지글입니다~!!', '세 번째 공지글입니다~!!']

export default function Main() {
  const [showFade, setShowFade] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const noticeRef = useRef<HTMLDivElement>(null)

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

    if (slideIndex === NOTICES.length) {
      handleMoveToFirstSlide()
    }
  }, [slideIndex])

  return (
    <div className="h-max min-h-screen bg-neutral-90">
      <div className="max-w-600 flex h-full flex-col bg-[#14192F]">
        <header className="max-w-600 fixed z-50 mb-1 flex items-center justify-between bg-[#14192F] px-5 py-3">
          <h1 className="text-white">로고</h1>
          <button type="button">
            <HamburgerIcon className="h-6 w-6 text-white" />
          </button>
        </header>
        <main className="mt-12 grow pt-1">
          <section className="mx-5 flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3">
            <h2 className="title-small shrink-0 text-white">공지</h2>
            <div className="h-[22px] w-full overflow-hidden">
              <div
                ref={noticeRef}
                className={twMerge(isTransitioning && 'ease transition-transform duration-500')}
                style={{
                  transform: `translateY(-${slideIndex * 22}px)`,
                }}
              >
                {NOTICES.concat(NOTICES[0]).map((notice, index) => (
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
            지금까지 {38}개의
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
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
            <Message
              to="용산경찰서 김대헌 경관님"
              from="죠죠다"
              content="OO파출소 경찰관님! 만취해서 전봇대에서 잠든 저를 구해주셔서 감사합니다! 항상 응원합니다!"
            />
          </section>
          <div className="max-w-600 fixed bottom-0 left-1/2 h-[83px] -translate-x-1/2 bg-gradient-to-b from-[#171D32]/0 to-[#171D32] opacity-20" />
        </main>
      </div>
    </div>
  )
}
