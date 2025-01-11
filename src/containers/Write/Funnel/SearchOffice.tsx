import SolidButton from '@/components/SolidButton'
import TextField from '@/components/TextField'
import SearchResultItem from './SearchResultItem'
import { useState } from 'react'
import useWriteMessageStore from '@/stores/writeMessageStore'
import { getSearchResult } from '@/apis/message'

interface SearchOfficeProps {
  onCompleteSelect: () => void
}

export default function SearchOffice({ onCompleteSelect }: SearchOfficeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResult, setSearchResult] = useState<OfficeAddressType[]>([])
  const heroType = useWriteMessageStore((state) => state.heroType)
  const setTargetOffice = useWriteMessageStore((state) => state.setTargetOffice)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setSearchKeyword(searchQuery)

    const result = await getSearchResult(searchQuery, heroType || '')
    if (result) {
      setSearchResult(result)
    } else {
      setSearchResult([])
    }
  }

  const handleSelect = (officeName: string) => {
    setTargetOffice(officeName)
    onCompleteSelect()
  }

  return (
    <div className="grow bg-neutral-90">
      <div className="sticky top-12">
        <div className="bg-neutral-90">
          <section className="mb-5">
            <h2 className="headline-small mb-5 text-white">근무지를 검색해주세요</h2>
            <form className="flex gap-3" onSubmit={handleSearch}>
              <TextField
                value={searchQuery}
                placeholder="도로명, 지번, 건물명 검색"
                className="py-3"
                onChange={handleInput}
              />
              <SolidButton variant="primary" size="large" type="submit" className="shrink-0 px-4">
                검색
              </SolidButton>
            </form>
          </section>
          {searchKeyword.length > 0 && searchResult.length === 0 && (
            <p className="label-large-prominent mb-5 text-brand-yellow">
              '{searchKeyword}'과 관련된 근무지를 찾지 못했어요.
            </p>
          )}
          <section>
            {searchResult.length > 0 ? (
              <p className="large-prominent text-white">
                <span className="text-brand-yellow">{searchResult.length}</span>곳을 찾았어요
              </p>
            ) : (
              <>
                <h3 className="label-large text-white">이렇게 검색해보세요!</h3>
                <p className="body-medium text-neutral-50">ex) 강동구</p>
              </>
            )}
          </section>
        </div>
        <div className="h-4 w-full bg-gradient-to-b from-neutral-90 to-neutral-90/50" />
      </div>
      <section>
        {searchResult.map((result) => (
          <SearchResultItem key={result.addressId} information={result} onSelect={handleSelect} />
        ))}
      </section>
    </div>
  )
}
