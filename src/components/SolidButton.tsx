import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface SolidButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  className?: string
  children: React.ReactNode
  ref?: React.RefObject<HTMLButtonElement>
}

const SolidButton = forwardRef<HTMLButtonElement, SolidButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    const variantClass = {
      primary: 'bg-brand-yellow text-neutral-100 disabled:bg-neutral-80 disabled:text-neutral-90',
      secondary: 'bg-neutral-80 text-white',
    }[variant]

    const sizeClass = {
      large: 'px-6 py-3 label-large-prominent rounded-[10px]',
      medium: 'px-5 py-2 label-large-prominent rounded-lg',
      small: 'px-3.5 py-1.5 label-medium-prominent rounded-md',
    }[size]

    return (
      <button
        ref={ref}
        className={twMerge(
          'flex shrink-0 items-center justify-center gap-1.5',
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
)

SolidButton.displayName = 'SolidButton'

export default SolidButton
