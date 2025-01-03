import Header from '@/components/Header'
import PrevButton from '@/components/PrevButton'
import SelectTarget from '@/containers/SelectTarget'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useFunnel from '@/hooks/useFunnel'
import { useState } from 'react'

const WRITE_STEPS = ['select-target', 'second', 'third', 'fourth']

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
            buttonList={[
              {
                text: '특정 경찰/소방관 분께 남길게요',
                value: 'specific',
              },
              {
                text: '특정 대상이 없어요',
                value: 'general',
              },
            ]}
            nextButtonOnClick={(selected) => {
              if (selected === 'specific') {
                setNextStep(WRITE_STEPS[1])
              } else {
                setNextStep(WRITE_STEPS[3])
                setMessageInfo((prev) => ({ ...prev, target: null }))
              }
            }}
          />
        </Step>
        <Step name={WRITE_STEPS[1]}>
          <SelectTarget
            buttonList={[
              {
                text: '경찰관님 👮‍♂️',
                value: 'police-officer',
              },
              {
                text: '소방관님 🧑',
                value: 'firefighter',
              },
            ]}
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
          <div className="bg-green-300">
            <h1>2단계</h1>
            <button onClick={() => setNextStep('second')}>이전</button>
            <button onClick={() => setNextStep('fourth')}>다음</button>
          </div>
        </Step>
        <Step name={WRITE_STEPS[3]}>
          <div className="bg-blue-300">
            <h1>3단계</h1>
            <button onClick={() => setNextStep('third')}>이전</button>
          </div>
        </Step>
      </Funnel>
    </main>
  )
}
