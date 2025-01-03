import { useState } from 'react'

interface StepProps {
  name: string
  children: React.ReactNode
}

interface FunnelProps {
  children: React.ReactElement<StepProps>[]
}

export default function useFunnel(defaultStep: string) {
  const [stepHistory, setStepHistory] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(defaultStep)

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === currentStep)
    return <>{targetStep}</>
  }

  const Step = ({ children }: StepProps) => {
    return <>{children}</>
  }

  const setNextStep = (nextStep: string) => {
    setStepHistory((prev) => [...prev, currentStep])
    setCurrentStep(nextStep)
  }

  const setPrevStep = () => {
    if (stepHistory.length === 0) return

    setCurrentStep(stepHistory[stepHistory.length - 1] || defaultStep)
    setStepHistory((prev) => prev.slice(0, prev.length - 1))
  }

  return { Funnel, Step, setPrevStep, setNextStep, currentStep } as const
}
