import { useParams } from "react-router-dom"
import { Link, Outlet } from "react-router-dom"

const Profiles = () => {

  const params = useParams<{ id: string }>()
  console.log(params)
  return (
    <div>
      Profiles 
      <Outlet />
    </div>
  )
}

export default Profiles