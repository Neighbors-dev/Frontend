import { useEffect, useState } from 'react'

export const useScrollFade = (targetPosition: number = 430) => {
  const [showFade, setShowFade] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowFade(scrollPosition > targetPosition)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [targetPosition])

  return showFade
}
