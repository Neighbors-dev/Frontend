import { SIDEBAR_NAV_ITEMS } from '@/constants/sidebar'
import { getSessionNickname } from '@/utils/nicknameUtils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface SidebarProps {
  show: boolean
  setShow: (show: boolean) => void
}

export default function Sidebar({ show, setShow }: SidebarProps) {
  const [animate, setAnimate] = useState(false)
  const nickname = getSessionNickname()

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && !event.target.closest('.sidebar')) {
      setAnimate(false)
      setTimeout(() => setShow(false), 300)
    }
  }

  useEffect(() => {
    if (show) {
      document.addEventListener('click', handleOutsideClick)
      setAnimate(true)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [show])

  return (
    <div
      className={twMerge(
        'full-height max-w-600 fixed left-1/2 top-0 -translate-x-1/2',
        show ? 'z-50' : 'z-0'
      )}
    >
      <aside
        className={twMerge(
          'sidebar ml-auto h-full w-[280px] bg-neutral-90 px-[33px] pb-[30px] pt-[60px] transition-transform duration-300',
          animate ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <h2 className="headline-small text-white">{nickname}님</h2>
        <hr className="my-5 h-[1px] w-full border-none bg-neutral-80" />
        <nav>
          <ul className="flex flex-col">
            {SIDEBAR_NAV_ITEMS.map((item) => (
              <li key={item.menu}>
                <Link
                  to={item.path}
                  className="title-medium flex items-center gap-4 py-3 text-white"
                  onClick={() => {
                    setAnimate(false)
                    setTimeout(() => setShow(false), 300)
                  }}
                >
                  {item.menu}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
