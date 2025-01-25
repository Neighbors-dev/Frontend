import { getSharingCode } from '@/apis/share'

declare global {
  interface Window {
    Kakao: any
  }
}

export const shareLink = async () => {
  const result = await getSharingCode()
  if (!result) return

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
  }

  window.Kakao.Share.sendCustom({
    templateId: 116507,
    templateArgs: {
      link: `${window.location.origin}/sharing?code=${result.recommenderCode}`,
    },
  })
}
