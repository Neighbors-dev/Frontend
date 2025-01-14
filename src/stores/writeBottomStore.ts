import { create } from 'zustand'

interface WriteBottomState {
  showCollectionIntro: boolean
  showWriteFinish: boolean
  isShareVisible: boolean
}

interface WriteBottomAction {
  toggleCollectionIntro: () => void
  toggleWriteFinish: () => void
  toggleShareVisible: () => void
  preventShow: () => void
}

const useWriteBottomStore = create<WriteBottomState & WriteBottomAction>((set) => ({
  showCollectionIntro: false,
  showWriteFinish: false,
  isShareVisible: false,
  toggleCollectionIntro: () =>
    set((state) => ({ showCollectionIntro: !state.showCollectionIntro })),
  toggleWriteFinish: () => set((state) => ({ showWriteFinish: !state.showWriteFinish })),
  toggleShareVisible: () => set((state) => ({ isShareVisible: !state.isShareVisible })),
  preventShow: () =>
    set({ showCollectionIntro: false, showWriteFinish: false, isShareVisible: false }),
}))

export default useWriteBottomStore
