import Header from '@/components/Header'
import useEmblaCarousel from 'embla-carousel-react'
import { twMerge } from 'tailwind-merge'
import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'
import ThirdSlide from './ThirdSlide'
import useAuthStore from '@/stores/authStore'
import { useDotButton } from '@/hooks/useDotButton'

export default function Onboarding() {
  const nickname = useAuthStore((state) => state.user)?.nickname ?? ''
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

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
