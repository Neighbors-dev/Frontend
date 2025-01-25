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

// TODO: 스토리지 변경
export const MAIN_BACKGROUND_IMAGE_BASE_LINK =
  'https://res.cloudinary.com/dwe8dhuwm/image/upload/v1737216155/'

export const MAIN_BACKGROUND_IMAGE_LINK = [
  'phase_0_nwi85n.webp',
  'phase_2_i3hoxb.webp',
  'phase_1_wpjhzw.webp',
  'phase_3_zv5tt6.webp',
  'phase_4_scqcpp.webp',
  'phase_5_zpp42v.webp',
  'phase_6_omnvg5.webp',
  'phase_8_norrem.webp',
]
