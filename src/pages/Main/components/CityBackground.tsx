import { extractImgLink } from '@/utils/extractImgLink'

interface CityBackgroundProps {
  messageCount: number
}

const CityBackground = ({ messageCount }: CityBackgroundProps) => {
  return (
    <section className="relative mx-5 mt-10 mb-16">
      <div className="overflow-hidden">
        <img
          src={extractImgLink(messageCount)}
          alt="배경 이미지"
          className="relative left-1/2 h-auto w-full min-w-[360px] max-w-[560px] -translate-x-1/2"
        />
      </div>
      <div id="bg-2" className="main-background" />
    </section>
  )
}

export default CityBackground
