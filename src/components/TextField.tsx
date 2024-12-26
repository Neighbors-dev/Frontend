import { ComponentPropsWithoutRef } from 'react'

interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  value?: string
}

export default function TextField({ label, value, ...props }: TextFieldProps) {
  return (
    <fieldset className="flex flex-col gap-1">
      <label className="title-small text-white">{label}</label>
      <input
        value={value}
        className="focus:border-brand-yellow label-large rounded-lg border border-transparent bg-neutral-80 p-4 text-white placeholder:text-neutral-50"
        {...props}
      />
      {props.maxLength && (
        <p className="label-medium self-end text-neutral-50">
          {value?.length}/{props.maxLength}
        </p>
      )}
    </fieldset>
  )
}
