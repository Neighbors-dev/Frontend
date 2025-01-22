import { BaseWindow } from '@/assets/icons'
import { WindowType0 } from '@/assets/windows'
import Header from '@/components/Header'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'

export default function Share() {
  useBodyBackgroundColor('#14192F')

  return (
    <>
      <Header className="bg-[#14192F]" />
      <main className="flex grow flex-col items-center text-center">
        <div className="absolute left-1/2 top-[10px] z-[-10] h-[350px] w-screen -translate-x-1/2 bg-star-top bg-cover bg-center" />
        <div className="absolute left-1/2 top-[325px] z-[-10] h-[390px] w-screen -translate-x-1/2 bg-star-bottom bg-cover bg-center" />
        <div>
          <h1 className="headline-small my-5 text-center text-white">
            닉네임님의 공유로
            <br />
            6개의 불빛이 켜졌어요.
          </h1>
          <p className="title-small mb-8 text-neutral-30">하지만 아직 많이 어두운 것 같아요.</p>
        </div>
        <div className="absolute top-[232px] z-[-10] h-[151px] w-[150px] rounded-full bg-[#C4EF66] blur-[77px]" />
        <section className="w-full max-w-[375px] grow overflow-hidden bg-[#262831] pb-24">
          <div className="roof-background mt-[-7px] h-[29px]" />
          <div className="h-3 w-full bg-[#3E3E42]" />
          <div className="grid grid-cols-4 justify-between gap-y-3 px-10 pt-7">
            {Array.from({ length: 7 }).map((_, index) => (
              <article key={index} className="flex h-[121px] w-[52px] flex-col justify-between">
                <div className="relative">
                  <img src={WindowType0} alt="" className="absolute z-10" />
                  <BaseWindow className="text-brand-yellow drop-shadow-[0_0_40px_rgba(255,242,0,0.5)]" />
                </div>
                <p className="label-small relative z-10 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-neutral-90 px-2 py-1 text-white">
                  내 친구
                </p>
              </article>
            ))}
            <article className="flex h-[121px] w-[52px] flex-col justify-between">
              <div className="relative">
                <BaseWindow className="text-[#0D1225]" />
              </div>
              <p className="label-small relative z-10 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-neutral-90 px-2 py-1 text-white">
                내 친구ㄹㄹ
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}
