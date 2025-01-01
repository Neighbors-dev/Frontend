import Header from '@/components/Header'
import OutlinedButton from '@/components/OutlinedButton'
import PrevButton from '@/components/PrevButton'
import SolidButton from '@/components/SolidButton'
import { useState } from 'react'

export default function SelectTarget() {
  const [selectedTarget, setSelectedTarget] = useState<'specific' | 'general'>()

  return (
    <main className="flex w-full flex-col">
      <Header>
        <PrevButton />
      </Header>
      <div className="content-padding-small flex grow flex-col justify-between">
        <section>
          <h1 className="headline-small mb-4 text-white">
            경찰관, 소방관 분들에게
            <br />
            감사의 메시지를 남겨주세요
          </h1>
          <h2 className="body-large text-neutral-30">
            감사를 표현하고 싶은
            <br />
            특정한 대상이 있나요?
          </h2>
          <div className="mt-20 flex flex-col gap-4">
            <OutlinedButton
              size="large"
              selected={selectedTarget === 'specific'}
              className="w-full"
              icon="check"
              onClick={() => setSelectedTarget('specific')}
            >
              특정 경찰/소방관 분께 남길게요
            </OutlinedButton>
            <OutlinedButton
              size="large"
              selected={selectedTarget === 'general'}
              className="w-full"
              icon="check"
              onClick={() => setSelectedTarget('general')}
            >
              특정 대상이 없어요
            </OutlinedButton>
          </div>
        </section>
        <SolidButton variant="primary" size="large" className="w-full" disabled={!selectedTarget}>
          다음
        </SolidButton>
      </div>
    </main>
  )
}
