export const MESSAGE_MAX_LENGTH = 100
export const WRITE_STEPS = [
  'select-target',
  'select-hero-type',
  'write-information',
  'search-workplace',
  'wright-message',
  'collect-news',
  'collect-message',
]
export const HEADER_TITLE: { [key: string]: string } = {
  'collect-news': '소식 모아보기',
  'collect-message': '감사메시지 모아보기',
}

export const SPECIFIC = 'specific'
export const GENERAL = 'general'
export const SELECT_TARGET_BUTTONS = [
  {
    text: '특정 경찰/소방관 분께 남길게요',
    value: SPECIFIC,
  },
  {
    text: '특정 대상이 없어요',
    value: GENERAL,
  },
]

export const POLICE = 'POLICE_OFFICER'
export const FIREFIGHTER = 'FIRE_FIGHTER'
export const SELECT_HERO_TYPE_BUTTONS = [
  {
    text: '경찰관님 👮‍♂️',
    value: POLICE,
  },
  {
    text: '소방관님 🧑‍🚒',
    value: FIREFIGHTER,
  },
]

export const BOTTOM_SHEET_CONTENT = {
  push: {
    title: '메시지가 열람되면 알려드려요!',
    body: '경찰관, 소방관 분들이 메시지를 열람하면\n푸시 알림이 갈 예정이에요',
    confirmText: '알림 받을래요',
    cancelText: '알림 받지 않을래요',
  },
  share: {
    title: '친구들에게 공유하러 가요',
    body: '다른 친구들에게 공유해 거리를 환하게 밝혀주세요',
    confirmText: '공유하기',
    cancelText: null,
  },
}
