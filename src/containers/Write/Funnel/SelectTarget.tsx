import OutlinedButton from '@/components/OutlinedButton';
import SolidButton from '@/components/SolidButton';

interface SelectTargetProps {
  buttonList: { text: string; value: string }[]
  selected: string | undefined
  setSelected: (selected: string) => void
  onClickNextStep: () => void
}

export default function SelectTarget({
  buttonList,
  selected,
  setSelected,
  onClickNextStep,
}: SelectTargetProps) {
  return (
    <div className="flex grow flex-col justify-between gap-10">
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
              selected={selected === button.value}
              className="w-full"
              icon="check"
              onClick={() => setSelected(button.value)}
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
        disabled={!selected}
        onClick={() => selected && onClickNextStep()}
      >
        다음
      </SolidButton>
    </div>
  )
}
