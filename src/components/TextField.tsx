import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
  onClick?: () => void
}

export default function TextField({ Icon, className, onClick, ...props }: TextFieldProps) {
  return (
    <div
      className={twMerge(
        'group flex w-full items-center gap-2 rounded-lg border border-transparent bg-neutral-80 p-4',
        !onClick && 'focus-within:border-brand-yellow',
        className
      )}
      onClick={onClick}
      role={!props.disabled && onClick ? 'button' : undefined}
    >
      <input
        type="text"
        readOnly={!!onClick}
        className={twMerge(
          'label-large w-full bg-transparent text-white placeholder:text-neutral-50 disabled:text-neutral-50',
          !props.disabled && onClick && 'cursor-pointer'
        )}
        {...props}
      />
      {Icon && (
        <button type="button" disabled={props.disabled}>
          <Icon
            className={twMerge(
              !onClick && 'group-focus-within:text-brand-yellow',
              props.value ? 'text-neutral-30' : 'text-neutral-50',
              props.disabled && 'text-neutral-50'
            )}
          />
        </button>
      )}
    </div>
  )
}
