import { create } from 'zustand'

interface WriteBottomState {
  showCollectionIntro: boolean
}

interface WriteBottomAction {
  toggleCollectionIntro: () => void
}

const useWriteBottomStore = create<WriteBottomState & WriteBottomAction>((set) => ({
  showCollectionIntro: false,
  toggleCollectionIntro: () =>
    set((state) => ({ showCollectionIntro: !state.showCollectionIntro })),
}))

export default useWriteBottomStore
