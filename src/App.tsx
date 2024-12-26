import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import AuthCallback from '@/pages/AuthCallback'

export default function App() {
  return (
    <Routes>
      <Route index element={<div>홈</div>} />
      <Route path="login" element={<Login />} />
      <Route path="callback/kakaotalk" element={<AuthCallback />} />
    </Routes>
  )
}
