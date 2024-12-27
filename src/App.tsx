import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'
import Main from '@/pages/Main'

export default function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="callback/kakaotalk" element={<AuthCallback />} />
    </Routes>
  )
}
