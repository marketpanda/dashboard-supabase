import { Card } from "../components/ui/card" 
import * as Form from '@radix-ui/react-form' 
import { useEffect, useState } from "react"
import { supabase } from '../client'
import FooterGuest from "./FooterGuest"
import { Link, useNavigate } from "react-router-dom"
import { Props } from "./DashBoardAuthenticated"


const HomePage:React.FC<Props> = ({ setToken }) => {

    type SignInDetails = {
        email: string | null,
        password: string | null, 
    }

    let navigate = useNavigate()

    const [formDataSignIn, setFormDataSignIn] = useState<SignInDetails>({
        email: null,
        password: null,
    })

    const handleChangeSignInForm:React.ChangeEventHandler<HTMLInputElement> = async(event) => { 
        setFormDataSignIn((prev) => {
            return {
                ...prev, [event?.target.name]: event?.target.value
            }
        })
    }

    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { email, password } = formDataSignIn
        if (email && password) {
            try {
              const { data, error } = await supabase.auth.signInWithPassword({
                email, password
              })  

              if (error) throw error
              console.log('received ', data )
              if (setToken) setToken(JSON.stringify(data))
              navigate('/dashboard')
              
            } catch (error) {
                console.log(error)
            }

            console.log(email, password)
        } else {
            console.log("Email and password is required")
        }
    }   

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