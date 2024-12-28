import { SIDEBAR_NAV_ITEMS } from '@/constants/sidebar'
import { getSessionNickname } from '@/utils/nicknameUtils'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface SidebarProps {
  show: boolean
}

export default function Sidebar({ show }: SidebarProps) {
  // 전역 상태로 관리 중인 사용자 정보를 가져와서 닉네임 삽입
  const nickname = getSessionNickname()

  return (
    <aside
      className={twMerge(
        'sidebar full-height absolute right-0 top-0 w-[280px] transform bg-neutral-90 px-[33px] pb-[30px] pt-[60px] transition-transform duration-300',
        show ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <h2 className="headline-small text-white">{nickname}님</h2>
      <hr className="my-5 h-[1px] w-full border-none bg-neutral-80" />
      <nav>
        <ul className="flex flex-col">
          {SIDEBAR_NAV_ITEMS.map((item) => (
            <li key={item.menu}>
              <Link to={item.path} className="title-medium flex items-center gap-4 py-3 text-white">
                <item.icon className="h-6 w-6 text-white" />
                {item.menu}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
