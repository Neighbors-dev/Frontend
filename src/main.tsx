import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/styles/index.css'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Sentry from '@sentry/react'
import { browserTracingIntegration, replayIntegration } from '@sentry/react'

Sentry.init({
  dsn: 'https://3d43445cb83fc18b9f27ff7f25d2cb09@o4509157788942336.ingest.us.sentry.io/4509157789925376',
  integrations: [browserTracingIntegration(), replayIntegration()],
  environment: import.meta.env.MODE,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  tracesSampleRate: 1.0, // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', import.meta.env.VITE_API_URL],
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof Error) {
        Sentry.captureException(error)
      } else {
        Sentry.captureMessage('Unknown Query Error', {
          extra: { error },
        })
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof Error) {
        Sentry.captureException(error)
      } else {
        Sentry.captureMessage('Unknown Mutation Error', {
          extra: { error },
        })
      }
    },
  }),
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
