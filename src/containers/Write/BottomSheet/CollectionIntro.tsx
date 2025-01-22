import { MessageIcon, ThumbUpIcon } from '@/assets/icons'
import SolidButton from '@/components/SolidButton'
import useWriteBottomStore from '@/stores/writeBottomStore'
import { twMerge } from 'tailwind-merge'

export default function CollectionIntro() {
  const showCollectionIntro = useWriteBottomStore((state) => state.showCollectionIntro)
  const toggleCollectionIntro = useWriteBottomStore((state) => state.toggleCollectionIntro)

  return (
    <div
      className={twMerge(
        'absolute bottom-0 left-0 z-10 h-[395px] w-full overflow-hidden',
        !showCollectionIntro && 'pointer-events-none'
      )}
    >
      <article
        className={twMerge(
          'mb-8 flex h-full flex-col gap-5 rounded-tl-[20px] rounded-tr-[20px] bg-neutral-80 px-8 py-6 transition-transform duration-300',
          showCollectionIntro ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <p className="label-medium text-center text-white">
          무엇을, 어떻게 써야할 지 모르겠다면
          <br />
          상단의 아이콘을 눌러보세요!
        </p>
        <hr className="w-full border-neutral-70" />
        <section className="flex items-center gap-4">
          <div className="rounded bg-neutral-70 p-1">
            <ThumbUpIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="label-medium-prominent mb-1 text-white">소식 모아보기</p>
            <p className="label-medium text-neutral-40">
              경찰관, 소방관 분들의 최근 소식을 볼 수 있어요
            </p>
          </div>
        </section>
        <hr className="w-full border-neutral-70" />
        <section className="flex items-center gap-4">
          <div className="rounded bg-neutral-70 p-1">
            <MessageIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="label-medium-prominent mb-1 text-white">감사 메시지 모아보기</p>
            <p className="label-medium text-neutral-40">
              다른 사람이 작성한 메시지를 참고할 수 있어요
            </p>
          </div>
        </section>
        <SolidButton
          variant="primary"
          size="large"
          className="mt-5"
          onClick={toggleCollectionIntro}
        >
          확인
        </SolidButton>
      </article>
    </div>
  )
}
