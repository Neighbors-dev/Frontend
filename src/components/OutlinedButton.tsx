interface OutlinedButtonProps extends ComponentPropsWithoutRef<'button'> {
  size: 'small' | 'medium' | 'large'
  selected?: boolean
  className?: string
  icon?: 'check'
  children: React.ReactNode
}

import { CheckIcon } from '@/assets/icons'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export default function OutlinedButton({
  size,
  selected = false,
  className,
  children,
  icon,
  ...props
}: OutlinedButtonProps) {
  const sizeClass = {
    large: 'px-6 py-3 label-large-prominent rounded-[10px]',
    medium: 'px-5 py-2 label-large-prominent rounded-lg',
    small: 'px-3.5 py-1.5 label-medium-prominent rounded-md',
  }[size]

  return (
    <button
      type={props.type || 'button'}
      className={twMerge(
        'flex items-center justify-center gap-1.5 border bg-neutral-80',
        sizeClass,
        selected ? 'border-brand-yellow text-brand-yellow' : 'border-transparent text-white',
        className
      )}
      {...props}
    >
      {icon === 'check' && selected && <CheckIcon className="h-5 w-5 text-brand-yellow" />}
      {children}
    </button>
  )
}
