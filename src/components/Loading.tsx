import { twMerge } from 'tailwind-merge'

interface LoadingProps {
  className?: string
}

export default function ({ className }: LoadingProps) {
  return (
    <div className={twMerge('flex w-full justify-center', className)}>
      <div className="loader" />
    </div>
  )
}
