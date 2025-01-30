import { BUILDING_WINDOW } from '@/constants/window'
import BuildingWindow from '@/containers/Share/BuildingWindow'
import { chunkWindow } from '@/utils/chunkWindow'

interface SecondSlideProps {
  nickname: string
}

export default function SecondSlide({ nickname }: SecondSlideProps) {
  const writers = [nickname, '내 친구', '내 친구']
  const array = [0, 7, 9]

  return (
    <div className="relative flex w-full shrink-0 flex-col items-center">
      <div className="h-[144px]">
        <h1 className="headline-small mb-5 text-center text-white w-sm:text-[20px]">
          {nickname}님의 가족, 친구 분들과
          <br />
          함께 불빛을 밝혀나가면 어떨까요?
        </h1>
      </div>
      <div className="absolute top-[160px] z-[-10] h-[151px] w-[150px] rounded-full bg-[#C4EF66] blur-[77px]" />
      <section className="w-full max-w-[375px] grow overflow-hidden bg-[#262831] pb-24">
        <div className="roof-background mt-[-7px] h-[29px]" />
        <div className="h-3 w-full bg-[#3E3E42]" />
        <div className="flex flex-col gap-3 px-10 pt-7">
          {chunkWindow(
            BUILDING_WINDOW.slice(0, 12).map((window, index) => {
              const windowIndex = array.indexOf(index)
              return (
                <BuildingWindow
                  key={index}
                  imgSrc={window}
                  name={windowIndex < 0 ? null : writers[windowIndex]}
                />
              )
            })
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
