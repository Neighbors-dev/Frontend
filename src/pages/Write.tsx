import { MessageIcon, ThumbUpIcon } from '@/assets'
import Header from '@/components/Header'
import SolidButton from '@/components/SolidButton'
import SelectTarget from '@/containers/Write/SelectTarget'
import WriteMessage from '@/containers/Write/WriteMessage'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useFunnel from '@/hooks/useFunnel'
import { useState } from 'react'

const WRITE_STEPS = ['SL-T', 'SL-H-T', 'W-I', 'SE-W', 'W-M']
const SELECT_TARGET_BUTTONS = [
  {
    text: '특정 경찰/소방관 분께 남길게요',
    value: 'specific',
  },
  {
    text: '특정 대상이 없어요',
    value: 'general',
  },
]
const SELECT_HERO_TYPE_BUTTONS = [
  {
    text: '경찰관님 👮‍♂️',
    value: 'police-officer',
  },
  {
    text: '소방관님 🧑',
    value: 'firefighter',
  },
]

interface MessageInfo {
  target: string | null | undefined
  message: string
}

export default function Write() {
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({ target: undefined, message: '' })
  const [specificTarget, setSpecificTarget] = useState<string>()
  const [selectedHeroType, setSelectedHeroType] = useState<string>()
  const { Funnel, Step, setPrevStep, setNextStep, currentStep } = useFunnel(WRITE_STEPS[0])
  useBodyBackgroundColor('neutral-90')

  console.log(messageInfo)

  return (
    <>
      <Header
        onClick={setPrevStep}
        icons={
          currentStep === WRITE_STEPS[4] && (
            <section className="flex items-center gap-3">
              <button type="button">
                <ThumbUpIcon className="h-6 w-6 text-white" />
              </button>
              <button>
                <MessageIcon className="h-6 w-6 text-white" />
              </button>
            </section>
          )
        }
      />
      <main className="content-padding-small flex w-full grow flex-col">
        <Funnel>
          <Step name={WRITE_STEPS[0]}>
            <SelectTarget
              buttonList={SELECT_TARGET_BUTTONS}
              defaultSelected={specificTarget}
              nextButtonOnClick={(selected) => {
                setSpecificTarget(selected)
                setSelectedHeroType(undefined)
                if (selected === 'specific') {
                  setNextStep(WRITE_STEPS[1])
                } else {
                  setNextStep(WRITE_STEPS[4])
                  setMessageInfo((prev) => ({ ...prev, target: null }))
                }
              }}
            />
          </Step>
          <Step name={WRITE_STEPS[1]}>
            <SelectTarget
              buttonList={SELECT_HERO_TYPE_BUTTONS}
              defaultSelected={selectedHeroType}
              nextButtonOnClick={(selected) => {
                setNextStep(WRITE_STEPS[2])
                setSelectedHeroType(selected)
                if (selected === 'police-officer') {
                  setMessageInfo((prev) => ({ ...prev, target: '경찰관님' }))
                } else {
                  setMessageInfo((prev) => ({ ...prev, target: '소방관님' }))
                }
              }}
            />
          </Step>
          <Step name={WRITE_STEPS[2]}>
            <div className="flex grow flex-col justify-between">
              <h1>{WRITE_STEPS[2]}</h1>
              <p className="text-center text-white">경찰 or 소방관 정보 입력 페이지 넣을 예정</p>
              <SolidButton
                variant="primary"
                size="large"
                className="w-full"
                onClick={() => setNextStep(WRITE_STEPS[4])}
              >
                다음
              </SolidButton>
            </div>
          </Step>
          <Step name={WRITE_STEPS[3]}>
            <h1>{WRITE_STEPS[3]}</h1>
          </Step>
          <Step name={WRITE_STEPS[4]}>
            <WriteMessage isTarget={!!messageInfo.target} />
          </Step>
        </Funnel>
      </main>
    </>
  )
}
