import NonLoggedInRoute from '@/routers/NonLoggedInRoute'
import Main from '@/pages/Main'
import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import NonRegisteredRoute from './NonRegisteredRoute'
import LoggedInRoute from './LoggedInRoute'
import RegisteredRoute from './RegisteredRoute'

const AuthCallback = lazy(() => import('@/pages/AuthCallback'))
const RegisterNickname = lazy(() => import('@/pages/RegisterNickname'))
const Write = lazy(() => import('@/pages/Write'))
const Notice = lazy(() => import('@/pages/Notice'))
const NoticeDetail = lazy(() => import('@/pages/NoticeDetail'))
const Setting = lazy(() => import('@/pages/Setting'))
const EditSetting = lazy(() => import('@/pages/EditSetting'))
const Withdraw = lazy(() => import('@/pages/Withdraw'))
const Terms = lazy(() => import('@/pages/Terms'))
const MyMessage = lazy(() => import('@/pages/MyMessage'))
const MyMessageDetail = lazy(() => import('@/pages/MyMessageDetail'))
const Share = lazy(() => import('@/pages/Share'))
const ShareCode = lazy(() => import('@/pages/ShareCode'))

const routes = [
  {
    Component: NonLoggedInRoute,
    children: [
      { path: 'login', Component: Login },
      { path: 'callback/kakaotalk', Component: AuthCallback },
    ],
  },
  {
    Component: NonRegisteredRoute,
    children: [{ path: 'register', Component: RegisterNickname }],
  },
  {
    Component: RegisteredRoute,
    children: [
      { index: true, Component: Main },
      { path: 'write', Component: Write },
      { path: 'notice', Component: Notice },
      { path: 'notice/:id', Component: NoticeDetail },
    ],
  },
  {
    Component: LoggedInRoute,
    children: [
      { path: 'share', Component: Share },
      { path: 'setting', Component: Setting },
      { path: 'setting/edit', Component: EditSetting },
      { path: 'message', Component: MyMessage },
      { path: 'message/:id', Component: MyMessageDetail },
      { path: 'withdraw', Component: Withdraw },
      { path: 'terms', Component: Terms },
    ],
  },
  {
    children: [
      { path: '/sharing', Component: ShareCode },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
