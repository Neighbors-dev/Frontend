import SelectTarget from './SelectTarget'
import useWriteMessageStore from '@/stores/writeMessageStore'
import { SELECT_HERO_TYPE_BUTTONS } from '@/constants/write'

interface SelectHeroType {
  onClickNextStep: () => void
}

export default function SelectHeroType({ onClickNextStep }: SelectHeroType) {
  const heroType = useWriteMessageStore((state) => state.heroType)
  const setHeroType = useWriteMessageStore((state) => state.setHeroType)
  const clearTargetInfo = useWriteMessageStore((state) => state.clearTargetInfo)

  const handleClickNextStep = () => {
    clearTargetInfo()
    onClickNextStep()
  }

  return (
    <SelectTarget
      buttonList={SELECT_HERO_TYPE_BUTTONS}
      selected={heroType}
      setSelected={setHeroType}
      onClickNextStep={handleClickNextStep}
    />
  )
}
