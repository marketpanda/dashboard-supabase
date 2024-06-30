import DashBoardAuthenticated from './Pages/DashBoardAuthenticated.tsx'
import Login from './Pages/Login.tsx'

function App() { 

  const isLogged = false 
  if (isLogged) { 
    return (
       <DashBoardAuthenticated />
    )
  } else {
    return ( 
       <Login /> 
    ) 
  }
   
}

export default App
