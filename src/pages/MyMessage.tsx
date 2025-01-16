import Header from '@/components/Header'
import Loading from '@/components/Loading'
import MessageList from '@/containers/Message/MessageList'
import NoMessage from '@/containers/Message/NoMessage'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useGetMyMessages } from '@/hooks/useMessage'
import { twMerge } from 'tailwind-merge'

export default function MyMessage() {
  const { data: messages, isFetching } = useGetMyMessages()
  useBodyBackgroundColor('neutral-90')
  return (
    <>
      <Header title="내가 작성한 메시지" className="bg-neutral-90" />
      <main
        className={twMerge(
          'content-padding-small flex grow flex-col',
          isFetching && 'justify-center'
        )}
      >
        {isFetching ? (
          <Loading />
        ) : (
          <>{messages.length === 0 ? <NoMessage /> : <MessageList messages={messages} />}</>
        )}
      </main>
    </>
  )
}
