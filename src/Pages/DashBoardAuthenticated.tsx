 
import { Route, Routes, useNavigate } from 'react-router-dom'
import '../App.css'
import Navbar from '../components/Navbar' 

import HomePage from './HomePage'
import Profiles from './Profiles'
import Rentals from './Rentals'
import Places from './Places'
import NotFoundPage from './NotFoundPage.tsx'

import { Card } from '../components/ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import { 
  Inbox,
  Users2,
  MapIcon,
  HomeIcon,
  Images 
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils.ts'
import Pending from '../Pages/Pending.tsx' 

const DashBoardAuthenticated = ({token}: {token:any}) => {

    const [isCollapsed, setIsCollapsed] = useState(false) 

    let navigate = useNavigate()

    const stringToken  = JSON.stringify(token.user.user_metadata.email, null, 2)

    const logout = () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }
    return (
    <>
        <Card className='flex overflow-hidden'>
        <ResizablePanelGroup direction='horizontal'
            onLayout={(sizes:number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`}}
        >
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
            <div className='text-xs'>Welcome back <pre>{ JSON.parse(stringToken) }</pre></div>
            <button onClick={logout}>Logout</button>
            <Navbar isCollapsed={isCollapsed} links={[
                {
                location: "/",
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
            <Routes> 
                <Route path="/" element={<HomePage />} /> 
                <Route path="/pending" element={<Pending />} />
                <Route path="/places" element={<Places />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes> 
            </ResizablePanel>
        </ResizablePanelGroup>
        </Card>
        
        
    </>
    )
    
}

export default DashBoardAuthenticated