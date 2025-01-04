import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'
import useViewportHeight from '@/hooks/useViewportHeight'
import NonLoggedInRoute from '@/layouts/NonLoggedInRoute'
import Main from '@/pages/Main'
import Nickname from '@/pages/Nickname'
import NicknameComplete from '@/pages/NicknameComplete'
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
      <Route path="nickname" element={<Nickname />} />
      <Route path="nickname-complete" element={<NicknameComplete />} />
      <Route path="notice" element={<Notice />} />
      <Route path="notice/:id" element={<NoticeDetail />} />
    </Routes>
  )
}
