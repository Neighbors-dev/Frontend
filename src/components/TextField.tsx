import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function TextField({
  leftIcon,
  rightIcon,
  className,
  onClick,
  ...props
}: TextFieldProps) {
  return (
    <div
      className={twMerge(
        'flex w-full items-center gap-2 rounded-lg border border-transparent bg-neutral-80 p-4',
        !onClick && 'focus-within:border-brand-yellow',
        className
      )}
      onClick={onClick}
      role={onClick && 'button'}
    >
      {leftIcon}
      <input
        type="text"
        readOnly={!!onClick}
        className={twMerge(
          'label-large w-full bg-transparent text-white placeholder:text-neutral-50',
          onClick && 'cursor-pointer'
        )}
        {...props}
      />
      {rightIcon}
    </div>
  )
}
