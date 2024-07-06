import { Card } from "../components/ui/card" 
import * as Form from '@radix-ui/react-form' 
import { useState } from "react"
import { supabase } from '../client'
import FooterGuest from "./FooterGuest"
import { useNavigate } from "react-router-dom"

export interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const Login:React.FC<LoginProps> = ({ setToken }) => {

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

              setToken(data)
              navigate('/')
              
            } catch (error) {
                console.log(error)
            }

            console.log(email, password)
        } else {
            console.log("Email and password is required")
        }
         
    }   
    return ( 
        <div className="w-full h-screen bg-gray-100 fixed flex justify-center items-center"> 
            <Card className="p-4 bg-white w-full sm:w-[450px] mx-2 h-screen relative shadow">
                <div className="mx-auto flex justify-center w-full my-10">
                    {/* <img src={watatripLogo} width="100" height="100" className="mx-auto" /> */}
                    <span className="cursor-default text-xl font-bold w-full text-center text-slate-800">Watatrip Admin Dashboard</span>
                </div>
                 
                <Form.Root onSubmit={handleLogin}>
                    <Form.Field name="email">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="text-[15px] font-medium leading-[35px]">Email</Form.Label>
                            <Form.Message className="text-[14px] text-red-700 font-semibold" match="valueMissing">
                                Please enter your email
                            </Form.Message>
                            <Form.Message className="text-[14px] text-red-700 font-semibold" match="typeMismatch">
                                Please provide a valid email
                            </Form.Message>
                        </div> 
                        <Form.Control asChild>
                            <input
                                className="mb-5 w-full bg-gray-50 shadow-gray inline-flex h-[35px] appearance-none items-center justify-center px-[10px] text-[15px] leading-none shadow-[0_0_0_1px_gray] outline-none hover:shadow-[0_0_0_3px_gray] focus:shadow-[0_0_0_2px_black] hover:outline-none selection:bg-red-600 selection:text-white"
                                type="email"
                                required
                                onChange={(e) => handleChangeSignInForm(e)}
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field name="password">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="text-[15px] font-medium leading-[35px]">Password</Form.Label>
                            <Form.Message className="text-[14px] text-red-700 font-semibold" match="valueMissing">
                                Please enter your password
                            </Form.Message>
                            
                        </div> 
                        <Form.Control asChild>
                            <input
                                className="mb-12 w-full bg-gray-50 shadow-gray inline-flex h-[35px] appearance-none items-center justify-center px-[10px] text-[15px] leading-none shadow-[0_0_0_1px_gray] outline-none hover:shadow-[0_0_0_3px_gray] focus:shadow-[0_0_0_2px_black] hover:outline-none selection:bg-red-600 selection:text-white"
                                type="password"
                                onChange={(e) => handleChangeSignInForm(e)} 
                                required
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit className="w-full"> 
                        <button className="box-border w-full text-white shadow-slate-700 hover:bg-slate-800 inline-flex h-[42px] items-center justify-center rounded-[4px] bg-red-700 px-[15px] font-medium leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                            Login
                        </button>
                    </Form.Submit>
                    <div className="w-full text-slate-700 text-sm mt-3">
                        <ul className="flex flex-row gap-4 w-full justify-end">
                            <li>
                                <a href="#" className="hover:text-red-700 hover:underline">Forgot Username?</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-700 hover:underline">Forgot Password?</a>
                            </li>
                            
                        </ul>
                    </div>
                </Form.Root> 
                <FooterGuest />
            </Card>
        </div>
    )
}

export default Login