import SolidButton from '@/components/SolidButton'

interface SearchResultItemProps {
  information: OfficeAddressType
  onSelect: (officeName: string) => void
}

export default function SearchResultItem({ information, onSelect }: SearchResultItemProps) {
  return (
    <article className="flex gap-5 border-t border-neutral-80 py-4">
      <div className="grow">
        <p className="text-label-large mb-1 text-white">{information.officeName}</p>
        <p className="text-label-medium text-neutral-50">{information.roadAddress}</p>
      </div>
      <SolidButton
        variant="secondary"
        size="large"
        className="h-fit px-3 py-2"
        onClick={() => onSelect(information.officeName)}
      >
        선택
      </SolidButton>
    </article>
  )
}
