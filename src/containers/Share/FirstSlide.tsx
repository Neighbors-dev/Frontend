import { BUILDING_WINDOW } from '@/constants/window'
import BuildingWindow from '@/containers/Share/BuildingWindow'
import { chunkWindow } from '@/utils/chunkWindow'

interface FirstSlideProps {
  nickname: string
}

export default function FirstSlide({ nickname }: FirstSlideProps) {
  return (
    <div className="relative flex w-full shrink-0 flex-col items-center">
      <div className="h-[144px]">
        <h1 className="headline-small w-sm:text-[20px] mb-5 text-center text-white">
          {nickname}님, 어두웠던 아파트를
          <br />
          밝혀주셨어요.
        </h1>
        <p className="title-small text-neutral-30">하지만 아직 많이 어두운 것 같아요.</p>
      </div>
      <div className="absolute top-[160px] z-[-10] h-[151px] w-[150px] rounded-full bg-[#C4EF66] blur-[77px]" />
      <section className="w-full max-w-[375px] grow overflow-hidden bg-[#262831] pb-24">
        <div className="roof-background mt-[-7px] h-[29px]" />
        <div className="h-3 w-full bg-[#3E3E42]" />
        <div className="flex flex-col gap-3 px-10 pt-7">
          {chunkWindow(
            BUILDING_WINDOW.slice(0, 12).map((window, index) => (
              <BuildingWindow key={index} imgSrc={window} name={index === 0 ? nickname : null} />
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
