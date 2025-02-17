import { ArrowRightIcon, KakaoIcon } from '@/assets/icons'
import { SIDEBAR_NAV_ITEMS, SIDEBAR_NAV_QUESTION } from '@/constants'
import useAuthStore from '@/stores/authStore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface SidebarProps {
  show: boolean
  setShow: (show: boolean) => void
}

export default function Sidebar({ show, setShow }: SidebarProps) {
  const [animate, setAnimate] = useState(false)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const nickname = useAuthStore((state) => state.user)?.nickname

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
        show ? 'z-50' : 'pointer-events-none z-40'
      )}
    >
      <div
        className="pointer-events-none absolute h-[1px] opacity-0 will-change-transform"
        aria-hidden="true"
      />
      <aside
        className={twMerge(
          'sidebar pointer-events-auto ml-auto h-full w-[280px] bg-neutral-90 px-[33px] pb-[30px] pt-[60px] transition-transform duration-300',
          animate ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <h2 className="headline-small mb-1 text-white">{nickname} 님</h2>
        {isLoggedIn ? (
          <div className="label-large flex items-center gap-1.5 text-neutral-40">
            <div className="rounded-full bg-[#FEE500] p-[3px]">
              <KakaoIcon className="h-2 w-2" />
            </div>
            카카오로 로그인 중
          </div>
        ) : (
          <Link
            to="/login"
            className="label-large-prominent flex items-center gap-1 text-brand-yellow"
          >
            회원가입 하러가기
            <ArrowRightIcon className="h-[18px] w-[18px] text-brand-yellow" />
          </Link>
        )}
        <hr className="my-5 h-[1px] w-full border-none bg-neutral-80" />
        <nav>
          <ul className="flex flex-col">
            {isLoggedIn &&
              SIDEBAR_NAV_ITEMS.map((item) => (
                <li key={item.menu}>
                  <Link
                    to={item.path}
                    className="title-medium flex items-center gap-4 py-3 text-white"
                    onClick={() => {
                      setAnimate(false)
                      setTimeout(() => setShow(false), 300)
                    }}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.menu}
                  </Link>
                </li>
              ))}
            <li>
              <a
                href={SIDEBAR_NAV_QUESTION.path}
                target="_blank"
                rel="noopener noreferrer"
                className="title-medium flex items-center gap-4 py-3 text-white"
              >
                <SIDEBAR_NAV_QUESTION.icon className="h-6 w-6" />
                {SIDEBAR_NAV_QUESTION.menu}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}
