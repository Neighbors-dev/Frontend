import Header from '@/components/Header'
import { HEADER_TITLE, SELECT_TARGET_BUTTONS, WRITE_STEPS } from '@/constants/write'
import MessagesCollection from '@/containers/Write/MessagesCollection'
import NewsCollection from '@/containers/Write/NewsCollection'
import SearchOffice from '@/containers/Write/SearchOffice'
import WriteMessage from '@/containers/Write/WriteMessage'
import WriteMessageHeader from '@/containers/Write/WriteMessageHeader'
import WriteTargetInfo from '@/containers/Write/WriteTargetInfo'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useFunnel from '@/hooks/useFunnel'
import useWriteMessageStore from '@/stores/writeMessageStore'
import { useEffect } from 'react'
import SelectIsSpecific from '@/containers/Write/SelectIsSpecific'
import SelectHeroType from '@/containers/Write/SelectHeroType'

export default function Write() {
  const clearTargetType = useWriteMessageStore((state) => state.clearTargetType)
  const targetType = useWriteMessageStore((state) => state.targetType)
  const { Funnel, Step, setPrevStep, setNextStep, currentStep } = useFunnel(WRITE_STEPS[0])
  useBodyBackgroundColor('neutral-90')

  useEffect(() => {
    clearTargetType()
  }, [])

  return (
    <>
      <Header
        title={HEADER_TITLE[currentStep]}
        className="bg-neutral-90"
        icons={currentStep === WRITE_STEPS[4] && <WriteMessageHeader setNextStep={setNextStep} />}
        onClick={setPrevStep}
      />
      <main className="content-padding-small flex w-full grow flex-col">
        <Funnel>
          <Step name={WRITE_STEPS[0]}>
            <SelectIsSpecific
              onClickNextStep={() => {
                if (targetType === SELECT_TARGET_BUTTONS[0].value) {
                  setNextStep(WRITE_STEPS[1])
                } else {
                  setNextStep(WRITE_STEPS[4])
                }
              }}
            />
          </Step>
          <Step name={WRITE_STEPS[1]}>
            <SelectHeroType onClickNextStep={() => setNextStep(WRITE_STEPS[2])} />
          </Step>
          <Step name={WRITE_STEPS[2]}>
            <WriteTargetInfo
              onSearch={() => setNextStep(WRITE_STEPS[3])}
              onClickNextStep={() => setNextStep(WRITE_STEPS[4])}
            />
          </Step>
          <Step name={WRITE_STEPS[3]}>
            <SearchOffice onCompleteSelect={() => setNextStep(WRITE_STEPS[2])} />
          </Step>
          <Step name={WRITE_STEPS[4]}>
            <WriteMessage />
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
