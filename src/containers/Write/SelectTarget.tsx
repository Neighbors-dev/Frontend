import OutlinedButton from '@/components/OutlinedButton'
import SolidButton from '@/components/SolidButton'
import { useState } from 'react'

interface SelectTargetProps {
  buttonList: { text: string; value: string }[]
  defaultSelected?: string
  nextButtonOnClick: (selected: string) => void
}

export default function SelectTarget({
  buttonList,
  defaultSelected,
  nextButtonOnClick,
}: SelectTargetProps) {
  const [selectedTarget, setSelectedTarget] = useState<string | undefined>(defaultSelected)

  return (
    <div className="content-padding-small flex grow flex-col justify-between">
      <section>
        <h2 className="headline-small mb-4 text-white">
          경찰관, 소방관 분들에게
          <br />
          감사의 메시지를 남겨주세요
        </h2>
        <h3 className="body-large text-neutral-30">
          감사를 표현하고 싶은
          <br />
          특정한 대상이 있나요?
        </h3>
        <div className="mt-20 flex flex-col gap-4">
          {buttonList.map((button) => (
            <OutlinedButton
              key={button.value}
              size="large"
              selected={selectedTarget === button.value}
              className="w-full"
              icon="check"
              onClick={() => setSelectedTarget(button.value)}
            >
              {button.text}
            </OutlinedButton>
          ))}
        </div>
      </section>
      <SolidButton
        variant="primary"
        size="large"
        className="w-full"
        disabled={!selectedTarget}
        onClick={() => selectedTarget && nextButtonOnClick(selectedTarget)}
      >
        다음
      </SolidButton>
    </div>
  )
}
