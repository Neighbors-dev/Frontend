import useAuthStore from '@/stores/authStore'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function NonRegisteredRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn && user?.nickname) {
      navigate('/', { replace: true })
    }
  }, [])

  return <Outlet />
}
