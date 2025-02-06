import { BUILDING_WINDOW } from '@/constants/window'
import BuildingWindow from '@/containers/Share/BuildingWindow'
import { chunkWindow } from '@/utils/chunkWindow'

interface SlideProps {
  title: string
  subtitle?: string
  windowObj: Record<number, string | undefined>
}

export default function Slide({ title, subtitle, windowObj }: SlideProps) {
  return (
    <div className="relative flex w-full shrink-0 flex-col items-center">
      <div className="mb-[50px] flex h-[110px] flex-col justify-between whitespace-pre-wrap">
        <h1 className="headline-small text-center text-white w-sm:text-[20px]">{title}</h1>
        <p className="title-small text-neutral-30">{subtitle}</p>
      </div>
      <div className="absolute top-[170px] z-[-10] h-[151px] w-[150px] rounded-full bg-[#C4EF66] blur-[77px]" />
      <section className="w-full max-w-[375px] grow overflow-hidden bg-[#262831] pb-24">
        <div className="roof-background mt-[-7px] h-[29px]" />
        <div className="h-3 w-full bg-[#3E3E42]" />
        <div className="flex flex-col gap-3 px-10 pt-7">
          {chunkWindow(
            BUILDING_WINDOW.slice(0, 12).map((window, index) => (
              <BuildingWindow key={index} imgSrc={window} name={windowObj[index] ?? null} />
            ))
          ).map((row, index) => (
            <div key={index} className="flex justify-between">
              {row}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
