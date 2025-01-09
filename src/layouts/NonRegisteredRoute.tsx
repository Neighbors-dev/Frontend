import useAuthStore from '@/stores/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function NonRegisteredRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)

  if (isLoggedIn && user?.nickname) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
