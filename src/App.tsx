import { Route, Routes } from 'react-router-dom'
import DashBoardAuthenticated from './Pages/DashBoardAuthenticated.tsx'
import Login from './Pages/Login.tsx'
import Signup from './Pages/Signup.tsx'
import { useEffect, useState } from 'react'
import Pending from './Pages/Pending.tsx'
import Places from './Pages/Places.tsx'
import Rentals from './Pages/Rentals.tsx'
import Profiles from './Pages/Profiles.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import AuthenticatedRoute from './Pages/AuthenticatedRoute.tsx'
import DashboardHomePage from './Pages/DashboardHomePage.tsx'
import HomePage from './Pages/HomePage.tsx'

function App() {  

  const [token, setToken] = useState<string | null>(null)
  
  useEffect(() => {
    const tokenString = sessionStorage.getItem('token')
    if (tokenString) {
      setToken(tokenString)
    }
  }, [])

  useEffect(() => { 
    if (token) {
      sessionStorage.setItem('token', token)
    }
  }, [token])

  return (
    <>
       
      <Routes>
        {/* <Route path={'/'} element={<DashBoardAuthenticated token={token} />} /> */} 
        <Route element={<AuthenticatedRoute token={token} />}>
          <Route path={'/dashboard'} element={<DashBoardAuthenticated token={token} setToken={setToken} />}>
            <Route path="home" element={<DashboardHomePage />} /> 
            <Route path="pending" element={<Pending />} />
            <Route path="places" element={<Places />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="profiles" element={<Profiles />} />
          </Route>
        </Route>

        {/* <Route path={'/dashboard'} element={<DashBoardAuthenticated token={token} setToken={setToken} />} /> */}
        <Route path={'/login'} element={<Login setToken={setToken} />} />
        <Route path={'/'} element={<HomePage setToken={setToken} />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
       
    </>
  )
   
}

export default App
