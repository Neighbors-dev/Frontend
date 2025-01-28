import Header from '@/components/Header'
import useEmblaCarousel from 'embla-carousel-react'
import { twMerge } from 'tailwind-merge'
import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'
import ThirdSlide from './ThirdSlide'
import useAuthStore from '@/stores/authStore'
import { useDotButton } from '@/hooks/useDotButton'
import SolidButton from '@/components/SolidButton'
import { shareLink } from '@/utils/shareLink'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export default function Onboarding() {
  const nickname = useAuthStore((state) => state.user)?.nickname ?? ''
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const queryClient = useQueryClient()

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
              <FirstSlide nickname={nickname} />
              <SecondSlide nickname={nickname} />
              <ThirdSlide nickname={nickname} />
            </div>
          </div>
          <SolidButton
            variant="primary"
            size="large"
            className={twMerge(
              'fixed bottom-[5%] left-1/2 z-20 w-[175px] -translate-x-1/2 rounded-full px-[30px] py-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] transition-opacity duration-300',
              selectedIndex === 2 ? 'opacity-100' : 'pointer-events-none opacity-0'
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
