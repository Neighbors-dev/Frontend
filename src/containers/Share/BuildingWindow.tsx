import { BaseWindow } from '@/assets/icons'

interface BuildingWindowProps {
  index: number
  random: number[]
  imgSrc: string
}

export default function BuildingWindow({ index, random, imgSrc }: BuildingWindowProps) {
  return (
    <article className="flex h-[121px] w-fit flex-col justify-between">
      {random.includes(index) ? (
        <>
          <div className="relative h-auto w-[52px]">
            <img src={imgSrc} alt="" className="absolute z-10" />
            <BaseWindow className="text-brand-yellow drop-shadow-[0_0_40px_rgba(255,242,0,0.5)]" />
          </div>
          <p className="label-small relative z-10 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-neutral-90 px-2 py-1 text-white">
            내 친구
          </p>
        </>
      ) : (
        <BaseWindow className="text-[#0D1225]" />
      )}
    </article>
  )
}
