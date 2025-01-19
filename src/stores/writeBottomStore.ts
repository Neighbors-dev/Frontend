import { create } from 'zustand'

interface WriteBottomState {
  showCollectionIntro: boolean
  showCheckAlarm: boolean
  showShareLink: boolean
}

interface WriteBottomAction {
  toggleCollectionIntro: () => void
  preventShow: () => void

  toggleShareLink: () => void
  toggleCheckAlarm: () => void
}

const useWriteBottomStore = create<WriteBottomState & WriteBottomAction>((set) => ({
  showCollectionIntro: false,
  showCheckAlarm: false,
  showShareLink: false,
  toggleCollectionIntro: () =>
    set((state) => ({ showCollectionIntro: !state.showCollectionIntro })),
  preventShow: () =>
    set({ showCollectionIntro: false, showCheckAlarm: false, showShareLink: false }),
  toggleShareLink: () => set((state) => ({ showShareLink: !state.showShareLink })),
  toggleCheckAlarm: () => set((state) => ({ showCheckAlarm: !state.showCheckAlarm })),
}))

export default useWriteBottomStore
