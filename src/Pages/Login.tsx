import { Card } from "../components/ui/card" 
import * as Form from '@radix-ui/react-form'
import watatripLogo from '../assets/watatrip_logo-transparent.png'

const Login = () => {
    return ( 
        <div className="w-full h-screen bg-gray-100 fixed flex justify-center items-center"> 
            <Card className="p-4 bg-white w-full sm:w-[450px] mx-2 h-5/6 relative shadow">
                <div className="mx-auto flex justify-center w-full my-10">
                    {/* <img src={watatripLogo} width="100" height="100" className="mx-auto" /> */}
                    <span className="cursor-default text-xl font-bold w-full text-center text-slate-800">Watatrip Admin Dashboard</span>
                </div>
                <Form.Root>
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
                                className="mb-5 box-border w-full bg-blackA2 shadow-black inline-flex h-[35px] appearance-none items-center justify-center px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-red-600 selection:text-white"
                                type="email"
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
                                className="mb-12 box-border w-full bg-blackA2 shadow-black inline-flex h-[35px] appearance-none items-center justify-center px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-red-600 selection:text-white"
                                type="password"
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
                                <a href="#" className="hover:text-black hover:underline">Forgot Username?</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black hover:underline">Forgot Password?</a>
                            </li>
                            
                        </ul>
                    </div>
                </Form.Root> 
                <div className="text-sm text-slate-700 absolute bottom-2 w-full left-0  px-4 flex sm:flex-row flex-col justify-between items-center">
                    <div className="w-full sm:w-1/3  p-1 h-[100px] flex items-center justify-end pr-5">
                        <img src={watatripLogo} width="80" height="80" className="mx-auto" />
                        {/* <span>wtmsi</span> */}
                    </div>
                    <div className="w-full sm:w-2/3 sm:border-l-2 p-2 flex justify-center"> 
                        <ul className="sm:flex-col flex-row flex gap-2 justify-center w-full text-xs">
                            <li>
                                <a 
                                    href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                                    Download the app here
                                </a>
                            </li>
                            <li>
                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="my-link-class">
                                    Learn more about the app
                                </a>
                                
                            </li>
                        </ul> 
                    </div>
                </div> 
            </Card>
        </div>
    )
}

export default Login