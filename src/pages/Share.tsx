import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import { BUILDING_WINDOW_FIRST } from '@/constants/window'
import BuildingWindow from '@/containers/Share/BuildingWindow'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { chunkWindow } from '@/utils/chunkWindow'
import { shareLink } from '@/utils/shareLink'

declare global {
  interface Window {
    Kakao: any
  }
}

export default function Share() {
  useBodyBackgroundColor('#14192F')
  const random = [0, 2, 4, 6]

  return (
    <>
      <Header title="공유하기" className="bg-[#14192F]" />
      <main className="flex grow flex-col items-center pt-[7%] text-center">
        <div className="absolute left-1/2 top-[10px] z-[-10] h-[350px] w-screen -translate-x-1/2 bg-star-top bg-cover bg-center" />
        <div className="absolute left-1/2 top-[325px] z-[-10] h-[390px] w-screen -translate-x-1/2 bg-star-bottom bg-cover bg-center" />
        <div>
          <h1 className="headline-small mb-5 text-center text-white">
            닉네임님의 공유로
            <br />
            6개의 불빛이 켜졌어요.
          </h1>
          <p className="title-small mb-8 text-neutral-30">친구에게 공유해 더 밝게 빛내보세요</p>
        </div>
        <div className="absolute top-[232px] z-[-10] h-[151px] w-[150px] rounded-full bg-[#C4EF66] blur-[77px]" />
        <section className="w-full max-w-[375px] grow overflow-hidden bg-[#262831] pb-24">
          <div className="roof-background mt-[-7px] h-[29px]" />
          <div className="h-3 w-full bg-[#3E3E42]" />
          <div className="flex flex-col gap-3 px-10 pt-7">
            {chunkWindow(
              BUILDING_WINDOW_FIRST.map((window, index) => (
                <BuildingWindow key={index} index={index} imgSrc={window} random={random} />
              ))
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
          className="fixed bottom-[5%] z-20 rounded-full px-[30px] py-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)]"
          onClick={shareLink}
        >
          친구에게 공유하기
        </SolidButton>
      </main>
    </>
  )
}
