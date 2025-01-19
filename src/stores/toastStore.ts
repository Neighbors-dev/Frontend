import { create } from 'zustand'

interface ToastStore {
  isOpen: boolean
  content: string | null
  showToast: (content: string) => void
}

const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  content: null,
  showToast: (content) => {
    set({ isOpen: true, content })
    setTimeout(() => {
      set({ isOpen: false })
    }, 2000)
    setTimeout(() => {
      set({ content: null })
    }, 2700)
  },
}))

export default useToastStore
