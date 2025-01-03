import Header from '@/components/Header'
import PrevButton from '@/components/PrevButton'
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
  target: string | null
  message: string
}

export default function Write() {
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({ target: '', message: '' })
  const { Funnel, Step, setPrevStep, setNextStep } = useFunnel(WRITE_STEPS[0])
  useBodyBackgroundColor('neutral-90')

  console.log(messageInfo)

  return (
    <main className="flex w-full flex-col">
      <Header>
        <PrevButton onClick={setPrevStep} />
      </Header>
      <Funnel>
        <Step name={WRITE_STEPS[0]}>
          <SelectTarget
            buttonList={SELECT_TARGET_BUTTONS}
            nextButtonOnClick={(selected) => {
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
            nextButtonOnClick={(selected) => {
              setNextStep(WRITE_STEPS[2])
              if (selected === 'police-officer') {
                setMessageInfo((prev) => ({ ...prev, target: '경찰관님' }))
              } else {
                setMessageInfo((prev) => ({ ...prev, target: '소방관님' }))
              }
            }}
          />
        </Step>
        <Step name={WRITE_STEPS[2]}>
          <h1>{WRITE_STEPS[2]}</h1>
        </Step>
        <Step name={WRITE_STEPS[3]}>
          <h1>{WRITE_STEPS[3]}</h1>
        </Step>
        <Step name={WRITE_STEPS[4]}>
          <WriteMessage />
        </Step>
      </Funnel>
    </main>
  )
}
