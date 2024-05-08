import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage.tsx'
import Profiles from './Pages/Profiles.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import Profile from './Pages/Profile.tsx'

//react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient= new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/profiles',
    element: <Profiles />,
    children: [
      {
        path: '/profiles/:id',
        element: <Profile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
