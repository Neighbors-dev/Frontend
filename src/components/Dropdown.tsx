import { ArrowSmallUpIcon } from '@/assets/icons'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface DropdownProps {
  options: string[]
  selected?: string
  className?: string
  handleSelected: (option: string) => void
}

export default function Dropdown({ options, selected, className, handleSelected }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  const handleOptionClick = (option: string) => {
    handleSelected(option)
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section ref={dropdownRef} className={twMerge('relative', className)}>
      <button
        type="button"
        className="flex w-full justify-between gap-2.5 rounded-lg bg-neutral-80 p-4 text-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="label-large">{selected ?? '선택해주세요'}</div>
        <ArrowSmallUpIcon
          className={twMerge('h-6 w-6 transition-transform duration-300', !isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <ul className="label-medium absolute bottom-0 top-full mt-2 h-fit w-full rounded-lg bg-neutral-80 py-2 text-white shadow-dropdown">
          {options.map((option) => (
            <li key={option} className={twMerge(option === selected && 'bg-neutral-70')}>
              <button
                type="button"
                className="w-full px-4 py-3 text-left"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
