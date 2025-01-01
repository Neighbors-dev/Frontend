import useFunnel from '@/hooks/useFunnel'

export default function Write() {
  const { Funnel, Step, setStep } = useFunnel('first')
  return (
    <Funnel>
      <Step name="first">
        <div className="bg-red-300">
          <button onClick={() => setStep('second')}>다음</button>
        </div>
      </Step>
      <Step name="second">
        <div className="bg-yellow-300">
          <button onClick={() => setStep('first')}>이전</button>
          <button onClick={() => setStep('third')}>다음</button>
        </div>
      </Step>
      <Step name="third">
        <div className="bg-green-300">
          <button onClick={() => setStep('second')}>이전</button>
          <button onClick={() => setStep('fourth')}>다음</button>
        </div>
      </Step>
      <Step name="fourth">
        <div className="bg-blue-300">
          <button onClick={() => setStep('third')}>이전</button>
        </div>
      </Step>
    </Funnel>
  )
}
