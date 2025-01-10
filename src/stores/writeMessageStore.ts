import { create } from 'zustand'

interface WriteMessageState {
  targetType: string | undefined
  heroType: string | undefined
  targetInfo: { name: string; noName: boolean; office: string; noOffice: boolean }
}

interface WriteMessageAction {
  setTargetType: (targetType: string | undefined) => void
  setHeroType: (heroType: string | undefined) => void
  setTargetInfo: (targetInfo: {
    name: string
    noName: boolean
    office: string
    noOffice: boolean
  }) => void
  clearTargetType: () => void
  clearHeroType: () => void
  clearTargetInfo: () => void
}

const useWriteMessageStore = create<WriteMessageState & WriteMessageAction>((set) => ({
  targetType: undefined,
  heroType: undefined,
  targetInfo: { name: '', noName: false, office: '', noOffice: false },
  setTargetType: (targetType) => set({ targetType }),
  setHeroType: (heroType) => set({ heroType }),
  setTargetInfo: (targetInfo) => set({ targetInfo }),
  clearTargetType: () => set({ targetType: undefined }),
  clearHeroType: () => set({ heroType: undefined }),
  clearTargetInfo: () =>
    set({ targetInfo: { name: '', noName: false, office: '', noOffice: false } }),
}))

export default useWriteMessageStore
