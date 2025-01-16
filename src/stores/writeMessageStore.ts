import { GENERAL, POLICE } from '@/constants/write'
import { create } from 'zustand'
import useAuthStore from './authStore'

interface TargetInfo {
  name: string
  noName: boolean
  office: string
  officeId: number
  noOffice: boolean
}

interface WriteMessageState {
  targetType: string | undefined
  heroType: string | undefined
  targetInfo: TargetInfo
  message: string
  isPrivate: boolean
  isAlarm: boolean
}

interface WriteMessageAction {
  setTargetType: (targetType: string | undefined) => void
  setHeroType: (heroType: string | undefined) => void
  setTargetInfo: (targetInfo: {
    name: string
    noName: boolean
    office: string
    officeId: number
    noOffice: boolean
  }) => void
  setTargetOffice: (office: string, officeId: number) => void
  setMessage: (message: string) => void
  setIsAlarm: (isAlarm: boolean) => void
  setIsPrivate: (isPrivate: boolean) => void
  clearTargetType: () => void
  clearHeroType: () => void
  clearTargetInfo: () => void
  generateTargetString: () => string
  generateMessage: () => WriteMessageType
}

const useWriteMessageStore = create<WriteMessageState & WriteMessageAction>((set, get) => ({
  targetType: undefined,
  heroType: undefined,
  targetInfo: { name: '', noName: false, office: '', officeId: -1, noOffice: false },
  message: '',
  isPrivate: false,
  isAlarm: false,
  setTargetType: (targetType) => set({ targetType }),
  setHeroType: (heroType) => set({ heroType }),
  setTargetInfo: (targetInfo) => set({ targetInfo }),
  setTargetOffice: (office, officeId) =>
    set({ targetInfo: { ...get().targetInfo, office, officeId } }),
  setMessage: (message) => set({ message }),
  setIsAlarm: (isAlarm) => set({ isAlarm }),
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  clearTargetType: () => set({ targetType: undefined }),
  clearHeroType: () => set({ heroType: undefined }),
  clearTargetInfo: () =>
    set({ targetInfo: { name: '', noName: false, office: '', officeId: -1, noOffice: false } }),
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
  generateMessage: () => {
    const isLoggedIn = useAuthStore.getState().isLoggedIn
    return {
      content: get().message,
      targetJob: get().heroType || null,
      addressId: get().targetInfo.officeId === -1 ? null : get().targetInfo.officeId,
      heroName: get().generateTargetString(),
      readingAlarm: isLoggedIn ? get().isAlarm : null,
      isPublic: !get().isPrivate,
    }
  },
}))

export default useWriteMessageStore
