import { useState } from 'react'

interface StepProps {
  name: string
  children: React.ReactNode
}

interface FunnelProps {
  children: React.ReactElement<StepProps>[]
}

export default function useFunnel(defaultStep: string) {
  const [currentStep, setCurrentStep] = useState(defaultStep)

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === currentStep)
    return <>{targetStep}</>
  }

  const Step = ({ children }: StepProps) => {
    return <>{children}</>
  }

  return { Funnel, Step, setStep: setCurrentStep, currentStep } as const
}
