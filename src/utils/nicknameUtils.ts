const NICKNAME_STORAGE_KEY = 'neighbor-NN'

export function getSessionNickname() {
  return sessionStorage.getItem(NICKNAME_STORAGE_KEY)
}

export function setSessionNickname(nickname: string) {
  sessionStorage.setItem(NICKNAME_STORAGE_KEY, nickname)
}

export function removeSessionNickname() {
  sessionStorage.removeItem(NICKNAME_STORAGE_KEY)
}
