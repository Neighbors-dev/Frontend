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
    cancelText: string | null
    onConfirm: (() => void) | (() => Promise<void>)
    onCancel?: () => void
  }) => void
  clearModal: () => void
}

const useModalStore = create<ModalStore>((set, get) => ({
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
        setTimeout(() => {
          get().clearModal()
        }, 250)
      },
      onCancel: () => {
        if (onCancel) onCancel()
        set({ isOpen: false })
        setTimeout(() => {
          get().clearModal()
        }, 250)
      },
    })
  },
  clearModal: () => {
    set({
      content: null,
      confirmText: null,
      cancelText: null,
      onConfirm: null,
      onCancel: null,
    })
  },
}))

export default useModalStore
