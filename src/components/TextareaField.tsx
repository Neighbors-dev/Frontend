import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends ComponentPropsWithoutRef<'textarea'> {
  className?: string
}

export default function TextareaField({ className, onClick, ...props }: TextFieldProps) {
  return (
    <div
      className={twMerge(
        'group flex w-full items-center gap-2 rounded-lg border border-transparent bg-neutral-80 p-4',
        !onClick && 'focus-within:border-brand-yellow',
        className
      )}
    >
      <textarea
        className={twMerge(
          'label-large w-full resize-none bg-transparent text-white placeholder:text-neutral-50 disabled:text-neutral-50'
        )}
        {...props}
      />
    </div>
  )
}
