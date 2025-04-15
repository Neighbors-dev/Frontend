import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import '@/styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://3d43445cb83fc18b9f27ff7f25d2cb09@o4509157788942336.ingest.us.sentry.io/4509157789925376',
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
)
