import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import '@/styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import MetaTag from './layouts/MetaTag'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MetaTag />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
)
