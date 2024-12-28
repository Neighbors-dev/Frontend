import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'
import Main from '@/pages/Main'
import Nickname from '@/pages/Nickname'
import NicknameComplete from '@/pages/NicknameComplete'

export default function App() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVh()
    window.addEventListener('resize', setVh)

    return () => {
      window.removeEventListener('resize', setVh)
    }
  }, [])

  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="callback/kakaotalk" element={<AuthCallback />} />
      <Route path="nickname" element={<Nickname />} />
      <Route path="nickname-complete" element={<NicknameComplete />} />
    </Routes>
  )
}
