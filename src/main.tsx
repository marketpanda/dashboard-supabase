import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
 

//react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient= new QueryClient()

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//     errorElement: <NotFoundPage />
//   },
//   {
//     path: '/profiles',
//     element: <Profiles />,
//     children: [
//       {
//         path: '/profiles/:id',
//         element: <Profile />
//       }
//     ]
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </QueryClientProvider>
  </React.StrictMode>,
)
