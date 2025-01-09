import { Route, Routes } from 'react-router-dom'
import useViewportHeight from '@/hooks/useViewportHeight'
import RegisteredRoute from '@/layouts/RegisteredRoute'
import LoggedInRoute from '@/layouts/LoggedInRoute'
import NonLoggedInRoute from '@/layouts/NonLoggedInRoute'
import NonRegisteredRoute from '@/layouts/NonRegisteredRoute'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'
import Main from '@/pages/Main'
import RegisterNickname from '@/pages/RegisterNickname'
import Write from '@/pages/Write'
import Notice from '@/pages/Notice'
import NoticeDetail from '@/pages/NoticeDetail'
import Setting from '@/pages/Setting'
import EditSetting from '@/pages/EditSetting'

export default function App() {
  useViewportHeight()

  return (
    <>
      <Routes>
        <Route element={<NonLoggedInRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="callback/kakaotalk" element={<AuthCallback />} />
        </Route>
        <Route element={<NonRegisteredRoute />}>
          <Route path="register" element={<RegisterNickname />} />
        </Route>
        <Route element={<RegisteredRoute />}>
          <Route index element={<Main />} />
          <Route path="write" element={<Write />} />
          <Route path="notice" element={<Notice />} />
          <Route path="notice/:id" element={<NoticeDetail />} />
        </Route>
        <Route element={<LoggedInRoute />}>
          <Route path="setting" element={<Setting />} />
          <Route path="setting/edit" element={<EditSetting />} />
        </Route>
      </Routes>
    </>
  )
}
