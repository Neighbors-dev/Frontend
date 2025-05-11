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
]

export const SIDEBAR_NAV_QUESTION = {
  menu: '자주 묻는 질문',
  icon: QuestionIcon,
  path: 'https://octagonal-guppy-90d.notion.site/TEAM-17c1cbd16b9d80c2a38fd5803d022fbb?pvs=4',
}

export const WITHDRAW_OPTIONS = [
  '개인정보를 삭제하기 위해',
  '서비스 이용이 불편함',
  '재가입을 위해',
  '사용하지 않을 서비스',
  '그 외 기타',
]

export const MAIN_BACKGROUND_IMAGE_BASE_LINK = 'https://storage.googleapis.com/to-hero-2/images/'

export const MAIN_BACKGROUND_IMAGE_LINK = [
  'phase_0_1x.webp',
  'phase_1_1x.webp',
  'phase_2_1x.webp',
  'phase_3_1x.webp',
  'phase_4_1x.webp',
  'phase_5_1x.webp',
  'phase_6_1x.webp',
  'phase_8_1x.webp',
]
