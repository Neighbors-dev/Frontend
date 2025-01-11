import { GENERAL, POLICE } from '@/constants/write'
import { create } from 'zustand'

interface WriteMessageState {
  targetType: string | undefined
  heroType: string | undefined
  targetInfo: { name: string; noName: boolean; office: string; noOffice: boolean }
  message: string
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
  setTargetOffice: (office: string) => void
  setMessage: (message: string) => void
  clearTargetType: () => void
  clearHeroType: () => void
  clearTargetInfo: () => void
  generateTargetString: () => string
}

const useWriteMessageStore = create<WriteMessageState & WriteMessageAction>((set, get) => ({
  targetType: undefined,
  heroType: undefined,
  targetInfo: { name: '', noName: false, office: '', noOffice: false },
  message: '',
  setTargetType: (targetType) => set({ targetType }),
  setHeroType: (heroType) => set({ heroType }),
  setTargetInfo: (targetInfo) => set({ targetInfo }),
  setTargetOffice: (office) => set({ targetInfo: { ...get().targetInfo, office } }),
  setMessage: (message) => set({ message }),
  clearTargetType: () => set({ targetType: undefined }),
  clearHeroType: () => set({ heroType: undefined }),
  clearTargetInfo: () =>
    set({ targetInfo: { name: '', noName: false, office: '', noOffice: false } }),
  generateTargetString: () => {
    const { targetInfo, targetType, heroType } = get()
    if (targetType === GENERAL) {
      return '모든 경찰관, 소방관 분들'
    }

    const alias = heroType === POLICE ? '경관님' : '소방관님'
    if (targetInfo.noName) {
      if (targetInfo.noOffice) {
        return `감사한 ${alias}`
      } else {
        return `${targetInfo.office} ${alias}`
      }
    } else {
      if (targetInfo.noOffice) {
        return `${targetInfo.name} ${alias}`
      } else {
        return `${targetInfo.office} ${targetInfo.name} ${alias}`
      }
    }
  },
}))

export default useWriteMessageStore
