export const MESSAGE_MAX_LENGTH = 100
export const WRITE_STEPS = ['SL-T', 'SL-H-T', 'W-I', 'SE-W', 'W-M', 'C-N', 'C-M']
export const HEADER_TITLE: { [key: string]: string } = {
  'C-N': '소식 모아보기',
  'C-M': '감사메시지 모아보기',
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

export const POLICE = 'police-officer'
export const FIREFIGHTER = 'firefighter'
export const SELECT_HERO_TYPE_BUTTONS = [
  {
    text: '경찰관님 👮‍♂️',
    value: POLICE,
  },
  {
    text: '소방관님 🧑',
    value: FIREFIGHTER,
  },
]
