import Header from '@/components/Header'
import PrevButton from '@/components/PrevButton'
import SelectTarget from '@/containers/SelectTarget'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useFunnel from '@/hooks/useFunnel'

const WRITE_STEPS = ['select-target', 'second', 'third', 'fourth']

export default function Write() {
  const { Funnel, Step, setPrevStep, setNextStep } = useFunnel(WRITE_STEPS[0])
  useBodyBackgroundColor('neutral-90')

  return (
    <main className="flex w-full flex-col">
      <Header>
        <PrevButton onClick={setPrevStep} />
      </Header>
      <Funnel>
        <Step name={WRITE_STEPS[0]}>
          <SelectTarget
            nextButtonOnClick={(selected) => {
              if (selected === 'specific') {
                setNextStep(WRITE_STEPS[1])
              } else {
                setNextStep(WRITE_STEPS[3])
              }
            }}
          />
        </Step>
        <Step name={WRITE_STEPS[1]}>
          <div className="bg-yellow-300">
            <h1>1단계</h1>
            <button onClick={() => setNextStep('first')}>이전</button>
            <button onClick={() => setNextStep('third')}>다음</button>
          </div>
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
