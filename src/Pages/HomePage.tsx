import { Card } from "../components/ui/card" 

import { useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"
import { Props } from "./DashBoardAuthenticated"


const HomePage:React.FC<Props> = ({ setToken }) => {

    console.log(setToken)

    let navigate = useNavigate()

          

    useEffect(() => {
        const tokenString = sessionStorage.getItem('token')
        if (tokenString) navigate('/dashboard')
    }, [navigate])

    return ( 
        <div className="w-full h-screen bg-gray-100 fixed flex justify-center items-center"> 
            <Card className="p-4 bg-white w-full sm:w-[450px] mx-2 h-screen relative shadow">
                <div>
                Watatrip Dashboard Landing Page 
                </div>
                <Link to="/login">Login</Link>
            </Card>
        </div>
    )
}

export default HomePage