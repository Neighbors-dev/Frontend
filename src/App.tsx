import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'
import Main from '@/pages/Main'
import Nickname from '@/pages/Nickname'
import NicknameComplete from '@/pages/NicknameComplete'
import useViewportHeight from '@/hooks/useViewportHeight'

export default function App() {
  useViewportHeight()

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
