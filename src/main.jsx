import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'


import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
      <div className='max-w-screen-xl mx-auto '>
          <RouterProvider router={router}
            future={{ v7_startTransition: true, }} />
        </div>
      </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
