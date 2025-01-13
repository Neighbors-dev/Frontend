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

export const WITHDRAW_OPTIONS = [
  '개인정보를 삭제하기 위해',
  '서비스 이용이 불편함',
  '재가입을 위해',
  '사용하지 않을 서비스',
  '그 외 기타',
]
