import Header from '@/components/Header'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import NoMessage from '@/containers/Message/NoMessage'
import MessageList from '@/containers/Message/MessageList'
import { useState } from 'react'

export default function MyMessage() {
  const [isEmpty, setIsEmpty] = useState(false)
  useBodyBackgroundColor('neutral-90')
  return (
    <>
      <Header title="내가 작성한 메시지" className="bg-neutral-90" />
      <main className="content-padding-small flex grow flex-col">
        {isEmpty ? <NoMessage /> : <MessageList />}
      </main>
    </>
  )
}
