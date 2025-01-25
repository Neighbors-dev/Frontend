import { getSharingCode } from '@/apis/share'
import useAuthStore from '@/stores/authStore'

declare global {
  interface Window {
    Kakao: any
  }
}

export const shareLink = async (nickname = '') => {
  const result = await getSharingCode()
  if (!result) return

  if (nickname === '') {
    nickname = useAuthStore.getState().user?.nickname ?? ''
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
  }

  window.Kakao.Share.sendCustom({
    templateId: 116507,
    templateArgs: {
      name: nickname,
      link: `${window.location.origin}/sharing?code=${result.recommenderCode}`,
    },
  })
}
