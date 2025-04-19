import useAuthStore from '@/stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function RegisteredRoute() {
  const nickname = useAuthStore((state) => state.user)?.nickname

  if (!nickname) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
