import { LogoIcon } from '@/assets/icons'
import { ENVELOPE_IMG } from '@/constants/image'
import { LOGIN_HEADER_TEXT } from '@/constants/login'

export default function LoginHeader() {
  return (
    <section className="absolute left-1/2 top-[20%] z-10 -translate-x-1/2">
      <h1 className="flex flex-col items-center gap-[33px]">
        <LogoIcon className="w-auto h-8" />
        <div className="h-[102px] w-[102px]">
          <img
            src={ENVELOPE_IMG}
            alt="편지 아이콘"
            className="object-contain w-full h-full"
            loading="eager"
          />
        </div>
      </h1>
      <p className="mt-10 text-center text-white whitespace-pre-wrap title-large-light">
        {LOGIN_HEADER_TEXT}
      </p>
    </section>
  )
}
