import { Route, Routes } from 'react-router-dom'
import DashBoardAuthenticated from './Pages/DashBoardAuthenticated.tsx'
import Login from './Pages/Login.tsx'
import Signup from './Pages/Signup.tsx'
import { useEffect, useState } from 'react'

function App() { 

  // const isLogged = false 
  // if (isLogged) { 
  //   return (
  //      <DashBoardAuthenticated />
  //   )
  // } else {
  //   return ( 
  //      <Login /> 
  //   ) 
  // }

  

  const [token, setToken] = useState<string | null>(null)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {

    const tokenString = sessionStorage.getItem('token')
    if (tokenString) {
      let data:string = JSON.parse(tokenString) 
      setToken(data)
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Login setToken={setToken} />} />
        <Route path={'/login'} element={<Login setToken={setToken} />} />
        <Route path={'/signup'} element={<Signup />} />
       { token ? <Route path={'/dashboard'} element={<DashBoardAuthenticated token={token} />} /> : ""}
      </Routes>
    </>
  )
   
}

export default App
