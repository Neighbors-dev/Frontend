import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface SolidButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  className?: string
  children: React.ReactNode
}

export default function SolidButton({
  variant,
  size,
  className,
  children,
  ...props
}: SolidButtonProps) {
  // TODO: 색상 - 디자인시스템

  const variantClass = {
    primary: 'bg-brand-yellow text-neutral-100 disabled:bg-neutral-70 disabled:text-neutral-80',
    secondary: 'bg-[#EFF1FF] text-[#6272FF] disabled:bg-[#EDEEF1] disabled:text-[#B1B4BC]',
  }[variant]

  const sizeClass = {
    large: 'px-6 py-3 label-large-prominent rounded-[10px]',
    medium: 'px-5 py-2 label-large-prominent rounded-lg',
    small: 'px-3.5 py-1.5 label-medium-prominent rounded-md',
  }[size]

  return (
    <button className={twMerge(variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  )
}
