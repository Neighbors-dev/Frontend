import { SELECT_TARGET_BUTTONS } from '@/constants/write'
import SelectTarget from './SelectTarget'
import useWriteMessageStore from '@/stores/writeMessageStore'

interface SelectIsSpecificProps {
  onClickNextStep: () => void
}

export default function SelectIsSpecific({ onClickNextStep }: SelectIsSpecificProps) {
  const targetType = useWriteMessageStore((state) => state.targetType)
  const setTargetType = useWriteMessageStore((state) => state.setTargetType)
  const clearHeroType = useWriteMessageStore((state) => state.clearHeroType)

  const handleClickNextStep = () => {
    clearHeroType()
    onClickNextStep()
  }

  return (
    <SelectTarget
      buttonList={SELECT_TARGET_BUTTONS}
      selected={targetType}
      setSelected={setTargetType}
      onClickNextStep={handleClickNextStep}
    />
  )
}
