import { ComponentPropsWithoutRef } from 'react'

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function TextField({ leftIcon, rightIcon, ...props }: TextFieldProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-transparent bg-neutral-80 p-4 focus-within:border-brand-yellow">
      {leftIcon}
      <input
        className="label-large w-full bg-transparent text-white placeholder:text-neutral-50"
        {...props}
      />
      {rightIcon}
    </div>
  )
}
