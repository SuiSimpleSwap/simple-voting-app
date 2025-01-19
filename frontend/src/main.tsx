import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './providers/theme/ThemeProvider.tsx'
import NavigationProvider from './providers/navigation/NavigationProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
