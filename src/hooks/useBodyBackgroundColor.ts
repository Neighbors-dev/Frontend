import { useEffect } from 'react'

function useBodyBackgroundColor(color: string) {
  useEffect(() => {
    document.documentElement.style.setProperty('--body-bg-color', `var(--color-${color})`)
    return () => {
      document.documentElement.style.setProperty('--body-bg-color', 'var(--color-neutral-90)')
    }
  }, [color])
}

export default useBodyBackgroundColor
