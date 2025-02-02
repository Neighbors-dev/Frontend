import { BaseWindow } from '@/assets/icons'

interface BuildingWindowProps {
  imgSrc: string
  name: string | null
}

export default function BuildingWindow({ imgSrc, name }: BuildingWindowProps) {
  return (
    <article className="relative flex h-[121px] w-fit flex-col items-center justify-between">
      {name !== null ? (
        <>
          <div className="relative h-auto w-[52px]">
            <img src={imgSrc} alt="" className="absolute z-10" />
            <BaseWindow className="text-brand-yellow drop-shadow-[0_0_40px_rgba(255,242,0,0.5)]" />
          </div>
          {name && (
            <p className="label-small absolute bottom-0 z-10 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-neutral-90 px-2 py-1 text-white">
              {name}
            </p>
          )}
        </>
      ) : (
        <BaseWindow className="text-[#0D1225]" />
      )}
    </article>
  )
}
