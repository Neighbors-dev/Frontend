import Checkbox from '@/components/Checkbox'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import OutlinedButton from '@/components/OutlinedButton'
import SolidButton from '@/components/SolidButton'
import MyMessageCard from '@/containers/Message/MyMessageCard'
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor'
import { useGetMyMessageDetail } from '@/hooks/useMessage'
import useModalStore from '@/stores/modalStore'
import useToastStore from '@/stores/toastStore'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export default function MyMessageDetail() {
  const { id } = useParams()
  const [isPrivate, setIsPrivate] = useState(false)
  const openModal = useModalStore((store) => store.openModal)
  const showToast = useToastStore((store) => store.showToast)
  const { data: message, isFetching, isError } = useGetMyMessageDetail(id || '')
  useBodyBackgroundColor('neutral-90')

  if (!id || isError) return <Navigate to="/message" replace />

  const handleDelete = () => {
    openModal({
      content: '정말 삭제하시겠어요?',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        // delete message
        setTimeout(() => {
          showToast('내가 작성한 메시지를 삭제했어요.')
        }, 300)
      },
      onCancel: () => {
        // close modal
      },
    })
  }

  useEffect(() => {
    // isPublic도 들어오면 주석 해제
    /* if (message) {
      setIsPrivate(!message.letterInfo.isPublic)
    } */
  }, [message])

  return (
    <>
      <Header title="내가 작성한 메시지" className="bg-neutral-90" />
      <main
        className={twMerge(
          'content-padding flex grow flex-col justify-between gap-10',
          isFetching && 'justify-center'
        )}
      >
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <section className="flex grow flex-col">
              <MyMessageCard message={message.letterInfo} isShort={false} />
              <p className="label-large-prominent mb-1 mt-6 text-white">공개 여부 설정</p>
              <p className="body-medium mb-5 text-neutral-40">
                비공개로 설정 시, 다른 유저들이 메시지를 확인할 수 없어요.
              </p>
              <label
                htmlFor="isPrivate"
                className="label-medium flex cursor-pointer items-center gap-2 text-white"
              >
                <Checkbox
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={() => setIsPrivate((prev) => !prev)}
                />
                <span>비공개</span>
              </label>
            </section>
            <section className="flex gap-[15px]">
              <OutlinedButton
                size="large"
                className="flex-1 basis-1/2 border-neutral-70 bg-transparent"
                onClick={handleDelete}
              >
                삭제하기
              </OutlinedButton>
              <SolidButton
                variant="primary"
                size="large"
                className="flex-1 basis-1/2 disabled:bg-neutral-70 disabled:text-neutral-80"
              >
                완료
              </SolidButton>
            </section>
          </>
        )}
      </main>
    </>
  )
}
