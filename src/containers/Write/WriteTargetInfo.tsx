import { SearchIcon } from '@/assets'
import Checkbox from '@/components/Checkbox'
import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'

interface WriteTargetInfoProps {
  nextButtonOnClick: () => void
}

export default function WriteTargetInfo({ nextButtonOnClick }: WriteTargetInfoProps) {
  return (
    <div className="flex grow flex-col justify-between">
      <section className="">
        <div className="mb-8 flex flex-col gap-4">
          <h2 className="headline-small text-white">
            경찰관, 소방관님의
            <br />
            정보를 알려주세요
          </h2>
          <h3 className="body-large text-neutral-30">
            경찰관, 소방관님의 성함과 근무지를 입력해주세요.
            <br />잘 모르겠다면 넘어가도 좋아요.
          </h3>
        </div>
        <div className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-4">
            <label htmlFor="name" className="title-small flex flex-col text-white">
              <p className="mb-1">성함</p>
              <TextField type="text" id="name" placeholder="성함을 입력해주세요." />
            </label>
            <label htmlFor="no-name" className="label-medium flex items-center gap-2 text-white">
              <Checkbox id="no-name" />잘 모르겠어요
            </label>
          </fieldset>
          <fieldset className="flex flex-col gap-4">
            <label htmlFor="workplace" className="title-small flex flex-col text-white">
              <p className="mb-1">근무지</p>
              <TextField
                type="text"
                id="workplace"
                placeholder="근무지를 검색해주세요. ex) 강동경찰서"
                rightIcon={
                  <button type="button">
                    <SearchIcon />
                  </button>
                }
              />
            </label>
            <label
              htmlFor="no-workplace"
              className="label-medium flex items-center gap-2 text-white"
            >
              <Checkbox id="no-workplace" />잘 모르겠어요
            </label>
          </fieldset>
        </div>
      </section>
      <SolidButton variant="primary" size="large" className="w-full" onClick={nextButtonOnClick}>
        다음
      </SolidButton>
    </div>
  )
}
