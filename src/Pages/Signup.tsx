import { Card } from "../components/ui/card" 
import * as Form from '@radix-ui/react-form'

import { useEffect, useState } from "react"
import { supabase } from '../client'
import FooterGuest from "./FooterGuest"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
    
    let navigate = useNavigate()
    useEffect(() => {   
        const tokenString = sessionStorage.getItem('token')
        if (tokenString) navigate('/dashboard')
    }, [navigate])

    type SignUpDetails = {
        email: string | null,
        password: string | null,
        confirm_password?: string | null
    }
    const [formDataSignUp, setFormDataSignUp] = useState<SignUpDetails>({
        email: null,
        password: null,
        confirm_password: null
    })

    const handleChangeSignUpForm:React.ChangeEventHandler<HTMLInputElement> = async(event) => { 
        setFormDataSignUp((prev) => {
            return {
                ...prev, [event?.target.name]: event.target.value
            }
        })
    }
    
    const handleSignUp = async(data2:any) => {
        
        // console.log(formDataSignUp)
        console.log(data2) 
        const { email, password } = formDataSignUp
        if (email && password) { 
            const { data, error } = await supabase.auth.signUp({email, password }) 
            console.log(data)
            console.log(error)
        } else {
            console.log("Email and password are required")
        } 
        
    }
    return ( 
        <div className="w-full h-screen bg-gray-100 fixed flex justify-center items-center"> 
            <Card className="p-4 bg-white w-full sm:w-[450px] mx-2 h-screen relative shadow">
                <div className="mx-auto flex justify-center w-full my-10">
                    {/* <img src={watatripLogo} width="100" height="100" className="mx-auto" /> */}
                    <span className="cursor-default text-xl font-bold w-full text-center text-slate-800">Watatrip Admin Dashboard</span>
                </div>
                <Form.Root onSubmit={
                    (e:React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        handleSignUp(Object.fromEntries(new FormData(e.currentTarget)))
                        }
                    }>
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
                                onChange={(e) => handleChangeSignUpForm(e)}
                                required
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
                                className="mb-5 w-full bg-gray-50 shadow-gray inline-flex h-[35px] appearance-none items-center justify-center px-[10px] text-[15px] leading-none shadow-[0_0_0_1px_gray] outline-none hover:shadow-[0_0_0_3px_gray] focus:shadow-[0_0_0_2px_black] hover:outline-none selection:bg-red-600 selection:text-white"
                                type="password"
                                onChange={(e) => handleChangeSignUpForm(e)}
                                required
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field name="confirm_pasword">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="text-[15px] font-medium leading-[35px]">Confirm Password</Form.Label>
                            <Form.Message className="text-[14px] text-red-700 font-semibold" match="valueMissing">
                                Please enter your password again
                            </Form.Message>
                            
                        </div> 
                        <Form.Control asChild>
                            <input
                                className="mb-12 w-full bg-gray-50 shadow-gray inline-flex h-[35px] appearance-none items-center justify-center px-[10px] text-[15px] leading-none shadow-[0_0_0_1px_gray] outline-none hover:shadow-[0_0_0_3px_gray] focus:shadow-[0_0_0_2px_black] hover:outline-none selection:bg-red-600 selection:text-white"
                                type="password"
                                onChange={(e) => handleChangeSignUpForm(e)}
                                required
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit className="w-full"> 
                        <button
                           
                            className="box-border w-full text-white shadow-slate-700 hover:bg-slate-800 inline-flex h-[42px] items-center justify-center rounded-[4px] bg-red-700 px-[15px] font-medium leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                            Register
                        </button>
                    </Form.Submit>
                    <div className="w-full text-slate-700 text-sm mt-3">
                        <ul className="flex flex-row gap-4 w-full justify-end">
                            <li>
                                <Link to="/login">
                                    <span className="hover:text-red-700 hover:underline">Already have an account? Login here</span>
                                </Link>
                            </li>
                           
                            
                        </ul>
                    </div>
                     
                </Form.Root> 
                <FooterGuest />
              
                 
            </Card>
        </div>
    )
}

export default Signup