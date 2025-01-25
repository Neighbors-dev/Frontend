import SolidButton from '@/components/SolidButton'
import { BUILDING_WINDOW } from '@/constants/window'
import BuildingWindow from '@/containers/Share/BuildingWindow'
import { chunkWindow } from '@/utils/chunkWindow'
import { shareLink } from '@/utils/shareLink'

interface ThirdSlideProps {
  nickname: string
}

export default function ThirdSlide({ nickname }: ThirdSlideProps) {
  const writers = [nickname, '내 친구', '내 친구']
  const array = [0, 7, 9, 2, 5, 8]

  return (
    <div className="relative flex w-full shrink-0 flex-col items-center">
      <div className="h-[144px]">
        <h1 className="headline-small mb-5 text-center text-white">
          {nickname}님의 공유 한 번이
          <br />이 도시를 밝게 빛나게 할 수 있어요!
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
      <SolidButton
        variant="primary"
        size="large"
        className="fixed bottom-[5%] z-20 w-[175px] rounded-full px-[30px] py-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)]"
        onClick={shareLink}
      >
        친구에게 공유하기
      </SolidButton>
    </div>
  )
}
