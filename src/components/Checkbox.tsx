import { CheckIcon } from '@/assets/icons'
import { ComponentPropsWithoutRef } from 'react'

export default function Checkbox({ ...props }: ComponentPropsWithoutRef<'input'>) {
  return (
    <div className="relative p-0.5">
      <input type="checkbox" className="peer sr-only" {...props} />
      <div className="h-4 w-4 rounded-[3px] border border-[#D2D5DB] peer-checked:border-brand-yellow peer-checked:bg-brand-yellow">
        {props.checked && <CheckIcon className="text-neutral-80" />}
      </div>
    </div>
  )
}
