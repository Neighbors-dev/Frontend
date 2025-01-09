import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  content: string | null
  confirmText: string | null
  cancelText: string | null
  onConfirm: (() => void) | null
  onCancel: (() => void) | null
  openModal: (params: {
    content: string
    confirmText: string
    cancelText: string
    onConfirm: () => void
    onCancel?: () => void
  }) => void
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  confirmText: null,
  cancelText: null,
  onConfirm: null,
  onCancel: null,
  openModal: ({ content, confirmText, cancelText, onConfirm, onCancel }) => {
    set({
      isOpen: true,
      content,
      confirmText,
      cancelText,
      onConfirm: () => {
        onConfirm()
        set({ isOpen: false })
      },
      onCancel: () => {
        if (onCancel) onCancel()
        set({ isOpen: false })
      },
    })
  },
}))

export default useModalStore
