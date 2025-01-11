import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'assistive'
  size: 'small' | 'medium'
  className?: string
  children: React.ReactNode
}

export default function TextButton({
  variant,
  size,
  children,
  className,
  ...props
}: TextButtonProps) {
  // TODO: 색상 - 디자인시스템

  const variantClass = {
    primary: 'text-brand-yellow disabled:text-[#D2D5DB]',
    assistive: 'text-[#94989F] disabled:text-[#D2D5DB]',
  }[variant]

  const sizeClass = {
    medium: 'p-1 label-large-prominent rounded-lg',
    small: 'p-1 label-medium-prominent rounded-md',
  }[size]

  return (
    <button
      type={props.type || 'button'}
      className={twMerge(
        'flex items-center justify-center gap-1.5',
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
