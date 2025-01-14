import useToastStore from '@/stores/toastStore'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ToastMessage() {
  const isOpen = useToastStore((state) => state.isOpen)
  const content = useToastStore((state) => state.content)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <p
      className={twMerge(
        'fixed bottom-[10%] left-1/2 z-[60] -translate-x-1/2 rounded-md bg-neutral-80 px-5 py-3 text-white transition-opacity duration-[600ms]',
        isOpen && isAnimating ? 'opacity-100' : 'opacity-0'
      )}
    >
      {content}
    </p>
  )
}
