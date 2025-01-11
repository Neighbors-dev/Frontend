import { SearchIcon } from '@/assets'
import Checkbox from '@/components/Checkbox'
import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import useWriteMessageStore from '@/stores/writeMessageStore'

interface WriteTargetInfoProps {
  onSearch: () => void
  onClickNextStep: () => void
}

export default function WriteTargetInfo({ onSearch, onClickNextStep }: WriteTargetInfoProps) {
  const targetInfo = useWriteMessageStore((state) => state.targetInfo)
  const setTargetInfo = useWriteMessageStore((state) => state.setTargetInfo)

  const noDataName = !targetInfo.noName && targetInfo.name.trim() === ''
  const noDataOffice = !targetInfo.noOffice && targetInfo.office.trim() === ''

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetInfo({ ...targetInfo, name: e.target.value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setTargetInfo({ ...targetInfo, [id]: checked })
  }

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
              <TextField
                type="text"
                id="name"
                placeholder="성함을 입력해주세요."
                value={targetInfo.name}
                disabled={targetInfo.noName}
                onChange={handleNameChange}
              />
            </label>
            <label
              htmlFor="noName"
              className="label-medium flex cursor-pointer items-center gap-2 text-white"
            >
              <Checkbox id="noName" checked={targetInfo.noName} onChange={handleCheckboxChange} />
              <span>잘 모르겠어요</span>
            </label>
          </fieldset>
          <fieldset className="flex flex-col gap-4">
            <label htmlFor="office" className="title-small flex flex-col text-white">
              <p className="mb-1">근무지</p>
              <TextField
                type="text"
                id="office"
                placeholder="근무지를 검색해주세요. ex) 강동경찰서"
                value={targetInfo.office}
                disabled={targetInfo.noOffice}
                Icon={SearchIcon}
                onClick={onSearch}
              />
            </label>
            <label
              htmlFor="noOffice"
              className="label-medium flex cursor-pointer items-center gap-2 text-white"
            >
              <Checkbox
                id="noOffice"
                checked={targetInfo.noOffice}
                onChange={handleCheckboxChange}
              />
              <span>잘 모르겠어요</span>
            </label>
          </fieldset>
        </div>
      </section>
      <SolidButton
        variant="primary"
        size="large"
        className="w-full"
        disabled={noDataName || noDataOffice}
        onClick={onClickNextStep}
      >
        다음
      </SolidButton>
    </div>
  )
}
