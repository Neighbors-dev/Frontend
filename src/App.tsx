import { Route, Routes } from 'react-router-dom'
import Modal from '@/components/Modal'
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
import Setting from '@/pages/Setting'
import EditSetting from './pages/EditSetting'

export default function App() {
  useViewportHeight()

  return (
    <>
      <Modal />
      <Routes>
        <Route element={<NonLoggedInRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="callback/kakaotalk" element={<AuthCallback />} />
        </Route>
        <Route index element={<Main />} />
        <Route path="nickname" element={<Nickname />} />
        <Route path="nickname-complete" element={<NicknameComplete />} />
        <Route path="write" element={<Write />} />
        <Route path="notice" element={<Notice />} />
        <Route path="notice/:id" element={<NoticeDetail />} />
        <Route path="setting" element={<Setting />} />
        <Route path="setting/edit" element={<EditSetting />} />
      </Routes>
    </>
  )
}
