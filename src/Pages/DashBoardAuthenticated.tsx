 
import { Outlet, useNavigate } from 'react-router-dom'
import '../App.css'
import Navbar from '../components/Navbar' 
import { Card } from '../components/ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import { 
  Inbox,
  Users2,
  MapIcon,
  HomeIcon,
  Images 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../lib/utils.ts'

export interface Props {
    token?: string | null
    setToken?: React.Dispatch<React.SetStateAction<string | null>>
}

const DashBoardAuthenticated:React.FC<Props> = ({token, setToken}) => {

    const [isCollapsed, setIsCollapsed] = useState(false) 

    let navigate = useNavigate()
    let stringToken
    
    useEffect(() => {
        if (!token) {
            navigate('/login')
        } 
    }, [token, navigate])

    const logout = () => {
        sessionStorage.removeItem('token')
        if (setToken) {
            setToken(null)
        }
    }
    return (
    <>
        <Card className='flex overflow-hidden max-w-[1024px] mx-auto mt-2'>  
            <ResizablePanelGroup direction='horizontal'
                onLayout={(sizes:number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`}}>
                <ResizablePanel
                defaultSize={20}
                collapsible={true}
                maxSize={20}
                minSize={5}
                collapsedSize={4} 
                onCollapse={() => {
                    setIsCollapsed(true)
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
                }}
                onExpand={() => {
                    setIsCollapsed(false)
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
                }}
                className={cn( isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                <div className='text-xs'>Welcome back <pre>{ JSON.stringify(stringToken) }</pre></div>
                <button onClick={logout}>Logout</button>
                <Navbar isCollapsed={isCollapsed} links={[
                    {
                    location: "/home",
                    title: "home",
                    label: "Bulk Upload",
                    icon: Inbox,
                    variant: "ghost"
                    },
                    {
                    location: "/pending",
                    title: "bulkPendingImages",
                    label: "Image Upload Pending",
                    icon: Images,
                    variant: "ghost"
                    },
                    {
                    location: "/places",
                    title: "places",
                    label: "Places",
                    icon: MapIcon,
                    variant: "ghost"
                    },
                    {
                    location: "/rentals",
                    title: "rentals",
                    label: "Rentals",
                    icon: HomeIcon,
                    variant: "ghost"
                    },
                    {
                    location: "/profiles",
                    title: "profiles",
                    label: "Profiles",
                    icon: Users2,
                    variant: "ghost"
                    },
                ]} /> 
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel>
                    <Outlet /> 
                </ResizablePanel>
            </ResizablePanelGroup>
        </Card> 
    </>
    )
    
}

export default DashBoardAuthenticated