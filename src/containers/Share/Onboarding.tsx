import Header from '@/components/Header'
import useEmblaCarousel from 'embla-carousel-react'
import { twMerge } from 'tailwind-merge'
import useAuthStore from '@/stores/authStore'
import { useDotButton } from '@/hooks/useDotButton'
import SolidButton from '@/components/SolidButton'
import { shareLink } from '@/utils/shareLink'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Slide from './Slide'

export default function Onboarding() {
  const nickname = useAuthStore((state) => state.user)?.nickname ?? ''
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const queryClient = useQueryClient()

  const SLIDE_DATA = [
    {
      title: `${nickname}님, 어두웠던 아파트를\n밝혀주셨어요`,
      subtitle: '이제 가족, 친구들과 함께 더 많은 불빛을 켜볼까요?',
      windowObj: { 0: nickname },
    },
    {
      title: `공유하기 버튼을 눌러\n링크를 보내주세요`,
      windowObj: { 0: nickname, 7: '내 친구', 9: '내 친구' },
    },
    {
      title: `링크를 통해 감사메시지를 남기면\n불빛이 켜져요`,
      subtitle: '함께하는 사람마다 불빛이 하나씩 늘어날거에요',
      windowObj: { 0: nickname, 7: '내 친구', 9: '내 친구', 2: '' },
    },
    {
      title: `${nickname}님의 공유 한 번이\n이 도시를 밝게 빛나게 할 수 있어요!`,
      subtitle: `익숙하지 않은 이름이 보여도 놀라지 마세요\n${nickname}님의 선한 영향력을 받은 분이에요`,
      windowObj: {
        0: nickname,
        7: '내 친구',
        9: '내 친구',
        2: '',
        5: '',
        8: '',
      },
    },
  ]

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <>
      <Header className="bg-[#14192F]" prevPath="/" />
      <main className="flex grow flex-col pt-[7%] text-center">
        <div className="absolute left-1/2 top-[10px] z-[-10] h-[350px] w-screen -translate-x-1/2 bg-star-top bg-cover bg-center" />
        <div className="absolute left-1/2 top-[325px] z-[-10] h-[390px] w-screen -translate-x-1/2 bg-star-bottom bg-cover bg-center" />
        <section className="flex w-full grow flex-col">
          <div className="flex grow flex-col overflow-hidden" ref={emblaRef}>
            <div className="flex grow touch-pan-y touch-pinch-zoom">
              {SLIDE_DATA.map(({ title, subtitle, windowObj }) => (
                <Slide title={title} subtitle={subtitle} windowObj={windowObj} />
              ))}
            </div>
          </div>
          <SolidButton
            variant="primary"
            size="large"
            className={twMerge(
              'fixed bottom-[5%] left-1/2 z-20 w-[175px] -translate-x-1/2 rounded-full px-[30px] py-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] transition-opacity duration-300',
              selectedIndex === SLIDE_DATA.length - 1
                ? 'opacity-100'
                : 'pointer-events-none opacity-0'
            )}
            onClick={() => {
              shareLink(nickname)
              queryClient.invalidateQueries({ queryKey: ['sharing'] })
            }}
          >
            친구에게 공유하기
          </SolidButton>
          <div className="fixed bottom-[2%] left-1/2 flex -translate-x-1/2 items-center justify-center gap-1">
            {scrollSnaps.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={twMerge(
                  'h-2 w-2 rounded-full bg-neutral-60 text-white',
                  index === selectedIndex && 'bg-brand-yellow'
                )}
              ></button>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
