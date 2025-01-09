import { Route, Routes } from 'react-router-dom'
import useViewportHeight from '@/hooks/useViewportHeight'
import NonLoggedInRoute from '@/layouts/NonLoggedInRoute'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'
import Main from '@/pages/Main'
import Nickname from '@/pages/Nickname'
import NicknameComplete from '@/pages/NicknameComplete'
import Write from '@/pages/Write'
import Notice from '@/pages/Notice'
import NoticeDetail from '@/pages/NoticeDetail'

export default function App() {
  useViewportHeight()

  return (
    <Routes>
      <Route element={<NonLoggedInRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="callback/kakaotalk" element={<AuthCallback />} />
      </Route>
      <Route index element={<Main />} />
      <Route path="register" element={<Nickname />} />
      <Route path="nickname-complete" element={<NicknameComplete />} />
      <Route path="write" element={<Write />} />
      <Route path="notice" element={<Notice />} />
      <Route path="notice/:id" element={<NoticeDetail />} />
    </Routes>
  )
}
