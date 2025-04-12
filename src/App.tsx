import { RouterProvider } from 'react-router-dom'
import Modal from './components/Modal'
import useViewport from './hooks/useViewport'
import ToastMessage from './components/ToastMessage'
import Error from './pages/Error'
import { ErrorBoundary } from '@sentry/react'
import { Suspense } from 'react'
import router from './routers/router'
import PageLoading from './components/PageLoading'

export default function App() {
  useViewport()

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<PageLoading />}>
        <Modal />
        <ToastMessage />
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  )
}
