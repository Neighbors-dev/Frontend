import { CheckIcon } from '@/assets'
import { ComponentPropsWithoutRef, useState } from 'react'

export default function Checkbox({ ...props }: ComponentPropsWithoutRef<'input'>) {
  const [checked, setChecked] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setChecked(e.currentTarget.checked)
  }

  return (
    <div className="relative p-0.5">
      <input type="checkbox" className="peer sr-only" onClick={handleClick} {...props} />
      <div className="h-4 w-4 rounded-[3px] border border-[#D2D5DB] peer-checked:border-brand-yellow peer-checked:bg-brand-yellow">
        {checked && <CheckIcon className="text-neutral-80" />}
      </div>
    </div>
  )
}
