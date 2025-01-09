import NicknameComplete from '@/containers/Register/NicknameComplete'
import WriteNickname from '@/containers/Register/WriteNickname'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import useFunnel from '@/hooks/useFunnel'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const REGISTER_NICKNAME = ['R-N', 'R-N-C']

export default function RegisterNickname() {
  const { Funnel, Step, setPrevStep, setNextStep } = useFunnel(REGISTER_NICKNAME[0])
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()
  useBodyBackgroundColor('neutral-90')

  return (
    <Funnel>
      <Step name={REGISTER_NICKNAME[0]}>
        <WriteNickname
          nextButtonOnClick={(value: string) => {
            setNickname(value)
            setNextStep(REGISTER_NICKNAME[1])
          }}
        />
      </Step>
      <Step name={REGISTER_NICKNAME[1]}>
        <NicknameComplete
          nickname={nickname}
          prevButtonOnclick={setPrevStep}
          nextButtonOnClick={() => {
            navigate('/')
          }}
        />
      </Step>
    </Funnel>
  )
}
