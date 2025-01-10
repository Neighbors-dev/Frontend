import Header from '@/components/Header'
import {
  HEADER_TITLE,
  SELECT_HERO_TYPE_BUTTONS,
  SELECT_TARGET_BUTTONS,
  WRITE_STEPS,
} from '@/constants/write'
import MessagesCollection from '@/containers/Write/MessagesCollection'
import NewsCollection from '@/containers/Write/NewsCollection'
import SearchOffice from '@/containers/Write/SearchOffice'
import SelectTarget from '@/containers/Write/SelectTarget'
import WriteMessage from '@/containers/Write/WriteMessage'
import WriteMessageHeader from '@/containers/Write/WriteMessageHeader'
import WriteTargetInfo from '@/containers/Write/WriteTargetInfo'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useFunnel from '@/hooks/useFunnel'
import { useState } from 'react'

interface MessageInfo {
  target: string | null | undefined
  message: string
}

export default function Write() {
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({ target: undefined, message: '' })
  const [specificTarget, setSpecificTarget] = useState<string>()
  const [selectedHeroType, setSelectedHeroType] = useState<string>()
  const { Funnel, Step, setPrevStep, setNextStep, currentStep } = useFunnel(WRITE_STEPS[4])
  useBodyBackgroundColor('neutral-90')

  return (
    <>
      <Header
        title={HEADER_TITLE[currentStep]}
        className="bg-neutral-90"
        icons={currentStep === WRITE_STEPS[4] && <WriteMessageHeader setNextStep={setNextStep} />}
        onClick={setPrevStep}
      />
      <main className="content-padding-small flex w-full grow flex-col bg-green-600">
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
            <WriteTargetInfo
              searchButtonOnClick={() => setNextStep(WRITE_STEPS[3])}
              nextButtonOnClick={() => setNextStep(WRITE_STEPS[4])}
            />
          </Step>
          <Step name={WRITE_STEPS[3]}>
            <SearchOffice />
          </Step>
          <Step name={WRITE_STEPS[4]}>
            <WriteMessage isTarget={!!messageInfo.target} />
          </Step>
          <Step name={WRITE_STEPS[5]}>
            <NewsCollection />
          </Step>
          <Step name={WRITE_STEPS[6]}>
            <MessagesCollection />
          </Step>
        </Funnel>
      </main>
    </>
  )
}
