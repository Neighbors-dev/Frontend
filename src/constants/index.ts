import { PencilIcon, QuestionIcon, SettingIcon, ShareIcon } from '@/assets'

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
    path: '/',
  },
  {
    menu: '내가 작성한 메시지',
    icon: PencilIcon,
    path: '/',
  },
  {
    menu: '자주 묻는 질문',
    icon: QuestionIcon,
    path: '/',
  },
]
