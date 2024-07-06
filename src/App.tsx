import { Route, Routes, useNavigate } from 'react-router-dom'
import DashBoardAuthenticated from './Pages/DashBoardAuthenticated.tsx'
import Login from './Pages/Login.tsx'
import Signup from './Pages/Signup.tsx'
import { useEffect, useState } from 'react'

function App() {  

  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  
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
        
        <Route path={'/'} element={<DashBoardAuthenticated token={token} setToken={setToken} />} />
        <Route path={'/dashboard'} element={<DashBoardAuthenticated token={token} setToken={setToken} />} />
        <Route path={'/login'} element={<Login setToken={setToken} />} />
        <Route path={'/signup'} element={<Signup />} />
      </Routes>
    </>
  )
   
}

export default App
