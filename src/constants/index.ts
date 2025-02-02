import { PencilIcon, QuestionIcon, SettingIcon, ShareIcon } from '@/assets/icons'

export const MAX_NICKNAME_LENGTH = 5
export const NON_MEMBER = 'GUEST'
export const MEMBER = 'USER'

export const SIDEBAR_NAV_ITEMS = [
  {
    menu: '계정 설정',
    icon: SettingIcon,
    path: '/setting',
  },
  {
    menu: '공유하기',
    icon: ShareIcon,
    path: '/share',
  },
  {
    menu: '내가 작성한 메시지',
    icon: PencilIcon,
    path: '/message',
  },
  {
    menu: '자주 묻는 질문',
    icon: QuestionIcon,
    path: '/',
  },
]

export const WITHDRAW_OPTIONS = [
  '개인정보를 삭제하기 위해',
  '서비스 이용이 불편함',
  '재가입을 위해',
  '사용하지 않을 서비스',
  '그 외 기타',
]

export const MAIN_BACKGROUND_IMAGE_BASE_LINK = 'https://storage.googleapis.com/to-hero/images/'

export const MAIN_BACKGROUND_IMAGE_LINK = [
  'phase_0.webp',
  'phase_1.webp',
  'phase_2.webp',
  'phase_3.webp',
  'phase_4.webp',
  'phase_5.webp',
  'phase_6.webp',
  'phase_8.webp',
]
