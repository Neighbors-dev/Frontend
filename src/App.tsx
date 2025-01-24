import { Navigate, Route, Routes } from 'react-router-dom'
import RegisteredRoute from './layouts/RegisteredRoute'
import LoggedInRoute from './layouts/LoggedInRoute'
import NonLoggedInRoute from './layouts/NonLoggedInRoute'
import NonRegisteredRoute from './layouts/NonRegisteredRoute'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import Main from './pages/Main'
import RegisterNickname from './pages/RegisterNickname'
import Write from './pages/Write'
import Notice from './pages/Notice'
import NoticeDetail from './pages/NoticeDetail'
import Setting from './pages/Setting'
import EditSetting from './pages/EditSetting'
import Modal from './components/Modal'
import useViewport from './hooks/useViewport'
import Withdraw from './pages/Withdraw'
import Terms from './pages/Terms'
import MyMessage from './pages/MyMessage'
import MyMessageDetail from './pages/MyMessageDetail'
import ToastMessage from './components/ToastMessage'
import Share from './pages/Share'
import ShareCode from './pages/ShareCode'

export default function App() {
  useViewport()

  return (
    <>
      <Modal />
      <ToastMessage />
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
          <Route path="share" element={<Share />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/edit" element={<EditSetting />} />
          <Route path="message" element={<MyMessage />} />
          <Route path="message/:id" element={<MyMessageDetail />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="/sharing" element={<ShareCode />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
