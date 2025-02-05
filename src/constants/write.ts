export const MESSAGE_MAX_LENGTH = 300
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
    text: '경찰관님',
    value: POLICE,
  },
  {
    text: '소방관님',
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

export const SEARCH_EXAMPLE =
  '검색하고 싶은 근무지가 구의119안전센터일 경우\n1. 근무지 이름로 검색\nex) 구의\n\n2. 주소지로 검색(광진구 광나루로 480 (구의동))\nex) 광진구, 구의동, 광나루로'

export const SECRET_EXPLANATION =
  '공개 시, 더 많은 사람들이 당신의 따뜻한 마음을 보고 공감할 수 있으며,\n특별한 메시지는 다양한 채널을 통해 소개될 수도 있습니다.\n비공개로 설정하면, 나만의 소중한 기록으로 남길 수 있어요.'
